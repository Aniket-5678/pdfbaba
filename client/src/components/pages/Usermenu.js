import React from 'react'
import { Link } from 'react-router-dom'

const Usermenu = () => {
  return (
<div className='adminmenu-container'>
    <nav className='admin-menu-main'>
        <Link className='admin-menu-link' to='/dashboard/user/profile'>profile</Link>
       
    </nav>
    </div>
  )
}

export default Usermenu