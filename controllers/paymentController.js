import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/orderModel.js";
import SourceCode from "../models/sourceCodeModel.js";
import path from "path";
import fs from "fs";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Start Payment
export const startPayment = async (req, res) => {
  try {
    const { sourceCodeId } = req.body;
    const sourceCode = await SourceCode.findById(sourceCodeId);
    if (!sourceCode) return res.status(404).json({ message: "Source code not found" });

    const options = {
      amount: sourceCode.price * 100, // in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, sourceCodeId, amount } = req.body;

    // Verify Signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const sourceCode = await SourceCode.findById(sourceCodeId);
    // Set Expiry (24 hours download window)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);


    // Create Order
    const order = await Order.create({
      user: req.user._id,
      sourceCode: sourceCodeId,
      paymentId: razorpay_payment_id,
      amount,
      expiry: expiryDate,
    });

    return res.json({ success: true, orderId: order._id ,fileUrl: sourceCode.file });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Download Source Code
// ✅ Corrected Download Source Code Controller
export const downloadSourceCode = async (req, res) => {
  try {
    const { token } = req.params; // token = order._id

    // 1️⃣ Find the order
    const order = await Order.findById(token);
    if (!order)
      return res.status(403).json({ message: "Invalid or expired download link" });

    // 2️⃣ Check user ownership
    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "You cannot download this file" });

    // 3️⃣ Check expiry
    if (new Date() > order.expiry)
      return res.status(403).json({ message: "Download expired, please buy again" });

    // 4️⃣ Get source code info
    const sourceCode = await SourceCode.findById(order.sourceCode);
    if (!sourceCode || !sourceCode.zipFile)
      return res.status(404).json({ message: "File not found" });

    // 5️⃣ Correct path for sourcecodes folder in project root
    const fileName = path.basename(sourceCode.zipFile);
    const filePath = path.join(process.cwd(), "sourcecodes", fileName);

    console.log("Attempting download from:", filePath);

    if (!fs.existsSync(filePath)) {
      console.error("File not found on server:", filePath);
      return res.status(404).json({ message: "File not found on server" });
    }

    // 6️⃣ Send the ZIP file
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.download(filePath);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({
      message: "Error downloading file",
      error: error.message,
    });
  }
};



// Check file availability (for SuccessPayment page)
export const checkFileAvailability = async (req, res) => {
  try {
    const { id } = req.params; // order._id
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ allowed: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ allowed: false, message: "You do not own this order" });
    }

    if (new Date() > order.expiry) {
      return res.status(403).json({ allowed: false, message: "Order expired" });
    }

    const sourceCode = await SourceCode.findById(order.sourceCode);
    if (!sourceCode || !sourceCode.zipFile) {
      return res.status(404).json({ allowed: false, message: "Source file missing" });
    }

    const fileName = path.basename(sourceCode.zipFile);
    const filePath = path.join(process.cwd(), "sourcecodes", fileName);

    const exists = fs.existsSync(filePath);

    return res.json({
      allowed: exists,
      message: exists ? "File ready for download" : "File missing on server",
    });
  } catch (error) {
    console.error("Check file error:", error);
    res.status(500).json({ allowed: false, message: "Server error", error: error.message });
  }
};


// ✅ Get all orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("sourceCode", "title price zipFile")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      title: order.sourceCode?.title || "Source Code",
      price: order.sourceCode?.price || 0,
      createdAt: order.createdAt,
      expiry: order.expiry,
      isExpired: new Date() > new Date(order.expiry),
    }));

    res.json({ success: true, orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user orders" });
  }
};
