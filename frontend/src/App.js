import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { BookingProvider } from "@/context/BookingContext";
import { useLenis, scrollToEl, scrollToTop } from "@/hooks/useLenis";
import { Nav } from "@/components/layout/Nav";
import { StickyCta } from "@/components/layout/StickyCta";
import { Footer } from "@/components/landing/Footer";
import { BookingModal } from "@/components/booking/BookingModal";
import Landing from "@/pages/Landing";
import CollectionsPage from "@/pages/Collections";

const Layout = () => {
  useLenis();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      scrollToTop();
      return undefined;
    }
    const t = setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) scrollToEl(el);
    }, 150);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash, location.key]);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <StickyCta />
      <BookingModal />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BookingProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/collections" element={<CollectionsPage />} />
            </Route>
          </Routes>
        </BookingProvider>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
