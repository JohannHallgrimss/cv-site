// components/JsonInput.tsx

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function JsonInput({
  value,
  onChange
}: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Paste JSON here..."
      rows={12}
      className="json-input"
    />
  );
}