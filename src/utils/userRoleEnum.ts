enum UserRole {
    DRIVER = 'driver',
    PASSENGER = 'passenger'
}

interface VehicleInfo {
    model: string;
    licensePlate: string;
    seatingCapacity: number;
}

interface AuthCredential {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    role: UserRole;
    vehicleInfo?: VehicleInfo;
}

export {UserRole};
export type { VehicleInfo, AuthCredential };

