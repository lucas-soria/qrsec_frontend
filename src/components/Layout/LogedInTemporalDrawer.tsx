import { AppBar, Box, Container, Drawer, IconButton, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { frontUrls } from '../../data/Urls';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export function Layout() {

    let qrsecLogo = '/QRSec logo.svg';

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        
        setOpen(!open);

    }

    return (
        <div id='layout' >

            
            {/* App Bar */}
            <div>
                <AppBar id='navbar' enableColorOnDark >
                    <Toolbar>
                        <IconButton
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                            onClick={ handleClick }
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box display='flex' alignItems='center' gap={2}>
                            <a href={ frontUrls.wholeBase } ><img id='navbar-logo' src={ qrsecLogo } alt='QRSec Logo' /></a>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>

            <div>
            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
                variant={'temporary'}
            >
                <div style={{ width: 250, padding: 20 }}>
                    <p>Menu Content</p>
                </div>
            </Drawer>
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
