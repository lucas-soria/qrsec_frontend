import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { frontUrls } from '../data/Urls.tsx';
import { Pages } from './UserPagesByAuthorities.tsx';


export function ProtectedRoutes() {

    const location = useLocation();

    const hasAccessToken : boolean = !!localStorage.getItem('access_token');

    const isAuthenticated = () : boolean => {
        let pages = Pages();
        let pageIsAllowed : boolean = false;
        for (let i = 0; i < pages.length; i++) {
            let currentPath : string = frontUrls.wholeBase + location.pathname.substring(1, location.pathname.length);
            if (currentPath.includes(pages[i].url)) {
                pageIsAllowed = true;
                break
            }
        }
        return hasAccessToken && pageIsAllowed;
    };

    return (
        <>
            {hasAccessToken ? (
                <>
                    {isAuthenticated() ? (
                        <Outlet />
                    ) :
                        <Navigate replace={ false } to={ '/404' } state={ { from: location } } />
                    }
                </>
            ) :
                <Navigate replace to={ frontUrls.signin } state={ { from: location } } />
            }
        </>
    );

}
