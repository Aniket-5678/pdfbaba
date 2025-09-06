import React from 'react'
import { Link } from 'react-router-dom'
import "../style/style.css"

const Adminmenu = () => {
  return (
    <div className='adminmenu-container'>
    <nav className='admin-menu-main'>
    <Link  className='admin-menu-link'to='/dashboard/admin/create-category'>create category</Link>
    <Link  className='admin-menu-link'to='/dashboard/admin/create-quiz'>create QUiz</Link>
    <Link  className='admin-menu-link'to='/dashboard/admin/all-quiz'>All QUiz</Link>
        <Link  className='admin-menu-link'to='/dashboard/admin/create-question'>create pdf</Link>
        <Link  className='admin-menu-link'to='/dashboard/admin/all-question'>All pdf</Link>
        <Link  className='admin-menu-link'to='/dashboard/admin/createroadmap'>createroadmap</Link>
        <Link  className='admin-menu-link'to='/dashboard/admin/roadmaplist'>roadmaplist</Link>
        <Link  className='admin-menu-link'to='/dashboard/admin/createmcqexam'>createmcqexam</Link>
        

        
    </nav>
    </div>

  )
}

export default Adminmenu