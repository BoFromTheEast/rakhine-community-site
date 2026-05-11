import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import FestivalCountdown from "./_components/FestivalCountdown";
import GalleryTabs from "./_components/GalleryTabs";
import styles from "./page.module.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Festival",
  description:
    "Thingyan Water Festival 2026 — Celebrate water, renewal, culture, and community in Des Moines, Iowa.",
};

const highlights = [
  {
    icon: "◈",
    title: "2 Days of Celebration",
    desc: "From athletic events on July 4th to the full water festival on July 5th — two days of unforgettable community energy.",
  },
  {
    icon: "✦",
    title: "Live Performances",
    desc: "Traditional Rakhine music, cultural dance, and stage performances celebrating our shared heritage.",
  },
  {
    icon: "❋",
    title: "Sports & Activities",
    desc: "Soccer, volleyball, tug-of-war, and more. Compete or cheer — everyone is welcome on the field.",
  },
  {
    icon: "⊕",
    title: "Delicious Food",
    desc: "Authentic Rakhine dishes including mohinga, samosa, and community favorites prepared with love.",
  },
];

const milestones = [
  {
    year: "2015",
    title: "Where It All Began",
    desc: "The first community Thingyan celebration in Des Moines.",
  },
  {
    year: "2017",
    title: "Growing Together",
    desc: "More families joined, growing the celebration across the community.",
  },
  {
    year: "2019",
    title: "Cultural Expansion",
    desc: "Expanded cultural performances and activities drew record participation.",
  },
  {
    year: "2022",
    title: "A Joyful Return",
    desc: "A joyful return after the pandemic brought us even closer together.",
  },
  {
    year: "2025",
    title: "Largest Yet",
    desc: "Our largest attendance yet — a record-breaking year of community pride.",
  },
  {
    year: "2026",
    title: "A New Chapter",
    desc: "A new chapter as Arakan Roots & Rise leads the tradition forward.",
  },
];

const testimonials = [
  {
    quote:
      "Thingyan is the one time each year our whole community comes together as one family.",
    name: "Daw Khin",
    role: "Community Elder",
  },
  {
    quote:
      "I love seeing younger generations celebrate our culture with so much pride and happiness.",
    name: "Maung Thura",
    role: "Volunteer",
  },
  {
    quote: "It's more than a festival. It's home, tradition, and hope for the future.",
    name: "Ei Ei",
    role: "Performer",
  },
];

const involveCards = [
  {
    title: "Volunteer",
    desc: "Help set up, run food stalls, manage the stage, or welcome guests. Every pair of hands matters.",
    href: "/get-involved#volunteer",
    label: "Sign Up to Volunteer",
  },
  {
    title: "Sponsor",
    desc: "Support the community as a local business or organization. Sponsorship packages for all sizes.",
    href: "/get-involved#sponsor",
    label: "Become a Sponsor",
  },
  {
    title: "Donate",
    desc: "Can't make it? A contribution of any size helps cover costs and keeps the tradition alive.",
    href: "/about#contact",
    label: "Make a Donation",
  },
];

