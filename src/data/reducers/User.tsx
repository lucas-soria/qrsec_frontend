interface User {
    id: string;
    email: string;
    authorities: string[];
    firstName: string;
    lastName: string;
    dni: string;
    address: Address;
    phone: string;
    enabled: boolean;
}

