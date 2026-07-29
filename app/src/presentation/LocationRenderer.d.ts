import { LocationManager } from '../core/LocationManager';
export declare class LocationRenderer {
    private locationManager;
    constructor(locationManager: LocationManager);
    init(): void;
    showModal(): void;
    hideModal(): void;
    updateUI(): void;
    handleRequestLocation(): Promise<void>;
    handleSetPin(): Promise<void>;
    handleClearLocation(): void;
}
