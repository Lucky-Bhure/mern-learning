import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuthentication } from "../../../../store/Authentication";
import {toast} from "react-toastify"

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { id } = useParams();

  const { API, authorizedToken } = useAuthentication();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/edit/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.log("Error at user data fetching in update");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    console.log(userData);
    try {
      const response = await fetch(
        `${API}/api/admin/users/edit/${id}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": authorizedToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        toast("Successfully updated")
        navigate("/admin/users");
      }
    } catch (error) {
      console.log("Error at user data updation");
      toast("Unsuccessfully updated")
    }
  };

  return (
    <main className="admin-main">
      <h1>Update User Data</h1>

      <section className="update-section registration-form">
        <div className="input-fields">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-fields">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-fields">
          <label htmlFor="phone">Phone No.</label>
          <input
            type="number"
            name="phone"
            id="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleUpdate} className="register-btn">Update</button>
      </section>
      <NavLink to="/admin/users" className="back-link">
        <p>Back to Previous Page</p>
      </NavLink>
    </main>
  );
};

export default UpdateUser;
