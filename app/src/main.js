import { SchemaExtractor } from './core/SchemaExtractor';
import { CartManager } from './core/CartManager';
import { LocationManager } from './core/LocationManager';
import { BloggerDataService } from './infrastructure/BloggerDataService';
import { GooglePayService } from './infrastructure/GooglePayService';
import { ProductRenderer } from './presentation/ProductRenderer';
import { CartRenderer } from './presentation/CartRenderer';
import { LocationRenderer } from './presentation/LocationRenderer';
import { UIManager } from './presentation/UIManager';
import { GeoVerificationRenderer } from './presentation/GeoVerificationRenderer';
import { OrderSummaryRenderer } from './presentation/OrderSummaryRenderer';
import { PhoneVerificationRenderer } from './presentation/PhoneVerificationRenderer';
import { SearchAutocompleteRenderer } from './presentation/SearchAutocompleteRenderer';
export class App {
    state = {
        product: null,
        selectedVariants: {},
        currentSlide: 0,
        quantity: 1,
        lastClickedAttribute: null,
        selectedPackage: null,
        verifiedLocation: null,
        orderDelivery: null
    };
    gridPageSize = 20;
    gridStartIndex = 1;
    currentLabels = [];
    currentSearchQuery = '';
    displaySearchQuery = '';
    searchKeywordsOnly = '';
    CartManager = new CartManager();
    LocationManager = new LocationManager();
    BloggerDataService = new BloggerDataService();
    GooglePayService = new GooglePayService();
    ProductRenderer = new ProductRenderer();
    CartRenderer = new CartRenderer(this.CartManager);
    LocationRenderer = new LocationRenderer(this.LocationManager);
    GeoVerificationRenderer = new GeoVerificationRenderer(this.LocationManager);
    OrderSummaryRenderer = new OrderSummaryRenderer(this.CartManager);
    PhoneVerificationRenderer = new PhoneVerificationRenderer();
    SearchAutocompleteRenderer;
    constructor() {
        this.detectContext();
        this.exposeGlobals();
        this.init();
    }
    detectContext() {
        const path = window.location.pathname;
        const searchParams = new URLSearchParams(window.location.search);
        if (path.includes('/search/label/')) {
            const label = path.split('/search/label/')[1].split('?')[0];
            if (label)
                this.currentLabels.push(decodeURIComponent(label));
        }
        const q = searchParams.get('q');
        if (q) {
            this.currentSearchQuery = q;
            // Patterns for Location cleaning
            const patterns = [
                /"postalCode":\s*"([^"]+)"/,
                /postalCode:\s*([^|\s]+)/,
                /"addressLocality":\s*"([^"]+)"/,
                /addressLocality:\s*([^|\s]+)/
            ];
            let cleanedQ = q;
            patterns.forEach(p => {
                cleanedQ = cleanedQ.replace(p, '').trim();
            });
            this.displaySearchQuery = cleanedQ;
            this.searchKeywordsOnly = cleanedQ.replace(/label:[^|\s]+/g, '').trim();
            const labelRegex = /label:([^|\s]+)/g;
            let match;
            while ((match = labelRegex.exec(q)) !== null) {
                if (match[1]) {
                    const labelName = decodeURIComponent(match[1].replace(/_/g, ' '));
                    if (!this.currentLabels.includes(labelName)) {
                        this.currentLabels.push(labelName);
                    }
                }
            }
        }
    }
    formatLocationQuery() {
        const loc = this.LocationManager.getData();
        if (loc.pin) {
            return `"postalCode": "${loc.pin}"`;
        }
        if (loc.city) {
            return `"addressLocality": "${loc.city}"`;
        }
        return "";
    }
    exposeGlobals() {
        window.AntinnaEngine = this;
        // Core Managers
        window.CartManager = this.CartManager;
        window.LocationManager = this.LocationManager;
        window.CartRenderer = this.CartRenderer;
        window.LocationRenderer = this.LocationRenderer;
        window.GooglePayService = this.GooglePayService;
        window.GeoVerificationRenderer = this.GeoVerificationRenderer;
        window.UIManager = UIManager;
        // Legacy/Template compatibility: expose on window directly
        window.nextSlide = () => this.goToSlide(this.state.currentSlide + 1);
        window.prevSlide = () => this.goToSlide(this.state.currentSlide - 1);
        window.goToSlide = (i) => this.goToSlide(i);
        window.syncDots = (el) => this.syncDots(el);
        window.showToast = (m, t) => UIManager.showToast(m, t);
        window.loadMorePosts = () => this.loadMorePosts();
        window.refreshCartData = () => this.refreshCartData();
        window.startCheckout = () => this.startCheckout();
        window.showOrderSummary = () => this.showOrderSummary();
        window.showGeoVerification = () => this.showGeoVerification();
        window.handleClearLocation = () => this.LocationRenderer.handleClearLocation();
        window.handleAddToCart = () => this.handleAddToCart();
        window.setQuantity = (q) => { this.state.quantity = q; };
        window.loadProductData = () => this.loadProductData();
    }
    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.LocationRenderer.init();
            this.CartRenderer.renderFab();
            this.setupEventListeners();
            this.loadProductData();
            this.loadGridData();
            this.updateCategoryLinks();
            this.highlightActiveLabels();
            this.initSearchInput();
            this.SearchAutocompleteRenderer = new SearchAutocompleteRenderer("search-q", this.BloggerDataService);
        });
    }
    initSearchInput() {
        const qInput = UIManager.el("search-q");
        if (qInput && this.displaySearchQuery) {
            qInput.value = this.displaySearchQuery;
        }
    }
    updateCategoryLinks() {
        const keywords = this.searchKeywordsOnly.trim();
        const locString = this.formatLocationQuery();
        if (!keywords && !locString)
            return;
        const catLinks = document.querySelectorAll('.cat-link');
        catLinks.forEach(link => {
            const text = link.textContent?.trim() || '';
            let finalQuery = '';
            if (text.toUpperCase() === 'ALL') {
                finalQuery = `${keywords} ${locString}`.trim();
            }
            else {
                finalQuery = `label:${text} ${keywords} ${locString}`.trim();
            }
            const prettyQuery = encodeURIComponent(finalQuery)
                .replace(/%20/g, ' ')
                .replace(/%3A/g, ':');
            link.href = `/search?q=${prettyQuery}`;
        });
    }
    highlightActiveLabels() {
        const catLinks = document.querySelectorAll('.cat-link');
        if (this.currentLabels.length > 0) {
            catLinks.forEach(link => {
                const text = link.textContent?.trim();
                if (text?.toUpperCase() === 'ALL') {
                    link.classList.remove('active');
                    return;
                }
                const isMatch = this.currentLabels.some(label => {
                    return text === label;
                });
                if (isMatch)
                    link.classList.add('active');
            });
        }
    }
    setupEventListeners() {
        const qtyPlus = UIManager.el("qty-plus");
        const qtyMinus = UIManager.el("qty-minus");
        const addBtn = UIManager.el("add-to-cart-btn");
        const searchForm = UIManager.el("search-form");
        const updateProductPrice = () => {
            const variant = SchemaExtractor.findMatchingVariant(this.state.product, this.state.selectedVariants, this.state.lastClickedAttribute);
            const offer = SchemaExtractor.getFirst(variant?.offers || this.state.product?.offers);
            const priceEl = UIManager.el("p-price");
            if (priceEl && offer) {
                const { price, currency } = SchemaExtractor.extractPriceForQuantity(offer, this.state.quantity);
                const symbol = SchemaExtractor.getCurrencySymbol(currency);
                priceEl.textContent = `${symbol}${price}`;
            }
        };
        if (qtyPlus)
            qtyPlus.onclick = () => {
                const limits = window.currentQuantityLimits;
                if (limits?.maxValue !== null && this.state.quantity >= limits.maxValue) {
                    UIManager.showToast(`Maximum limit of ${limits.maxValue} reached`, "error");
                    return;
                }
                this.state.quantity++;
                UIManager.setContent("qty-val", String(this.state.quantity));
                this.ProductRenderer.updateQtyButtons();
                updateProductPrice();
            };
        if (qtyMinus)
            qtyMinus.onclick = () => {
                if (this.state.quantity > 1) {
                    this.state.quantity--;
                    UIManager.setContent("qty-val", String(this.state.quantity));
                    this.ProductRenderer.updateQtyButtons();
                    updateProductPrice();
                }
            };
        if (addBtn)
            addBtn.onclick = () => {
                this.handleAddToCart();
                // Force re-render of addons to enable buttons
                this.ProductRenderer.render(this.state.product, this.state, (attr, val) => {
                    this.state.selectedVariants[attr] = val;
                    this.state.lastClickedAttribute = attr;
                    this.ProductRenderer.render(this.state.product, this.state, () => { });
                });
            };
        if (searchForm) {
            searchForm.onsubmit = (e) => {
                e.preventDefault();
                const qInput = UIManager.el("search-q");
                if (!qInput)
                    return;
                const baseQuery = qInput.value.trim();
                const locString = this.formatLocationQuery();
                // Validate: At least one must be present
                if (!baseQuery && !locString) {
                    UIManager.showToast("Please enter a query or select location", "error");
                    return;
                }
                const combinedQuery = (locString && !baseQuery.includes(locString))
                    ? `${baseQuery} ${locString}`.trim()
                    : baseQuery;
                const searchUrl = searchForm.getAttribute('action') || '/search';
                let finalQuery = encodeURIComponent(combinedQuery)
                    .replace(/%3A/g, ':')
                    .replace(/%7C/g, '|');
                window.location.href = `${searchUrl}?q=${finalQuery}`;
            };
        }
    }
    loadProductData() {
        setTimeout(() => {
            const rawBody = UIManager.el("post-body-raw");
            if (rawBody) {
                const data = SchemaExtractor.extractJsonLd(rawBody.textContent || "");
                if (data) {
                    this.state.product = data;
                    this.ProductRenderer.render(data, this.state, (attr, val) => {
                        this.state.selectedVariants[attr] = val;
                        this.state.lastClickedAttribute = attr;
                        this.ProductRenderer.render(this.state.product, this.state, () => { });
                    });
                    if (data.offers?.seller || data.seller || data.provider) {
                        this.ProductRenderer.renderSeller(data.offers?.seller || data.seller || data.provider);
                    }
                }
            }
            UIManager.toggleClass("#initializing-state", "hidden", true);
            UIManager.toggleClass("#carousel-section", "hidden", false);
            UIManager.toggleClass("#details-section", "hidden", false);
        }, 100);
    }
    async loadGridData() {
        const grid = UIManager.el("app-grid");
        if (!grid)
            return;
        const { entries } = await this.BloggerDataService.fetchFeedData(50, 1, this.currentLabels, this.currentSearchQuery);
        if (grid.children.length === 0) {
            this.renderEntriesToGrid(entries, grid);
        }
        else {
            const cards = grid.querySelectorAll(".card");
            cards.forEach(card => {
                const url = card.href.split("?")[0].split("#")[0];
                const entry = entries.find(e => {
                    const alternateLink = e.link.find((l) => l.rel === "alternate")?.href || "";
                    return alternateLink.toLowerCase().includes(url.toLowerCase());
                });
                const data = entry
                    ? this.BloggerDataService.extractSchemaFromEntry(entry)
                    : SchemaExtractor.extractJsonLd(card.querySelector(".grid-data")?.textContent || "");
                if (data) {
                    this.renderGridCard(card, data);
                }
            });
        }
    }
    async loadMorePosts() {
        const grid = UIManager.el("app-grid");
        if (!grid)
            return;
        this.gridStartIndex += this.gridPageSize;
        const { entries, totalResults } = await this.BloggerDataService.fetchFeedData(this.gridPageSize, this.gridStartIndex, this.currentLabels, this.currentSearchQuery);
        this.renderEntriesToGrid(entries, grid);
        if (this.gridStartIndex + this.gridPageSize > totalResults) {
            UIManager.el("load-more-btn")?.classList.add("hidden");
        }
    }
    renderEntriesToGrid(entries, grid) {
        entries.forEach(entry => {
            const data = this.BloggerDataService.extractSchemaFromEntry(entry);
            if (data) {
                const url = entry.link.find((l) => l.rel === "alternate")?.href || "#";
                const card = document.createElement("a");
                card.className = "card";
                card.href = url;
                const firstImage = SchemaExtractor.getFirst(data.image);
                const imageUrl = firstImage?.url || firstImage || 'https://via.placeholder.com/400x300?text=Antinna';
                card.innerHTML = `
            <div class="card-img-wrapper">
               <div class="card-img-scroll" onscroll="AntinnaEngine.syncDots(this)">
                  <img class="card-img" src="${imageUrl}" loading="lazy"/>
               </div>
               <div class="card-dots"></div>
            </div>
            <div class="card-body">
              <div class="card-badge">Loading...</div>
              <h3 class="card-title">${SchemaExtractor.getFirst(data.name) || "Untitled"}</h3>
              <div class="card-price">--</div>
            </div>
          `;
                grid.appendChild(card);
                this.renderGridCard(card, data);
            }
        });
    }
    async refreshCartData() {
        this.CartRenderer.setLoading(true);
        try {
            const order = this.CartManager.getOrder();
            const { entries } = await this.BloggerDataService.fetchFeedData(100, 1);
            SchemaExtractor.getArray(order.orderedItem).forEach((item, idx) => {
                const url = SchemaExtractor.getFirst(item.orderedItem?.url);
                if (!url)
                    return;
                const entry = entries.find(e => {
                    const alternateLink = e.link.find((l) => l.rel === "alternate")?.href || "";
                    return alternateLink.toLowerCase().includes(url.toLowerCase().split('?')[0].split('#')[0]);
                });
                const data = entry ? this.BloggerDataService.extractSchemaFromEntry(entry) : null;
                this.CartManager.updateItemDetails(idx, data);
            });
        }
        catch (e) {
            console.error("Refresh failed", e);
        }
        finally {
            this.CartRenderer.setLoading(false);
            this.CartRenderer.showModal();
        }
    }
    renderGridCard(card, data) {
        const badge = card.querySelector(".card-badge");
        const price = card.querySelector(".card-price");
        const scroll = card.querySelector(".card-img-scroll");
        const dots = card.querySelector(".card-dots");
        const types = SchemaExtractor.getArray(data["@type"]);
        const isBusiness = types.some(t => t === "LocalBusiness" || t === "Store" || t === "Organization");
        if (badge) {
            if (isBusiness)
                badge.textContent = 'Business';
            else if (types.some(t => t === 'ProductGroup' || t === 'Product'))
                badge.textContent = 'Product';
            else
                badge.textContent = 'Service';
        }
        if (price) {
            if (isBusiness) {
                price.textContent = SchemaExtractor.getFirst(data.telephone) || "Contact Us";
            }
            else {
                const variants = SchemaExtractor.getArray(data.hasVariant);
                const variant = variants.length > 0 ? variants[0] : data;
                const { price: p, currency } = SchemaExtractor.extractPrice(variant.offers || variant);
                const symbol = SchemaExtractor.getCurrencySymbol(currency);
                price.textContent = `${symbol}${p}`;
            }
        }
        const imgs = SchemaExtractor.getArray(data.image);
        if (imgs[0] && scroll) {
            scroll.innerHTML = imgs.map((img) => `<img class="card-img" src="${img.url || img}" loading="lazy"/>`).join('');
            if (dots && imgs.length > 1) {
                dots.innerHTML = imgs.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}"></div>`).join('');
            }
        }
    }
    handleAddToCart() {
        const p = this.state.product;
        if (!p)
            return;
        let variant = SchemaExtractor.findMatchingVariant(p, this.state.selectedVariants, this.state.lastClickedAttribute);
        if (this.state.selectedPackage) {
            variant = {
                ...variant,
                name: this.state.selectedPackage.itemOffered?.name || this.state.selectedPackage.name,
                offers: {
                    price: this.state.selectedPackage.price,
                    priceCurrency: this.state.selectedPackage.priceCurrency
                }
            };
        }
        const itemToStore = { ...variant, url: window.location.href.split('?')[0].split('#')[0] };
        const seller = SchemaExtractor.getFirst(itemToStore.offers?.seller) || SchemaExtractor.getFirst(p.seller) || p.provider;
        this.CartManager.addItem(itemToStore, seller, this.state.selectedVariants, this.state.quantity);
        this.CartRenderer.updateUI();
        UIManager.showToast("Added to Bag", "success");
    }
    goToSlide(i) {
        const inner = UIManager.el("carousel-inner");
        const items = document.querySelectorAll(".carousel-item");
        if (!inner || items.length === 0)
            return;
        if (i < 0)
            i = items.length - 1;
        if (i >= items.length)
            i = 0;
        this.state.currentSlide = i;
        inner.style.transform = `translateX(-${i * 100}%)`;
        document.querySelectorAll(".thumb").forEach((t, x) => t.classList.toggle("active", x === i));
    }
    syncDots(el) {
        const idx = Math.round(el.scrollLeft / el.offsetWidth);
        const dots = el.parentElement?.querySelectorAll('.dot');
        dots?.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    startCheckout() {
        this.CartRenderer.hideModal();
        if (!window.isLoggedIn) {
            this.showLoginPrompt();
            return;
        }
        if (!window.hasPhoneLinked) {
            this.PhoneVerificationRenderer.render();
            return;
        }
        this.showGeoVerification();
    }
    showGeoVerification() {
        this.GeoVerificationRenderer.renderPopup();
    }
    setVerifiedLocation(loc) {
        this.state.verifiedLocation = loc;
    }
    setOrderDelivery(delivery) {
        this.state.orderDelivery = delivery;
    }
    showOrderSummary() {
        if (!window.isLoggedIn) {
            this.showLoginPrompt();
            return;
        }
        UIManager.el('antinna-geo-modal')?.classList.remove('active');
        this.OrderSummaryRenderer.render(this.state.verifiedLocation, this.state.orderDelivery);
    }
    showLoginPrompt() {
        let loginModal = UIManager.el('antinna-login-modal');
        if (!loginModal) {
            loginModal = document.createElement('div');
            loginModal.id = 'antinna-login-modal';
            loginModal.className = 'antinna-geo-backdrop';
            UIManager.injectModalStyles();
            loginModal.innerHTML = `
            <div class="antinna-geo-content" style="text-align:center;">
                <div class="antinna-geo-header">
                    <h3>Sign in Required</h3>
                    <button class="antinna-geo-close" onclick="document.getElementById('antinna-login-modal').classList.remove('active')">&times;</button>
                </div>
                <p style="margin-bottom:30px; opacity:0.8;">Please sign in to your account to finalize your order and proceed to payment.</p>
                <div style="display:flex; justify-content:center;">
                    <button class="g-signin-button" id="google-login-btn-checkout">
                        <div class="g-icon-wrapper">
                            <svg viewBox="0 0 18 18" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.83 2.07-1.79 2.73v2.27h2.9c1.7-1.57 2.69-3.87 2.69-6.63z"/>
                                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.27c-.8.54-1.83.86-3.06.86-2.33 0-4.3-1.58-5-3.7H.9v2.33C2.38 16.03 5.46 18 9 18z"/>
                                <path fill="#FBBC05" d="M4 10.71a4.99 4.99 0 010-3.42V4.96H.9a8.99 8.99 0 000 8.08L4 10.71z"/>
                                <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.22C13.46.79 11.43 0 9 0 5.46 0 2.38 1.97.9 4.96L4 7.29c.7-2.12 2.67-3.71 5-3.71z"/>
                            </svg>
                        </div>
                        <span class="g-text">Sign in with Google</span>
                    </button>
                </div>
            </div>
          `;
            document.body.appendChild(loginModal);
            const loginBtn = UIManager.el('google-login-btn-checkout');
            if (loginBtn) {
                loginBtn.onclick = () => {
                    const sidebarBtn = UIManager.el('google-login-btn-sidebar');
                    if (sidebarBtn)
                        sidebarBtn.click();
                    else if (window.handleLogin)
                        window.handleLogin();
                };
            }
        }
        loginModal.classList.add('active');
        // Start polling for login success
        const checkLogin = setInterval(() => {
            if (window.isLoggedIn) {
                clearInterval(checkLogin);
                loginModal?.classList.remove('active');
                // Automatically proceed to next step
                this.startCheckout();
            }
        }, 1000);
    }
}
new App();
