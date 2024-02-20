import { backUrls } from './Urls.tsx';


var defaultHeaders = {
    'Accept': 'application/json'
};

export const logIn = async( email, password ) => {

    const response = await fetch( backUrls.base + backUrls.login, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
            'username': email,
            'password': password
        }),
        headers: defaultHeaders
    } ).then( (response) => response.json() ).catch( (error) => console.log(error) );

    return response;

}

export const createInvite = async( invite ) => {

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

export const getInvite = async ( id ) => {

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

export const getPublicInvite = async ( id ) => {
    
    const response = await fetch( backUrls.base + backUrls.publicInvite + '/' + id, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders,
    } ).then( async (response) => {
        if (response.ok) {
            let data = await response.json();
            console.log(data);

            return data;

        } else {

            return null;

        }
    } ).catch( (error) => console.error(error) );

    return response;

}

export const getGuests = async() => {

    const response = await fetch( backUrls.base + '/admin' + backUrls.guest, {
        mode: 'cors',
        method: 'GET',
        headers: defaultHeaders,
    } ).then( (response) => {
        if (response.ok) {

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
        if (response.ok) {

            return response.json();

        } else {

            return [];

        }
    });

    return response;

}

export const createGuest = async( guest ) => {

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
