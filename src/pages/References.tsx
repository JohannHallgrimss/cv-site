import { motion } from "framer-motion";
import type { Translations } from "../translations";

type ReferencesProps = {
  t: Translations["references"];
};

export default function References({ t }: ReferencesProps) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <h2>{t.title}</h2>
      {t.items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </motion.div>
  );
}
