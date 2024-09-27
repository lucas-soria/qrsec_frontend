interface Address {
    id: string;
    street: string;
    number: number;
    house: House;
    location: HouseLocation;
}

interface House {
    block: string;
    house: number;
}

interface HouseLocation {
    type: string;
    coordinates: [number, number];
}

