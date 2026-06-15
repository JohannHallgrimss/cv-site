import { motion } from "framer-motion";
import type { Translations } from "../translations";

type ExperienceProps = {
  t: Translations["experience"];
};

export default function Experience({ t }: ExperienceProps) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <h2>{t.title}</h2>
      <div className="timeline">
        {t.roles.map((role) => (
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
  );
}
