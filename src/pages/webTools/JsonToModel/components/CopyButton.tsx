// components/CopyButton.tsx

interface Props {
  text: string;
}

export default function CopyButton({
  text
}: Props) {
  const copy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button onClick={copy}>
      Copy
    </button>
  );
}