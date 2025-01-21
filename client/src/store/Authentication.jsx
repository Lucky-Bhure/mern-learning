import { createContext, useContext, useEffect, useState } from "react";


export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {

    const [ token , setToken] = useState(localStorage.getItem("mern_token"));
    const [ authorizedUser , setAuthorizedUser] = useState("");

    const isLoggedIn = !!token;

    const storeTokenInLocalStorage = (token) => {
        setToken(token);
        return localStorage.setItem("mern_token",token);
    }

    const logoutUser = () => {
        setToken("");
        setAuthorizedUser("");
        localStorage.removeItem("mern_token");
    }

    // Get Login User Data 
    const authorizedUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth-registration/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.ok) {
                const userdata = await response.json();
                setAuthorizedUser(userdata.userData);
            }
        } catch (error) {
            console.log("Error in Authorized User Data Featching")
        }
    }

    useEffect(() =>  {
        authorizedUserData();
    }, [isLoggedIn])

    return <AuthenticationContext.Provider value={{isLoggedIn, storeTokenInLocalStorage, logoutUser, authorizedUser}}>
        {children}
    </AuthenticationContext.Provider>
};

export const useAuthentication = () => {
    const authenticationValue = useContext(AuthenticationContext);

    if(!authenticationValue) {
        throw new Error("useAuthentication outside of the Provider")
    }
    return authenticationValue;
}

