import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import RegexTester from "./webTools/RegexTester";
import RegexGenerator from "./webTools/RegexGenerator";
import JsonValidator from "./webTools/JsonValidator";
import DateParser from "./webTools/DateParser";
import LinqDemo from "./webTools/LinqDemo";
import JsonToModel from "./webTools/JsonToModel";

import {
  AccordionItem,
  useAccordion
} from "./webTools/Accordion";

type WebToolsProps = {
  t: any;
};

const TOOL_INDEX_MAP: Record<string, number> = {
  regexTester: 0,
  regexGenerator: 1,
  jsonValidator: 2,
  dateParser: 3,
  linqDemo: 4,
  jsonToModel: 5,
};

export default function WebTools({
  t
}: WebToolsProps) {
  const [searchParams] = useSearchParams();
  const { openIndex, toggle, setOpenIndex } = useAccordion();
  
  useEffect(() => {
    const toolParam = searchParams.get("tool");
    if (toolParam && toolParam in TOOL_INDEX_MAP) {
      setOpenIndex(TOOL_INDEX_MAP[toolParam]);
    }
  }, [searchParams, setOpenIndex]);

  return (

    <motion.div
      className="card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <h2>{t.title}</h2>

      <AccordionItem
        title={t.regexTester}
        isOpen={openIndex === 0}
        onClick={() => toggle(0)}
      >
        <RegexTester t={t} />
      </AccordionItem>

      <AccordionItem
        title={t.regexGenerator}
        isOpen={openIndex === 1}
        onClick={() => toggle(1)}
      >
        <RegexGenerator t={t} />
      </AccordionItem>

      <AccordionItem
        title={t.jsonValidator}
        isOpen={openIndex === 2}
        onClick={() => toggle(2)}
      >
        <JsonValidator t={t} />
      </AccordionItem>

      <AccordionItem
        title={t.dateParser}
        isOpen={openIndex === 3}
        onClick={() => toggle(3)}
      >
        <DateParser t={t} />
      </AccordionItem>

      <AccordionItem
        title={t.linqDemo}
        isOpen={openIndex === 4}
        onClick={() => toggle(4)}
      >
        <LinqDemo t={t} />
      </AccordionItem>

      <AccordionItem
        title={t.jsonToModel}
        isOpen={openIndex === 5}
        onClick={() => toggle(5)}
      >
        <JsonToModel t={t} />
      </AccordionItem>
    </motion.div>
  );
}