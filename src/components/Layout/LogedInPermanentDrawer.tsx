
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { CustomDrawer } from './Drawer';
import { useState } from 'react';

export function Layout() {

    const [open, setOpen] = useState(false);

    return (
        <div id='layout' >

            {/* Drawer */}
            <div>
                <CustomDrawer permanent={ true } open={ open } setOpen={ setOpen } />
            </div>

            {/* Main Content */}
            <div id='content-with-drawer'>
                <Container maxWidth='sm' fixed>
                    <Outlet />
                </Container>
            </div>

        </div>
    );
};
