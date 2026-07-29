import { Order } from '../types/schema';
export declare class GooglePayService {
    private merchantId;
    private merchantName;
    initPayment(order: Order, verifiedLocation?: any): Promise<void>;
}
