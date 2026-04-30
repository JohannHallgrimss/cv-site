// components/OutputViewer.tsx

import CopyButton from "./CopyButton";

interface Props {
  content: string;
}

export default function OutputViewer({
  content
}: Props) {
  return (
    <div className="output">
      <CopyButton text={content} />

      <pre>
        <code>{content}</code>
      </pre>
    </div>
  );
}