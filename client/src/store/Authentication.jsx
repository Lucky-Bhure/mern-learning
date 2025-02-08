import { createContext, useContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("mern_token"));
  const [authorizedUser, setAuthorizedUser] = useState("");
  const API = import.meta.env.VITE_APP_API_URL;

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
        `${API}/api/auth-registration/user`,
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

  useEffect(() => {
    authorizedUserData();
  }, [isLoggedIn]);

  return (
    <AuthenticationContext.Provider
      value={{
        API,
        isLoggedIn,
        storeTokenInLocalStorage,
        logoutUser,
        authorizedUser,
        authorizedToken
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
