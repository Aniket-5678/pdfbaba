import React from 'react'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'
import  { Toaster } from 'react-hot-toast';
import "../style/style.css"

const Layout = ({children}) => {
  return (
    <div className='Layout-container' >
    
       <Navbar/>
    <main>
        {children}
        <Toaster/>
    </main>
    <Footer/>
    </div>
  )
}

export default Layout