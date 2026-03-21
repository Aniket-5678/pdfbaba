import JWT from "jsonwebtoken";
import userModel from "../models/user.model.js";

// 🔐 Require Sign In
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Token check
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    // ✅ Extract token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ✅ Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user (exclude sensitive fields)
    const user = await userModel
      .findById(decoded._id)
      .select("-password -secretKey");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// 🔐 Admin Middleware (OPTIMIZED 🚀)
export const isAdmin = (req, res, next) => {
  try {
    // ✅ Direct check (no DB call needed)
    if (req.user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Admin access denied",
      });
    }

    next();
  } catch (error) {
    console.log("Admin middleware error:", error);

    res.status(500).json({
      success: false,
      message: "Admin check failed",
    });
  }
};