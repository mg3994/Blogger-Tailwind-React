export declare class ProductionApiService {
    private static instance;
    private baseUrl;
    static getInstance(): ProductionApiService;
    private request;
    createOrder(order: any): Promise<any>;
    recordPayment(paymentData: any): Promise<any>;
    isOrderPaid(orderId: string): Promise<any>;
    listNotifications(page?: number, pageSize?: number): Promise<any>;
}
