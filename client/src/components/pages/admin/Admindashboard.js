import React from 'react'
import Layout from '../../Layout/Layout'
import Adminmenu from '../Adminmenu'
import { useAuth } from '../../context/auth'

const Admindashboard = () => {

    const [auth] = useAuth()

  return (
    <Layout>
        <div className="admin-dash-container" >
        <div>
          <Adminmenu />
        </div>
        <div className="dashboard-text">
          <h3>{auth?.user?.name}</h3>
          <h3>{auth?.user?.email}</h3>
        </div>
      </div>
    </Layout>
  )
}

export default Admindashboard