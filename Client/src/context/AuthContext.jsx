import { useState, useContext, createContext } from "react";
import { login as loginApi } from "../api/authApi";

const AuthContext = createContext(null);

// export ? AuthProvider (eg wifi )
export const AuthProvider = ({ children }) => {
    // read rhe saved token when app starts(survice refresh )
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (userName, password) => {
        const data = await loginApi(userName, password);
        localStorage.setItem("token", data.token);
        setToken(data.token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const isLoggedIn = !!token;
    return (
        <AuthContext.Provider value={{token, isLoggedIn, login, logout} }>
            {children}
        </AuthContext.Provider>


    );

};
//export ? useAuth 9(eg: [phone connecting wifi])
export const useAuth = () => useContext(AuthContext);