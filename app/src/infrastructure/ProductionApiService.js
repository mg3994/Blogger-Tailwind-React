export class ProductionApiService {
    static instance;
    baseUrl = 'https://api.antinna.in';
    static getInstance() {
        if (!ProductionApiService.instance) {
            ProductionApiService.instance = new ProductionApiService();
        }
        return ProductionApiService.instance;
    }
    async request(method, path, body = null) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Antinna-Client-Id': localStorage.getItem('antinna_client_id') || '',
            'Authorization': `Bearer ${window.firebaseAuthToken || window.firebaseAuth?.currentUser?.accessToken || ''}`
        };
        const options = { method, headers };
        if (body)
            options.body = JSON.stringify(body);
        try {
            const response = await fetch(`${this.baseUrl}${path}`, options);
            if (!response.ok)
                throw new Error(`API error! status: ${response.status}`);
            return await response.json();
        }
        catch (e) {
            console.error(`ProductionApiService error [${path}]:`, e);
            throw e;
        }
    }
    async createOrder(order) {
        return this.request('POST', '/orders', order);
    }
    async recordPayment(paymentData) {
        return this.request('POST', '/payments', paymentData);
    }
    async isOrderPaid(orderId) {
        return this.request('GET', `/orders/${orderId}/status`);
    }
    async listNotifications(page = 1, pageSize = 20) {
        return this.request('GET', `/notifications?page=${page}&pageSize=${pageSize}`);
    }
}
