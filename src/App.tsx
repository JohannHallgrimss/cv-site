import { useState } from "react";
import { HashRouter, NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
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

        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <XMarkIcon width={28} /> : <Bars3Icon width={28} />}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          {pages.map((page) => (
            <NavLink key={page.id} to={page.path} end className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              {t.nav[page.label]}
            </NavLink>
          ))}
        </nav>
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
