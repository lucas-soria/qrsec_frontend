import { Container, IconButton, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { CustomAppBar } from './AppBar';
import { CustomDrawer } from './Drawer';

export function Layout() {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        
        setOpen(!open);

    }

    return (
        <div id='layout' >

            
            {/* App Bar */}
            <div>
                <CustomAppBar>
                    <Toolbar className='custom-toolbar'>
                        <IconButton
                            size='large'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2, ml: 2 }}
                            onClick={ handleClick }
                        >
                            <MenuIcon fontSize='large' />
                        </IconButton>
                    </Toolbar>
                </CustomAppBar>
            </div>

            {/* Drawer */}
            <div>
                <CustomDrawer permanent={ false } open={ open } setOpen={ setOpen } />
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
