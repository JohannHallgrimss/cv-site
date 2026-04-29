import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Translations } from "../translations";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Parser } from "expr-eval";

type WebToolsProps = {
  t: Translations["webTools"];
};

// Custom hook for auto-resizing textarea
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
  }, []);

  return { textareaRef, adjustHeight };
}

export default function WebTools({ t }: WebToolsProps) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <h2>{t.title}</h2>

      <RegexTester t={t} />
      <RegexGenerator t={t} />
      <JsonValidator t={t} />
      <DateParser t={t} />
      <LinqDemo t={t} />
    </motion.div>
  );
}

function RegexTester({ t }: WebToolsProps) {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");
  const { textareaRef, adjustHeight } = useAutoResize();

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, "g");
      const result = testString.match(regex);
      setMatches(result || []);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
    }
  };

  const handleTestStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestString(e.target.value);
    adjustHeight();
  };

  return (
    <div className="tool-section">
      <h3>{t.regexTester}</h3>
      <input
        type="text"
        placeholder="Regex pattern"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />
      <textarea
        ref={textareaRef}
        className="large-textarea"
        placeholder="Test string"
        value={testString}
        onChange={handleTestStringChange}
      />
      <button onClick={testRegex}>{t.regexButton}</button>
      {error && <p className="error">{t.regexError}{error}</p>}
      <div>
        <strong>{t.regexMatches} ({matches.length})</strong> <pre style={{ whiteSpace: "pre-wrap" }}>{matches.length > 0 ? matches.join("\n\r") : `${t.regexError}`}</pre>
      </div>
    </div>
  );
}

function JsonValidator({ t }: WebToolsProps) {
  const [json, setJson] = useState("");
  const [schema, setSchema] = useState("");
  const [result, setResult] = useState("");
  const { textareaRef: jsonRef, adjustHeight: adjustJsonHeight } = useAutoResize();
  const { textareaRef: schemaRef, adjustHeight: adjustSchemaHeight } = useAutoResize();
  const ajv = new Ajv({
    allErrors: true,
    strict: false
  });
  addFormats(ajv);
  const validateJson = () => {
    try {
      const parsedJson = JSON.parse(json);
      const parsedSchema = JSON.parse(schema);
      const validate = ajv.compile(parsedSchema);
      const valid = validate(parsedJson);

      if (valid) {
        setJson(JSON.stringify(parsedJson, null, 2));
        setSchema(JSON.stringify(parsedSchema, null, 2));
        setResult(t.jsonSucsess);
      } else {
        const errors = validate.errors
          ?.map(err => `${err.instancePath || "/"} ${err.message}`)
          .join("\n");

        setResult(`${t.jsonSchemaError}${errors}`);
      }
    } catch (e) {
      setResult(`${t.jsonError}${(e as Error).message}`);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
      adjustJsonHeight();
    } catch (e) {
      setResult(`${t.jsonError}${(e as Error).message}`);
    }
  };

  const formatSchema = () => {
    try {
      const parsed = JSON.parse(schema);
      setSchema(JSON.stringify(parsed, null, 2));
      adjustSchemaHeight();
    } catch (e) {
      setResult(`${t.jsonError}${(e as Error).message}`);
    }
  };
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJson(e.target.value);
    adjustJsonHeight();
  };

  const handleSchemaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchema(e.target.value);
    adjustSchemaHeight();
  };

  return (
    <div className="tool-section">
      <h3>{t.jsonValidator}</h3>
      <textarea
        ref={jsonRef}
        className="large-textarea"
        placeholder="JSON"
        value={json}
        onChange={handleJsonChange}
      />
      <button style={{ float: "right" }} onClick={formatJson}>{t.jsonFormatJson}</button>
      <textarea
        ref={schemaRef}
        className="large-textarea"
        placeholder="Schema"
        value={schema}
        onChange={handleSchemaChange}
      />
      <button style={{ float: "right" }} onClick={formatSchema}>{t.jsonFormatSchema}</button>
      <button onClick={validateJson}>{t.jsonButton}</button>
      <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
}

function DateParser({ t }: WebToolsProps) {
  const [dateString, setDateString] = useState("");
  const [parsedDate, setParsedDate] = useState("");

  const parseDate = () => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        setParsedDate(`❌ ${t.dateError}: Invalid date`);
        return;
      }
      setParsedDate(date.toISOString());
    } catch (e) {
      setParsedDate(`❌ ${t.dateError}: ${(e as Error).message}`);
    }
  };

  return (
    <div className="tool-section">
      <h3>{t.dateParser}</h3>
      <input
        type="text"
        placeholder="Date string"
        value={dateString}
        onChange={(e) => setDateString(e.target.value)}
      />
      <button onClick={parseDate}>{t.dateButton}</button>
      <div>{parsedDate}</div>
    </div>
  );
}

