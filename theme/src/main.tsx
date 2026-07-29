import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";
import {
  BloggerTheme,
  BSection,
  BWidget,
  BClientScript,
  BSkin,
  Title,
  BIf,
  BIncludable,
  BInclude,
  BLoop,
  BData,
  BEval,
} from "@antinna/blogger-theme";

// Polyfill __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path resolution relative to workspace root
const ROOT_DIR = path.resolve(__dirname, "../../");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const OUTPUT_CSS_PATH = path.resolve(DIST_DIR, "output.css");
const REACT_APP_ENTRY = path.resolve(ROOT_DIR, "app/src/index.tsx");

const GlobalHeaderScripts = () => (
  <>
    <script type="text/javascript">
      {`
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
      `}
    </script>
    <script type="text/javascript">
      {`//<![CDATA[
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
      //]]>`}
    </script>
    <script type="text/javascript">
      {`
      (function() {
        var cachedTheme = localStorage.getItem('antinna-theme');
        var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (cachedTheme === 'dark' || (!cachedTheme && systemPrefersDark)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })();
      `}
    </script>
    <script>
      {`
      cookieOptions = {
        close: " Got it! ",
        learn: "Privacy Policy",
        link: "https://policies.google.com/technologies/cookies"
      };
      `}
    </script>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  </>
);

