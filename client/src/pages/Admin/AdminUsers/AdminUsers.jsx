import React, { useEffect, useState } from "react";
import { useAuthentication } from "../../../store/Authentication";
import { NavLink } from "react-router-dom";

const AdminUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const { API, authorizedToken, authorizedUser } = useAuthentication();

  // Get Users Data
  const usersDataFetching = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizedToken,
        },
      });

      if (response.ok) {
        const usersdata = await response.json();
        setUsersData(usersdata);
      }
    } catch (error) {
      console.log("Error in Users Data Featching");
    }
  };

  useEffect(() => {
    usersDataFetching();
  }, []);

  // Delete User With the _id
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizedToken,
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        usersDataFetching();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="admin-main">
      <div className="admin-heading">
        <p>Users Details</p>
      </div>

      <section className="table-section">
        <table className="table-container">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Admin</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((currEle) => {
              const { _id, username, phone, email, isAdmin } = currEle;
              return (
                <tr key={_id}>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{isAdmin ? "Yes" : "No"}</td>
                  <td>
                    { !(username === authorizedUser.username) &&
                      <NavLink to={`/admin/users/edit/${_id}`}>
                      <button className="edit">
                        Edit
                      </button>
                    </NavLink>
                    }
                  </td>
                  <td>
                    {
                      !(username === authorizedUser.username) &&
                    <button className="userdelete" onClick={() => handleDelete(_id)}>Delete</button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default AdminUsers;
