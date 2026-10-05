import { comparePassword, hashedPassword } from "../helper/helper.js"
import userModel from "../models/user.model.js"
import JWT from "jsonwebtoken"
import { createHash, randomBytes } from "node:crypto"
import nodemailer from "nodemailer"



export const  registerController  = async(req, res) => {
  
    try {
        const {fullName, email, password} = req.body
        
        //validation
        if (!fullName) {
             return res.status(401).json({
                success: false,
                message: "FullName is Required"
             })
        }
        if (!email) {
            return res.status(401).json({
               success: false,
               message: "email is Required"
            })
       }
       if (!password) {
        return res.status(401).json({
           success: false,
           message: "password is Required"
        })
    }
    
    const existedUser = await userModel.findOne({email})
    
    if (existedUser) {
         return res.status(401).json({
            success: false,
            message: "user already registerd"
         })
    }
    
    const hash = await hashedPassword(password)
    
    const user = await new  userModel({
        fullName: fullName,
        email: email,
        password: hash,
    }).save()
    
    res.status(200).json({
        success: true,
        message: "user Registered successfully",
        user 
            
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error in Registeration internal server error"
        })
    }
    
    
    }
    
    
    //login controller
    
    export const loginController = async(req, res) => {
         
       try {
         
        const {email, password} = req.body
    
          // validation 
          if (!email || !password) {
              return res.status(401).json({
               success: false,
              message: "All field Requireds"
              })
          }
    
          const user =  await userModel.findOne({email}).select("+passwordChangedAt")
    
          if (!user) {
              return res.status(401).json({
                success: false,
                message: "user Not exist"
              })
          }
        
         const isMatch = await comparePassword(password, user.password)
    
         if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
         }
        
        const token = await JWT.sign({_id : user._id, passwordChangedAt: user.passwordChangedAt?.getTime() || 0},  process.env.JWT_SECRET, {expiresIn: "7d"})
        
    
        res.status(200).json({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            },
            token
        })
    
    
       } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in login"
        })
       }
    }
    
const resetMailTransport = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Password reset email is not configured");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
};

const genericResetMessage = "If an account matches that email, we sent a password reset link.";

export const forgetController = async (req, res) => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(200).json({ success: true, message: genericResetMessage });
  }

  try {
    const user = await userModel.findOne({ email });
    if (user && user.role !== 1) {
      const token = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      const expires = new Date(Date.now() + 15 * 60 * 1000);
      await userModel.updateOne({ _id: user._id }, {
        $set: { resetPasswordTokenHash: tokenHash, resetPasswordExpires: expires },
      });

      const resetUrl = new URL("/forgetpass?token=" + encodeURIComponent(token), process.env.CLIENT_URL || "https://codebricket.com").toString();
      await resetMailTransport().sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset your Codebricket password",
        text: `We received a request to reset your password. Use this link within 15 minutes: ${resetUrl}\n\nIf you did not request this, you can ignore this email. Your password will not change.`,
        html: `<p>We received a request to reset your Codebricket password.</p><p><a href="${resetUrl}">Reset password</a> (link expires in 15 minutes)</p><p>If you did not request this, ignore this email. Your password will not change.</p>`,
      });
    }
  } catch (error) {
    // Keep the response identical for known and unknown addresses.
    console.error("Password reset request could not be completed:", error.message);
  }
  return res.status(200).json({ success: true, message: genericResetMessage });
};

export const completePasswordResetController = async (req, res) => {
  const { token, newpassword } = req.body;
  if (typeof token !== "string" || token.length !== 64 || typeof newpassword !== "string" || newpassword.length < 8 || newpassword.length > 128) {
    return res.status(400).json({ success: false, message: "Use a valid reset link and a password with at least 8 characters." });
  }

  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const user = await userModel.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
      role: { $ne: 1 },
    }).select("+resetPasswordTokenHash +resetPasswordExpires");

    if (!user) return res.status(400).json({ success: false, message: "This reset link is invalid or expired. Request a new one." });

    const hash = await hashedPassword(newpassword);
    const changedAt = new Date();
    const update = await userModel.updateOne({ _id: user._id, resetPasswordTokenHash: tokenHash }, {
      $set: { password: hash, passwordChangedAt: changedAt },
      $unset: { resetPasswordTokenHash: 1, resetPasswordExpires: 1 },
    });
    if (!update.modifiedCount) return res.status(400).json({ success: false, message: "This reset link is invalid or expired. Request a new one." });

    try {
      await resetMailTransport().sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Codebricket password was changed",
        text: "Your Codebricket password was just changed. If this was not you, contact support immediately.",
      });
    } catch (mailError) {
      console.error("Password changed notification could not be sent:", mailError.message);
    }
    return res.status(200).json({ success: true, message: "Password changed. Please sign in with your new password." });
  } catch (error) {
    console.error("Password reset failed:", error.message);
    return res.status(500).json({ success: false, message: "Could not reset password. Please try again." });
  }
};
    

       
export const testController = async(req, res) => {
    res.status(200).json({
        message: "protected Routes"
    })
}
