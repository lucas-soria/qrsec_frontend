interface GoogleJWT {
    iss: string,
    sub: string,
    azp: string,
    aud: string,
    iat: string,
    exp: string,

    email: string,
    emailVerified: boolean,
    name: string,
    given_name: string,
    family_name: string,
    picture: string,
    locale: string,
}
