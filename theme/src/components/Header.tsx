import React from "react";
import { BSection, BWidget, BIncludable, BIf, BEval } from "@antinna/blogger-theme";

export const Header = () => (
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
);
