import React from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { frontUrls } from '../data/Urls.tsx';


export function ProtectedRoutes() {

    const location = useLocation();

    const isAuth = !!localStorage.getItem('access_token');

    return (
        isAuth ? <Outlet /> : <Navigate replace to={ frontUrls.signin } state={ { from: location } } />
    );

}
