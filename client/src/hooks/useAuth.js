import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const username = localStorage.getItem('username');
    const apiKey = localStorage.getItem('accessToken');
    let user = {};

    if (username && apiKey) user = { username, apiKey };
    const [ auth, setAuth ] = useState(user);

    const handleLogin = (user) =>{
        setAuth(user);
        localStorage.setItem('username', user.username);
        localStorage.setItem('accessToken', user.apiKey);
    }

    const handleLogout = () => {
        setAuth({});
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
    }

    return (
        <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);