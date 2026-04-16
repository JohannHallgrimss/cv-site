import { useState, useEffect } from "react";
import { translations, type Language, type Translations } from "../translations";

export function useTranslation() {
  const [lang, setLang] = useState<Language>("is");
  const [t, setT] = useState<Translations>(translations[lang]);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "is" || saved === "en") {
      setLang(saved);
      setT(translations[saved]);
    }
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    setT(translations[newLang]);
    localStorage.setItem("lang", newLang);
  };

  return { lang, t, changeLang };
}
