import { useState, useRef, useEffect  } from "react";
import type { Translations } from "../../translations";

type Props = {
  t: Translations["webTools"];
};
export default function RegexGenerator({ t }: Props) {
  const [text, setText] = useState("");
  const [regex, setRegex] = useState("");
  const [selectedPreview, setSelectedPreview] = useState("");
  const [copied, setCopied] = useState(false);

  const [exactMatch, setExactMatch] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const escapeChar = (char: string) => {
    return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const copyRegex = async () => {
    try {
      await navigator.clipboard.writeText(regex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        placeholder={t.regexGeneratorInstruction}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Options */}

      <div style={{ marginTop: "6px", marginBottom: "6px" }}>
          <input
            type="checkbox"
            checked={exactMatch}
            style={{  width: "auto" }}
            onChange={(e) =>
              setExactMatch(e.target.checked)
            }
          />
          {t.regexGeneratorExaceMach}
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
          <pre className="output-box">
            {regex}
          </pre>
          <button
            className={`copy-button ${copied ? "copied" : ""}`}
            onClick={copyRegex}>
            {t.regexGeneratorCopy}
          </button>
        </div>
      </div>

    </div>
  );
} 