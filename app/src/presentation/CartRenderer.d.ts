import { CartManager } from '../core/CartManager';
export declare class CartRenderer {
    private cartManager;
    constructor(cartManager: CartManager);
    renderFab(): void;
    setLoading(loading: boolean): void;
    updateUI(): void;
    showModal(): void;
    hideModal(): void;
    private getItemImage;
}
