import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuthentication } from "../../../../store/Authentication";

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: "",
  });
  const { id } = useParams();

  const { authorizedToken } = useAuthentication();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/edit/${id}`,
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

    if(name === "isAdmin" && value==="Yes"){}

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
        <div className="input-fields">
          <label htmlFor="isAdmin">Admin</label>
          <input
            type="text"
            name="isAdmin"
            id="isAdmin"
            value={userData.isAdmin}
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
