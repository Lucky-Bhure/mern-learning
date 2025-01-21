import React from 'react'
import { useAuthentication } from '../../store/Authentication'

const Admin = () => {

    const { authorizedUser } = useAuthentication();

  return (
    <main>
      <h2>Hi {authorizedUser ? authorizedUser.username: "User"},</h2>
    </main>
  )
}

export default Admin
