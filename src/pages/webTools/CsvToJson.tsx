import { useMemo, useState } from "react";
import type { Translations } from "../../translations";

type Props = {
  t: Translations["webTools"];
};

function guessCsvSeparator(sample: string) {
  const commaCount = (sample.match(/,/g) || []).length;
  const semicolonCount = (sample.match(/;/g) || []).length;

  if (semicolonCount > commaCount) {
    return ";";
  }

  return ",";
}

function parseCsvLine(line: string, delimiter: string) {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (char === delimiter && !inQuotes) {
      fields.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  fields.push(current);
  return fields;
}

function parseCsv(csvText: string) {
  const rows = csvText
    .split(/\r?\n/)
    .filter((row) => row.trim().length > 0);

  if (rows.length === 0) {
    return [];
  }

  const delimiter = guessCsvSeparator(rows[0]);
  const parsedRows = rows.map((row) => parseCsvLine(row, delimiter));

  const headers = parsedRows[0].map((header, index) => {
    const trimmed = header.trim();
    return trimmed || `field${index + 1}`;
  });

  return parsedRows.slice(1).map((row) => {
    const item: Record<string, string> = {};

    row.forEach((value, index) => {
      const key = headers[index] || `field${index + 1}`;
      item[key] = value;
    });

    for (let index = row.length; index < headers.length; index++) {
      item[headers[index]] = "";
    }

    if (row.length > headers.length) {
      row.slice(headers.length).forEach((value, extraIndex) => {
        item[`extra${extraIndex + 1}`] = value;
      });
    }

    return item;
  });
}

export default function CsvToJson({ t }: Props) {
  const [csvText, setCsvText] = useState("");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!csvText.trim()) {
      return "";
    }

    try {
      const result = parseCsv(csvText);
      return JSON.stringify(result, null, 2);
    } catch {
      return t.csvToJsonInvalid;
    }
  }, [csvText, t]);

  const copyOutput = async () => {
    if (!output || output === t.csvToJsonInvalid) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore copy failure
    }
  };

  return (
    <div className="tool-section">
      <h3>{t.csvToJson}</h3>
      <p>{t.csvToJsonHint}</p>
      <textarea
        className="large-textarea"
        placeholder={t.csvToJsonPlaceholder}
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
      />

      <h4>{t.csvToJsonOutput}</h4>
      <pre className="output-box">{output}</pre>

      <button
        className={`copy-button ${copied ? "copied" : ""}`}
        onClick={copyOutput}
        disabled={!output || output === t.csvToJsonInvalid}
      >
        {copied ? t.csvToJsonCopied : t.csvToJsonCopy}
      </button>
    </div>
  );
}
