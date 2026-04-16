import { useEffect, useState } from "react";
import { HashRouter, NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { translations, type Language } from "./translations";
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import Experience from "./pages/Experience";
import References from "./pages/References";

export default function App() {
  const [lang, setLang] = useState<Language>("is");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "is" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const changeLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <HashRouter>
      <header className="header">
        <div className="brand-row">
          <strong>Jóhann Hallgrímsson</strong>
          <div className="lang-switch">
            <button className={lang === "is" ? "active-lang" : "inactive-lang"} onClick={() => changeLang("is")}>IS</button>
            <button className={lang === "en" ? "active-lang" : "inactive-lang"} onClick={() => changeLang("en")}>EN</button>
          </div>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <XMarkIcon width={28} /> : <Bars3Icon width={28} />}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
            {t.nav.home}
          </NavLink>
          <NavLink to="/knowledge" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
            {t.nav.knowledge}
          </NavLink>
          <NavLink to="/experience" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
            {t.nav.experience}
          </NavLink>
          <NavLink to="/references" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
            {t.nav.references}
          </NavLink>
        </nav>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home t={t.home} />} />
          <Route path="/knowledge" element={<Knowledge t={t.knowledge} />} />
          <Route path="/experience" element={<Experience t={t.experience} />} />
          <Route path="/references" element={<References language={lang} title={t.references.title} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
