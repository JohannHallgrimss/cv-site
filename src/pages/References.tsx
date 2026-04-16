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
      comment: ""
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
                <button
                  className="quote-header"
                  onClick={() => toggleQuote(item.name)}
                >
                  <span className="quote-name">{item.name}</span>
                  <ChevronDownIcon
                    className={`chevron-icon ${expandedQuote === item.name ? "rotated" : ""}`}
                  />
                </button>
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
