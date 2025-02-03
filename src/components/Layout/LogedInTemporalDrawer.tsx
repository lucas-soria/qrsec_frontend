import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Button, Container, Drawer, Link, List, ListItem, MenuItem, useMediaQuery } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { frontUrls } from '../../data/Urls';

export function Layout() {

    let qrsecLogo = '/QRSec logo.svg';

    const navigate = useNavigate();

    var token : string = localStorage.getItem('access_token') ?? '';
    
        var decoded_token : GoogleJWT | null = !!token ? jwt_decode(token) : null;
    
        var user : [string, string] = !!decoded_token ? [ decoded_token.given_name, decoded_token.family_name ] : [ '', '' ];

    const pages : string[][] = [
        [ frontUrls.wholeBase + frontUrls.invite, 'Invitaciones'],
        [ frontUrls.wholeBase + frontUrls.guest, 'Invitados'],
        [ frontUrls.wholeBase + frontUrls.scan, 'Escanear'],
        [ frontUrls.wholeBase + frontUrls.user, 'Usuarios'],
        [ frontUrls.wholeBase + frontUrls.address, 'Direcciones'],
    ]

    let location = useLocation();

    const isSelected = (link : string) : string => {
        if (frontUrls.wholeBase + location.pathname.substring(1, location.pathname.length) === link) {
            return 'selected'
        }
        return 'not-selected'
    }

    const stringAvatar = (name : [string, string]) => {
        
        return { children: `${name[0][0]}${name[1][0]}` };

    }

    const handleLogOut = () => {
        
        localStorage.removeItem('access_token');
        navigate(frontUrls.base);

    }
    
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:800px)");

    return (
        <div id='layout' >

            
            {/* Drawer */}
            <div id={isMobile ? 'temporary-drawer' : 'drawer'}>
            {isMobile &&
                <Button onClick={() => setOpen(true)}>Open Menu</Button>
            }
                <Drawer
                    variant = {isMobile ? 'temporary' : 'permanent'}
                    anchor = 'left'
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps = {
                        {
                            style: {
                                position: 'inherit',
                                backgroundColor: 'inherit',
                                border: 0,
                                width: 'inherit',
                            }
                        }
                    }>
                <Box
                    sx={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            py: 3,
                        }
                    }
                >
                    <a href={ frontUrls.wholeBase } ><img className='logo' id='logo' src={ qrsecLogo } alt='QRSec Logo' /></a>
                </Box>
                <List>
                    {pages.map( (page) => (
                        <ListItem key={ page[1] } id='drawer-item' className={isSelected(page[0])}>
                            <Link id='drawer-link' href={ page[0] } textAlign='center' >{ page[1] }</Link>
                        </ListItem>
                    ))}
                </List>
                <div className='bottom-drawer'>
                
                    <Avatar className='avatar' src={decoded_token?.picture} { ...stringAvatar(user) } />
                
                    <MenuItem key={ 'log-out' } onClick={ handleLogOut } style={
                        {
                            display:'flex',
                            justifyContent:'flex-end',
                            justifyItems:'flex-end',
                            marginLeft:'auto',
                        }
                        }>
                        <Box>
                            <LogoutIcon className='button-icon' />
                        </Box>
                    </MenuItem>
                </div>
                </Drawer>
            </div>

            {/* Main Content */}
            <div id="content-with-drawer">
                <Container maxWidth='sm' fixed>
                    <Outlet />
                </Container>
            </div>

        </div>
    );
};
