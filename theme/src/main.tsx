
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";
import {
  BloggerTheme,
  BSection,
  BWidget,
  BClientScript,
  BSkin,
  Title ,
  BIf,
  BIncludable,
  BInclude,
  BLoop,
  BData,
  Expr,
  Data,
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

const BlogHeader = () => (
  <header className="header-container" style={{}}>
    <BSection
      id="main-header"
      className="main-header-sec"
      maxwidgets={1}
      showaddelement={true}
    >
      <BWidget
        id="Header1"
        type="Header"
        title="My React Blog Header"
        locked={true}
      />
    </BSection>

    <BIf cond="data:view.isHomepage">
      <div className="homepage-banner" cond="data:view.isHomepage">
        <h1 expr:title="data:blog.title">
          Welcome to {new BEval({ expr: "data:blog.title" })}!
        </h1>
        <p>A cutting-edge blog layout engineered entirely in TypeScript.</p>
      </div>
    </BIf>
  </header>
);

const BlogLayout = () => (
  <div className="wrapper-pane">
    <BlogHeader />

    <main className="content-area">
      <BSection id="main-content-sec">
        <BWidget id="Blog1" type="Blog">
          <BIncludable id="main">
            <BLoop values="data:posts" varName="post">
              <div className="post-item-view" expr:id="data:post.id">
                <h2 expr:class="data:post.class">
                  <a expr:href="data:post.url">
                    <BData value="post.title" />
                  </a>
                </h2>
                <div className="post-body">
                  <BData value="post.body" />
                </div>
              </div>

              <BInclude name="postShareButtons" data="post" />
            </BLoop>
          </BIncludable>
        </BWidget>
      </BSection>

      <div id="react-root"></div>

      <BClientScript scriptPath={REACT_APP_ENTRY} mode="cdata" />
    </main>
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
      <Title id="ram">React Blogger Theme Example</Title>, 
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
