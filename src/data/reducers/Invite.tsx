interface Invite {
    id: string;
    owner: User;
    guests: Guest[];
    days: string[];
    hours: string[][];
    maxTimeAllowed: number;
    numberOfPassengers: number;
    dropsTrueGuest: boolean;
    enabled: boolean;
}

