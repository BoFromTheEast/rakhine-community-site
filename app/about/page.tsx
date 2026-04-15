import Link from "next/link";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>Rakhine Water Festival - Des Moines</div>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>

          <Link href="/festival">Festival</Link>
          <Link href="/about" className={styles.navLinkActive}>
            About
          </Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <span className={styles.ghostText} aria-hidden="true">
          Thingyan
        </span>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Our Story</p>
          <h1 className={styles.title}>
            Celebrating Rakhine culture in the&nbsp;heart of Iowa
          </h1>
          <p className={styles.lead}>
            Every spring, the Rakhine community of Des Moines gathers to mark
            Thingyan — the Burmese New Year water festival — with food, music,
            and the spirit of renewal.
          </p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyGrid}>
          <div className={styles.bodyLeft}>
            <p className={styles.sectionLabel}>Background</p>
            <h2 className={styles.sectionTitle}>
              From neighborhood to community
            </h2>
          </div>
          <div className={styles.bodyRight}>
            <p>
              What started as a small neighborhood gathering has grown into one
              of Iowa&rsquo;s most vibrant cultural celebrations — open to
              families, friends, and neighbors from all walks of life. Each year
              the event draws more first-time visitors who leave with a deeper
              appreciation of Rakhine heritage.
            </p>
            <p>
              Our goal is simple: preserve tradition, create joy across
              generations, and invite the wider community to experience the
              food, music, and warmth that define who we are.
            </p>
          </div>
        </div>

        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <span className={styles.pillarNumber}>01</span>
            <h3 className={styles.pillarTitle}>Tradition</h3>
            <p className={styles.pillarBody}>
              Honoring the customs and rituals of Thingyan passed down through
              generations of Rakhine families.
            </p>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarNumber}>02</span>
            <h3 className={styles.pillarTitle}>Community</h3>
            <p className={styles.pillarBody}>
              Building bridges between the Rakhine diaspora and the people of
              Iowa through shared celebration.
            </p>
          </div>
          <div className={styles.pillar}>
            <span className={styles.pillarNumber}>03</span>
            <h3 className={styles.pillarTitle}>Renewal</h3>
            <p className={styles.pillarBody}>
              Welcoming the new year with water, laughter, and a spirit of hope
              that carries us forward together.
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Join us this July in Des Moines, Iowa.
          </p>
          <Link href="/festival" className={styles.ctaLink}>
            View Festival Archive
          </Link>
        </div>
      </section>
    </main>
  );
}
