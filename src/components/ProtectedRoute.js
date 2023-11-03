import React from 'react';
import { Navigate } from 'react-router-dom';

// Функция защиты роута главной страницы от неавторизованных пользователей
const ProtectedRoute = ({component: Component, ...props}) => {
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
    )
}

export default ProtectedRoute;