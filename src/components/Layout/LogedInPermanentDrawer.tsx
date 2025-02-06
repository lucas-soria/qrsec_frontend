import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Container, Drawer, Link, List, ListItem, MenuItem } from '@mui/material';
import jwt_decode from 'jwt-decode';
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
        let currentPath : string = frontUrls.wholeBase + location.pathname.substring(1, location.pathname.length);
        if (currentPath.includes(link)) {
            return 'selected';
        }
        return 'not-selected';
    }

    const stringAvatar = (name : [string, string]) => {
        
        return { children: `${name[0][0]}${name[1][0]}` };

    }

    const handleLogOut = () => {
        
        localStorage.removeItem('access_token');
        navigate(frontUrls.base);

    }

    return (
        <div id='layout' >

            
            {/* Drawer */}
            <div id='drawer'>
                <Drawer
                    variant = 'permanent'
                    anchor = 'left'
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
