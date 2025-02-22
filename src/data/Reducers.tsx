import { backUrls } from './Urls.tsx';
import jwt_decode from 'jwt-decode';


const defaultHeaders = () : HeadersInit => {
    const token : string = localStorage.getItem('access_token') ?? '';

    const user : GoogleJWT | null = !!token ? jwt_decode(token) : null;

    return {
        'Accept': 'application/json',
        'X-Email': user?.email ?? '',
    };
}

// # ---------- ADDRESS ---------- #

export const createAddress = async( address : Address ) => {

    const response = await fetch( backUrls.base + backUrls.address, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(address),
        headers: {
            ...defaultHeaders(),
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

export const getAddresses = async() => {

    const response = await fetch( backUrls.base + backUrls.address, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const deleteAddress = async(id : string) => {

    const response = await fetch( backUrls.base + backUrls.address + '/' + id, {
        mode: 'cors',
        method: 'DELETE',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.status !== 204) {

            // console.log(response);

        }
    });

    return response;

}

// # ---------- USERS ---------- #

export const createUser = async( user : User ) => {

    const response = await fetch( backUrls.base + backUrls.user, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

export const getUsers = async () => {
    
    const response = await fetch( backUrls.base + backUrls.user, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const getUser = async ( id : string | undefined ) => {

    const response = await fetch( backUrls.base + backUrls.user + '/' + id, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const validateGoogleJWT = async ( email : string | undefined ) : Promise<User> => {

    const response = await fetch( backUrls.base + '/auth/google', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-Email': email ?? '',
        },
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const updateUser = async( user : User ) => {

    const response = await fetch( backUrls.base + backUrls.user + '/' + user.id, {
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            ...defaultHeaders(),
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

export const deleteUser = async(id : string) => {

    const response = await fetch( backUrls.base + backUrls.user + '/' + id, {
        mode: 'cors',
        method: 'DELETE',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.status !== 204) {

            // console.log(response);

        }
    });

    return response;

}

export const userExists = async ( email : string | undefined ) => {

    const response = await fetch( backUrls.base + backUrls.user + '/exists/' + email, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.ok) {

            if (response.status === 200) {
                return true;
            }

            return false;

        } else {

            return false;

        }
    } ).catch( (error) => {
        console.error(error);
        return false;
    } );

    return response;

}

// # ---------- INVITES ---------- #

export const createInvite = async( invite : Invite ) => {

    const response = await fetch( backUrls.base + backUrls.invite, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(invite),
        headers: {
            ...defaultHeaders(),
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

export const updateInvite = async( invite : Invite ) => {

    const response = await fetch( backUrls.base + backUrls.invite + '/' + invite.id, {
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(invite),
        headers: {
            ...defaultHeaders(),
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

export const getInvite = async ( id : string | undefined ) => {

    const response = await fetch( backUrls.base + backUrls.invite + '/' + id, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const deleteInvite = async(id : string) => {

    const response = await fetch( backUrls.base + backUrls.invite + '/' + id, {
        mode: 'cors',
        method: 'DELETE',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.status !== 204) {

            // console.log(response);

        }
    });

    return response;

}

export const validateAccessToPublicInvite = async ( id : string | undefined, guestDNI : string | undefined ) => {
    
    const response = await fetch( backUrls.base + backUrls.publicInvite + '/' + id, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'dni': guestDNI,
        }),
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const getInvites = async () => {
    
    const response = await fetch( backUrls.base + backUrls.invite, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const validateInvite = async ( id : string | undefined ) => {

    const toIsoString = ( date : Date ) : string => {
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num : number) {
                return (num < 10 ? '0' : '') + num;
            };
      
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            '.' + pad(date.getMilliseconds()) +
            dif + pad(Math.floor(Math.abs(tzo) / 60)) +
            ':' + pad(Math.abs(tzo) % 60);
      }

    const response = await fetch( backUrls.base + backUrls.invite + '/validate/' + id, {
        mode: 'cors',
        method: 'GET',
        headers: {
            ...defaultHeaders(),
            'X-Client-Timestamp': toIsoString(new Date()),
            'Content-Type': 'application/json'
        },
    } ).then( (response) => {
        if (response.ok) {

            if (response.status === 200) {
                return true;
            }

            return false;

        } else {

            return false;

        }
    } ).catch( (error) => {
        
        console.error(error);
        return false;

    } );

    return response;

}

// # ---------- GUESTS ---------- #

export const getGuest = async ( id : string | undefined ) => {

    const response = await fetch( backUrls.base + backUrls.guest + '/' + id, {
        mode: 'cors',
        method: 'GET',
        headers: {
            ...defaultHeaders(),
            'Content-Type': 'application/json'
        }
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const getGuests = async() => {

    const response = await fetch( backUrls.base + backUrls.guest, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const createGuest = async( guest : Guest) => {

    const response = await fetch( backUrls.base + backUrls.guest, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(guest),
        headers: {
            ...defaultHeaders(),
            'Content-Type': 'application/json'
        }
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const updateGuest = async( guest : Guest ) => {

    const response = await fetch( backUrls.base + backUrls.guest + '/' + guest.id, {
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(guest),
        headers: {
            ...defaultHeaders(),
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

export const deleteGuest = async(id : string) => {

    const response = await fetch( backUrls.base + backUrls.guest + '/' + id, {
        mode: 'cors',
        method: 'DELETE',
        headers: defaultHeaders(),
    } ).then( (response) => {
        if (response.status !== 204) {

            // console.log(response);

        }
    });

    return response;

}
