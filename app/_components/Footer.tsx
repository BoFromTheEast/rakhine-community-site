"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation } from "@/lib/useTranslation";
import { getCopyrightYear, site } from "@/lib/site";

export default function Footer() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>{t("footer.brand")}</div>
          <p className={styles.footerTagline}>
            {t("footer.tagline")}
          </p>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>{t("footer.history_heading")}</h4>
          <p className={styles.footerText}>
            {t("footer.history_body")}
          </p>
          <Link href="/#about" className={styles.footerLink}>
            {t("footer.history_link")}
          </Link>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>{t("footer.mission_heading")}</h4>
          <ul className={styles.footerList}>
            <li>{t("footer.mission_1")}</li>
            <li>{t("footer.mission_2")}</li>
            <li>{t("footer.mission_3")}</li>
            <li>{t("footer.mission_4")}</li>
            <li>{t("footer.mission_5")}</li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>{t("footer.quick_links")}</h4>
          <ul className={styles.footerNav}>
            <li>
              <Link href="/">{t("nav.home")}</Link>
            </li>
            <li>
              <Link href="/#schedule">{t("footer.link_festival")}</Link>
            </li>
            <li>
              <Link href="/get-involved">{t("nav.get_involved")}</Link>
            </li>
            <li>
              <a href={`mailto:${site.contactEmail}`}>{t("nav.contact")}</a>
            </li>
            <li>
              <a href={site.social.instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
          <ul className={styles.footerNav}>
            <li>
              <Link href="/privacy">{t("footer.link_privacy")}</Link>
            </li>
            <li>
              <Link href="/terms">{t("footer.link_terms")}</Link>
            </li>
            <li>
              <Link href="/nonprofit">{t("footer.link_transparency")}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {getCopyrightYear()}{" "}
          <span className={styles.footerHighlight}>
            {t("footer.committee_name")}
          </span>{" "}
          - {site.event.city}, {site.event.state}. {t("footer.rights_reserved")}
        </p>
        <p className={styles.footerNonprofit}>
          {t("footer.nonprofit")}
        </p>
      </div>
    </footer>
  );
}