export default async function FestivalPage() {
  // Locale is read here to pass to Navbar; page text is English only for now.
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "en";

  return (
    <main className={styles.page}>
      <Navbar activePage="festival" />

      {/* ── 1. Hero ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroDecor} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>Rakhine · Burmese · Community</p>
          <h1 className={styles.heroTitle}>
            Thingyan Water Festival{" "}
            <em className={styles.heroTitleEm}>{site.event.year}</em>
          </h1>
          <p className={styles.heroDesc}>
            Celebrate water, renewal, culture, and community in Des Moines, Iowa.
          </p>
          <div className={styles.heroMeta}>
            <span>{site.event.seasonLabel}</span>
            <span className={styles.heroDot} aria-hidden="true" />
            <span>{site.event.venue.line1}</span>
          </div>
          <div className={styles.heroCtas}>
            <a href="#highlights" className={styles.btnPrimary}>
              Event Details
            </a>
            <Link href="/get-involved#volunteer" className={styles.btnOutline}>
              Volunteer
            </Link>
            <Link href="/get-involved#sponsor" className={styles.btnOutline}>
              Sponsor
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Countdown ─────────────────────────────────────── */}
      <section className={styles.countdown}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Festival Countdown</p>
          <h2 className={styles.countdownHeading}>Until the Festival</h2>
          <FestivalCountdown targetDate="2026-07-04T10:00:00" />
        </div>
      </section>

      {/* ── 3. What is Thingyan? ──────────────────────────────── */}
      <section className={styles.thingyan}>
        <div className={`${styles.container} ${styles.thingyanGrid}`}>
          <div className={styles.thingyanText}>
            <p className={styles.sectionLabel}>About Thingyan</p>
            <h2 className={styles.sectionTitle}>A New Year Celebration Born from Water</h2>
            <p className={styles.thingyanBody}>
              Thingyan marks the traditional Burmese New Year — a time of cleansing, renewal, and
              joy. Through water, music, food, and community gathering, we celebrate new beginnings
              while honoring our culture and shared roots. For the Rakhine community of Des Moines,
              it is a reminder that no matter how far from home we travel, our traditions travel
              with us.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/Thingyan"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.thingyanLink}
            >
              Learn More About Thingyan →
            </a>
          </div>
          <div className={styles.thingyanImgWrap} aria-hidden="true">
            <div className={styles.thingyanImg} />
            <div className={styles.thingyanImgAccent} />
          </div>
        </div>
      </section>

      {/* ── 4. Festival Highlights ───────────────────────────── */}
      <section className={styles.highlights} id="highlights">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>What to Expect</p>
            <h2 className={styles.sectionTitle}>Festival Highlights</h2>
          </div>
          <div className={styles.highlightsGrid}>
            {highlights.map((h) => (
              <div key={h.title} className={styles.highlightCard}>
                <span className={styles.highlightIcon} aria-hidden="true">
                  {h.icon}
                </span>
                <h3 className={styles.highlightTitle}>{h.title}</h3>
                <p className={styles.highlightDesc}>{h.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.highlightsCta}>
            <Link href="/#schedule" className={styles.btnSecondary}>
              View Full Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Gallery ───────────────────────────────────────── */}
      <section className={styles.gallery}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Festival Memories</p>
            <h2 className={styles.sectionTitle}>Community Gallery</h2>
          </div>
          <GalleryTabs />
          <div className={styles.galleryCta}>
            <button className={styles.btnSecondary} type="button">
              View More Photos
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. Timeline ──────────────────────────────────────── */}
      <section className={styles.journey}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Our History</p>
            <h2 className={styles.sectionTitle}>Our Journey Since 2015</h2>
          </div>
        </div>
        <div className={styles.milestoneTrack}>
          {milestones.map((m, i) => (
            <div key={m.year} className={styles.milestone}>
              <div className={styles.milestoneThumb} aria-hidden="true" />
              <span className={styles.milestoneYear}>{m.year}</span>
              <h3 className={styles.milestoneTitle}>{m.title}</h3>
              <p className={styles.milestoneDesc}>{m.desc}</p>
              {i < milestones.length - 1 && (
                <span className={styles.milestoneConnector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Community Voices ──────────────────────────────── */}
      <section className={styles.voices}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Community Voices</p>
            <h2 className={styles.sectionTitle}>Stories From Our Community</h2>
          </div>
          <div className={styles.voicesGrid}>
            {testimonials.map((v) => (
              <div key={v.name} className={styles.voiceCard}>
                <span className={styles.voiceQuoteMark} aria-hidden="true">
                  "
                </span>
                <p className={styles.voiceQuote}>{v.quote}</p>
                <div className={styles.voiceAttrib}>
                  <strong className={styles.voiceName}>{v.name}</strong>
                  <span className={styles.voiceRole}>{v.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Get Involved CTA ──────────────────────────────── */}
      <section className={styles.involve}>
        <div className={styles.container}>
          <h2 className={styles.involveTitle}>
            Keep the tradition alive.
            <br />
            <em>Get involved today.</em>
          </h2>
          <div className={styles.involveGrid}>
            {involveCards.map((c) => (
              <div key={c.title} className={styles.involveCard}>
                <h3 className={styles.involveCardTitle}>{c.title}</h3>
                <p className={styles.involveCardDesc}>{c.desc}</p>
                <Link href={c.href} className={styles.involveCardLink}>
                  {c.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
