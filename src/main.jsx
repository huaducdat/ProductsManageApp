import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import App from "./App.jsx";
import "antd/dist/reset.css";
import "./index.css";

import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
