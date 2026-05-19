import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div
      className="accordion-item"
      style={{ marginBottom: "10px" }}
    >

      {/* HEADER */}

      <div
        className="accordion-header"
        onClick={onClick}
        style={{
          cursor: "pointer",
          padding: "10px",
          fontWeight: "bold",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >

        {/* SVG Arrow (smooth + stable size) */}

        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          
          animate={{
            rotate: isOpen ? 90 : 0
          }}

          transition={{
            duration: 0.25,
            ease: "easeInOut"
          }}

          style={{
            flexShrink: 0
          }}
        >
          <path
            d="M6 4 L14 10 L6 16"
            stroke="black"
            strokeWidth="2"
            fill="none"
            className="accordion-arrow"
          />
        </motion.svg>

        {title}

      </div>

      {/* CONTENT */}

      <AnimatePresence initial={false}>

        {isOpen && (

          <motion.div
            key="content"

            initial={{
              height: 0,
              opacity: 0
            }}

            animate={{
              height: "auto",
              opacity: 1
            }}

            exit={{
              height: 0,
              opacity: 0
            }}

            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}

            style={{
              overflow: "hidden"
            }}
          >

            <motion.div
              layout
              style={{
                padding: "10px",
                marginTop: "6px",
                borderRadius: "6px"
              }}
            >
              {children}
            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

//
// 🔥 IMPORTANT — this fixes your error
//

export function useAccordion() {

  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const toggle = (index: number) => {

    setOpenIndex(prev =>
      prev === index ? null : index
    );

  };

  return { openIndex, toggle, setOpenIndex };
}