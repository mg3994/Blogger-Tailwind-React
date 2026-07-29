import { Order, Product, Service, Organization } from '../types/schema';
export declare class CartManager {
    private order;
    private storageKey;
    constructor();
    private loadFromStorage;
    private saveToStorage;
    private deduplicate;
    private calculateTotal;
    isItemOrderable(item: any): boolean;
    isItemQuantityValid(item: any): boolean;
    isCartValid(): boolean;
    addItem(item: Product | Service, seller?: Organization, selectedVariants?: Record<string, string>, quantity?: number): string | null;
    addAddOn(parentItemKey: string, addon: Product | Service, quantity?: number): void;
    getAddOnLimits(parent: any, addon: any): {
        minValue: number | null;
        maxValue: number | null;
    };
    generateItemKey(item: Product | Service | any, variants?: Record<string, string>): string;
    removeItem(index: number): void;
    updateQty(index: number, delta: number): void;
    updateAddOnQty(parentIndex: number, addonIndex: number, delta: number): void;
    removeAddOn(parentIndex: number, addonIndex: number): void;
    updateItemDetails(index: number, freshBaseData: any | null): void;
    getOrder(): Order;
    getTotalQuantity(): number;
    getServiceabilityErrors(verifiedLocation: any): string[];
    getMaxLeadTime(): number;
    clear(): void;
}
