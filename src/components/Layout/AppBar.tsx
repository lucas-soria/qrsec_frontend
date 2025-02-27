import { AppBar, Box, Toolbar } from "@mui/material";
import { frontUrls } from "../../data/Urls";
import { ReactNode } from "react";

interface CustomAppBarProps {
    children?: ReactNode;
}

export function CustomAppBar({ children }: CustomAppBarProps) {

    let qrsecLogo = '/QRSec logo.svg';

    return (
        <div>
  
            {/* App Bar */}
            <div>
                <AppBar id='navbar' enableColorOnDark >
                    <Toolbar className='custom-toolbar'>
                        { children }
                        <Box id='logo-box'>
                            <a href={ frontUrls.wholeBase } ><img id='navbar-logo' src={ qrsecLogo } alt='QRSec Logo' /></a>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>

        </div>
    );
};