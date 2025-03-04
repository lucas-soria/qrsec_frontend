import { frontUrls } from "../data/Urls";


interface Page {
    url: string;
    name: string;
    authorities: string[];
}

const ADMIN : string = 'ADMIN';
const OWNER : string = 'OWNER';
const GUARD : string = 'GUARD';

const INVITE : string = 'Invitaciones';
const GUEST : string = 'Invitados';
const SCAN : string = 'Escanear';
const USER : string = 'Usuarios';
const ADDRESS : string = 'Direcciones';

const ALLPages : Page[] = [
    {
        url: frontUrls.wholeBase + frontUrls.invite,
        name: INVITE,
        authorities: [ ADMIN, OWNER, GUARD ],
    },
    {
        url: frontUrls.wholeBase + frontUrls.guest,
        name: GUEST,
        authorities: [ ADMIN, OWNER ],
    },
    {
        url: frontUrls.wholeBase + frontUrls.scan,
        name: SCAN,
        authorities: [ GUARD ],
    },
    {
        url: frontUrls.wholeBase + frontUrls.user,
        name: USER,
        authorities: [ ADMIN ],
    },
    {
        url: frontUrls.wholeBase + frontUrls.address,
        name: ADDRESS,
        authorities: [ ADMIN ],
    },
];

export function Pages() : Page[] {

    let authoritiesString : string = localStorage.getItem('authorities') ?? '';
    let authorities : string[] = authoritiesString.split(',');
    let pages : Page[] = [];
    for (let i = 0; i < ALLPages.length; i++) {
        for (let j = 0; j < authorities.length; j++) {
            if (ALLPages[i].authorities.includes(authorities[j]) && !pages.includes(ALLPages[i])) {
                pages.push(ALLPages[i]);
            }
        }
    }

    return pages;
}