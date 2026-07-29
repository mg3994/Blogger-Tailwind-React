export declare class SchemaExtractor {
    static getFirst<T>(val: T | T[] | undefined): T | undefined;
    static getArray<T>(val: T | T[] | undefined): T[];
    static decodeEntities(text: string): string;
    static extractJsonLd<T>(input: string): T | null;
    static findMatchingVariant(parent: any, selectedAttributes: Record<string, string>, lastClickedAttr?: string | null): any;
    static normalizeName(name: string): string;
    static findMatchingServicePackage(parent: any, packageName: string): any;
    static findAllServices(obj: any): any[];
    static extractPrice(offer: any): {
        price: string;
        currency: string;
    };
    static extractPriceForQuantity(offer: any, quantity: number): {
        price: string;
        currency: string;
    };
    static extractAvailability(offer: any): string;
    static extractEligibleQuantity(data: any): {
        minValue: number | null;
        maxValue: number | null;
    };
    static extractInventoryLevel(data: any): number | null;
    static extractDimensions(data: any): {
        weight: number | null;
        height: number | null;
        width: number | null;
        depth: number | null;
    };
    static extractAdvanceBookingRequirement(offer: any): string | null;
    static getCurrencySymbol(currency: string): string;
    static extractCondition(data: any): string | null;
    static extractAreaServed(data: any): any[];
    static isBusinessOpen(data: any): {
        isOpen: boolean;
        message: string | null;
    };
    static extract3DModel(data: any): string | null;
    static extractLeadTime(data: any): number;
    static isLocationInArea(targetLat: number | null, targetLon: number | null, targetAddress: any, area: any): boolean;
    private static calculateDistance;
}
