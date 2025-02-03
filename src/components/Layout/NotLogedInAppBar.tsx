import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Outlet/*, useLocation*/ } from 'react-router-dom';
import { frontUrls } from '../../data/Urls';

export function Layout() {

    let qrsecLogo = '/QRSec logo.svg';

    /*const pages : string[][] = [
        [ frontUrls.wholeBase + frontUrls.invite, 'Invitaciones'],
        [ frontUrls.wholeBase + frontUrls.guest, 'Invitados'],
        [ frontUrls.wholeBase + frontUrls.scan, 'Escanear'],
        [ frontUrls.wholeBase + frontUrls.user, 'Usuarios'],
        [ frontUrls.wholeBase + frontUrls.address, 'Direcciones'],
    ]

    let location = useLocation();*/

    return (
        <div id='layout' >

            
            {/* App Bar */}
            <div>
                <AppBar id='navbar' enableColorOnDark >
                    <Toolbar>
                        <Box display='flex' alignItems='center' gap={2}>
                            <a href={ frontUrls.wholeBase } ><img id='navbar-logo' src={ qrsecLogo } alt='QRSec Logo' /></a>
                            <Typography>QRSec</Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>

            {/* Main Content */}
            <div id="content-with-navbar">
                <Container maxWidth='sm' >
                    <Outlet />
                </Container>
            </div>

        </div>
    );
};
