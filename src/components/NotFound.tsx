import { ReactNode } from "react";

interface NotFoundProps {
    children?: ReactNode;
}

export function NotFound({ children }: NotFoundProps) {

    let qrsecSadLogo = '/QRSec sad logo.svg';

    return (
        <div>

            <br />
            <div className='signin-logo'>
                <br />
                { children }
                <br />
                <img id='blue-logo' src={ qrsecSadLogo } alt='QRSec Logo' />
            </div>

        </div>
    );
};
