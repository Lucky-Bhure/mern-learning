import React, { useEffect } from 'react'
import { useAuthentication } from '../../store/Authentication';
import { Navigate } from 'react-router-dom';

const Logout = () => {

    const {logoutUser} = useAuthentication();
  
    useEffect(() => {
        logoutUser();
    }, [logoutUser])
    
    return <Navigate to={"/login"}/>
}

export default Logout
