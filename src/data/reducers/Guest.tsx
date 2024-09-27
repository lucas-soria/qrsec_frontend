interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    owners: User[] | null;
}

