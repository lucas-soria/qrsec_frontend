interface Invite {
    id: string;
    owner: User;
    guests: Guest[];
    days: string[];
    hours: string[][];
    maxTimeAllowed: number | null;
    numberOfPassengers: number | null;
    dropsTrueGuest: boolean;
    enabled: boolean;
}

