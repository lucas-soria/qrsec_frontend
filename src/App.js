import { Container } from '@mui/material';

import React, { Fragment } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ResponsiveAppBar } from './components/ResponsiveAppBar';
import { frontUrls } from './data/Urls';
import { ScanInvite } from './pages/ScanInvite';
import { SendInvite } from './pages/SendInvite';
import { ShowInvite } from './pages/ShowInvite';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export function App() {

    var token = localStorage.getItem('access_token');
    console.log(token);
    
    // var user_authorities = !!token ? jwtDecode(token).authorities : []

    return (
        <Fragment>

            <ResponsiveAppBar/>
            <Container maxWidth='sm'>
                <BrowserRouter>
                    <Routes>
                        <Route path={ frontUrls.signup } element={ <SignUp/> }/>
                        <Route path={ frontUrls.signin } element={ <SignIn/> }/>
                        <Route path={ frontUrls.base } element={ <Navigate replace to={ frontUrls.signup }/> }/>
                        <Route path={ frontUrls.view + ':id' } element={ <ShowInvite/> }/>

                        {
                        /*  Original es con rutas protegidas
                        <Route element={ <ProtectedRoutes/> }>
                            <Route path={ frontUrls.create } element={ <SendInvite/> }/>
                            <Route path={ frontUrls.scan } element={ <ScanInvite/> }/>
                        </Route>
                        */
                        }

                        <Route path={ frontUrls.create } element={ <SendInvite/> }/>
                        <Route path={ frontUrls.scan } element={ <ScanInvite/> }/>
                    </Routes>
                </BrowserRouter>
            </Container>

        </Fragment>
    );
}
