import { Container } from '@mui/material';

import { Fragment } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ResponsiveAppBar } from './components/ResponsiveAppBar.tsx';
import { frontUrls } from './data/Urls.tsx';
import { ScanInvite } from './pages/ScanInvite.tsx';
import { SendInvite } from './pages/SendInvite.tsx';
import { ViewPublicInvite } from './pages/ViewPublicInvite.tsx';
import { ViewInvite } from './pages/ViewInvite.tsx';
import { ViewGuest } from './pages/ViewGuest.tsx';
import { SignUp } from './pages/SignUp.tsx';
import { CreateNewAddress } from './pages/CreateAddress.tsx';
import { ListAddresses } from './pages/ListAddresses.tsx';
import { ListInvites } from './pages/ListInvites.tsx';
import { ListUsers } from './pages/ListUsers.tsx';
import { ListGuests } from './pages/ListGuests.tsx';


export function App() {

    // var token = localStorage.getItem('access_token');
    
    // var user_authorities = !!token ? jwtDecode(token).authorities : []

    return (
        <Fragment>

            <ResponsiveAppBar/>
            <Container maxWidth='sm'>
                <BrowserRouter>
                    <Routes>

                        { /* Session */ }
                        <Route path={ frontUrls.signup } element={ <SignUp/> }/>
                        <Route path={ frontUrls.signin } element={ <SignUp/> }/>
                        <Route path={ frontUrls.base } element={ <Navigate replace to={ frontUrls.signup }/> }/>

                        { /* Invites */ }
                        <Route path={ frontUrls.create } element={ <SendInvite/> }/>
                        <Route path={ frontUrls.publicInvite + ':id' } element={ <ViewPublicInvite/> }/>
                        <Route path={ frontUrls.invite + ':id' } element={ <ViewInvite/> }/>
                        <Route path={ frontUrls.invite } element={ <ListInvites/> }/>
                        <Route path={ frontUrls.scan } element={ <ScanInvite/> }/>

                        { /* Addresses */ }
                        <Route path={ frontUrls.address + 'create' } element={ <CreateNewAddress/> }/>
                        <Route path={ frontUrls.address } element={ <ListAddresses/> }/>

                        { /* Users */ }
                        <Route path={ frontUrls.user } element={ <ListUsers/> }/>

                        { /* Guests */ }
                        <Route path={ frontUrls.guest } element={ <ListGuests/> }/>
                        <Route path={ frontUrls.guest + ':id' } element={ <ViewGuest/> }/>

                        {
                        /*  Original es con rutas protegidas
                        <Route element={ <ProtectedRoutes/> }>
                            <Route path={ frontUrls.create } element={ <SendInvite/> }/>
                            <Route path={ frontUrls.scan } element={ <ScanInvite/> }/>
                        </Route>
                        */
                        }

                    </Routes>
                </BrowserRouter>
            </Container>

        </Fragment>
    );
}
