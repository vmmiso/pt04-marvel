import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./../hooks/useAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.username
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;