const BlogLayout = () => (
  <div className="app-container flex w-screen h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
    <div id="sidebar-backdrop" className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden lg:hidden" onclick="window.toggleSidebarDrawer()" />

    {/*
        CORRECTED NESTING STRUCTURE:
        All <b:section> nodes must live directly under <body> or top-level structural <div> tags.
        Therefore, we place our structural <b:section> nodes at the very top level inside <body> (outside of nested drawers or tags like <aside>).
        To eliminate nesting warnings (like having <b:loop> inside <ul> instead of direct <li> nodes), we wrap the loop elements in valid <li> lists directly inside the loop declaration.
    */}

    {/* Structural Section mapping: Primary Sidebar Links */}
    <div className="ui-hidden">
      <BSection id="sidebar-primary-links" className="sidebar-shared-nav-section" maxwidgets={1} showaddelement={true}>
        <BWidget id="LinkList1" type="LinkList" title="Navigation Menu" locked={false}>
          <BIncludable id="main">
            <ul id="mount-primary-links" className="hidden">
              <BLoop values="data:links" varName="link">
                <li className="nav-item">
                  <a className="nav-route-link block px-4 py-2.5 rounded-xl text-slate-400 font-medium text-sm transition-all hover:bg-slate-800/40 hover:text-slate-100" expr:href="data:link.target">
                    <BData value="link.name" />
                  </a>
                </li>
              </BLoop>
            </ul>
          </BIncludable>
        </BWidget>
      </BSection>

      <BSection id="sidebar-workspace-links" className="sidebar-modules-section" maxwidgets={1} showaddelement={true}>
        <BWidget id="LinkList3" type="LinkList" title="Workspace Menu" locked={false}>
          <BIncludable id="main">
            <div id="mount-workspace-links" className="hidden">
              <span id="mount-workspace-title">
                <BEval expr='data:title != "" and data:title != " " ? data:title : "Workspaces"' />
              </span>
              <ul className="mount-workspace-items">
                <BLoop values="data:links" varName="link">
                  <li className="workspace-item">
                    <a className="nav-route-link block px-4 py-2 rounded-lg text-slate-400 font-medium text-xs hover:bg-slate-800/40 hover:text-slate-100" expr:href="data:link.target">
                      <BData value="link.name" />
                    </a>
                  </li>
                </BLoop>
              </ul>
            </div>
          </BIncludable>
        </BWidget>
      </BSection>

      <BSection id="sidebar-legal-links" className="sidebar-legal-section" maxwidgets={1} showaddelement={true}>
        <BWidget id="LinkList2" type="LinkList" title="Policies &amp; Legal" locked={false}>
          <BIncludable id="main">
            <div id="mount-legal-links" className="hidden">
              <span id="mount-legal-title">
                <BEval expr='data:title != "" and data:title != " " ? data:title : "Legal"' />
              </span>
              <ul className="mount-legal-items">
                <BLoop values="data:links" varName="link">
                  <li className="legal-item">
                    <a className="nav-route-link block px-4 py-2 rounded-lg text-slate-400 font-medium text-xs hover:bg-slate-800/40 hover:text-slate-100" expr:href="data:link.target">
                      <BData value="link.name" />
                    </a>
                  </li>
                </BLoop>
              </ul>
            </div>
          </BIncludable>
        </BWidget>
      </BSection>

      <BSection id="social-icon-links" className="sidebar-social-wrapper" maxwidgets={1} showaddelement={true}>
        <BWidget id="LinkList4" type="LinkList" title="Connect with us" locked={false}>
          <BIncludable id="main">
            <div id="mount-social-links" className="hidden">
              <h4 id="mount-social-title">
                <BEval expr='data:title != "" and data:title != " " ? data:title : "Connect"' />
              </h4>
              <div className="mount-social-items">
                <BLoop values="data:links" varName="link">
                  <a className="social-icon-link w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-all duration-200" expr:href="data:link.target" target="_blank" expr:style='"-webkit-mask-image: url(" + data:link.name + "); mask-image: url(" + data:link.name + ");"'>
                  </a>
                </BLoop>
              </div>
            </div>
          </BIncludable>
        </BWidget>
      </BSection>
    </div>

    {/* Actual Sidebar Drawer UI using client-side DOM replication of data rendered in the hidden sections above */}
    <aside id="sidebar-drawer" className="hidden lg:flex flex-col justify-between w-[280px] min-w-[280px] h-screen bg-slate-900 border-r border-slate-800 text-slate-100 z-50 transition-all duration-300">
      <div className="sidebar-header h-16 px-5 flex items-center justify-between border-b border-slate-800/60">
        <div className="brand-logo flex items-center gap-3">
          <img className="brand-icon w-8 h-8 rounded-lg object-cover" alt="Antinna logo" expr:src="data:blog.blogspotFaviconUrl" />
          <span className="brand-text font-bold text-lg text-slate-100">
            <BEval expr="data:blog.title" />
          </span>
        </div>
        <div className="header-right">
          <button id="theme-mode-switcher" className="btn-theme-toggle w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 cursor-pointer">
            <span className="mode-icon icon-moon text-lg">☾</span>
            <span className="mode-icon icon-sun text-lg ui-hidden">☼</span>
          </button>
        </div>
        <button className="btn-close-sidebar lg:hidden text-2xl cursor-pointer text-slate-400 hover:text-slate-100" onclick="window.toggleSidebarDrawer()">×</button>
      </div>

      <div className="sidebar-scroll-content flex-1 overflow-y-auto overflow-x-hidden pb-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {/* Render Nav Menu directly in sidebar */}
        <div className="desktop-nav-fallback p-5 pb-3">
          <ul id="sidebar-nav-menu-list" className="sidebar-static-links flex flex-col gap-1">
            {/* Populated dynamically from #mount-primary-links */}
          </ul>
        </div>

        {/* Modules dropdown Section */}
        <div className="sidebar-modules-area px-5 py-2">
          <div className="module-wrapper">
            <button className="module-trigger w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 text-sm font-semibold cursor-pointer" onclick='window.toggleModuleDropdown("workspace-module")'>
              <span id="workspace-dropdown-title">Workspaces</span>
              <span className="arrow-indicator text-[10px] transform transition-transform duration-200" id="workspace-module-arrow">▾</span>
            </button>
            <ul className="module-dropdown-list flex flex-col gap-1 mt-1 pl-3 transition-all duration-300" id="workspace-module">
              {/* Populated dynamically from .mount-workspace-items */}
            </ul>
          </div>
        </div>

        {/* Legal dropdown Section */}
        <div className="sidebar-legal-area px-5 py-2">
          <div className="module-wrapper">
            <button className="module-trigger w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 text-sm font-semibold cursor-pointer" onclick='window.toggleModuleDropdown("legal-policy-module")'>
              <span id="legal-dropdown-title">Legal</span>
              <span className="arrow-indicator text-[10px] transform transition-transform duration-200" id="legal-policy-module-arrow">▾</span>
            </button>
            <ul className="module-dropdown-list ui-hidden flex flex-col gap-1 mt-1 pl-3 transition-all duration-300" id="legal-policy-module">
              {/* Populated dynamically from .mount-legal-items */}
            </ul>
          </div>
        </div>

        {/* Settings Selectors */}
        <div className="sidebar-l10n-area px-5 py-3 border-t border-slate-800/60 mt-4">
          <div className="module-wrapper flex flex-col gap-4">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest" data-l10n="preferences">
              Preferences
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 font-semibold mb-1.5" data-l10n="language_locale">Language &amp; Locale</span>
              <div className="settings-select-box bg-slate-950 border border-slate-800 rounded-xl p-1">
                <select id="sidebar-language-selector" className="settings-select w-full bg-transparent border-0 text-slate-200 text-xs px-2 py-1.5 outline-none cursor-pointer" onchange="window.setLanguage(this.value)">
                  <option value="en" className="bg-slate-900">English (EN)</option>
                  <option value="hi" className="bg-slate-900">हिन्दी (HI)</option>
                  <option value="fr" className="bg-slate-900">Français (FR)</option>
                </select>
              </div>
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 font-semibold mb-1.5" data-l10n="preferred_currency">Preferred Currency</span>
              <div className="settings-select-box bg-slate-950 border border-slate-800 rounded-xl p-1">
                <select id="sidebar-currency-selector" className="settings-select w-full bg-transparent border-0 text-slate-200 text-xs px-2 py-1.5 outline-none cursor-pointer" onchange="window.setCurrency(this.value)">
                  <option value="INR" className="bg-slate-900">INR (₹)</option>
                  <option value="USD" className="bg-slate-900">USD ($)</option>
                  <option value="EUR" className="bg-slate-900">EUR (€)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="sidebar-social-links-container px-5 py-4 border-t border-slate-800/60 mt-2">
          <h4 id="sidebar-social-title-display" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            Connect
          </h4>
          <div id="sidebar-social-icons" className="social-icons-row flex items-center justify-between w-full gap-2">
            {/* Populated dynamically from .mount-social-items */}
          </div>
        </div>
      </div>

      {/* Sidebar User profile row */}
      <div className="avatar-footer-row flex items-center justify-between gap-3 h-[72px] px-5 bg-slate-950/60 border-t border-slate-800/60">
        <div className="avatar-left-info flex items-center gap-3 overflow-hidden">
          <div className="user-avatar-circle w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm text-slate-100 flex-shrink-0">
            <span>U</span>
          </div>
          <div className="user-meta-strings flex flex-col min-w-0">
            <span className="user-display-name text-sm font-semibold text-slate-100 truncate" data-l10n="guest_user">Guest User</span>
            <span className="user-display-role text-[10px] text-slate-500 truncate" data-l10n="workspace_client">Workspace Client</span>
          </div>
        </div>
        <button aria-label="Settings" className="btn-settings-gear w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 cursor-pointer transition-all duration-300" onclick="alert('Settings panel active!')">
          ⚙
        </button>
      </div>
    </aside>

    <div className="main-view-wrapper flex-1 flex flex-col h-screen overflow-hidden relative">
      {/* Top Navbar Header */}
      <header className="top-navbar-header h-16 min-h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="btn-hamburger lg:hidden text-slate-700 dark:text-slate-200 text-xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer" onclick="window.toggleSidebarDrawer()">
            ☰
          </button>
        </div>

        {/* Dual Input Search Bar (Indeed style) */}
        <div className="header-search-wrapper flex-1 max-w-2xl">
          <BSection id="header-search" className="w-full" maxwidgets={1} showaddelement={true}>
            <BWidget id="BlogSearch1" type="BlogSearch" title="Search items &amp; services" locked={false}>
              <BIncludable id="main">
                <div className="header-center-search w-full">
                  <form expr:action="data:blog.searchUrl" id="search-form" method="get" className="search-form-v2 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-1 shadow-sm transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10">
                    <BIf cond="not data:view.isPreview">
                      <BEval expr='""' />
                    </BIf>
                    <div className="search-input-group flex-1 flex items-center gap-2.5 px-3 min-w-0">
                      <span className="search-icon-v2 text-slate-400 flex-shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      </span>
                      <input autocomplete="off" className="search-input-v2 bg-transparent border-0 text-sm font-medium outline-none text-slate-800 dark:text-slate-100 w-full" id="search-q" name="q" placeholder="Service title, keywords, or company" data-l10n-placeholder="search_placeholder" type="text" />
                    </div>

                    <div className="search-divider w-px h-6 bg-slate-200 dark:bg-slate-800" />

                    <div className="search-input-group flex-1 flex items-center gap-2.5 px-3 min-w-0 cursor-pointer" onclick="if(window.LocationRenderer) window.LocationRenderer.showModal()">
                      <span className="search-icon-v2 text-slate-400 flex-shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      </span>
                      <input autocomplete="off" className="search-input-v2 bg-transparent border-0 text-sm font-medium outline-none text-slate-800 dark:text-slate-100 w-full cursor-pointer" id="loc-display-v2" placeholder="City, PIN code" data-l10n-placeholder="location_placeholder" readonly={true} type="text" />
                    </div>

                    <button className="search-btn-v2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20" type="submit" data-l10n="find">
                      Find
                    </button>
                  </form>
                </div>
              </BIncludable>
            </BWidget>
          </BSection>
        </div>

        {/* Right side of header - profile / theme quick toggles */}
        <div className="flex items-center gap-3">
          <button className="btn-theme-toggle lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-100 bg-slate-50 dark:bg-slate-800/40 cursor-pointer" onclick="document.getElementById('theme-mode-switcher').click()">
            ☾
          </button>
          <div className="lg:hidden w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300 cursor-pointer" onclick="if(window.openSettingsModal) window.openSettingsModal()">
            U
          </div>
        </div>
      </header>

      {/* Scrollable Categories List */}
      <div className="category-section-wrapper bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 z-30">
        <BSection id="category-section" className="w-full" showaddelement={true}>
          <BWidget id="Label1" type="Label" title="Categories" locked={true}>
            <BIncludable id="main">
              <BIf cond="data:view.isMultipleItems">
                <div className="cat-bar overflow-x-auto whitespace-nowrap py-3 px-6 scrollbar-none flex items-center">
                  <div className="cat-inner flex gap-3 max-w-6xl mx-auto w-full">
                    <a expr:class='data:view.isSearch and !data:view.search.label ? "cat-link bg-indigo-600 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-md shadow-indigo-600/10" : "cat-link bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-4 py-1.5 rounded-full text-xs hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all"' expr:href="data:blog.homepageUrl + &quot;search&quot;">
                      ALL
                    </a>
                    <BLoop values="data:labels" varName="label">
                      <a className="cat-link bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-4 py-1.5 rounded-full text-xs hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all" expr:href="data:label.url">
                        <BData value="label.name" />
                      </a>
                    </BLoop>
                  </div>
                </div>
              </BIf>
            </BIncludable>
          </BWidget>
        </BSection>
      </div>

      {/* Main content layer */}
      <main className="scrollable-main-content flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="main-section-wrapper max-w-6xl mx-auto">
          <BSection id="main-section" className="main-feed-section w-full" showaddelement={true}>
            <BWidget id="Blog1" type="Blog" title="Blog Posts" locked={true}>
              <BIncludable id="main">
                {/* Conditional layouts based on views */}
                <BIf cond="data:view.isMultipleItems">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <BLoop values="data:posts" varName="post">
                      <div className="card group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col h-full">
                        {/* Card Image */}
                        <div className="card-img-wrapper relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                          <img className="card-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" expr:src='data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800"' alt="featured image" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <BIf cond="data:post.labels">
                            <span className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200/20 shadow-sm">
                              <BData value="data:post.labels[0].name" />
                            </span>
                          </BIf>
                        </div>

                        {/* Card Body */}
                        <div className="card-body p-6 flex flex-col flex-1">
                          <h3 className="card-title text-base font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 mb-3 min-h-[2.8em] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            <a expr:href="data:post.url">
                              <BData value="post.title" />
                            </a>
                          </h3>

                          <div className="card-excerpt text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                            {/* If snippet is available, display snippet, otherwise render basic post snippet */}
                            <BEval expr="data:post.snippet" />
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Starting At</span>
                              <span className="card-price text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                                ₹2,499.00
                              </span>
                            </div>

                            {/* Quick Actions trigger React overlays dynamically */}
                            <button className="add-to-bag-btn bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white dark:bg-slate-800/40 dark:hover:bg-indigo-600 dark:text-slate-300 dark:hover:text-white border border-slate-100 dark:border-slate-700/60 hover:border-indigo-600 dark:hover:border-indigo-600 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                                    expr:onclick='&quot;if(window.CartManager){ window.CartManager.addItem({id:\\&quot;&quot; + data:post.id + &quot;\\&quot;, name:\\&quot;&quot; + data:post.title + &quot;\\&quot;, price:2499, img:\\&quot;&quot; + (data:post.featuredImage ? data:post.featuredImage : &quot;https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800&quot;) + &quot;\\&quot;}); }&quot;'>
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    </BLoop>
                  </div>
                </BIf>

                <BIf cond="data:view.isSingleItem">
                  <BLoop values="data:posts" varName="post">
                    <div className="product-layout grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 lg:p-10 shadow-sm">
                      {/* Media Slider Column */}
                      <div className="carousel-container flex flex-col gap-4">
                        <div className="carousel relative aspect-square bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 rounded-2xl overflow-hidden flex items-center justify-center">
                          <img className="max-w-full max-h-full object-contain p-6" expr:src='data:post.featuredImage ? data:post.featuredImage : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800"' alt="Detail main cover image" />
                          <span className="absolute top-4 left-4 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20">
                            Active Premium
                          </span>
                        </div>
                      </div>

                      {/* Product / Post Meta Info Column */}
                      <div className="product-meta-details flex flex-col justify-between">
                        <div className="meta-top">
                          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-4">
                            <BData value="post.title" />
                          </h1>

                          <div className="flex items-center gap-2 mb-6">
                            <span className="price text-3xl font-black text-indigo-600 dark:text-indigo-400">
                              ₹2,499.00
                            </span>
                            <span className="stock-badge in-stock bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                              In Stock
                            </span>
                          </div>

                          {/* Variants triggers */}
                          <div className="v-group mb-6">
                            <span className="v-label text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Variant Option</span>
                            <div className="v-options flex gap-2">
                              <button className="v-btn active bg-indigo-600 text-white border-2 border-indigo-600 px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 cursor-pointer">
                                Standard Pack
                              </button>
                              <button className="v-btn bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all">
                                Extended Pack
                              </button>
                            </div>
                          </div>

                          {/* Details excerpt / main post contents */}
                          <div className="post-body text-slate-500 dark:text-slate-355 text-sm leading-relaxed mb-6">
                            <BData value="post.body" />
                          </div>
                        </div>

                        {/* Main E-commerce transactional actions */}
                        <div className="meta-bottom pt-6 border-t border-slate-100 dark:border-slate-800/60 mt-6">
                          <div className="flex flex-wrap gap-4 items-center">
                            <button className="v-btn active flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 flex items-center justify-center gap-2"
                                    expr:onclick='&quot;if(window.CartManager){ window.CartManager.addItem({id:\\&quot;&quot; + data:post.id + &quot;\\&quot;, name:\\&quot;&quot; + data:post.title + &quot;\\&quot;, price:2499, img:\\&quot;&quot; + (data:post.featuredImage ? data:post.featuredImage : &quot;https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&amp;w=800&quot;) + &quot;\\&quot;}); }&quot;'>
                              <span>Add to Bag</span>
                            </button>

                            <button className="v-btn bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                                    onclick="if(window.LocationRenderer) window.LocationRenderer.showModal()">
                              <span>Check Location Availability</span>
                            </button>
                          </div>

                          {/* Geotag references */}
                          <div className="seller-box bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 mt-8 flex flex-col items-start">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1">Fulfillment center</span>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Antinna Core Warehousing</span>
                            <a href="#" className="geo-badge mt-3 inline-flex items-center gap-2 bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold px-4 py-2 rounded-full border border-sky-500/20 hover:scale-[1.02] transition-transform">
                              📍 View on map
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Speech Bubble styled comments */}
                    <div id="comments" className="max-w-4xl mt-12">
                      <h3 className="section-title text-lg font-bold border-l-4 border-indigo-600 pl-4 mb-6">
                        User Telemetry Comments
                      </h3>
                      <div id="comments-block" className="flex flex-col gap-6">
                        <div className="comment flex gap-4 items-start">
                          <div className="avatar-image-container w-11 h-11 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex-shrink-0">
                            <img className="author-avatar w-full h-full object-cover" src="https://www.gravatar.com/avatar/00000000000000000000000000000000" alt="anonymous user avatar" />
                          </div>
                          <div className="comment-block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl rounded-tl-none shadow-sm flex-1">
                            <div className="comment-author text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                              Anish Sharma
                            </div>
                            <div className="comment-body text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                               REDESIGN: This layout is absolutely top-tier! Extremely responsive on my mobile browser, and the glassmorphic sidebar feels incredibly modern.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BLoop>
                </BIf>
              </BIncludable>
            </BWidget>
          </BSection>
        </div>
      </main>
    </div>

    {/* Shared Global Client Elements mount placeholder */}
    <div id="react-root"></div>

    {/* Mount Client Script compiled Bundle via Blogger JSX Client loader */}
    <BClientScript scriptPath={REACT_APP_ENTRY} mode="cdata" />

    {/* Hamburger menu floating FAB triggers mobile sidebar panel */}
    <button className="mobile-menu-fab lg:hidden fixed bottom-6 left-6 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl shadow-lg border border-slate-800 cursor-pointer z-50 hover:scale-105 transition-transform" onclick="window.toggleSidebarDrawer()">
      ☰
    </button>

    <script type="text/javascript">
      {`//<![CDATA[
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
      //]]>`}
    </script>
  </div>
);

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
      <Title id="ram">Blogger Tailwind React Premium Redesign</Title>,
      <GlobalHeaderScripts />,
      <BSkin css={OUTPUT_CSS_PATH} />,
    ],
    body: [<BlogLayout />],
  });

  const xml = theme.generate();

  const outputPath = path.resolve(DIST_DIR, "blogger-theme.xml");
  fs.writeFileSync(outputPath, xml as any, "utf8");

  console.log(`\n🎉 Success! Blogger XML theme generated at: ${outputPath}`);
}

buildTheme();
