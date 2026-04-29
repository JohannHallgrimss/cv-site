import { useState, useRef, useEffect  } from "react";
import type { Translations } from "../../translations";

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
export default function RegexTester({ t }: Props) {
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