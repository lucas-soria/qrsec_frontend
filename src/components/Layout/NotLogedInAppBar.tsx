import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { CustomAppBar } from './AppBar';

export function Layout() {

    return (
        <div id='layout' >

            
            {/* App Bar */}
            <div>
                <CustomAppBar />
            </div>

            {/* Main Content */}
            <div id='content-with-navbar'>
                <Container maxWidth='sm' >
                    <Outlet />
                </Container>
            </div>

        </div>
    );
};
