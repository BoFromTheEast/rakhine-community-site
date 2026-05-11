import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import HomeContactForm from "../_components/HomeContactForm";
import styles from "./page.module.css";
import { getTranslation, type Locale } from "@/lib/useTranslation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Learn the story, mission, and community values behind the Rakhine Water Festival in Des Moines, and contact the committee.",
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "en") as Locale;
  const { t } = getTranslation(locale);

  return (
    <main className={styles.page}>
      <Navbar activePage="about" />

      <section className={styles.hero}>
        <span className={styles.ghostText} aria-hidden="true">
          {t("about_page.ghost")}
        </span>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{t("about_page.eyebrow")}</p>
          <h1 className={styles.title}>
            {t("about_page.title")}
          </h1>
          <p className={styles.lead}>
            {t("about_page.lead")}
          </p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyGrid}>
          <div className={styles.bodyLeft}>
            <p className={styles.sectionLabel}>{t("about_page.background_label")}</p>
            <h2 className={styles.sectionTitle}>
              {t("about_page.background_title")}
            </h2>
          </div>
          <div className={styles.bodyRight}>
            <p>
              {t("about_page.body_1")}
            </p>
            <p>
              {t("about_page.body_2")}
            </p>
          </div>
        </div>

        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <span className={styles.pillarNumber}>01</span>
            <h3 className={styles.pillarTitle}>{t("about_page.pillar_1_title")}</h3>
            <p className={styles.pillarBody}>
              {t("about_page.pillar_1_body")}
            </p>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarNumber}>02</span>
            <h3 className={styles.pillarTitle}>{t("about_page.pillar_2_title")}</h3>
            <p className={styles.pillarBody}>
              {t("about_page.pillar_2_body")}
            </p>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarNumber}>03</span>
            <h3 className={styles.pillarTitle}>{t("about_page.pillar_3_title")}</h3>
            <p className={styles.pillarBody}>
              {t("about_page.pillar_3_body")}
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            {t("about_page.cta_text")} {site.event.city}, {site.event.state}.
          </p>
          <Link href="#contact" className={styles.ctaLink}>
            {t("contact.btn_send")}
          </Link>
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={styles.contactIntro}>
          <p className={styles.sectionLabel}>{t("contact.label")}</p>
          <h2 className={styles.sectionTitle}>{t("contact.title")}</h2>
          <p className={styles.contactSub}>{t("contact.subtitle")}</p>
          <div className={styles.venueDetails}>
            <p>
              <span>{t("venue.label")}</span>
              {site.event.venue.name}
            </p>
            <p>
              <span>{t("venue.address_label")}</span>
              {site.event.venue.line1}
            </p>
          </div>
        </div>
        <HomeContactForm />
      </section>
      <Footer />
    </main>
  );
}
