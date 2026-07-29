import React from "react";
import {
  BSection,
  BWidget,
  BIncludable,
  BLoop,
  BData,
  BIf,
  BEval,
} from "@antinna/blogger-theme";

export const Sidebar = () => (
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
      {/* Primary Links Section */}
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
      <button aria-label="Settings" className="btn-settings-gear w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 cursor-pointer transition-all duration-300" onclick="if(window.openSettingsModal) window.openSettingsModal()">
        ⚙
      </button>
    </div>
  </aside>
);
