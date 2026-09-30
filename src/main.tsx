import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./index.css";

const accent = new URLSearchParams(window.location.search).get("accent");
if (accent && ["cyan", "blue", "violet", "lime"].includes(accent)) {
  document.documentElement.dataset.accent = accent;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
