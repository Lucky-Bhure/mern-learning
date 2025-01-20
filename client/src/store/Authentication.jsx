import { createContext, useContext, useState } from "react";


export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {

    const [ token , setToken] = useState(localStorage.getItem("mern_token"));

    const isLoggedIn = !!token;

    const storeTokenInLocalStorage = (token) => {
        return localStorage.setItem("mern_token",token);
    }

    const logoutUser = () => {
        setToken("");
        localStorage.removeItem("mern_token");
    }

    return <AuthenticationContext.Provider value={{isLoggedIn, storeTokenInLocalStorage, logoutUser}}>
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

