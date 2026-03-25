import { motion } from "framer-motion";
import { useState } from "react";

const data = {
  name: "Jóhann Hallgrímsson",
  title: "Senior Full-Stack Engineer",
  about_en: "15+ years building scalable systems.",
  about_is: "15+ ára reynsla í hugbúnaðarþróun.",
  experience: [
    { role: "CEO", company: "Huxun", period: "2025+" },
    { role: "Senior Dev", company: "One Systems", period: "2017-2025" },
    { role: "Dev", company: "LS Retail", period: "2015-2017" }
  ]
};

export default function App() {
  const [lang, setLang] = useState("en");

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}}>
        <h1 className="text-5xl font-bold">{data.name}</h1>
        <p className="text-xl text-gray-400">{data.title}</p>
        <p className="mt-4">
          {lang === "en" ? data.about_en : data.about_is}
        </p>

        <div className="mt-4 flex gap-2">
          <button onClick={()=>setLang('en')}>EN</button>
          <button onClick={()=>setLang('is')}>IS</button>
        </div>
      </motion.div>

      <div className="mt-10 border-l border-gray-700 pl-6">
        {data.experience.map((job,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} className="mb-6">
            <div className="text-lg font-semibold">{job.role} - {job.company}</div>
            <div className="text-gray-500">{job.period}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <a href="/cv-en.pdf">Download CV EN</a>
        <a href="/cv-is.pdf">Sækja CV IS</a>
      </div>
    </div>
  );
}