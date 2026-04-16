import { motion } from "framer-motion";

type ReferencesProps = {
  title: string;
};

const referenceData = {
  items: [
    { name: "Gunnhildur - CEO Huxun", phone: "840 4990", email: "gunnhildurarnar@ceohuxun.is" },
    { name: "Ingimar Arndal - One Systems", phone: "660 8551", email: "one@one.is" },
    { name: "Hrafnkell Erlendsson - One Systems", phone: "660 8553", email: "Hrafnkell@OneSystems.is" },
    { name: "Eyvindur Tryggvason - LS Retail", phone: "616 5050" },
    { name: "Ólafur Th Þosteinsson - Íslandspóstur", phone: "666 8777" },
  ],
};

export default function References({ title }: ReferencesProps) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <h2>{title}</h2>
      {referenceData.items.map((item) => (
        <p key={item.name}>
          {item.name} - <a href={`tel:${item.phone}`}>{item.phone}</a>
          {item.email && <>, <a href={`mailto:${item.email}`}>{item.email}</a></>}
        </p>
      ))}
    </motion.div>
  );
}
