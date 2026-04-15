"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export type ActivePage =
  | "home"
  | "festival"
  | "about"
  | "contact"
  | "volunteer"
  | "donate"
  | "sponsor"
  | "faq";

const links: { label: string; href: string; page: ActivePage }[] = [
  { label: "Home", href: "/", page: "home" },
  { label: "Festival", href: "/festival", page: "festival" },
  { label: "About", href: "/about", page: "about" },
  { label: "Contact", href: "/contact", page: "contact" },
];

export default function Navbar({ activePage }: { activePage: ActivePage }) {
  const [open, setOpen] = useState(false);

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
        </div>
      )}
    </nav>
  );
}
