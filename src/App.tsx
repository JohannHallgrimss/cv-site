import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type Language = "is" | "en";
type Page = "home" | "knowledge" | "experience" | "references";

type TContent = Record<Language, Record<Page | "download", string>>;

const translations: TContent = {
  is: {
    home: "Forsíða",
    knowledge: "Þekking",
    experience: "Starfsreynsla",
    references: "Meðmælendur",
    download: "Sækja ferilskrá",
  },
  en: {
    home: "Home",
    knowledge: "Knowledge",
    experience: "Experience",
    references: "References",
    download: "Download CV",
  },
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [lang, setLang] = useState<Language>("is");
  const [menuOpen, setMenuOpen] = useState(false);

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
        <strong>Jóhann Hallgrímsson</strong>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XMarkIcon width={28} /> : <Bars3Icon width={28} />}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a onClick={() => goTo("home")}>{translations[lang].home}</a>
          <a onClick={() => goTo("knowledge")}>{translations[lang].knowledge}</a>
          <a onClick={() => goTo("experience")}>{translations[lang].experience}</a>
          <a onClick={() => goTo("references")}>{translations[lang].references}</a>
        </nav>
      </header>

      <div className="container">
        {page === "home" && (
          <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <img src="profile.jpg" alt="Profile" className="profile" />

            <h2>Persónulegar upplýsingar</h2>
            <p>Sími: +354 611 4748</p>
            <p>Email: joh@mi.is</p>

            <h2>Samantekt</h2>
            <p>
              Senior Full-Stack hugbúnaðarþróunarsérfræðingur með yfir 15 ára reynslu af þróun skalanlegra
              .NET lausn. Sérhæfing í bakendaþróun, REST API hönnun, gagnagrunnum og veflausnum. Mikill áhugi á
              gervigreind, sjálfvirknivæðingu og snjöllum lausnum.
            </p>

            <a href="cv-is.pdf" download>
              <button>{translations[lang].download}</button>
            </a>
            <a href="cv-en.pdf" download>
              <button>Ferilsskrá á ensku</button>
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
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>Menntun</h2>
            <p>Tölvunarfræði - HÍ</p>
            <h2>Hæfni</h2>
            <ul>
              <li>.NET / C#</li>
              <li>React</li>
              <li>SQL</li>
              <li>Azure</li>
            </ul>
            <p>
              C#, .NET Core, ASP.NET, REST APIs, Entity Framework, MS SQL Server, PostgreSQL, JavaScript, TypeScript, HTML,
              CSS, Angular, React, Microsoft Graph API, Google Cloud APIs, Azure AD, Agile/Scrum
            </p>
          </motion.div>
        )}

        {page === "experience" && (
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>Starfsreynsla</h2>
            <div className="timeline">
              <div className="timeline-item">
                <h3>Huxun - CEO 2025 - 2026</h3>
                <p>Starfaði við þróun á kerfi og hliðarkerfum sem snúa að hugbúnaðar þróun á spurningalistum fyrir fyrirtæki til
                  að kanna ánæju starfmanna. Tímabundir verkefni. Hugbúnaðarþróun í Agiel framenda og .NET Core bakenda.
                  PostgreSQL og Entity Framework</p>
              </div>
              <div className="timeline-item">
                <h3>One Systems 2017 - 2025</h3>
                <p>CRM, integrations, Microsoft Graph.</p>
                <ul>
                  <li>Starfaði við þróun á CRM kerfi og hliðarkerfum sem eru í notkun hjá flestum sveitarfélögum landsins, auk
                    nokkurra stofnanna og annarra fyrirtækja.</li>
                  <li>Innskráning á vefi með hjálp Auðkennis og island.is.</li>
                  <li>Undirritanir á PDF skjölum með Auðkenni.</li>
                  <li>Senda póst (hnipp og afgreiða skjal) með pósthólfi island.is.</li>
                  <li>MS Graph API til að sækja gögn úr Teams, Outlook, SharePoint og fleirum Microsoft lausnum.</li>
                  <li>2015 - 2017</li>
                  <li>Google Translate API fyrir þýðingar.</li>
                  <li>Aspose framework fyrir vinnslu og umbreytingar á skjölum.</li>
                  <li>Þróun á móti Nav/Ax kerfum í gegnum vefþjónustur.</li>
                  <li>Undirbúning á skilapökkum til vörslu hjá Þjóðskjalasafni.</li>
                  <li>Greiðslulausnir til að sjá um vefgreiðslur frá notendum.</li>
                  <li>Auk annara almennra eða sérsmíðaðra verkefna.</li>
                </ul>
              </div>
              <div className="timeline-item">
                <h3>LS Retail 2015 - 2017</h3>
                <p>Retail systems.</p>
                <ul>
                  <li>Þróun á POS (Point of Sale) kerfi, bæði LSFirst sem er WinForms kerfi skrifað í C# og í nýjum MPOS sem er Metro
                    app skrifað í HTML með TypeScript.</li>
                  <li>Bakenda forritun í AX Dynamics og rekstur þessara kerfa.</li>
                  <li>Stærsta innleiðing POS kerfa í heiminum í samstarfi við Microsoft fyrir AAFES (hluti af Bandaríska hernum), ásamt
                    þróun MPOS fyrir Jet bensínstöðvar í Evrópu og Cracker Barrel sem er veitingarhúsakeðja í Bandaríkjunum.</li>
                  <li>Meðal verkefna var einnig tryggingakerfi skrifað inn í AX Dynamics í X++ og vefsíða í MVC .NET sem notaði
                    auðkenningu frá Íslandslykli. Kerfið sótti efni beint í AX og vistaði með RTS þjónustu.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {page === "references" && (
          <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>Meðmælendur</h2>
            <p>Gunnhildur - CEO Huxun Simi: 840 4990, Email: gunnhildurarnardottir@ceohuxun.is</p>
            <p>Ingimar Andal - One Systems Simi 660 8551, Email: one@one.is</p>
            <p>Hrafnkell Erlendsson - One Systems Simi: 660 8553, Email: Hrafnkell@OneSystems.is</p>
            <p>Eyvindur Tryggvason - LS Retail - Simi: 616 5050</p>
            <p>Íslandspóstur - Íslandspóstur Simi:666 8777</p>
          </motion.div>
        )}
      </div>
    </>
  );
}
