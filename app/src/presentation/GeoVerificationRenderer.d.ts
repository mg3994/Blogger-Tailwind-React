import { LocationManager } from '../core/LocationManager';
export declare class GeoVerificationRenderer {
    private map;
    private targetMarker;
    private debounceTimer;
    private appsScriptService;
    private currentDeviceLat;
    private currentDeviceLng;
    private isAddressModified;
    constructor(locationManager: LocationManager);
    renderPopup(): void;
    private setupListeners;
    private setFinalizeLoading;
    private validateAddressForm;
    private collectDeliveryData;
    private initMap;
    private handleManualPinPosition;
    private handleTypeAhead;
    private populateDropdown;
    private updateTelemetryUI;
}
