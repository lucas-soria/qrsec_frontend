import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout as PermanentDrawer } from './components/Layout/LogedInPermanentDrawer';
import { Layout as TemporalDrawer } from './components/Layout/LogedInTemporalDrawer';
import { Layout as AppBar } from './components/Layout/NotLogedInAppBar';
import { frontUrls } from './data/Urls';
import { CreateNewAddress } from './pages/CreateAddress';
import { ListAddresses } from './pages/ListAddresses';
import { ListGuests } from './pages/ListGuests';
import { ListInvites } from './pages/ListInvites';
import { ListUsers } from './pages/ListUsers';
import { ScanInvite } from './pages/ScanInvite';
import { SendInvite } from './pages/SendInvite';
import { SignUp } from './pages/SignUp';
import { ViewGuest } from './pages/ViewGuest';
import { ViewInvite } from './pages/ViewInvite';
import { ViewPublicInvite } from './pages/ViewPublicInvite';
import { ViewUser } from './pages/ViewUser';
import { registerServiceWorker } from './serviceWorker';
import { PageNotFound } from './pages/NotFound';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { ValidObjectIdParam } from './components/IDValidationWrapper';


export function App() {

  	const isMobile = useMediaQuery("(max-width:800px)");

	useEffect(() => {
		registerServiceWorker();
	}, [ ] );

  	return (
		<BrowserRouter>
			<Routes>

				<Route element={ <AppBar /> } >

					{ /* Session */ }
					<Route path={ frontUrls.signup } element={ <SignUp/> } />
					<Route path={ frontUrls.signin } element={ <SignUp/> } />
					<Route path={ frontUrls.base } element={ <Navigate replace to={ frontUrls.invite } /> } />

					{ /* Invites */ }
					<Route path={ frontUrls.publicInvite + ':id' } element={ <ValidObjectIdParam element={ <ViewPublicInvite/> } /> } />

					{ /* Page Not Found  */ }
					<Route path="*" element={<PageNotFound />} />

				</Route>

				<Route element={<ProtectedRoutes />} >

					<Route element={ 
						<>
							{isMobile ? (
								<TemporalDrawer />
							):
								<PermanentDrawer />
							}
						</>
					} >

						{ /* Invites */ }
						<Route path={ frontUrls.invite } element={ <ListInvites/> } />
						<Route path={ frontUrls.invite + frontUrls.create } element={ <SendInvite/> } />
						<Route path={ frontUrls.invite + ':id' } element={ <ValidObjectIdParam element={ <ViewInvite/> } /> } />
						<Route path={ frontUrls.scan } element={ <ScanInvite/> } />

						{ /* Addresses */ }
						<Route path={ frontUrls.address } element={ <ListAddresses/> } />
						<Route path={ frontUrls.address + frontUrls.create } element={ <CreateNewAddress/> } />

						{ /* Users */ }
						<Route path={ frontUrls.user } element={ <ListUsers/> } />
						<Route path={ frontUrls.user + ':id' } element={ <ValidObjectIdParam element={ <ViewUser/> } /> } />

						{ /* Guests */ }
						<Route path={ frontUrls.guest } element={ <ListGuests/> } />
						<Route path={ frontUrls.guest + ':id' } element={ <ValidObjectIdParam element={ <ViewGuest/> } /> } />

					</Route>

				</Route>

			</Routes>
		</BrowserRouter>
	);
};
