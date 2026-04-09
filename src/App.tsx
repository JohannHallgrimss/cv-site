import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { translations, type Language } from "./translations";

type Page = "home" | "knowledge" | "experience" | "references";

export default function App() {
  const [page, setPage] = useState<Page>("home");
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

  const goTo = (p: Page) => {
    setPage(p);
    setMenuOpen(false); // close menu on click
  };

  return (
    <>
      <header className="header">
        <div className="brand-row">
          <strong>Jóhann Hallgrímsson</strong>
          <div className="lang-switch">
            <button className={lang === "is" ? "active-lang" : "inactive-lang"} onClick={() => changeLang("is")}>IS</button>
            <button className={lang === "en" ? "active-lang" : "inactive-lang"} onClick={() => changeLang("en")}>EN</button>
          </div>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XMarkIcon width={28} /> : <Bars3Icon width={28} />}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a className={page === "home" ? "active" : ""} onClick={() => goTo("home")}>{t.nav.home}</a>
          <a className={page === "knowledge" ? "active" : ""} onClick={() => goTo("knowledge")}>{t.nav.knowledge}</a>
          <a className={page === "experience" ? "active" : ""} onClick={() => goTo("experience")}>{t.nav.experience}</a>
          <a className={page === "references" ? "active" : ""} onClick={() => goTo("references")}>{t.nav.references}</a>
        </nav>
      </header>

      <div className="container">
        {page === "home" && (
          <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <img src="profile.jpg" alt="Profile" className="profile" />

            <h2>{t.home.personalTitle}</h2>
            <p>{t.home.phone}</p>
            <p>{t.home.email}</p>

            <h2>{t.home.summaryTitle}</h2>
            <p>{t.home.summaryText}</p>

            <a href="cv-is.pdf" download>
              <button>{t.home.downloadCvIs}</button>
            </a>
            <a href="cv-en.pdf" download>
              <button>{t.home.downloadCvEn}</button>
            </a>
            <a href="https://www.linkedin.com/in/joihallgrims/" target="_blank" rel="noopener noreferrer" className="linkedin-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.22 8.5h4.52V24H.22V8.5zM8.5 8.5h4.33v2.11h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V24h-4.52v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H8.5V8.5z" />
              </svg>
              <span> LinkedIn</span>
            </a>
          </motion.div>
        )}

        {page === "knowledge" && (
          <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <h2>{t.knowledge.educationTitle}</h2>
            <ul>
              {t.knowledge.educationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2>{t.knowledge.skillsTitle}</h2>
            <ul>
              {t.knowledge.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <p>{t.knowledge.summaryText}</p>
          </motion.div>
        )}

        {page === "experience" && (
          <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <h2>{t.experience.title}</h2>
            <div className="timeline">
              {t.experience.roles.map((role) => (
                <div className="timeline-item" key={role.heading}>
                  <h3>{role.heading}</h3>
                  <p>{role.paragraph}</p>
                  {role.bullets && (
                    <ul>
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {page === "references" && (
          <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <h2>{t.references.title}</h2>
            {t.references.items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
