import React from 'react'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'
import "../style/style.css"


const Layout = ({children}) => {
  return (
    <div className='Layout-container' >
       <Navbar/>
    <main>
        {children}
    </main>
    <Footer/>
    </div>
  )
}

export default Layout