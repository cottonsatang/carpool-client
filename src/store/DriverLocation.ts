import { create } from 'zustand';

interface DriverLocation {
    latitude: number;
    longitude: number;
}

interface DriverLocationStore {
    location: DriverLocation | null;
    setLocation: (location: DriverLocation) => void;
}

const useDriverLocationStore = create<DriverLocationStore>((set) => ({
    location: null,
    setLocation: (location) => set({ location }),
}));

export default useDriverLocationStore;
