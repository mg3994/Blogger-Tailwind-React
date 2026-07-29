import { jsx as _jsx, jsxs as _jsxs } from "@antinna/blogger-theme/jsx-runtime";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";
import { BloggerTheme, BSection, BWidget, BClientScript, BSkin, Title, BIf, BIncludable, BLoop, BData, BEval, } from "@antinna/blogger-theme";
import { InitScripts } from "./scripts/InitScripts.js";
import { Sidebar } from "./components/Sidebar.js";
import { Header } from "./components/Header.js";
import { CategoryBar } from "./components/CategoryBar.js";
import { PostFeed } from "./components/PostFeed.js";
import { PostDetail } from "./components/PostDetail.js";
// Polyfill __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Absolute path resolution relative to workspace root
const ROOT_DIR = path.resolve(__dirname, "../../");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const OUTPUT_CSS_PATH = path.resolve(DIST_DIR, "output.css");
const REACT_APP_ENTRY = path.resolve(ROOT_DIR, "app/src/index.tsx");
const BlogLayout = () => (_jsxs("div", { className: "app-container flex w-screen h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden", children: [_jsx("div", { id: "sidebar-backdrop", className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden lg:hidden", onclick: "window.toggleSidebarDrawer()" }), _jsxs("div", { className: "ui-hidden", children: [_jsx(BSection, { id: "sidebar-primary-links", className: "sidebar-shared-nav-section", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList1", type: "LinkList", title: "Navigation Menu", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsx("ul", { id: "mount-primary-links", className: "hidden", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("li", { className: "nav-item", children: _jsx("a", { className: "nav-route-link block px-4 py-2.5 rounded-xl text-slate-400 font-medium text-sm transition-all hover:bg-slate-800/40 hover:text-slate-100", "expr:href": "data:link.target", children: _jsx(BData, { value: "link.name" }) }) }) }) }) }) }) }), _jsx(BSection, { id: "sidebar-workspace-links", className: "sidebar-modules-section", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList3", type: "LinkList", title: "Workspace Menu", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsxs("div", { id: "mount-workspace-links", className: "hidden", children: [_jsx("span", { id: "mount-workspace-title", children: _jsx(BEval, { expr: 'data:title != "" and data:title != " " ? data:title : "Workspaces"' }) }), _jsx("ul", { className: "mount-workspace-items", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("li", { className: "workspace-item", children: _jsx("a", { className: "nav-route-link block px-4 py-2 rounded-lg text-slate-400 font-medium text-xs hover:bg-slate-800/40 hover:text-slate-100", "expr:href": "data:link.target", children: _jsx(BData, { value: "link.name" }) }) }) }) })] }) }) }) }), _jsx(BSection, { id: "sidebar-legal-links", className: "sidebar-legal-section", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList2", type: "LinkList", title: "Policies & Legal", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsxs("div", { id: "mount-legal-links", className: "hidden", children: [_jsx("span", { id: "mount-legal-title", children: _jsx(BEval, { expr: 'data:title != "" and data:title != " " ? data:title : "Legal"' }) }), _jsx("ul", { className: "mount-legal-items", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("li", { className: "legal-item", children: _jsx("a", { className: "nav-route-link block px-4 py-2 rounded-lg text-slate-400 font-medium text-xs hover:bg-slate-800/40 hover:text-slate-100", "expr:href": "data:link.target", children: _jsx(BData, { value: "link.name" }) }) }) }) })] }) }) }) }), _jsx(BSection, { id: "social-icon-links", className: "sidebar-social-wrapper", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "LinkList4", type: "LinkList", title: "Connect with us", locked: false, children: _jsx(BIncludable, { id: "main", children: _jsxs("div", { id: "mount-social-links", className: "hidden", children: [_jsx("h4", { id: "mount-social-title", children: _jsx(BEval, { expr: 'data:title != "" and data:title != " " ? data:title : "Connect"' }) }), _jsx("div", { className: "mount-social-items", children: _jsx(BLoop, { values: "data:links", varName: "link", children: _jsx("a", { className: "social-icon-link w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-all duration-200", "expr:href": "data:link.target", target: "_blank", "expr:style": '"-webkit-mask-image: url(" + data:link.name + "); mask-image: url(" + data:link.name + ");"' }) }) })] }) }) }) })] }), _jsx(Sidebar, {}), _jsxs("div", { className: "main-view-wrapper flex-1 flex flex-col h-screen overflow-hidden relative", children: [_jsx(Header, {}), _jsx(CategoryBar, {}), _jsx("main", { className: "scrollable-main-content flex-1 overflow-y-auto p-6 lg:p-8", children: _jsx("div", { className: "main-section-wrapper max-w-6xl mx-auto", children: _jsx(BSection, { id: "main-section", className: "main-feed-section w-full", showaddelement: true, children: _jsx(BWidget, { id: "Blog1", type: "Blog", title: "Blog Posts", locked: true, children: _jsxs(BIncludable, { id: "main", children: [_jsx(BIf, { cond: "data:view.isMultipleItems", children: _jsx(PostFeed, {}) }), _jsx(BIf, { cond: "data:view.isSingleItem", children: _jsx(PostDetail, {}) })] }) }) }) }) })] }), _jsx("div", { id: "react-root" }), _jsx(BClientScript, { scriptPath: REACT_APP_ENTRY, mode: "cdata" }), _jsx("button", { className: "mobile-menu-fab lg:hidden fixed bottom-6 left-6 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl shadow-lg border border-slate-800 cursor-pointer z-50 hover:scale-105 transition-transform", onclick: "window.toggleSidebarDrawer()", children: "\u2630" }), _jsx("script", { type: "text/javascript", children: `//<![CDATA[
      window.toggleSidebarDrawer = function() {
          const sidebar = document.getElementById('sidebar-drawer');
          const backdrop = document.getElementById('sidebar-backdrop');

          if (sidebar && backdrop) {
              sidebar.classList.toggle('drawer-open');
              backdrop.classList.toggle('backdrop-active');
              sidebar.classList.toggle('hidden');
          }
      };

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

      document.addEventListener('DOMContentLoaded', () => {
          const hiddenNav = document.getElementById('mount-primary-links');
          const sidebarNav = document.getElementById('sidebar-nav-menu-list');
          if (hiddenNav && sidebarNav) {
              sidebarNav.innerHTML = hiddenNav.innerHTML;
          }

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
            _jsx(InitScripts, {}),
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
