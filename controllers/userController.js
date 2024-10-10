import { comparePassword, hashedPassword } from "../helper/helper.js"
import userModel from "../models/user.model.js"
import JWT from "jsonwebtoken"



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
    
          const user =  await userModel.findOne({email})
    
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
        
        const token = await JWT.sign({_id : user._id},  process.env.JWT_SECRET, {expiresIn: "7d"})
        
    
        res.status(200).json({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                email: user.email,
                password: user.password,
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
    
    
    export const forgetController = async(req, res) => {
        try {
          const {email, newpassword} = req.body
       
          //validation
          if (!email) {
            return res.status(400).json({message: "email is Required"})
          }
          if (!newpassword) {
           return res.status(400).json({message: "new Password is Required"})
         }
          //check
          const user = await userModel.findOne({email})
          if (!user) {
             return res.status(400).json({
               success:false,
               message: "wrong  email "
             })
          }
           
          const hash = await hashedPassword(newpassword)
          await userModel.findByIdAndUpdate(user._id, {password: hash})
          
          res.status(200).json({
           success: true,
           message: " Password Reset successfully"
          })
          
        } catch (error) {
         console.log(error);
         res.status(500).json({
           success: false,
           message: "error in Reset password"
         })
        }
       
       
       }
    

       
export const testController = async(req, res) => {
    res.status(200).json({
        message: "protected Routes"
    })
}