const parser = new Parser();
function LinqDemo({ t }: WebToolsProps) {
  const [arrayInput, setArrayInput] = useState("[1, 2, 3, 4, 5]");
  const [query, setQuery] = useState("filter(x > 3)");
  const [result, setResult] = useState("");



  const evaluateCondition = (x: any, condition: string): boolean => {
    try {
      const expr = parser.parse(condition);
      return expr.evaluate({ x });
    } catch {
      return false;
    }
  };

  const evaluateExpression = (x: any, expression: string): any => {
    try {
      const expr = parser.parse(expression);
      return expr.evaluate({ x });
    } catch {
      return x;
    }
  };

  const runQuery = () => {
    try {
      const arr = JSON.parse(arrayInput);
      if (!Array.isArray(arr)) {
        setResult("Input must be an array");
        return;
      }
      let res = arr;

      if (query.startsWith("filter(")) {

        const match = query.match(/filter\((.+)\)/);

        if (match) {
          const condition = match[1];

          res = arr.filter((x: any) =>
            evaluateCondition(x, condition)
          );
        }

      } else if (query.startsWith("map(")) {

        const match = query.match(/map\((.+)\)/);

        if (match) {
          const transform = match[1];

          res = arr.map((x: any) =>
            evaluateExpression(x, transform)
          );
        }

      }

      setResult(JSON.stringify(res, null, 2));

    } catch (e) {
      setResult(`Error: ${(e as Error).message}`);
    }
  };

  return (
    <div className="tool-section">
      <h3>{t.linqDemo}</h3>

      <input
        type="text"
        placeholder="Array (JSON)"
        value={arrayInput}
        onChange={(e) => setArrayInput(e.target.value)}
      />

      <input
        type="text"
        placeholder="Query (e.g., filter(x > 3) or map(x * 2))"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={runQuery}>
        {t.linqButton}
      </button>

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {result}
      </pre>

    </div>
  );
}

function RegexGenerator({ t }: WebToolsProps) {
  const [text, setText] = useState("");
  const [regex, setRegex] = useState("");
  const [selectedPreview, setSelectedPreview] = useState("");

  const [exactMatch, setExactMatch] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const escapeChar = (char: string) => {
    return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const copyRegex = async () => {
    try {
      await navigator.clipboard.writeText(regex);
    }
    catch {
      alert("Copy failed");
    }
  };

  const getCharType = (char: string) => {
    if (/\d/.test(char)) return "digit";
    if (/[A-Z]/.test(char)) return "upper";
    if (/[a-z]/.test(char)) return "lower";
    if (/\s/.test(char)) return "space";
    return "other";
  };

  const generateRegex = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      setRegex("❌ No text selected");
      return;
    }

    const selectedText = text.substring(start, end);

    setSelectedPreview(selectedText);

    let pattern = "";
    let lastType = "";

    for (const char of selectedText) {

      const type = getCharType(char);

      if (type === lastType)
        continue;

      switch (type) {

        case "digit":
          pattern += "\\d+";
          break;

        case "upper":
          pattern += "[A-Z]+";
          break;

        case "lower":
          pattern += "[a-z]+";
          break;

        case "space":
          pattern += "\\s+";
          break;

        case "other":
          pattern += escapeChar(char);
          break;

      }

      lastType = type;
    }

    if (exactMatch) {
      pattern = `^${pattern}$`;
    }

    setRegex(pattern);
  };

  return (
    <div className="tool-section">

      <h3>{t.regexGenerator}</h3>

      <p>{t.regexGeneratorInstruction}</p>

      <textarea
        ref={textareaRef}
        className="large-textarea"
        placeholder="Paste text and select part of it..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Options */}

      <div style={{ marginTop: "6px" }}>
        <label>
          <input
            type="checkbox"
            checked={exactMatch}
            onChange={(e) =>
              setExactMatch(e.target.checked)
            }
          />
          Exact match (^...$)
        </label>
      </div>

      <button onClick={generateRegex}>
        {t.regexGeneratorButton}
      </button>

      {/* Selected preview */}

      {selectedPreview && (
        <div>
          <strong>Selected:</strong>

          <pre style={{ whiteSpace: "pre-wrap" }}>
            {selectedPreview}
          </pre>
        </div>
      )}

      {/* Result */}

      <div>

        <strong>
          {t.regexGeneratorResult}:
        </strong>
        <div>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            {regex}
          </pre>
          <button onClick={copyRegex}>
            {t.regexGeneratorCopy}
          </button>
        </div>
      </div>

    </div>
  );
}