"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation, type Locale } from "@/lib/useTranslation";
import styles from "./Navbar.module.css";

export type ActivePage =
  | "home"
  | "festival"
  | "about"
  | "contact"
  | "donate"
  | "get-involved";

const linkDefs: { key: string; href: string; page: ActivePage }[] = [
  { key: "nav.home", href: "/", page: "home" },
  { key: "nav.festival", href: "/festival", page: "festival" },
  { key: "nav.about", href: "/about", page: "about" },
  { key: "nav.get_involved", href: "/get-involved", page: "get-involved" },
  { key: "nav.contact", href: "/contact", page: "contact" },
];

export default function Navbar({ activePage }: { activePage: ActivePage }) {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation(locale);

  const links = linkDefs.map((def) => ({ ...def, label: t(def.key) }));

  function toggleLocale() {
    const next: Locale = locale === "en" ? "my" : "en";
    setLocale(next);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">Rakhine Water Festival - Des Moines</Link>
      </div>

      <ul className={styles.links}>
        {links.map(({ label, href, page }) => (
          <li key={page}>
            <Link
              href={href}
              className={activePage === page ? styles.active : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.langToggle}
        onClick={toggleLocale}
        aria-label={locale === "en" ? "Switch to Burmese" : "Switch to English"}
      >
        <span className={locale === "en" ? styles.langActive : undefined}>
          EN
        </span>
        <span className={styles.langDivider}>|</span>
        <span
          className={locale === "my" ? styles.langActive : undefined}
          style={{ fontFamily: "var(--font-myanmar), sans-serif" }}
        >
          မြန်မာ
        </span>
      </button>

      <button
        className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {links.map(({ label, href, page }) => (
            <Link
              key={page}
              href={href}
              className={activePage === page ? styles.active : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            className={styles.dropdownLangToggle}
            onClick={() => {
              toggleLocale();
              setOpen(false);
            }}
          >
            <span className={locale === "en" ? styles.langActive : undefined}>
              EN
            </span>
            <span className={styles.langDivider}>|</span>
            <span
              className={locale === "my" ? styles.langActive : undefined}
              style={{ fontFamily: "var(--font-myanmar), sans-serif" }}
            >
              မြန်မာ
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
