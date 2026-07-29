import { jsx as _jsx, jsxs as _jsxs } from "@antinna/blogger-theme/jsx-runtime";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";
import { BloggerTheme, BSection, BWidget, BClientScript, BSkin, Title, BIf, BIncludable, BInclude, BLoop, BData, BEval, } from "@antinna/blogger-theme";
// Polyfill __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Absolute path resolution relative to workspace root
const ROOT_DIR = path.resolve(__dirname, "../../");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const OUTPUT_CSS_PATH = path.resolve(DIST_DIR, "output.css");
const REACT_APP_ENTRY = path.resolve(ROOT_DIR, "app/src/index.tsx");
const BlogHeader = () => (_jsxs("header", { className: "header-container", style: {}, children: [_jsx(BSection, { id: "main-header", className: "main-header-sec", maxwidgets: 1, showaddelement: true, children: _jsx(BWidget, { id: "Header1", type: "Header", title: "My React Blog Header", locked: true }) }), _jsx(BIf, { cond: "data:view.isHomepage", children: _jsxs("div", { className: "homepage-banner", cond: "data:view.isHomepage", children: [_jsxs("h1", { "expr:title": "data:blog.title", children: ["Welcome to ", new BEval({ expr: "data:blog.title" }), "!"] }), _jsx("p", { children: "A cutting-edge blog layout engineered entirely in TypeScript." })] }) })] }));
const BlogLayout = () => (_jsxs("div", { className: "wrapper-pane", children: [_jsx(BlogHeader, {}), _jsxs("main", { className: "content-area", children: [_jsx(BSection, { id: "main-content-sec", children: _jsx(BWidget, { id: "Blog1", type: "Blog", children: _jsx(BIncludable, { id: "main", children: _jsxs(BLoop, { values: "data:posts", varName: "post", children: [_jsxs("div", { className: "post-item-view", "expr:id": "data:post.id", children: [_jsx("h2", { "expr:class": "data:post.class", children: _jsx("a", { "expr:href": "data:post.url", children: _jsx(BData, { value: "post.title" }) }) }), _jsx("div", { className: "post-body", children: _jsx(BData, { value: "post.body" }) })] }), _jsx(BInclude, { name: "postShareButtons", data: "post" })] }) }) }) }), _jsx("div", { id: "react-root" }), _jsx(BClientScript, { scriptPath: REACT_APP_ENTRY, mode: "cdata" })] })] }));
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
            _jsx(Title, { id: "ram", children: "React Blogger Theme Example" }),
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
