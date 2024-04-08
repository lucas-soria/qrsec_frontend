import { Container } from '@mui/material';

import { Fragment } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ResponsiveAppBar } from './components/ResponsiveAppBar.tsx';
import { frontUrls } from './data/Urls.tsx';
import { ScanInvite } from './pages/ScanInvite.tsx';
import { SendInvite } from './pages/SendInvite.tsx';
import { ShowInvite } from './pages/ShowInvite.tsx';
import { SignIn } from './pages/SignIn.tsx';
import { SignUp } from './pages/SignUp.tsx';

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
