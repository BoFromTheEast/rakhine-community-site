import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import FaqAccordion from "./faq/_components/FaqAccordion";
import FestivalCountdown from "./festival/_components/FestivalCountdown";
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

const previousEventPhotos = [
  { year: "2025", title: "Water Festival Day", imageSrc: "" },
  { year: "2024", title: "Opening Ceremony", imageSrc: "" },
  { year: "2023", title: "Community Gathering", imageSrc: "" },
  { year: "2022", title: "Food and Music", imageSrc: "" },
  { year: "2019", title: "Festival Memories", imageSrc: "" },
].slice(0, 5);

const posterItems = [
  { title: "2026 Festival Flyer", detail: "Main event announcement", imageSrc: "" },
  { title: "Volunteer Poster", detail: "Help the festival come together", imageSrc: "" },
  { title: "Schedule Poster", detail: "Two-day program overview", imageSrc: "" },
];

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

      <section className={styles.countdown} id="countdown">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Festival Countdown</p>
          <h2 className={styles.countdownHeading}>Until the Festival</h2>
          <FestivalCountdown targetDate={`${site.event.year}-07-04T10:00:00`} />
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

      <section className={styles.memories} id="memories">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Previous Events</p>
          <h2 className={styles.sectionTitle}>Photos from Past Celebrations</h2>
          <p className={styles.sectionBody}>
            A small gallery for highlights from previous Rakhine Water Festival
            gatherings.
          </p>
          <div className={styles.memoryGrid}>
            {previousEventPhotos.map((photo, index) => (
              <figure
                className={`${styles.memoryCard} ${
                  index === 0 ? styles.memoryCardLarge : ""
                }`}
                key={`${photo.year}-${photo.title}`}
              >
                {photo.imageSrc ? (
                  <Image
                    src={photo.imageSrc}
                    alt={`${photo.title}, ${photo.year}`}
                    fill
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />
                ) : (
                  <div className={styles.imagePlaceholder} aria-hidden="true" />
                )}
                <figcaption className={styles.memoryCaption}>
                  <span>{photo.year}</span>
                  <strong>{photo.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.posters} id="posters">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Flyers & Posters</p>
          <h2 className={styles.sectionTitle}>Event Materials</h2>
          <p className={styles.sectionBody}>
            Add festival flyers, schedule posters, and shareable announcements
            here as they are ready.
          </p>
          <div className={styles.posterGrid}>
            {posterItems.map((poster) => (
              <article className={styles.posterCard} key={poster.title}>
                <div className={styles.posterPreview}>
                  {poster.imageSrc ? (
                    <Image
                      src={poster.imageSrc}
                      alt={poster.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className={styles.posterPlaceholder} aria-hidden="true">
                      <span>Poster</span>
                    </div>
                  )}
                </div>
                <div className={styles.posterText}>
                  <h3>{poster.title}</h3>
                  <p>{poster.detail}</p>
                </div>
              </article>
            ))}
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

      <Footer />
    </div>
  );
}
