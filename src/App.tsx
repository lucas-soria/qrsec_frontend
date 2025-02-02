import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { frontUrls } from './data/Urls';
import { SendInvite } from './pages/SendInvite';
import { Layout } from './components/Layout';
import { CreateNewAddress } from './pages/CreateAddress';
import { ListAddresses } from './pages/ListAddresses';
import { ListGuests } from './pages/ListGuests';
import { ListInvites } from './pages/ListInvites';
import { ListUsers } from './pages/ListUsers';
import { ScanInvite } from './pages/ScanInvite';
import { SignUp } from './pages/SignUp';
import { ViewGuest } from './pages/ViewGuest';
import { ViewInvite } from './pages/ViewInvite';
import { ViewPublicInvite } from './pages/ViewPublicInvite';
import { ViewUser } from './pages/ViewUser';

export function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route>

            { /* Session */ }
            <Route path={ frontUrls.signup } element={ <SignUp/> } />
            <Route path={ frontUrls.signin } element={ <SignUp/> }/>
            <Route path={ frontUrls.base } element={ <Navigate replace to={ frontUrls.signup }/> }/>

            { /* Invites */ }
            <Route path={ frontUrls.publicInvite + ':id' } element={ <ViewPublicInvite/> }/>

        </Route>

        <Route element={ <Layout /> }>

            { /* Invites */ }
            <Route path={ frontUrls.create } element={ <SendInvite/> }/>
            <Route path={ frontUrls.invite + ':id' } element={ <ViewInvite/> }/>
            <Route path={ frontUrls.invite } element={ <ListInvites/> }/>
            <Route path={ frontUrls.scan } element={ <ScanInvite/> }/>

            { /* Addresses */ }
            <Route path={ frontUrls.address + 'create' } element={ <CreateNewAddress/> }/>
            <Route path={ frontUrls.address } element={ <ListAddresses/> }/>

            { /* Users */ }
            <Route path={ frontUrls.user } element={ <ListUsers/> }/>
            <Route path={ frontUrls.user + ':id' } element={ <ViewUser/> }/>

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

        </Route>

      </Routes>
    </BrowserRouter>
  );
};
