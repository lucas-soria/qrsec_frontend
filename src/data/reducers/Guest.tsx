interface Guest {
    id: string | null;
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    owners: User[] | null;
}

