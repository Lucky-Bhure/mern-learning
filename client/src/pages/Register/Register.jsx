import React, { useState } from "react";
// import { Form } from "react-router-dom";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuthentication } from "../../store/Authentication";

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

  const {API} = useAuthentication();
 
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
        `${API}/api/auth-registration/register`,
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
    <main className="main-container">
      <section className='form-section'>
      <div>
        <img src="registration.png" alt="registration-page-image" />
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
      <h2 className='form-text'>Register with us</h2>
      <p className='form-sub-text'>Kindly fill this form to register</p>
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
            autoComplete="false"
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
      </section>
    </main>
  );
};

export default Register;
