import { useState, useRef, useEffect  } from "react";
import type { Translations } from "../../translations";

type Props = {
  t: Translations["webTools"];
};
export default function DateParser({ t }: Props) {
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