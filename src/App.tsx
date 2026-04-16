import { useState } from "react";
import { HashRouter, NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "./hooks/useTranslation";
import { useTheme } from "./contexts/ThemeContext";
import { createPages } from "./config/pageConfig";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, changeLang } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const pages = createPages(t);

  const closeMenu = () => setMenuOpen(false);

  return (
    <HashRouter>
      <header className="header">
        <div className="brand-row">
          <strong>Jóhann Hallgrímsson</strong>
          <div className="controls">
            <button className="theme-toggle" onClick={toggleDarkMode} title={isDarkMode ? "Light mode" : "Dark mode"}>
              {isDarkMode ? <SunIcon width={20} /> : <MoonIcon width={20} />}
            </button>
        
              <button className={lang === "is" ? "active-lang" : "inactive-lang"} onClick={() => changeLang("is")}>IS</button>
              <button className={lang === "en" ? "active-lang" : "inactive-lang"} onClick={() => changeLang("en")}>EN</button>

          </div>
        </div>

        <motion.button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          animate={{ rotate: menuOpen ? 450 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {menuOpen ? <XMarkIcon width={28} /> : <Bars3Icon width={28} />}
        </motion.button>

        {/* Desktop Nav - Always visible */}
        <nav className="nav desktop-nav">
          {pages.map((page) => (
            <NavLink key={page.id} to={page.path} end className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              {t.nav[page.label]}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Nav - Animated dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                className="menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenu}
              />
              <motion.nav
                className="nav mobile-nav open"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  mass: 1,
                }}
              >
                {pages.map((page) => (
                  <NavLink key={page.id} to={page.path} end className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
                    {t.nav[page.label]}
                  </NavLink>
                ))}
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      <div className="container">
        <Routes>
          {pages.map((page) => (
            <Route key={page.id} path={page.path} element={page.component} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
