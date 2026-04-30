// components/OutputSelector.tsx

import { OutputType } from "../types/OutputType";

interface Props {
  value: OutputType;
  onChange: (v: OutputType) => void;
}

export default function OutputSelector({
  value,
  onChange
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value as OutputType)
      }
    >
      <option value={OutputType.TypeScript}>
        TypeScript Interface
      </option>

      <option value={OutputType.CSharp}>
        C# POCO
      </option>

      <option value={OutputType.JsonSchema}>
        JSON Schema
      </option>

      <option value={OutputType.Zod}>
        Zod Schema
      </option>
    </select>
  );
}