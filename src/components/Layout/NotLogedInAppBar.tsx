import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { frontUrls } from '../../data/Urls';

export function Layout() {

    let qrsecLogo = '/QRSec logo.svg';

    return (
        <div id='layout' >

            
            {/* App Bar */}
            <div>
                <AppBar id='navbar' enableColorOnDark >
                    <Toolbar>
                        <Box display='flex' alignItems='center' gap={2}>
                            <a href={ frontUrls.wholeBase } ><img id='navbar-logo' src={ qrsecLogo } alt='QRSec Logo' /></a>
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
