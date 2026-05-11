import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import FaqAccordion from "./faq/_components/FaqAccordion";
import HomeContactForm from "./_components/HomeContactForm";
import styles from "./page.module.css";
import { getTranslation, type Locale } from "@/lib/useTranslation";
import { site } from "@/lib/site";
import en from "@/locales/en.json";
import my from "@/locales/my.json";

const tagClassMap: Record<string, string> = {
  Cultural: styles.tagCulture,
  Water: styles.tagWater,
  Food: styles.tagFood,
  Raffle: styles.tagCulture,
  Athletic: styles.tagAthletic,
};

const dicts = { en, my };

export const metadata: Metadata = {
  title: "Home",
  description: site.description,
};

export default async function Home() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "en") as Locale;
  const { t } = getTranslation(locale);
  const scheduleDays = dicts[locale].schedule.days;
  const faqCategories = dicts[locale].faq.categories;

  return (
    <div className={styles.page}>
      <Navbar activePage="home" />

      <section className={styles.hero} id="home">
        <div className={styles.heroTag}>{t("hero.tag")}</div>
        <h1 className={styles.heroTitle}>
          {t("hero.title_main")} <br />
          <em>{t("hero.title_em")}</em>
        </h1>
        <p className={styles.heroSub}>{t("hero.subtitle")}</p>
        <div className={styles.heroEventDetails}>
          <div className={styles.heroEventItem}>
            <span>{t("hero.date_label")}</span>
            <strong>{t("hero.event_dates")}</strong>
          </div>
          <div className={styles.heroEventItem}>
            <span>{t("hero.address_label")}</span>
            <strong>{t("hero.address")}</strong>
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={`${styles.container} ${styles.aboutGrid}`}>
          <div>
            <p className={styles.sectionLabel}>{t("about.label")}</p>
            <h2 className={styles.sectionTitle}>{t("about.title")}</h2>
            <p className={styles.sectionBody}>{t("about.body1")}</p>
            <p className={`${styles.sectionBody} ${styles.sectionBodySpacing}`}>
              {t("about.body2")}
            </p>
          </div>
          <div className={styles.aboutVisual}>
            <div className={styles.stat}>
              <div className={styles.statNum}>{t("about.stat_years_num")}</div>
              <div className={styles.statLabel}>
                {t("about.stat_years_label")}
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>{t("about.stat_since_num")}</div>
              <div className={styles.statLabel}>
                {t("about.stat_since_label")}
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>
                {t("about.stat_community_num")}
              </div>
              <div className={styles.statLabel}>
                {t("about.stat_community_label")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallery} id="gallery">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>{t("gallery.label")}</p>
          <h2 className={styles.sectionTitle}>{t("gallery.title")}</h2>
          <div className={styles.galleryGrid}>
            <div className={`${styles.galleryCard} ${styles.galleryLarge}`}>
              <span>{t("gallery.photo_2024")}</span>
            </div>
            <div className={styles.galleryCard}>
              <span>{t("gallery.photo_2023")}</span>
            </div>
            <div className={styles.galleryCard}>
              <span>{t("gallery.photo_2022")}</span>
            </div>
            <div className={styles.galleryCard}>
              <span>{t("gallery.photo_2021")}</span>
            </div>
            <div className={`${styles.galleryCard} ${styles.galleryWide}`}>
              <span>{t("gallery.photo_2019")}</span>
            </div>
          </div>
          <div className={styles.galleryFooter}>
            <Link href="/festival" className={styles.btnOutlineDark}>
              {t("gallery.btn")}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.schedule} id="schedule">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>{t("schedule.label")}</p>
          <h2 className={styles.sectionTitle}>{t("schedule.title")}</h2>
          <p className={styles.sectionBody}>{t("schedule.subtitle")}</p>
          <div className={styles.scheduleDays}>
            {scheduleDays.map((day) => (
              <div className={styles.scheduleDay} key={day.date}>
                <div className={styles.scheduleDayHeader}>
                  <div className={styles.scheduleDayDate}>{day.date}</div>
                  <h3 className={styles.scheduleDayTitle}>{day.title}</h3>
                </div>
                <div className={styles.scheduleGrid}>
                  {day.items.map((item) => (
                    <article
                      className={styles.eventCard}
                      key={`${day.date}-${item.time}-${item.name}`}
                    >
                      <div className={styles.eventTime}>{item.time}</div>
                      <div className={styles.eventName}>{item.name}</div>
                      <div className={styles.eventDesc}>{item.description}</div>
                      <span
                        className={`${styles.eventTag} ${tagClassMap[item.tagType] ?? styles.tagCulture}`}
                      >
                        {item.tag}
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.involve} id="involve">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>{t("involve.label")}</p>
          <h2 className={styles.sectionTitle}>{t("involve.title")}</h2>
          <div className={styles.involveGrid}>
            <div className={styles.involveCard}>
              <div className={styles.involveIcon}>✦</div>
              <h3 className={styles.involveTitle}>
                {t("involve.volunteer_title")}
              </h3>
              <p className={styles.involveBody}>
                {t("involve.volunteer_body")}
              </p>
              <Link
                href="/get-involved#volunteer"
                className={styles.involveLink}
              >
                {t("involve.volunteer_link")}
              </Link>
            </div>
            <div className={styles.involveCard}>
              <div className={styles.involveIcon}>◈</div>
              <h3 className={styles.involveTitle}>
                {t("involve.sponsor_title")}
              </h3>
              <p className={styles.involveBody}>{t("involve.sponsor_body")}</p>
              <Link href="/get-involved#sponsor" className={styles.involveLink}>
                {t("involve.sponsor_link")}
              </Link>
            </div>
            <div className={styles.involveCard}>
              <div className={styles.involveIcon}>❋</div>
              <h3 className={styles.involveTitle}>
                {t("involve.perform_title")}
              </h3>
              <p className={styles.involveBody}>{t("involve.perform_body")}</p>
              <Link href="/about#contact" className={styles.involveLink}>
                {t("involve.perform_link")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq} id="faq">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>{t("faq.label")}</p>
          <h2 className={styles.sectionTitle}>{t("faq.title")}</h2>
          <div className={styles.faqCategories}>
            {faqCategories.map((cat) => (
              <div key={cat.label} className={styles.faqCategory}>
                <p className={styles.faqCategoryLabel}>{cat.label}</p>
                <FaqAccordion items={cat.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sponsors} id="sponsors">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>{t("sponsors.label")}</p>
          <h2 className={styles.sectionTitle}>{t("sponsors.title")}</h2>
          <p className={styles.sectionBody}>
            {t("sponsors.body")}{" "}
            <a href="#contact" className={styles.inlineLink}>
              {t("sponsors.contact_link")}
            </a>
          </p>
          <div className={styles.sponsorTiers}>
            <div>
              <div className={styles.tierLabel}>{t("sponsors.gold_label")}</div>
              <div className={styles.sponsorRow}>
                <div className={`${styles.sponsorSlot} ${styles.goldTier}`}>
                  {t("sponsors.placeholder_logo")}
                </div>
                <div className={`${styles.sponsorSlot} ${styles.goldTier}`}>
                  {t("sponsors.placeholder_logo")}
                </div>
              </div>
            </div>
            <div>
              <div className={styles.tierLabel}>
                {t("sponsors.silver_label")}
              </div>
              <div className={styles.sponsorRow}>
                <div className={`${styles.sponsorSlot} ${styles.silverTier}`}>
                  {t("sponsors.placeholder_sponsor")}
                </div>
                <div className={`${styles.sponsorSlot} ${styles.silverTier}`}>
                  {t("sponsors.placeholder_sponsor")}
                </div>
                <div className={`${styles.sponsorSlot} ${styles.silverTier}`}>
                  {t("sponsors.placeholder_sponsor")}
                </div>
              </div>
            </div>
            <div>
              <div className={styles.tierLabel}>
                {t("sponsors.community_label")}
              </div>
              <div className={styles.sponsorRow}>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  {t("sponsors.placeholder_supporter")}
                </div>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  {t("sponsors.placeholder_supporter")}
                </div>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  {t("sponsors.placeholder_supporter")}
                </div>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  {t("sponsors.placeholder_supporter")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>{t("contact.label")}</p>
          <h2 className={styles.sectionTitle}>{t("contact.title")}</h2>
          <p className={styles.contactSub}>{t("contact.subtitle")}</p>
          <div className={styles.venueCard}>
            <p className={styles.venueHeading}>{t("venue.label")}</p>
            <p className={styles.venueLine}>{site.event.venue.name}</p>
            <p className={styles.venueLine}>{site.event.venue.line1}</p>
            <p className={styles.venueSub}>{site.event.venue.note}</p>
          </div>
          <HomeContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
