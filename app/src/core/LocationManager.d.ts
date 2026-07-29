import { LocationData } from '../types/app';
export declare class LocationManager {
    private data;
    private storageKey;
    constructor();
    private loadFromStorage;
    save(): void;
    getData(): LocationData;
    setData(partial: Partial<LocationData>): void;
    clear(): void;
    reverseGeocode(lat: number, lon: number): Promise<Partial<LocationData>>;
    lookupPin(pin: string): Promise<Partial<LocationData>>;
}
