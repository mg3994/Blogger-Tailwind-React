import React from "react";
import { createRoot } from "react-dom/client";

// Import robust vanilla orchestrator to run alongside the React Overlays
import "./main";

import { App } from "./App";

const rootElement = document.getElementById("react-root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
