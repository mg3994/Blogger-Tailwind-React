import { Product, ProductGroup, Service, Organization } from '../types/schema';
import { AppState } from '../types/app';
export declare class ProductRenderer {
    render(p: Product | ProductGroup | Service | any, state: AppState, onVariantChange: (attr: string, val: string) => void): void;
    private renderBusinessView;
    private renderConditionBadge;
    private renderStockBadge;
    private renderAreaServed;
    private renderQuantityConstraints;
    updateQtyButtons(): void;
    private renderCarousel;
    private render3DButton;
    private renderVariants;
    private checkAvailability;
    private renderSpecs;
    renderSeller(s: Organization | any): void;
    private renderOtherServices;
    private renderAddOns;
}
