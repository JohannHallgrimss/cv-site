import { useState, useRef, useEffect  } from "react";
import type { Translations } from "../../translations";
import Ajv from "ajv";
import addFormats from "ajv-formats";

type Props = {
  t: Translations["webTools"];
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
  }, []);

  return { textareaRef, adjustHeight };
}

export default function JsonValidator({ t }: Props) {
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