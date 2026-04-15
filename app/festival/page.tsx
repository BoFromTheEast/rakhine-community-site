"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type YearEntry = {
  year: number;
  edition: string;
  title: string;
  subtitle: string;
  note: string;
};

const START_YEAR = 2015;
const CURRENT_YEAR = 2026;

const yearOverrides: Record<number, Partial<YearEntry>> = {
  2015: {
    title: "Where It All Began",
    subtitle: "The first Rakhine Water Festival in Des Moines.",
  },
  2019: {
    title: "Half a Decade Strong",
    subtitle: "A milestone year for the community.",
  },
  2022: {
    title: "Full Force",
    subtitle: "Back to a full celebration with family and friends.",
  },
  2024: {
    title: "A Decade of Thingyan",
    subtitle: "Ten years of water, joy, and community in Iowa.",
  },
  2025: {
    edition: "Coming Soon",
    title: "This Year's Festival",
    subtitle: "July 2025 - Des Moines, Iowa",
  },
  2026: {
    edition: "Current Year",
    title: "Current Festival Year",
    subtitle: "July 2026 - Des Moines, Iowa",
  },
};

function getOrdinal(value: number): string {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  if (value % 10 === 1) return `${value}st`;
  if (value % 10 === 2) return `${value}nd`;
  if (value % 10 === 3) return `${value}rd`;
  return `${value}th`;
}

const archiveYears: YearEntry[] = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, index) => {
    const year = START_YEAR + index;
    const editionNumber = year - START_YEAR + 1;
    const defaultEntry: YearEntry = {
      year,
      edition: `${getOrdinal(editionNumber)} Annual`,
      title: `${year} Festival Highlights`,
      subtitle: `Rakhine Water Festival celebration in Des Moines.`,
      note: `Add photos, videos, and a short note for ${year}.`,
    };
    return { ...defaultEntry, ...yearOverrides[year] };
  },
);

export default function FestivalPage() {
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);

  const activeYear = useMemo(
    () =>
      archiveYears.find((item) => item.year === selectedYear) ??
      archiveYears[0],
    [selectedYear],
  );

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>Rakhine Festival Archive</div>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/festival" className={styles.navLinkActive}>
            Festival
          </Link>
          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <aside
        className={styles.floatingYears}
        aria-label="Festival year selector"
      >
        {archiveYears.map((entry) => (
          <button
            key={entry.year}
            type="button"
            className={`${styles.yearButton} ${
              activeYear.year === entry.year ? styles.yearButtonActive : ""
            }`}
            onClick={() => setSelectedYear(entry.year)}
          >
            {entry.year}
          </button>
        ))}
      </aside>

      <section className={styles.content}>
        <span className={styles.ghostYear} aria-hidden="true">
          {activeYear.year}
        </span>

        <div className={styles.header}>
          <p className={styles.edition}>{activeYear.edition}</p>
          <h1 className={styles.title}>{activeYear.title}</h1>
          <p className={styles.subtitle}>{activeYear.subtitle}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.mediaGrid}>
          <div className={styles.mediaCard}>Featured photo</div>
          <div className={styles.mediaCard}>Photo slot</div>
          <div className={`${styles.mediaCard} ${styles.videoCard}`}>
            Video slot
          </div>
        </div>

        <div className={styles.noteBox}>
          <p>{activeYear.note}</p>
        </div>
      </section>
    </main>
  );
}
