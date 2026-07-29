export class LocationManager {
    data = { lat: null, lon: null, pin: null, city: null };
    storageKey = "antinna_location";
    constructor() {
        this.loadFromStorage();
    }
    loadFromStorage() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                this.data = JSON.parse(saved);
            }
            catch (e) { }
        }
    }
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
    getData() {
        return this.data;
    }
    setData(partial) {
        this.data = { ...this.data, ...partial };
        this.save();
    }
    clear() {
        this.data = { lat: null, lon: null, pin: null, city: null };
        localStorage.removeItem(this.storageKey);
    }
    async reverseGeocode(lat, lon) {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
                headers: { 'User-Agent': 'Antinna-Blogger-Engine/1.0' }
            });
            const d = await res.json();
            if (d.address) {
                return {
                    pin: d.address.postcode || this.data.pin,
                    city: d.address.city || d.address.town || d.address.village || d.address.state_district
                };
            }
        }
        catch (e) {
            console.error("Geocoding failed", e);
        }
        return {};
    }
    async lookupPin(pin) {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pin}&country=India&format=json&addressdetails=1`, {
                headers: { 'User-Agent': 'Antinna-Blogger-Engine/1.0' }
            });
            const d = await res.json();
            if (d && d.length > 0) {
                const addr = d[0].address;
                return {
                    lat: parseFloat(d[0].lat),
                    lon: parseFloat(d[0].lon),
                    city: addr.city || addr.town || addr.village || addr.state_district || addr.county
                };
            }
        }
        catch (e) {
            console.error("PIN lookup failed", e);
        }
        return { city: null, lat: null, lon: null }; // Reset if not found
    }
}
