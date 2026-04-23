"use client";

import { useMemo, useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation } from "@/lib/useTranslation";
import { site } from "@/lib/site";

type YearEntry = {
  year: number;
  edition: string;
  title: string;
  subtitle: string;
  note: string;
};

const START_YEAR = 2015;
const CURRENT_YEAR = site.event.year;

function getOrdinal(value: number): string {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  if (value % 10 === 1) return `${value}st`;
  if (value % 10 === 2) return `${value}nd`;
  if (value % 10 === 3) return `${value}rd`;
  return `${value}th`;
}

export default function FestivalPageClient() {
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  const yearOverrides: Record<number, Partial<YearEntry>> = {
    2015: {
      title: t("festival.year_2015_title"),
      subtitle: t("festival.year_2015_subtitle"),
    },
    2019: {
      title: t("festival.year_2019_title"),
      subtitle: t("festival.year_2019_subtitle"),
    },
    2022: {
      title: t("festival.year_2022_title"),
      subtitle: t("festival.year_2022_subtitle"),
    },
    2024: {
      title: t("festival.year_2024_title"),
      subtitle: t("festival.year_2024_subtitle"),
    },
    2025: {
      edition: t("festival.year_2025_edition"),
      title: t("festival.year_2025_title"),
      subtitle: t("festival.year_2025_subtitle"),
    },
    2026: {
      edition: t("festival.year_2026_edition"),
      title: t("festival.year_2026_title"),
      subtitle: t("festival.year_2026_subtitle"),
    },
  };

  const archiveYears: YearEntry[] = Array.from(
    { length: CURRENT_YEAR - START_YEAR + 1 },
    (_, index) => {
      const year = START_YEAR + index;
      const editionNumber = year - START_YEAR + 1;
      const defaultEntry: YearEntry = {
        year,
        edition: `${getOrdinal(editionNumber)} Annual`,
        title: `${year} ${t("festival.default_title_suffix")}`,
        subtitle: t("festival.default_subtitle"),
        note: `${t("festival.default_note_prefix")} ${year}.`,
      };
      return { ...defaultEntry, ...yearOverrides[year] };
    },
  );

  const activeYear = useMemo(
    () =>
      archiveYears.find((item) => item.year === selectedYear) ??
      archiveYears[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedYear, locale],
  );

  return (
    <main className={styles.page}>
      <Navbar activePage="festival" />

      <aside
        className={styles.floatingYears}
        aria-label={t("festival.year_aria")}
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
          <p className={styles.venuePlaceholder}>
            {t("venue.label")}: {site.event.venue.name} - {site.event.venue.line1}
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.mediaGrid}>
          <div className={styles.mediaCard}>{t("festival.media_featured")}</div>
          <div className={styles.mediaCard}>{t("festival.media_photo")}</div>
          <div className={`${styles.mediaCard} ${styles.videoCard}`}>
            {t("festival.media_video")}
          </div>
        </div>

        <div className={styles.noteBox}>
          <p>{activeYear.note}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
