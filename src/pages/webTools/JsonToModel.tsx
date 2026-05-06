import { useState, useMemo, useRef, useEffect } from "react";
import type { Translations } from "../../translations";
import { inferDataset, isDate} from "./JsonToModel/utils/inference";
import { generateTypeScript } from "./JsonToModel/generators/typescriptGenerator";
import { generateCSharp } from "./JsonToModel/generators/csharpGenerator";
import { generateJsonSchema } from "./JsonToModel/generators/jsonSchemaGenerator";
import { generateZod } from "./JsonToModel/generators/zodGenerator";
import { generateJava } from "./JsonToModel/generators/javaGenerator";

type Props = {
  t: Translations["webTools"];
};

type OutputType =
  | "typescript"
  | "csharp"
  | "jsonschema"
  | "zod"
  | "java";

export default function JsonToModel({ t }: Props) {

  const [jsonText, setJsonText] = useState("");
  const [outputType, setOutputType] = useState<OutputType>("typescript");
  const { textareaRef: jsonRef, adjustHeight: adjustJsonHeight } = useAutoResize();
  const [copied, setCopied] = useState(false);
  
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(e.target.value);
    adjustJsonHeight();
  };

  function useAutoResize(maxHeight: number = 500) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
        textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
      }
    };
  
    useEffect(() => {
      adjustHeight();
    }, [jsonText]);
  
    return { textareaRef, adjustHeight };
  }
  const output = useMemo(() => {

    try {

      const obj = JSON.parse(jsonText);

      switch (outputType) {

        case "typescript":
          return generateTypeScript(obj);

        case "csharp":
          return generateCSharp(obj);

        case "jsonschema":
          return generateJsonSchema(obj);

        case "zod":
          return generateZod(obj);

        case "java":
          return generateJava(obj);

        default:
          return "";

      }

    } catch {

      if (!jsonText) return "";

      return t.invalidJson;

    }

  }, [jsonText, outputType]);

  return (

    <div className="tool-section">

      <h3>{t.jsonToModel}</h3>

      {/* INPUT */}
      <textarea
        ref={jsonRef}
        className="large-textarea"
        placeholder={t.pasteJson}
        value={jsonText}
        onChange={handleJsonChange}
      />

      {/* OUTPUT TYPE */}
      <select
        className="dropdown"
        value={outputType}
        onChange={(e) =>
          setOutputType(
            e.target.value as OutputType
          )
        }
      >
        <option value="typescript">
          {t.jsonToModelddlTypeScript}
        </option>
        <option value="csharp">
          {t.jsonToModelddlC}
        </option>
        <option value="java">
          {t.jsonToModelddlJava}
        </option>
        <option value="jsonschema">
          {t.jsonToModelddlJsonSchema}
        </option>
        <option value="zod">
          {t.jsonToModelddlZod}
        </option>      
      </select>
      
      {/* OUTPUT TITLE */}
      <h4>{t.jsonModelOutput}</h4>

      {/* OUTPUT */}
      <pre className="output-box">
        {output}
      </pre>
      {/* COPY BUTTON */}
      <button
        className={`copy-button ${copied ? "copied" : ""}`}
        onClick={() => {
          const handleCopy = async () => {
            try {
              await navigator.clipboard.writeText(output);
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 1500);

            } catch {
              
            }
          };
        }}
      >
         {copied ? t.jsoncopied : t.jsoncopy}
      </button>
    </div>
  );
}