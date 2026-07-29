export class AppsScriptService {
    static instance;
    // Specific endpoint for Map/Geo services via Apps Script
    mapUrl = 'https://script.google.com/macros/s/AKfycbyca4Xz_AE6Om1okIMf0TQ9EE9uIifQcVZhsDwnZK0K4weG7VD0w3jEzM0aCcuBeoWIIA/exec';
    static getInstance() {
        if (!AppsScriptService.instance) {
            AppsScriptService.instance = new AppsScriptService();
        }
        return AppsScriptService.instance;
    }
    setMapUrl(url) {
        this.mapUrl = url;
    }
    async callAction(action, params = {}) {
        const payload = { action, params };
        try {
            // Use text/plain for GAS to avoid CORS preflight (OPTIONS) which GAS doesn't support
            const response = await fetch(this.mapUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        }
        catch (e) {
            console.error(`AppsScriptService error [${action}]:`, e);
            throw e;
        }
    }
    async getPlaceSuggestions(inputToken) {
        try {
            const res = await this.callAction('getPlaceSuggestions', { inputToken });
            return res.success ? res.suggestions : [];
        }
        catch (e) {
            return [];
        }
    }
    async processLocationAndMetrics(originLat, originLng, destinationQuery) {
        return this.callAction('processLocationAndMetrics', { originLat, originLng, destinationQuery });
    }
    async processPinDropMetrics(originLat, originLng, pinLat, pinLng) {
        return this.callAction('processPinDropMetrics', { originLat, originLng, pinLat, pinLng });
    }
}
