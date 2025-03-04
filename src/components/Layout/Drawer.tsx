import { Avatar, Box, Drawer, Link, List, ListItem, MenuItem } from "@mui/material";
import { frontUrls } from "../../data/Urls";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Pages } from "../UserPagesByAuthorities";

export function CustomDrawer( { permanent, open, setOpen } : { permanent : boolean, open : boolean, setOpen : React.Dispatch<React.SetStateAction<boolean>> } ) {

    let qrsecLogo = '/QRSec logo.svg';

    const navigate = useNavigate();

    var firstName : string = localStorage.getItem('first_name') ?? '';
    
    var lastName : string = localStorage.getItem('last_name') ?? '';

    var picture : string = localStorage.getItem('picture') ?? '';
    
    var user : [string, string] = [ firstName, lastName ];

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
        localStorage.removeItem('authorities');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('picture');
        navigate(frontUrls.base);

    }

    return (
        <div>
  
            {/* Drawer */}
            <div id={ permanent ? 'permanent-drawer' : 'temporary-drawer' }>
                <Drawer
                    variant = { permanent ? 'permanent' : 'temporary' }
                    anchor = 'left'
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps = {
                        {
                            style: {
                                position: 'inherit',
                                backgroundColor: 'var(--qrsec-dark-blue)',
                                border: 0,
                                width: permanent ? '100%' : '50%',
                            }
                        }
                    }
                >
                    <Box
                        sx={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }
                        }
                    >
                        <a href={ frontUrls.wholeBase } ><img id='logo' src={ qrsecLogo } alt='QRSec Logo' /></a>
                    </Box>
                    <List>
                        {Pages().map( (page) => (
                            <ListItem key={ page.name } id='drawer-item' className={isSelected(page.url)} >
                                <Link id='drawer-link' href={ page.url } >
                                    { page.name }
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <div className='bottom-drawer'>
                    
                        <Avatar className='avatar' src={picture} { ...stringAvatar(user) } />
                    
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

        </div>
    );
};