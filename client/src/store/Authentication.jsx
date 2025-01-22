import { createContext, useContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("mern_token"));
  const [authorizedUser, setAuthorizedUser] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [contactsData, setContactsData] = useState([]);

  const isLoggedIn = !!token;
  const authorizedToken = `Bearer ${token}`;

  const storeTokenInLocalStorage = (token) => {
    setToken(token);
    return localStorage.setItem("mern_token", token);
  };

  const logoutUser = () => {
    setToken("");
    setAuthorizedUser("");
    localStorage.removeItem("mern_token");
  };

  // Get Login User Data
  const authorizedUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth-registration/user",
        {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
          },
        }
      );

      if (response.ok) {
        const userdata = await response.json();
        setAuthorizedUser(userdata.userData);
      }
    } catch (error) {
      console.log("Error in Authorized User Data Featching");
    }
  };

  // Get Users Data
  const usersDataFetching = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
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

  // Get Users Contact Data
  const contactsDataFetching = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizedToken,
        },
      });

      if (response.ok) {
        const contactsdata = await response.json();
        setContactsData(contactsdata);
      }
    } catch (error) {
      console.log("Error in Users Data Featching");
    }
  };

  useEffect(() => {
    authorizedUserData();
    usersDataFetching();
    contactsDataFetching();
  }, [isLoggedIn]);

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLocalStorage,
        logoutUser,
        authorizedUser,
        usersData,
        contactsData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const authenticationValue = useContext(AuthenticationContext);

  if (!authenticationValue) {
    throw new Error("useAuthentication outside of the Provider");
  }
  return authenticationValue;
};
