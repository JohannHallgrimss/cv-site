import { useState, useRef, useEffect  } from "react";
import type { Translations } from "../../translations";

type Props = {
  t: Translations["webTools"];
};
export default function RegexGenerator({ t }: Props) {
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