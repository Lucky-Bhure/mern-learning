import React, { useState } from "react";
// import { Form } from "react-router-dom";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// export const getFormData = async ({ request }) => {
//   try {
//     const res = await request.formData();
//     const data = Object.fromEntries(res);
//     console.log(data);
//     return null
//   } catch (error) {
//     console.log(error);
//   }
// }
const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [registerNotification, setRegisterNotification] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth-registration/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Successfully Register")
        setRegisterNotification(true);
        setUserData({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("Register Error: ", error);
    }
  };

  return (
    <main>
      <h1 className="registration-heading">Registration Form</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="input-fields">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </div>
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
          <label htmlFor="phone">Phone No.</label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={userData.phone}
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
        <button type="submit" className="register-btn">
          Register Now
        </button>
      </form>
      {
        registerNotification && 
        <div>
          <p>Registration Successfully Completed</p>
          <button onClick={() => setRegisterNotification(false)}>close</button>
        </div> 
      }
    </main>
  );
};

export default Register;
