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
          <Link href="/festival" className={styles.footerLink}>
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
          <h4 className={styles.footerHeading}>{t("footer.leadership_heading")}</h4>
          <ul className={styles.footerLeadership}>
            <li>
              <span className={styles.leaderName}>{t("footer.leader_1_name")}</span>
              <span className={styles.leaderRole}>{t("footer.leader_1_role")}</span>
            </li>
            <li>
              <span className={styles.leaderName}>{t("footer.leader_2_name")}</span>
              <span className={styles.leaderRole}>{t("footer.leader_2_role")}</span>
            </li>
            <li>
              <span className={styles.leaderName}>{t("footer.leader_3_name")}</span>
              <span className={styles.leaderRole}>{t("footer.leader_3_role")}</span>
            </li>
            <li>
              <span className={styles.leaderName}>{t("footer.leader_4_name")}</span>
              <span className={styles.leaderRole}>{t("footer.leader_4_role")}</span>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>{t("footer.quick_links")}</h4>
          <ul className={styles.footerNav}>
            <li>
              <Link href="/">{t("nav.home")}</Link>
            </li>
            <li>
              <Link href="/festival">{t("footer.link_festival")}</Link>
            </li>
            <li>
              <Link href="/about">{t("nav.about")}</Link>
            </li>
            <li>
              <Link href="/get-involved">{t("nav.get_involved")}</Link>
            </li>
            <li>
              <Link href="/about#contact">{t("nav.contact")}</Link>
            </li>
          </ul>
          <h4 className={`${styles.footerHeading} ${styles.footerHeadingSpaced}`}>
            {t("footer.location_heading")}
          </h4>
          <p className={styles.footerText}>
            {site.event.venue.name}
            <br />
            {site.event.venue.line1}
          </p>
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
