import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@antinna/blogger-theme/jsx-runtime";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";
import { BloggerTheme, BSection, BWidget, BClientScript, BSkin, Title, BIf, BIncludable, BLoop, BData, BEval, } from "@antinna/blogger-theme";
// Polyfill __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Absolute path resolution relative to workspace root
const ROOT_DIR = path.resolve(__dirname, "../../");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const OUTPUT_CSS_PATH = path.resolve(DIST_DIR, "output.css");
const REACT_APP_ENTRY = path.resolve(ROOT_DIR, "app/src/index.tsx");
const GlobalHeaderScripts = () => (_jsxs(_Fragment, { children: [_jsx("script", { type: "text/javascript", children: `
      (function() {
        var defaultLocale = 'en';
        var defaultCurrency = 'INR';
        var cachedLocale = localStorage.getItem('antinna-locale') || defaultLocale;
        var cachedCurrency = localStorage.getItem('antinna-currency') || defaultCurrency;
        localStorage.setItem('antinna-locale', cachedLocale);
        localStorage.setItem('antinna-currency', cachedCurrency);
        document.documentElement.setAttribute('lang', cachedLocale);
        document.documentElement.classList.add('currency-' + cachedCurrency.toLowerCase());
      })();
      ` }), _jsx("script", { type: "text/javascript", children: `//<![CDATA[
      (function() {
        const l10nDictionary = {
          "en": {
            "session_settings": "Session Settings",
            "preferences": "Preferences",
            "language_locale": "Language & Locale",
            "preferred_currency": "Preferred Currency",
            "account_uid": "Account USER ID",
            "logout_session": "Logout Session",
            "shopping_bag": "Shopping Bag",
            "total": "Total",
            "confirm_order": "Confirm Order",
            "select_location": "Select Location",
            "detect_location": "Detect My Location",
            "or": "OR",
            "apply": "Apply",
            "find": "Find",
            "search_placeholder": "Service title, keywords, or company",
            "location_placeholder": "City, PIN code",
            "guest_user": "Guest User",
            "workspace_client": "Workspace Client"
          },
          "fr": {
            "session_settings": "Paramètres de session",
            "preferences": "Préférences",
            "language_locale": "Langue & Paramètres régionaux",
            "preferred_currency": "Devise préférée",
            "account_uid": "ID utilisateur du compte",
            "logout_session": "Fermer la session",
            "shopping_bag": "Sac de courses",
            "total": "Total",
            "confirm_order": "Confirmer la commande",
            "select_location": "Sélectionnez l'emplacement",
            "detect_location": "Détecter ma position",
            "or": "OU",
            "apply": "Appliquer",
            "find": "Trouver",
            "search_placeholder": "Titre du service, mots-clés ou entreprise",
            "location_placeholder": "Ville, code PIN",
            "guest_user": "Utilisateur invité",
            "workspace_client": "Client de l'espace de travail"
          },
          "hi": {
            "session_settings": "सत्र सेटिंग्स",
            "preferences": "प्राथमिकताएं",
            "language_locale": "भाषा और स्थानीयकरण",
            "preferred_currency": "पसंदीदा मुद्रा",
            "account_uid": "खाता उपयोगकर्ता आईडी",
            "logout_session": "सत्र समाप्त करें",
            "shopping_bag": "शॉपिंग बैग",
            "total": "कुल",
            "confirm_order": "ऑर्डर की पुष्टि करें",
            "select_location": "स्थान चुनें",
            "detect_location": "मेरा स्थान पता करें",
            "or": "या",
            "apply": "लागू करें",
            "find": "खोजें",
            "search_placeholder": "सेवा शीर्षक, कीवर्ड या कंपनी",
            "location_placeholder": "शहर, पिन कोड",
            "guest_user": "अतिथि उपयोगकर्ता",
            "workspace_client": "कार्यक्षेत्र क्लाइंट"
          }
        };

        window.translateDOM = function() {
          const currentLocale = localStorage.getItem('antinna-locale') || 'en';
          const dict = l10nDictionary[currentLocale] || l10nDictionary['en'] || {};

          document.querySelectorAll('[data-l10n]').forEach(el => {
            const key = el.getAttribute('data-l10n');
            if (dict[key]) {
              if (el.textContent !== dict[key]) {
                el.textContent = dict[key];
              }
            }
          });

          document.querySelectorAll('[data-l10n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-l10n-placeholder');
            if (dict[key]) {
              if (el.getAttribute('placeholder') !== dict[key]) {
                el.setAttribute('placeholder', dict[key]);
              }
            }
          });

          const langSelectors = ['language-selector', 'sidebar-language-selector'];
          langSelectors.forEach(id => {
            const select = document.getElementById(id);
            if (select && select.value !== currentLocale) {
              select.value = currentLocale;
            }
          });

          const currentCurrency = localStorage.getItem('antinna-currency') || 'INR';
          const currSelectors = ['currency-selector', 'sidebar-currency-selector'];
          currSelectors.forEach(id => {
            const select = document.getElementById(id);
            if (select && select.value !== currentCurrency) {
              select.value = currentCurrency;
            }
          });
        };

        window.setLanguage = function(lang) {
          localStorage.setItem('antinna-locale', lang);
          document.documentElement.setAttribute('lang', lang);
          window.translateDOM();
          if (window.dispatchEvent) {
            window.dispatchEvent(new Event('locale-change'));
          }
        };

        window.setCurrency = function(curr) {
          localStorage.setItem('antinna-currency', curr);
          const htmlEl = document.documentElement;

          const classesToRemove = [];
          htmlEl.classList.forEach(cls => {
            if (cls.startsWith('currency-')) {
              classesToRemove.push(cls);
            }
          });
          classesToRemove.forEach(cls => htmlEl.classList.remove(cls));

          htmlEl.classList.add('currency-' + curr.toLowerCase());
          window.translateDOM();
          if (window.dispatchEvent) {
            window.dispatchEvent(new Event('currency-change'));
          }
        };

        document.addEventListener('DOMContentLoaded', () => {
          window.translateDOM();
          const observer = new MutationObserver(() => {
            window.translateDOM();
          });
          observer.observe(document.body, { childList: true, subtree: true });
        });
      })();
      //]]>` }), _jsx("script", { type: "text/javascript", children: `
      (function() {
        var cachedTheme = localStorage.getItem('antinna-theme');
        var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (cachedTheme === 'dark' || (!cachedTheme && systemPrefersDark)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })();
      ` }), _jsx("script", { children: `
      cookieOptions = {
        close: " Got it! ",
        learn: "Privacy Policy",
        link: "https://policies.google.com/technologies/cookies"
      };
      ` }), _jsx("meta", { content: "width=device-width, initial-scale=1.0", name: "viewport" })] }));
