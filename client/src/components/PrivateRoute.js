import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuth, isAdmin }) => {
    return isAuth && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
