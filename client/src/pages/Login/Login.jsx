import React, { useState } from 'react'
import "../Register/Register.css"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from '../../store/Authentication'
import { toast } from 'react-toastify';

const Login = () => {

  const [userData, setUserData] = useState({
      email: "",
      password:""
    })
  
  
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuthentication();

    // Handle input changes
    const handleInputChange = (event) => {
      let name = event.target.name;
      let value = event.target.value;
  
      setUserData({...userData, [name]: value});
    }
  
    // Handle form submit 
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/api/auth-registration/login",
          {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        
        const res_data = await response.json();
        
        if(response.ok) {
          toast.success("Successfully Login")
          storeTokenInLocalStorage(res_data.token);
          navigate("/");
        } else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <main>
      <h1 className="registration-heading">Login</h1>
      
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="input-fields">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-fields">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="register-btn">Login</button>
      </form>
    </main>
  )
}

export default Login
