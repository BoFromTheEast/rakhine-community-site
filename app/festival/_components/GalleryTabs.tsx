"use client";

import { useState } from "react";
import styles from "./GalleryTabs.module.css";

const CATEGORIES = ["All", "Performances", "Water Festival", "Sports Day", "Community"] as const;
type Category = (typeof CATEGORIES)[number];

// Each item has a category and a visual weight (affects grid span)
const ITEMS: { id: number; category: Exclude<Category, "All">; tall?: boolean; wide?: boolean }[] =
  [
    { id: 1, category: "Water Festival", tall: true },
    { id: 2, category: "Performances" },
    { id: 3, category: "Community" },
    { id: 4, category: "Sports Day", wide: true },
    { id: 5, category: "Water Festival" },
    { id: 6, category: "Performances", tall: true },
    { id: 7, category: "Community" },
    { id: 8, category: "Sports Day" },
    { id: 9, category: "Water Festival" },
  ];

export default function GalleryTabs() {
  const [active, setActive] = useState<Category>("All");

  const visible =
    active === "All" ? ITEMS : ITEMS.filter((item) => item.category === active);

  return (
    <div>
      <div className={styles.tabs} role="tablist" aria-label="Gallery categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            className={`${styles.tab} ${active === cat ? styles.tabActive : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((item) => (
          <div
            key={item.id}
            className={`${styles.item} ${item.tall ? styles.tall : ""} ${item.wide ? styles.wide : ""}`}
            aria-label={`${item.category} photo`}
          >
            <span className={styles.itemLabel}>{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
