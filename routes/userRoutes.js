import express from "express"
import { forgetController, loginController, registerController, testController } from "../controllers/userController.js"
import {isAdmin, requireSignIn} from "../middlewear/authmiddlewear.js"


const router = express.Router()

router.post('/register' ,  registerController  )


router.post('/login', loginController)
 
router.post('/forget-password', forgetController)


router.get('/test', requireSignIn, isAdmin,  testController)


router.get('/user-auth', (req, res)=> {
    res.status(200).send({ok: true})
  })

  router.get('/admin-auth',  (req, res)=> {
    res.status(200).send({ok: true})
  })






export default router