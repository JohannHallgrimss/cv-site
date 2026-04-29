import { useState, ReactNode } from "react";

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

export function AccordionItem({
  title,
  children,
  isOpen,
  onClick
}: AccordionItemProps) {
  return (
    <div className="accordion-item">

      <div
        className="accordion-header"
        onClick={onClick}
        style={{
          cursor: "pointer",
          padding: "10px",
          fontWeight: "bold",
          background: "#222",
          borderRadius: "6px"
        }}
      >
        {title}
      </div>

      {isOpen && (
        <div
          className="accordion-content"
          style={{
            padding: "10px",
            marginTop: "6px"
          }}
        >
          {children}
        </div>
      )}

    </div>
  );
}

export function useAccordion() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev =>
      prev === index ? null : index
    );
  };

  return { openIndex, toggle };
}