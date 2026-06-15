import { motion } from "framer-motion";
import type { Translations } from "../translations";

type KnowledgeProps = {
  t: Translations["knowledge"];
};

export default function Knowledge({ t }: KnowledgeProps) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <h2>{t.educationTitle}</h2>
      <ul>
        {t.educationItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>{t.skillsTitle}</h2>
      <ul>
        {t.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <p>{t.summaryText}</p>
    </motion.div>
  );
}
