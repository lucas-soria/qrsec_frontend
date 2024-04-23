import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import ReactLogo from '../Screenshot_2021-10-07_184334.svg';
import { frontUrls } from '../data/Urls.tsx';

const pages = [ ['Inicio', ''], ['Crear', frontUrls.create] ];

const settings = [ 'Cerrar sesión' ]; // TODO: hacer que cierre sesion

export function ResponsiveAppBar() {
  
    var token : string = localStorage.getItem('access_token') ?? '';

    var decoded_token : GoogleJWT | null = !!token ? jwt_decode(token) : null;

    var user : [string, string] = !!decoded_token ? [ decoded_token.given_name, decoded_token.family_name ] : [ '', '' ];

    const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement|null>();

    const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement|null>();

    const handleOpenNavMenu = (event : React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleCloseUserMenu = () => {
        localStorage.removeItem('access_token');
        // TODO: revoke token
        setAnchorElUser(null);
    }

    const stringAvatar = (name : [string, string]) => {
        
        return { children: `${name[0][0]}${name[1][0]}` };

    }

    return (
        <AppBar position='static' enableColorOnDark className='app-bar'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>

                    <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={ handleOpenNavMenu }
                            color='inherit'
                        >

                            <MenuIcon/>

                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={ anchorElNav }
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={ Boolean(anchorElNav) }
                            onClose={ handleCloseNavMenu }
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {pages.map( (page) => (
                                <MenuItem key={ page[0] } onClick={ handleCloseNavMenu }>
                                    <Link href={ frontUrls.base + page[1] } textAlign='center' >{ page[0] }</Link>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>
                    <a href={ frontUrls.base } ><img id='logo' src={ ReactLogo } alt='React Logo' /></a>
                    <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
                        {pages.map((page) => (
			    	        <Button
                                href={ frontUrls.base + page[1] }
                                key={ page[0] }
                                onClick={ handleCloseNavMenu }
                                sx={ { my: 2, color: 'white', display: 'block' } }
				            >

                                { page[0] }

                            </Button>
                        ))}
                    </Box>
                    {!!token && (
                        <Box sx={ { flexGrow: 0 } }>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={ handleOpenUserMenu } sx={ { p: 0 } }>
                                    <Avatar className='avatar' src={decoded_token?.picture} { ...stringAvatar(user) } />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={ { mt: '45px' } }
                                id='menu-appbar'
                                anchorEl={ anchorElUser }
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={ Boolean(anchorElUser) }
                                onClose={ handleCloseUserMenu }
                            >

                                { settings.map((setting) => (
                                    <MenuItem key={ setting } onClick={ handleCloseUserMenu }>
                                        <a href={ '/signin' }><Typography variant='body1' textAlign='center'>{ setting }</Typography></a>
                                    </MenuItem>
                                ))}

                            </Menu>
                        </Box>
                    )}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
