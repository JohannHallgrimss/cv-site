import { useState, useEffect } from "react";
import { translations, type Language, type Translations } from "../translations";

const LANG_CHANGE_EVENT = "app-lang-changed";

export function useTranslation() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    return saved === "is" || saved === "en" ? saved : "is";
  });

  const [t, setT] = useState<Translations>(translations[lang]);

  // Keep translations in sync when `lang` changes locally
  useEffect(() => {
    setT(translations[lang]);
  }, [lang]);

  // Listen for language changes broadcast from other hook instances or other tabs
  useEffect(() => {
    const onLangEvent = (e: Event) => {
      const newLang = (e as CustomEvent).detail as Language | undefined;
      if (newLang === "is" || newLang === "en") {
        setLang(newLang);
        setT(translations[newLang]);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === "lang" && (e.newValue === "is" || e.newValue === "en")) {
        const newLang = e.newValue as Language;
        setLang(newLang);
        setT(translations[newLang]);
      }
    };

    window.addEventListener(LANG_CHANGE_EVENT, onLangEvent as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(LANG_CHANGE_EVENT, onLangEvent as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    setT(translations[newLang]);
    localStorage.setItem("lang", newLang);
    window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: newLang }));
  };

  return { lang, t, changeLang };
}
