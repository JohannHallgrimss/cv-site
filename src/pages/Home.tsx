import { motion } from "framer-motion";
import type { Translations } from "../translations";

type HomeProps = {
  t: Translations["home"];
};

export default function Home({ t }: HomeProps) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <img src="profile.jpg" alt="Profile" className="profile" />

      <h2>{t.personalTitle}</h2>
      <p>{t.phone}</p>
      <p>{t.email}</p>

      <h2>{t.summaryTitle}</h2>
      <p>{t.summaryText}</p>

      <a href="cv-is.pdf" download>
        <button>{t.downloadCvIs}</button>
      </a>
      <a href="cv-en.pdf" download>
        <button>{t.downloadCvEn}</button>
      </a>
      <a href="https://www.linkedin.com/in/joihallgrims/" target="_blank" rel="noopener noreferrer" className="linkedin-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.22 8.5h4.52V24H.22V8.5zM8.5 8.5h4.33v2.11h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V24h-4.52v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H8.5V8.5z" />
        </svg>
        <span> {t.linkedIn}</span>
      </a>
    </motion.div>
  );
}
