export const frontUrls = {
    base: '/',
    wholeBase: process.env.REACT_APP_WHOLE_FRONTEND_BASE,
    signup: 'signup/',
    signin: 'signin/',
    create: 'create/',
    address: 'address/',
    publicInvite: 'invite/view/',
    invite: 'invite/',
    scan: 'scan/',
    user: 'user/',
    guest: 'guest/',
}

export const backUrls = {
    base : process.env.REACT_APP_WHOLE_BACKEND_BASE,
    invite : '/invites',
    publicInvite : '/public/invites',
    guest : '/guests',
    user : '/users',
    address : '/addresses',
}
