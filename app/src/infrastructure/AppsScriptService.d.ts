export declare class AppsScriptService {
    private static instance;
    private mapUrl;
    static getInstance(): AppsScriptService;
    setMapUrl(url: string): void;
    private callAction;
    getPlaceSuggestions(inputToken: string): Promise<string[]>;
    processLocationAndMetrics(originLat: number, originLng: number, destinationQuery: string): Promise<any>;
    processPinDropMetrics(originLat: number, originLng: number, pinLat: number, pinLng: number): Promise<any>;
}
