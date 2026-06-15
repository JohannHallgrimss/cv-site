import { useState, useRef, useEffect } from "react";
import { HashRouter, NavLink, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "./hooks/useTranslation";
import { useTheme } from "./contexts/ThemeContext";
import { createPages, type PageConfig } from "./config/pageConfig";
import Footer from "./components/Footer";

const WEB_TOOLS = [
  { id: "all", label: "title" },
  { id: "regexTester", label: "regexTester" },
  { id: "regexGenerator", label: "regexGenerator" },
  { id: "jsonValidator", label: "jsonValidator" },
  { id: "dateParser", label: "dateParser" },
  { id: "linqDemo", label: "linqDemo" },
  { id: "jsonToModel", label: "jsonToModel" },
  { id: "converter", label: "converter" },
];

function PageRoutes({ pages }: { pages: PageConfig[] }) {
  const location = useLocation();

  return (
    <Routes>
      {pages.map((page) => (
        <Route
          key={page.id}
          path={page.path}
          element={
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {page.component}
              </motion.div>
            </AnimatePresence>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const { lang, t, changeLang } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const pages = createPages(t);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (submenuOpen && submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setSubmenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [submenuOpen]);

  return (
    <HashRouter>
      <header className="header">
        <div className="brand-row">
          <a href="${base}/cv-site">
            <strong>Jóhann Hallgrímsson</strong>
          </a>
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
          {pages.map((page) => page.id === "webTools" ? (
            <div key={page.id} className="nav-item-with-submenu" ref={submenuRef}>
              <div
                className="nav-submenu-trigger"
                onClick={() => setSubmenuOpen(!submenuOpen)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSubmenuOpen(!submenuOpen)}
              >
                {t.nav[page.label]}
                <ChevronDownIcon width={16} className={submenuOpen ? "chevron-open" : ""} />
              </div>
              <AnimatePresence>
                {submenuOpen && (
                  <motion.div
                    className="submenu desktop-submenu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {WEB_TOOLS.map((tool) => (
                      <NavLink
                        key={tool.id}
                        to={`${page.path}?tool=${tool.id}`}
                        className="submenu-link"
                        onClick={() => setSubmenuOpen(false)}
                      >
                        {t.webTools[tool.label as keyof typeof t.webTools]}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
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
                {pages.map((page) => page.id === "webTools" ? (
                  <div key={page.id} className="mobile-nav-item-with-submenu">
                    <div
                      className="nav-submenu-trigger mobile"
                      onClick={() => setSubmenuOpen(!submenuOpen)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSubmenuOpen(!submenuOpen)}
                    >
                      {t.nav[page.label]}
                      <ChevronDownIcon width={16} className={submenuOpen ? "chevron-open" : ""} />
                    </div>
                    <AnimatePresence>
                      {submenuOpen && (
                        <motion.div
                          className="submenu mobile-submenu"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {WEB_TOOLS.map((tool) => (
                            <NavLink
                              key={tool.id}
                              to={`${page.path}?tool=${tool.id}`}
                              className="submenu-link"
                              onClick={() => {
                                setSubmenuOpen(false);
                                closeMenu();
                              }}
                            >
                              {t.webTools[tool.label as keyof typeof t.webTools]}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
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
        <PageRoutes pages={pages} />
      </div>
      <Footer />
    </HashRouter>
  );
}
