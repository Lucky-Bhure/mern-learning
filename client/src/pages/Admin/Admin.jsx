import React from 'react'
import { useAuthentication } from '../../store/Authentication'
import { NavLink, Outlet } from 'react-router-dom'
import "./Admin.css"

const Admin = () => {

    const { authorizedUser } = useAuthentication();

  return (
    <main>
      <nav className='admin-nav-container'>
        <ul className='admin-nav-division'>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "notactive")}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "notactive")}>Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/contacts" className={({ isActive }) => (isActive ? "active" : "notactive")}>Contacts</NavLink>
          </li>
          <li>
            <NavLink to="/admin/services" className={({ isActive }) => (isActive ? "active" : "notactive")}>Services</NavLink>
          </li>
        </ul>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  )
}

export default Admin
