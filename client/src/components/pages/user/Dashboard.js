import React from 'react'
import Layout from '../../Layout/Layout'
import Usermenu from '../Usermenu'
import { useAuth } from '../../context/auth'
import "../../style/style.css"

const Dashboard = () => {

const [auth] = useAuth()

  return (
    <Layout>
          <div className='user-dashboard-container'>
        <div>
          <Usermenu/>
        </div>
        <div className='user-content'>
          <h3>{auth?.user?.fullName}</h3>
          <h3>{auth?.user?.email}</h3>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard