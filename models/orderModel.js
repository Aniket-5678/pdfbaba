import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  sourceCode: { type: mongoose.Schema.Types.ObjectId, ref: "SourceCode", required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  expiry: { type: Date, required: true } // 24 hr validity
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
