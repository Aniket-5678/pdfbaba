import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import {  useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Forgetpass = () => {

const [email, setEmail] = useState("")
const [newpassword, setNewpassword] = useState("")
const navigate = useNavigate()


const handleSubmit = async(e) => {
    e.preventDefault()
    try {
         const res = await  axios.post('/api/v1/user/forget-password' , { email, newpassword})
        
         if (res.data.success) {
             toast.success(res.data && res.data.message)
             navigate('/login')
         }

    } catch (error) {
      console.log(error);
    }
  }



  return (

    <Layout>
    <div className='signup-container'>
 <form  className='signup-main' onSubmit={handleSubmit}  >
  <h3>Forget password</h3>
    <div>
     <input className='signup-input' type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}  />  
    </div> 
    <div >
      <input className='signup-input'  type='password' placeholder='Enter your new password' value={newpassword} onChange={(e) => setNewpassword(e.target.value)}  />
    </div>
    <div>
      <button type='submit' className='signup-btn'>Reset</button>
    </div>
   
 </form>
</div>
 </Layout>
  )
}

export default Forgetpass