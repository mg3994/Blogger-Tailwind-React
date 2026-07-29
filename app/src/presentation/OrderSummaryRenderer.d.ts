import { CartManager } from '../core/CartManager';
export declare class OrderSummaryRenderer {
    private cartManager;
    constructor(cartManager: CartManager);
    render(verifiedLocation: any, orderDelivery?: any): void;
    private renderGooglePayButton;
}