const BlogLayout = () => (_jsxs("div", { className: "app-container flex w-screen h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden", children: [_jsx("div", { id: "sidebar-backdrop", className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden lg:hidden", onclick: "window.toggleSidebarDrawer()" }), _jsxs("div", { className: "ui-hidden", children: [_jsx(BSection, { id: "sidebar-primary-links", className: "sidebar-shared-nav-section", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList1", type: "LinkList", title: "Navigation Menu", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsx("ul", { id: "mount-primary-links", className: "hidden", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("li", { className: "nav-item", children: _jsx("a", { className: "nav-route-link block px-4 py-2.5 rounded-xl text-slate-400 font-medium text-sm transition-all hover:bg-slate-800/40 hover:text-slate-100", "expr:href": "data:link.target", children: _jsx(BData, { value: "link.name" }) }) }) }) }) }) }) }), _jsx(BSection, { id: "sidebar-workspace-links", className: "sidebar-modules-section", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList3", type: "LinkList", title: "Workspace Menu", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsxs("div", { id: "mount-workspace-links", className: "hidden", children: [_jsx("span", { id: "mount-workspace-title", children: _jsx(BEval, { expr: 'data:title != "" and data:title != " " ? data:title : "Workspaces"' }) }), _jsx("ul", { className: "mount-workspace-items", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("li", { className: "workspace-item", children: _jsx("a", { className: "nav-route-link block px-4 py-2 rounded-lg text-slate-400 font-medium text-xs hover:bg-slate-800/40 hover:text-slate-100", "expr:href": "data:link.target", children: _jsx(BData, { value: "link.name" }) }) }) }) })] }) }) }) }), _jsx(BSection, { id: "sidebar-legal-links", className: "sidebar-legal-section", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList2", type: "LinkList", title: "Policies & Legal", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsxs("div", { id: "mount-legal-links", className: "hidden", children: [_jsx("span", { id: "mount-legal-title", children: _jsx(BEval, { expr: 'data:title != "" and data:title != " " ? data:title : "Legal"' }) }), _jsx("ul", { className: "mount-legal-items", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("li", { className: "legal-item", children: _jsx("a", { className: "nav-route-link block px-4 py-2 rounded-lg text-slate-400 font-medium text-xs hover:bg-slate-800/40 hover:text-slate-100", "expr:href": "data:link.target", children: _jsx(BData, { value: "link.name" }) }) }) }) })] }) }) }) }), _jsx(BSection, { id: "social-icon-links", className: "sidebar-social-wrapper", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList4", type: "LinkList", title: "Connect with us", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsxs("div", { id: "mount-social-links", className: "hidden", children: [_jsx("h4", { id: "mount-social-title", children: _jsx(BEval, { expr: 'data:title != "" and data:title != " " ? data:title : "Connect"' }) }), _jsx("div", { className: "mount-social-items", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("a", { className: "social-icon-link w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-all duration-200", "expr:href": "data:link.target", target: "_blank", "expr:style": '"-webkit-mask-image: url(" + data:link.name + "); mask-image: url(" + data:link.name + ");"' }) }) })] }) }) }) })] }), _jsxs("aside", { id: "sidebar-drawer", className: "hidden lg:flex flex-col justify-between w-[280px] min-w-[280px] h-screen bg-slate-900 border-r border-slate-800 text-slate-100 z-50 transition-all duration-300", children: [_jsxs("div", { className: "sidebar-header h-16 px-5 flex items-center justify-between border-b border-slate-800/60", children: [_jsxs("div", { className: "brand-logo flex items-center gap-3", children: [_jsx("img", { className: "brand-icon w-8 h-8 rounded-lg object-cover", alt: "Antinna logo", "expr:src": "data:blog.blogspotFaviconUrl" }), _jsx("span", { className: "brand-text font-bold text-lg text-slate-100", children: _jsx(BEval, { expr: "data:blog.title" }) })] }), _jsx("div", { className: "header-right", children: _jsxs("button", { id: "theme-mode-switcher", className: "btn-theme-toggle w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 cursor-pointer", children: [_jsx("span", { className: "mode-icon icon-moon text-lg", children: "\u263E" }), _jsx("span", { className: "mode-icon icon-sun text-lg ui-hidden", children: "\u263C" })] }) }), _jsx("button", { className: "btn-close-sidebar lg:hidden text-2xl cursor-pointer text-slate-400 hover:text-slate-100", onclick: "window.toggleSidebarDrawer()", children: "\u00D7" })] }), _jsxs("div", { className: "sidebar-scroll-content flex-1 overflow-y-auto overflow-x-hidden pb-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent", children: [_jsx("div", { className: "desktop-nav-fallback p-5 pb-3", children: _jsx("ul", { id: "sidebar-nav-menu-list", className: "sidebar-static-links flex flex-col gap-1" }) }), _jsx("div", { className: "sidebar-modules-area px-5 py-2", children: _jsxs("div", { className: "module-wrapper", children: [_jsxs("button", { className: "module-trigger w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 text-sm font-semibold cursor-pointer", onclick: 'window.toggleModuleDropdown("workspace-module")', children: [_jsx("span", { id: "workspace-dropdown-title", children: "Workspaces" }), _jsx("span", { className: "arrow-indicator text-[10px] transform transition-transform duration-200", id: "workspace-module-arrow", children: "\u25BE" })] }), _jsx("ul", { className: "module-dropdown-list flex flex-col gap-1 mt-1 pl-3 transition-all duration-300", id: "workspace-module" })] }) }), _jsx("div", { className: "sidebar-legal-area px-5 py-2", children: _jsxs("div", { className: "module-wrapper", children: [_jsxs("button", { className: "module-trigger w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 text-sm font-semibold cursor-pointer", onclick: 'window.toggleModuleDropdown("legal-policy-module")', children: [_jsx("span", { id: "legal-dropdown-title", children: "Legal" }), _jsx("span", { className: "arrow-indicator text-[10px] transform transition-transform duration-200", id: "legal-policy-module-arrow", children: "\u25BE" })] }), _jsx("ul", { className: "module-dropdown-list ui-hidden flex flex-col gap-1 mt-1 pl-3 transition-all duration-300", id: "legal-policy-module" })] }) }), _jsx("div", { className: "sidebar-l10n-area px-5 py-3 border-t border-slate-800/60 mt-4", children: _jsxs("div", { className: "module-wrapper flex flex-col gap-4", children: [_jsx("div", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest", "data-l10n": "preferences", children: "Preferences" }), _jsxs("div", { children: [_jsx("span", { className: "block text-[11px] text-slate-400 font-semibold mb-1.5", "data-l10n": "language_locale", children: "Language & Locale" }), _jsx("div", { className: "settings-select-box bg-slate-950 border border-slate-800 rounded-xl p-1", children: _jsxs("select", { id: "sidebar-language-selector", className: "settings-select w-full bg-transparent border-0 text-slate-200 text-xs px-2 py-1.5 outline-none cursor-pointer", onchange: "window.setLanguage(this.value)", children: [_jsx("option", { value: "en", className: "bg-slate-900", children: "English (EN)" }), _jsx("option", { value: "hi", className: "bg-slate-900", children: "\u0939\u093F\u0928\u094D\u0926\u0940 (HI)" }), _jsx("option", { value: "fr", className: "bg-slate-900", children: "Fran\u00E7ais (FR)" })] }) })] }), _jsxs("div", { children: [_jsx("span", { className: "block text-[11px] text-slate-400 font-semibold mb-1.5", "data-l10n": "preferred_currency", children: "Preferred Currency" }), _jsx("div", { className: "settings-select-box bg-slate-950 border border-slate-800 rounded-xl p-1", children: _jsxs("select", { id: "sidebar-currency-selector", className: "settings-select w-full bg-transparent border-0 text-slate-200 text-xs px-2 py-1.5 outline-none cursor-pointer", onchange: "window.setCurrency(this.value)", children: [_jsx("option", { value: "INR", className: "bg-slate-900", children: "INR (\u20B9)" }), _jsx("option", { value: "USD", className: "bg-slate-900", children: "USD ($)" }), _jsx("option", { value: "EUR", className: "bg-slate-900", children: "EUR (\u20AC)" })] }) })] })] }) }), _jsxs("div", { className: "sidebar-social-links-container px-5 py-4 border-t border-slate-800/60 mt-2", children: [_jsx("h4", { id: "sidebar-social-title-display", className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3", children: "Connect" }), _jsx("div", { id: "sidebar-social-icons", className: "social-icons-row flex items-center justify-between w-full gap-2" })] })] }), _jsxs("div", { className: "avatar-footer-row flex items-center justify-between gap-3 h-[72px] px-5 bg-slate-950/60 border-t border-slate-800/60", children: [_jsxs("div", { className: "avatar-left-info flex items-center gap-3 overflow-hidden", children: [_jsx("div", { className: "user-avatar-circle w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm text-slate-100 flex-shrink-0", children: _jsx("span", { children: "U" }) }), _jsxs("div", { className: "user-meta-strings flex flex-col min-w-0", children: [_jsx("span", { className: "user-display-name text-sm font-semibold text-slate-100 truncate", "data-l10n": "guest_user", children: "Guest User" }), _jsx("span", { className: "user-display-role text-[10px] text-slate-500 truncate", "data-l10n": "workspace_client", children: "Workspace Client" })] })] }), _jsx("button", { "aria-label": "Settings", className: "btn-settings-gear w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 cursor-pointer transition-all duration-300", onclick: "alert('Settings panel active!')", children: "\u2699" })] })] }), _jsxs("div", { className: "main-view-wrapper flex-1 flex flex-col h-screen overflow-hidden relative", children: [_jsxs("header", { className: "top-navbar-header h-16 min-h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 px-6 flex items-center justify-between gap-4", children: [_jsx("div", { className: "flex items-center gap-3", children: _jsx("button", { className: "btn-hamburger lg:hidden text-slate-700 dark:text-slate-200 text-xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer", onclick: "window.toggleSidebarDrawer()", children: "\u2630" }) }), _jsx("div", { className: "header-search-wrapper flex-1 max-w-2xl", children: _jsx(BSection, { id: "header-search", className: "w-full", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "BlogSearch1", type: "BlogSearch", title: "Search items & services", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsx("div", { className: "header-center-search w-full", children: _jsxs("form", { "expr:action": "data:blog.searchUrl", id: "search-form", method: "get", className: "search-form-v2 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-1 shadow-sm transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10", children: [_jsx(BIf, { cond: "not data:view.isPreview", children: _jsx(BEval, { expr: '""' }) }), _jsxs("div", { className: "search-input-group flex-1 flex items-center gap-2.5 px-3 min-w-0", children: [_jsx("span", { className: "search-icon-v2 text-slate-400 flex-shrink-0", children: _jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] }) }), _jsx("input", { autocomplete: "off", className: "search-input-v2 bg-transparent border-0 text-sm font-medium outline-none text-slate-800 dark:text-slate-100 w-full", id: "search-q", name: "q", placeholder: "Service title, keywords, or company", "data-l10n-placeholder": "search_placeholder", type: "text" })] }), _jsx("div", { className: "search-divider w-px h-6 bg-slate-200 dark:bg-slate-800" }), _jsxs("div", { className: "search-input-group flex-1 flex items-center gap-2.5 px-3 min-w-0 cursor-pointer", onclick: "if(window.LocationRenderer) window.LocationRenderer.showModal()", children: [_jsx("span", { className: "search-icon-v2 text-slate-400 flex-shrink-0", children: _jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), _jsx("circle", { cx: "12", cy: "10", r: "3" })] }) }), _jsx("input", { autocomplete: "off", className: "search-input-v2 bg-transparent border-0 text-sm font-medium outline-none text-slate-800 dark:text-slate-100 w-full cursor-pointer", id: "loc-display-v2", placeholder: "City, PIN code", "data-l10n-placeholder": "location_placeholder", readonly: true, type: "text" })] }), _jsx("button", { className: "search-btn-v2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20", type: "submit", "data-l10n": "find", children: "Find" })] }) }) }) }) }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { className: "btn-theme-toggle lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-100 bg-slate-50 dark:bg-slate-800/40 cursor-pointer", onclick: "document.getElementById('theme-mode-switcher').click()", children: "\u263E" }), _jsx("div", { className: "lg:hidden w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300 cursor-pointer", onclick: "if(window.openSettingsModal) window.openSettingsModal()", children: "U" })] })] }), _jsx("div", { className: "category-section-wrapper bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 z-30", children: _jsx(BSection, { id: "category-section", className: "w-full", showaddelement: true, children: _jsx(BWidget, { id: "Label1", type: "Label", title: "Categories", locked: true, children: _jsx(BIncludable, { id: "main", children: _jsx(BIf, { cond: "data:view.isMultipleItems", children: _jsx("div", { className: "cat-bar overflow-x-auto whitespace-nowrap py-3 px-6 scrollbar-none flex items-center", children: _jsxs("div", { className: "cat-inner flex gap-3 max-w-6xl mx-auto w-full", children: [_jsx("a", { "expr:class": 'data:view.isSearch and !data:view.search.label ? "cat-link bg-indigo-600 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-md shadow-indigo-600/10" : "cat-link bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-4 py-1.5 rounded-full text-xs hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all"', "expr:href": "data:blog.homepageUrl + \"search\"", children: "ALL" }), _jsx(BLoop, { values: "data:labels", varName: "label", children: _jsx("a", { className: "cat-link bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-4 py-1.5 rounded-full text-xs hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all", "expr:href": "data:label.url", children: _jsx(BData, { value: "label.name" }) }) })] }) }) }) }) }) }) }), _jsx("main", { className: "scrollable-main-content flex-1 overflow-y-auto p-6 lg:p-8", children: _jsx("div", { className: "main-section-wrapper max-w-6xl mx-auto", children: _jsx(BSection, { id: "main-section", className: "main-feed-section w-full", showaddelement: true, children: _jsx(BWidget, { id: "Blog1", type: "Blog", title: "Blog Posts", locked: true, children: _jsxs(BIncludable, { id: "main", children: [_jsx(BIf, { cond: "data:view.isMultipleItems", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", children: _jsx(BLoop, { values: "data:posts", varName: "post", children: _jsxs("div", { className: "card group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col h-full", children: [_jsxs("div", { className: "card-img-wrapper relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-950", children: [_jsx("img", { className: "card-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", "expr:src": 'data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800"', alt: "featured image" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(BIf, { cond: "data:post.labels", children: _jsx("span", { className: "absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200/20 shadow-sm", children: _jsx(BData, { value: "data:post.labels[0].name" }) }) })] }), _jsxs("div", { className: "card-body p-6 flex flex-col flex-1", children: [_jsx("h3", { className: "card-title text-base font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 mb-3 min-h-[2.8em] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: _jsx("a", { "expr:href": "data:post.url", children: _jsx(BData, { value: "post.title" }) }) }), _jsx("div", { className: "card-excerpt text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-4 leading-relaxed", children: _jsx(BEval, { expr: "data:post.snippet" }) }), _jsxs("div", { className: "mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider", children: "Starting At" }), _jsx("span", { className: "card-price text-base font-extrabold text-indigo-600 dark:text-indigo-400", children: "\u20B92,499.00" })] }), _jsx("button", { className: "add-to-bag-btn bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white dark:bg-slate-800/40 dark:hover:bg-indigo-600 dark:text-slate-300 dark:hover:text-white border border-slate-100 dark:border-slate-700/60 hover:border-indigo-600 dark:hover:border-indigo-600 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer", "expr:onclick": '"if(window.CartManager){ window.CartManager.addItem({id:\\\\"" + data:post.id + "\\\\", name:\\\\"" + data:post.title + "\\\\", price:2499, img:\\\\"" + (data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800") + "\\\\"}); }"', children: "Add to Bag" })] })] })] }) }) }) }), _jsx(BIf, { cond: "data:view.isSingleItem", children: _jsxs(BLoop, { values: "data:posts", varName: "post", children: [_jsxs("div", { className: "product-layout grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 lg:p-10 shadow-sm", children: [_jsx("div", { className: "carousel-container flex flex-col gap-4", children: _jsxs("div", { className: "carousel relative aspect-square bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 rounded-2xl overflow-hidden flex items-center justify-center", children: [_jsx("img", { className: "max-w-full max-h-full object-contain p-6", "expr:src": 'data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800"', alt: "Detail main cover image" }), _jsx("span", { className: "absolute top-4 left-4 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20", children: "Active Premium" })] }) }), _jsxs("div", { className: "product-meta-details flex flex-col justify-between", children: [_jsxs("div", { className: "meta-top", children: [_jsx("h1", { className: "text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-4", children: _jsx(BData, { value: "post.title" }) }), _jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx("span", { className: "price text-3xl font-black text-indigo-600 dark:text-indigo-400", children: "\u20B92,499.00" }), _jsx("span", { className: "stock-badge in-stock bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full", children: "In Stock" })] }), _jsxs("div", { className: "v-group mb-6", children: [_jsx("span", { className: "v-label text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2", children: "Variant Option" }), _jsxs("div", { className: "v-options flex gap-2", children: [_jsx("button", { className: "v-btn active bg-indigo-600 text-white border-2 border-indigo-600 px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 cursor-pointer", children: "Standard Pack" }), _jsx("button", { className: "v-btn bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all", children: "Extended Pack" })] })] }), _jsx("div", { className: "post-body text-slate-500 dark:text-slate-355 text-sm leading-relaxed mb-6", children: _jsx(BData, { value: "post.body" }) })] }), _jsxs("div", { className: "meta-bottom pt-6 border-t border-slate-100 dark:border-slate-800/60 mt-6", children: [_jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsx("button", { className: "v-btn active flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 flex items-center justify-center gap-2", "expr:onclick": '"if(window.CartManager){ window.CartManager.addItem({id:\\\\"" + data:post.id + "\\\\", name:\\\\"" + data:post.title + "\\\\", price:2499, img:\\\\"" + (data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800") + "\\\\"}); }"', children: _jsx("span", { children: "Add to Bag" }) }), _jsx("button", { className: "v-btn bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center", onclick: "if(window.LocationRenderer) window.LocationRenderer.showModal()", children: _jsx("span", { children: "Check Location Availability" }) })] }), _jsxs("div", { className: "seller-box bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 mt-8 flex flex-col items-start", children: [_jsx("span", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1", children: "Fulfillment center" }), _jsx("span", { className: "text-xs font-bold text-slate-700 dark:text-slate-300", children: "Antinna Core Warehousing" }), _jsx("a", { href: "#", className: "geo-badge mt-3 inline-flex items-center gap-2 bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold px-4 py-2 rounded-full border border-sky-500/20 hover:scale-[1.02] transition-transform", children: "\uD83D\uDCCD View on map" })] })] })] })] }), _jsxs("div", { id: "comments", className: "max-w-4xl mt-12", children: [_jsx("h3", { className: "section-title text-lg font-bold border-l-4 border-indigo-600 pl-4 mb-6", children: "User Telemetry Comments" }), _jsx("div", { id: "comments-block", className: "flex flex-col gap-6", children: _jsxs("div", { className: "comment flex gap-4 items-start", children: [_jsx("div", { className: "avatar-image-container w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex-shrink-0", children: _jsx("img", { className: "author-avatar w-full h-full object-cover", src: "https://www.gravatar.com/avatar/00000000000000000000000000000000", alt: "anonymous user avatar" }) }), _jsxs("div", { className: "comment-block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl rounded-tl-none shadow-sm flex-1", children: [_jsx("div", { className: "comment-author text-sm font-bold text-slate-800 dark:text-slate-100 mb-1", children: "Anish Sharma" }), _jsx("div", { className: "comment-body text-sm text-slate-600 dark:text-slate-300 leading-relaxed", children: "REDESIGN: This layout is absolutely top-tier! Extremely responsive on my mobile browser, and the glassmorphic sidebar feels incredibly modern." })] })] }) })] })] }) })] }) }) }) }) })] }), _jsx("div", { id: "react-root" }), _jsx(BClientScript, { scriptPath: REACT_APP_ENTRY, mode: "cdata" }), _jsx("button", { className: "mobile-menu-fab lg:hidden fixed bottom-6 left-6 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl shadow-lg border border-slate-800 cursor-pointer z-50 hover:scale-105 transition-transform", onclick: "window.toggleSidebarDrawer()", children: "\u2630" }), _jsx("script", { type: "text/javascript", children: `//<![CDATA[
      /**
       * Toggles responsive state for the mobile drawer container panel.
       */
      window.toggleSidebarDrawer = function() {
          const sidebar = document.getElementById('sidebar-drawer');
          const backdrop = document.getElementById('sidebar-backdrop');

          if (sidebar && backdrop) {
              sidebar.classList.toggle('drawer-open');
              backdrop.classList.toggle('backdrop-active');
              sidebar.classList.toggle('hidden');
          }
      };

      /**
       * Handles module option dropdown panel expansion and triggers smooth arrow transforms dynamically.
       * @param {string} moduleId - Target DOM container node identifier token string.
       */
      window.toggleModuleDropdown = function(moduleId) {
          const targetModule = document.getElementById(moduleId);
          const arrowIndicator = document.getElementById(moduleId + '-arrow');

          if (targetModule) {
              const isCurrentlyHidden = targetModule.classList.contains('ui-hidden');

              if (isCurrentlyHidden) {
                  targetModule.classList.remove('ui-hidden');
                  if (arrowIndicator) {
                      arrowIndicator.style.transform = 'rotate(0deg)';
                  }
              } else {
                  targetModule.classList.add('ui-hidden');
                  if (arrowIndicator) {
                      arrowIndicator.style.transform = 'rotate(-90deg)';
                  }
              }
          }
      };

      /**
       * Dynamically replicates / mounts hidden section data points straight into our rendered Sidebar Drawer.
       */
      document.addEventListener('DOMContentLoaded', () => {
          // Replicate Nav menu
          const hiddenNav = document.getElementById('mount-primary-links');
          const sidebarNav = document.getElementById('sidebar-nav-menu-list');
          if (hiddenNav && sidebarNav) {
              sidebarNav.innerHTML = hiddenNav.innerHTML;
          }

          // Replicate Workspaces links
          const hiddenWorkspace = document.querySelector('.mount-workspace-items');
          const workspaceTitle = document.getElementById('mount-workspace-title');
          const sidebarWorkspace = document.getElementById('workspace-module');
          const sidebarWorkspaceTitle = document.getElementById('workspace-dropdown-title');
          if (hiddenWorkspace && sidebarWorkspace) {
              sidebarWorkspace.innerHTML = hiddenWorkspace.innerHTML;
          }
          if (workspaceTitle && sidebarWorkspaceTitle) {
              sidebarWorkspaceTitle.textContent = workspaceTitle.textContent;
          }

          // Replicate Legal Links
          const hiddenLegal = document.querySelector('.mount-legal-items');
          const legalTitle = document.getElementById('mount-legal-title');
          const sidebarLegal = document.getElementById('legal-policy-module');
          const sidebarLegalTitle = document.getElementById('legal-dropdown-title');
          if (hiddenLegal && sidebarLegal) {
              sidebarLegal.innerHTML = hiddenLegal.innerHTML;
          }
          if (legalTitle && sidebarLegalTitle) {
              sidebarLegalTitle.textContent = legalTitle.textContent;
          }

          // Replicate Social Links
          const hiddenSocial = document.querySelector('.mount-social-items');
          const socialTitle = document.getElementById('mount-social-title');
          const sidebarSocial = document.getElementById('sidebar-social-icons');
          const sidebarSocialTitle = document.getElementById('sidebar-social-title-display');
          if (hiddenSocial && sidebarSocial) {
              sidebarSocial.innerHTML = hiddenSocial.innerHTML;
          }
          if (socialTitle && sidebarSocialTitle) {
              sidebarSocialTitle.textContent = socialTitle.textContent;
          }

          // Auto-active highlighting
          const currentPath = window.location.pathname;
          document.querySelectorAll('.nav-route-link').forEach(link => {
              if (link.getAttribute('href') === currentPath) {
                  link.classList.add('active', 'bg-indigo-600', 'text-white');
                  link.classList.remove('text-slate-400');
              }
          });
      });
      //]]>` })] }));
function buildTheme() {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }
    const theme = new BloggerTheme({
        attributes: {
            "b:responsive": "true",
            "b:defaultwidgetversion": "2",
            "b:layoutsversion": "3",
        },
        head: [
            _jsx(Title, { id: "ram", children: "Blogger Tailwind React Premium Redesign" }),
            _jsx(GlobalHeaderScripts, {}),
            _jsx(BSkin, { css: OUTPUT_CSS_PATH }),
        ],
        body: [_jsx(BlogLayout, {})],
    });
    const xml = theme.generate();
    const outputPath = path.resolve(DIST_DIR, "blogger-theme.xml");
    fs.writeFileSync(outputPath, xml, "utf8");
    console.log(`\n🎉 Success! Blogger XML theme generated at: ${outputPath}`);
}
buildTheme();
