import { useState, useContext, createContext } from "react";
import { login as loginApi } from "../api/authApi";

const AuthContext = createContext(null);

// export ? AuthProvider (eg wifi )
export const AuthProvider = ({ children }) => {
    // read rhe saved token when app starts(survice refresh )
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (email, password) => {
        const data = await loginApi(email, password);
        localStorage.setItem("token", data.token);
        setToken(data.token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const isLoggedIn = !!token;
    //read role from token paylaod admin or customer 
    const payload = token ? JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))) : null;
    const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const role = payload?.[ROLE_CLAIM];

    const isAdmin = role === 'Admin';
    return (
        <AuthContext.Provider value={{ token, isLoggedIn, login, isAdmin, logout }}>
            {children}
        </AuthContext.Provider>


    );

};
//export ? useAuth 9(eg: [phone connecting wifi])
export const useAuth = () => useContext(AuthContext);