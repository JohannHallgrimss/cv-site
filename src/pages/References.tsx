import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type ReferencesProps = {
  title: string;
  quotes: string;
};

const referenceData = {
  items: [
    { 
      name: "Gunnhildur - CEO Huxun", 
      phone: "840 4990", 
      email: "gunnhildurarnar@ceohuxun.is",
      comment: "Jóhann er einn stundvísasti og áreiðanlegasti starfsmaður sem ég hef kynnst. Hann hefur mjög þægilega nærveru, vinnur markvisst og heldur sér vel að verki."
    },
    { 
      name: "Ingimar Arndal - One Systems", 
      phone: "660 8551", 
      email: "one@one.is",
      comment: ""
    },
    { 
      name: "Hrafnkell Erlendsson - One Systems", 
      phone: "660 8553", 
      email: "Hrafnkell@OneSystems.is",
      comment: "Ég vann með Jóhanni Hallgrímssyni í ýmsum þróunarverkefnum í um tíu ár þar sem hann sýndi mikla hæfni í að leysa flókin vandamál og vinna með samstarfsfélögum. Hann er áreiðanlegur, hellir sér af kraft í verkefni og er stundvís."
    },
    { 
      name: "Eyvindur Tryggvason - LS Retail", 
      phone: "616 5050",
      comment: ""
    },
    { 
      name: "Ólafur Th Þosteinsson - Íslandspóstur", 
      phone: "666 8777",
      comment: "Til þess sem málið varðar: ég rita þetta til að gefa Jóhanni Hallgrímssyni mín bestu meðmæli. Jóhann starfaði með mér um árabil þegar ég gegndi stöðu forstöðumanns tölvudeildar Íslandspósts. Jóhann er vinnusamur og afar fær hugbúnaðarsmiður sem býr yfir þeim hæfileika að finna glæsilegar og hnitmiðaðar lausnir á flóknum viðfangsefnum, hvort sem hann vinnur sjálfstætt eða sem hluti af teymi. Þegar hann gerði mistök, sem við gerum öll, gekkst hann við þeim möglunarlaust. Það er ekki sjálfgefið.  Hann er mjög viðfelldinn, opinn og félagslyndur einstaklingur sem mun án efa styrkja hvaða teymi sem hann gengur til liðs við.  Það er mér sönn ánægja að gefa honum mín bestu meðmæli."
    },
  ],
};

export default function References({ title, quotes }: ReferencesProps) {
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);
  const quotedReferences = referenceData.items.filter(item => item.comment);

  const toggleQuote = (name: string) => {
    setExpandedQuote(expandedQuote === name ? null : name);
  };

  return (
    <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <h2>{title}</h2>
      
      {/* Reference List */}
      <div className="references-list">
        {referenceData.items.map((item) => (
          <div key={item.name} className="reference-item">
            <p>
              {item.name} - <a href={`tel:${item.phone}`}>{item.phone}</a>
              {item.email && <>, <a href={`mailto:${item.email}`}>{item.email}</a></>}
            </p>
          </div>
        ))}
      </div>

      {/* Quotes Section */}
      {quotedReferences.length > 0 && (
        <div className="quotes-section">
          <h3>{quotes}</h3>
          <div className="quotes-list">
            {quotedReferences.map((item) => (
              <motion.div
                key={item.name}
                className={`quote-item ${expandedQuote === item.name ? "expanded" : ""}`}
                layout
              >
                <a
                  className="quote-header"
                  onClick={() => toggleQuote(item.name)}
                >
                  <span className="quote-name">{item.name}</span>
                  <ChevronDownIcon
                    className={`chevron-icon ${expandedQuote === item.name ? "rotated" : ""}`}
                  />
                </a>
                <AnimatePresence mode="wait">
                  {expandedQuote === item.name && (
                    <motion.div
                      className="quote-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{item.comment}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
