/// // script ==> // ,
///   // "build:react": "npm run build:css && npx tsx --tsconfig tsconfig.theme.json theme/src/build-react.tsx"

// import * as fs from "fs";
// import * as path from "path";
// import { fileURLToPath } from "node:url";
// import { buildSync } from "esbuild";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Absolute path resolution relative to workspace root
// const ROOT_DIR = path.resolve(__dirname, "../../");
// const DIST_DIR = path.resolve(ROOT_DIR, "dist");
// const OUTPUT_CSS_PATH = path.resolve(DIST_DIR, "output.css");
// const REACT_APP_ENTRY = path.resolve(ROOT_DIR, "app/src/index.tsx");

// try {
//   fs.mkdirSync(DIST_DIR, { recursive: true });
//   const absolutePath = path.resolve(REACT_APP_ENTRY);
//   buildSync({
//     entryPoints: [absolutePath],
//     bundle: true,
//     format: "iife",
//     outfile: path.resolve(DIST_DIR, "react.js"),
//   });
//   console.log("build complete");
// } catch (err) {
//   console.error("build failed", err);
//   process.exit(1);
// }
