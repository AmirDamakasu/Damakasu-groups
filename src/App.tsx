import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Seo } from "@/components/Seo";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Markets from "./pages/Markets";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

// The admin dashboard pulls in large libraries (spreadsheet export), so it loads only when visited.
const Admin = lazy(() => import("./pages/Admin"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Wait until the target section has rendered, then bring it into view.
    const timer = window.setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 50);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

/**
 * Wrapper shared by the browser app and the build-time prerenderer. (The unused React Query,
 * tooltip and toast providers were removed: nothing on the site called them, and they added
 * ~25 KB of JavaScript to every page.)
 */
export function AppShell({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <>
      <Seo />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <AppShell>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppShell>
);

export default App;
