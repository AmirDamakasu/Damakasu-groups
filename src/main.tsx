import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Self-hosted fonts (latin subset) — weights used by the site.
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/dm-sans/latin-800.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
