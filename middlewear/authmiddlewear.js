import JWT from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const requireSignIn = async (req, res, next) => {
  try {
    // Expecting token as "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach user from DB
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // now req.user._id is always available
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ success: false, message: "Auth failed" });
  }
};
    
    export const isAdmin = async (req, res, next) => {
        try {
          const user = await userModel.findById(req.user._id);
          if (user.role !== 1) {
            return res.status(403).json({
              success: false,
              message: 'Admin access denied',
            });
          } else {
            next();
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: 'Admin check failed',
          });
        }
      };