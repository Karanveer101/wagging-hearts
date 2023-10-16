import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
    isAuthenticated,
    setIsAuthenticated,
    userRole,
    setUserRole
}) => {
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
