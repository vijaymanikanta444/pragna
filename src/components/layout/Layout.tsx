import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SidebarDrawer from "./SidebarDrawer";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isMenuOpen);
    return () => {
      document.body.classList.remove("drawer-open");
    };
  }, [isMenuOpen]);

  return (
    <div className="app-layout">
      <Header isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <SidebarDrawer isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
}
