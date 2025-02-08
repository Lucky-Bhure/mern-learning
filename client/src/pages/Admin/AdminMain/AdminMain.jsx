import React from 'react'
import { useAuthentication } from '../../../store/Authentication'
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'

const AdminMain = () => {

  return (
    <main className='admin-main-page'>
      <div className='admin-main-heading'>
        <h1>Dashboard</h1>
        <p>Example dashboard overview and content summery</p>
      </div>
      <div className='admin-main-sub-section'>
        <div className='admin-main-sub-div'>
          <p className='welcome'>Welcome to Quest Admin</p>
          <p className='welcome-sub'>Great job, your affiliate dashboard is ready to go! You can view users, contacts and manage courses.</p>
          <NavLink to="/admin/users">
            <button className='get-btn'>Get Started <FaArrowRightLong size={18} /></button>
          </NavLink>
        </div>
      </div>
    </main>
  )
}

export default AdminMain
