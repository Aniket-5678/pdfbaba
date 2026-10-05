import express from "express"
import { completePasswordResetController, forgetController, loginController, registerController, testController } from "../controllers/userController.js"
import {isAdmin, requireSignIn} from "../middlewear/authmiddlewear.js"

const resetAttempts = new Map();
const limitPasswordResetAttempts = (req, res, next) => {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const windowMs = 15 * 60 * 1000;
  const previous = resetAttempts.get(key);
  const attempts = previous && now - previous.startedAt < windowMs
    ? previous
    : { startedAt: now, count: 0 };
  if (attempts.count >= 5) {
    return res.status(429).json({ success: false, message: "Too many attempts. Please try again in 15 minutes." });
  }
  attempts.count += 1;
  resetAttempts.set(key, attempts);
  next();
};


const router = express.Router()

router.post('/register' ,  registerController  )


router.post('/login', loginController)
 
router.post('/forget-password', limitPasswordResetAttempts, forgetController)
router.post('/reset-password', limitPasswordResetAttempts, completePasswordResetController)


router.get('/test', requireSignIn, isAdmin,  testController)


router.get('/user-auth', (req, res)=> {
    res.status(200).send({ok: true})
  })

  router.get('/admin-auth',  (req, res)=> {
    res.status(200).send({ok: true})
  })






export default router
