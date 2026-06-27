import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/global.css";

// Mount React app
const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Hide splash screen when React mounts
  root.classList.add("ready");
  const splash = document.getElementById("splash");
  if (splash) {
  // Restore body scroll BEFORE fading splash so ScrollTrigger
  // can measure correct scroll heights when it initializes.
  document.body.style.overflow = "";
  document.body.style.overflowX = "clip";
  splash.style.opacity = "0";
  setTimeout(() => {
    splash.style.display = "none";
    // Refresh ScrollTrigger after the splash is fully gone.
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }, 300);
  }
}
