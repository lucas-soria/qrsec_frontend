interface User {
    id: string;
    email: string;
    authorities: Authority[];
    firstName: string;
    lastName: string;
    dni: string;
    address: Address;
    phone: string;
    enabled: boolean;
}

interface Authority {
    authority: string;
}

