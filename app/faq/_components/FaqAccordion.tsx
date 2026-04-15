"use client";

import { useState } from "react";
import styles from "./FaqAccordion.module.css";

type Item = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <ul className={styles.list}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <li key={i} className={styles.item}>
            <button
              type="button"
              className={`${styles.question} ${isOpen ? styles.questionOpen : ""}`}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden="true" />
            </button>
            <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}>
              <div className={styles.answerInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
