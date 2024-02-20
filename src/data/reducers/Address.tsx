interface Address {
    id: string;
    street: string;
    number: number;
    house: House;
    location: Location;
}

interface House {
    block: string;
    house: number;
}

interface Location {
    type: string;
    coordinates: number[];
}

