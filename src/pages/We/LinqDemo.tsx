import { useState, useRef, useEffect } from "react";
import type { Translations } from "../../translations";
import { Parser } from "expr-eval";

type Props = {
  t: Translations["webTools"];
};
const parser = new Parser();
export default function LinqDemo({ t }: Props) {
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