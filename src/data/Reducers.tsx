import { backUrls } from './Urls.tsx';
import jwt_decode from 'jwt-decode';

const token : string = localStorage.getItem('access_token') ?? '';

const user : GoogleJWT | null = !!token ? jwt_decode(token) : null;

let defaultHeaders : HeadersInit = {
    'Accept': 'application/json',
    'X-Email': user?.email ?? '',
};

// # ---------- USERS ---------- #

export const createUser = async( user : User ) => {

    const response = await fetch( backUrls.base + backUrls.user, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            ...defaultHeaders,
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

// # ---------- INVITES ---------- #

export const createInvite = async( invite : Invite ) => {

    const response = await fetch( backUrls.base + backUrls.invite, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(invite),
        headers: {
            ...defaultHeaders,
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}

export const getInvite = async ( id : string ) => {

    const response = await fetch( backUrls.base + backUrls.invite + '/' + id, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders,
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const getPublicInvite = async ( id : string | undefined ) => {
    
    const response = await fetch( backUrls.base + backUrls.publicInvite + '/' + id, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders,
    } ).then( (response) => {
        if (response.ok) {

            return response.json();

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

// # ---------- GUESTS ---------- #

export const getGuests = async() => {

    const response = await fetch( backUrls.base + '/admin' + backUrls.guest, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders,
    } ).then( (response) => {
        if (response.status === 200) {

            return response.json();

        } else {

            return [];

        }
    });

    return response;

}

export const getMyGuests = async() => {

    const response = await fetch( backUrls.base + backUrls.guest, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders,
    } ).then( (response) => {
        if (response.status === 200) {

            return response.json();

        } else {

            return [];

        }
    });

    return response;

}

export const createGuest = async( guest : Guest) => {

    const response = await fetch( backUrls.base + backUrls.guest, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(guest),
        headers: {
            ...defaultHeaders,
            'Content-Type': 'application/json'
        }
    } ).then( (response) => response.json() );

    return response;

}
