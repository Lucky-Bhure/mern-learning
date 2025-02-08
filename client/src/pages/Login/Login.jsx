import React, { useState } from "react";
import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../store/Authentication";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { API, storeTokenInLocalStorage } = useAuthentication();

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
        `${API}/api/auth-registration/login`,
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
        toast.success("Successfully Login");
        storeTokenInLocalStorage(res_data.token);
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main-container">
      <section className='form-section'>
        <div>
          <img src="signin.jpg" alt="login-page-image" />
        </div>
        <form className="registration-form" onSubmit={handleSubmit}>
          <h3 className="form-text">Login Here</h3>
          <p className="form-sub-text">
            Hello, welcome back to your account.
          </p>
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
          <button type="submit" className="register-btn">
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
