import React from "react";

export const InitScripts = () => (
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
            "detect_location": "Detect My Location",
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
  </>
);
