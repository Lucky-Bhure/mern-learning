import React from 'react'
import { useAuthentication } from '../../store/Authentication';

const About = () => {

  const { authorizedUser } = useAuthentication();

  return (
    <main>
      <p>Hi {authorizedUser ? authorizedUser.username: "User"},</p>
      <h1>About</h1>
    </main>
  )
}

export default About
