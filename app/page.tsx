import { DM_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import styles from "./page.module.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const scheduleItems = [
  {
    time: "10:00 AM",
    name: "Opening Ceremony",
    description:
      "Traditional prayers and blessings to welcome the New Year with elders leading the ritual.",
    tag: "Cultural",
    tagClass: styles.tagCulture,
  },
  {
    time: "11:00 AM",
    name: "Water Splashing Begins",
    description:
      "The main event! Bring your water guns, buckets, and smiles - everyone gets soaked.",
    tag: "Water",
    tagClass: styles.tagWater,
  },
  {
    time: "12:30 PM",
    name: "Traditional Food Stalls",
    description:
      "Enjoy authentic Rakhine dishes prepared by community members - mohinga, samosa, and more.",
    tag: "Food",
    tagClass: styles.tagFood,
  },
  {
    time: "2:00 PM",
    name: "Live Music and Karaoke",
    description:
      "Traditional and contemporary performances on our main stage, plus open karaoke sessions.",
    tag: "Cultural",
    tagClass: styles.tagCulture,
  },
  {
    time: "3:30 PM",
    name: "Raffle Drawing",
    description:
      "Win exciting prizes! Tickets available at the event. Must be present to win.",
    tag: "Raffle",
    tagClass: styles.tagCulture,
  },
  {
    time: "5:00 PM",
    name: "Closing and Community Dinner",
    description:
      "Join us to wrap up the day with a shared meal and community celebration.",
    tag: "Food",
    tagClass: styles.tagFood,
  },
];

export default function Home() {
  return (
    <div className={`${styles.page} ${dmSans.variable} ${playfair.variable}`}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          Rakhine Water Festival - Des Moines
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/festival">Festival</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <section className={styles.hero} id="home">
        <div className={styles.heroTag}>Thingyan - Des Moines 2026</div>
        <h1 className={styles.heroTitle}>
          Rakhine <br />
          <em>Water Festival</em>
        </h1>
        <p className={styles.heroSub}>
          Celebrate renewal, community, and the joy of Thingyan - a tradition
          carried from Rakhine to the heart of Iowa.
        </p>
        <div className={styles.heroDate}>April 2026 - Des Moines, Iowa</div>
        <div className={styles.heroButtons}>
          <Link href="/contact" className={styles.btnPrimary}>
            Get Your Tickets
          </Link>
          <Link href="/festival" className={styles.btnOutline}>
            Learn More
          </Link>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={`${styles.container} ${styles.aboutGrid}`}>
          <div>
            <p className={styles.sectionLabel}>Our Story</p>
            <h2 className={styles.sectionTitle}>
              A Tradition Born Far From Home
            </h2>
            <p className={styles.sectionBody}>
              Since 2015, the Rakhine community of Des Moines has gathered every
              year to celebrate Thingyan - the Burmese New Year water festival.
              What began as a small community gathering has grown into one of
              Iowa&apos;s most vibrant cultural celebrations, honoring our
              heritage and welcoming neighbors of all backgrounds.
            </p>
            <p className={`${styles.sectionBody} ${styles.sectionBodySpacing}`}>
              The festival is organized by the Rakhine Water Festival Committee,
              a group of young community members dedicated to keeping this
              tradition alive for generations to come.
            </p>
          </div>
          <div className={styles.aboutVisual}>
            <div className={styles.stat}>
              <div className={styles.statNum}>10+</div>
              <div className={styles.statLabel}>Years of Celebration</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>Est. 2015</div>
              <div className={styles.statLabel}>Des Moines, Iowa</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>Community</div>
              <div className={styles.statLabel}>Open to Everyone</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.schedule} id="schedule">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>What to Expect</p>
          <h2 className={styles.sectionTitle}>Festival Schedule</h2>
          <p className={styles.sectionBody}>
            A full day of water, music, food, and cultural celebration - all are
            welcome.
          </p>
          <div className={styles.scheduleGrid}>
            {scheduleItems.map((item) => (
              <article
                className={styles.eventCard}
                key={`${item.time}-${item.name}`}
              >
                <div className={styles.eventTime}>{item.time}</div>
                <div className={styles.eventName}>{item.name}</div>
                <div className={styles.eventDesc}>{item.description}</div>
                <span className={`${styles.eventTag} ${item.tagClass}`}>
                  {item.tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sponsors} id="sponsors">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Our Supporters</p>
          <h2 className={styles.sectionTitle}>Festival Sponsors</h2>
          <p className={styles.sectionBody}>
            We&apos;re grateful to the local businesses and organizations that
            make this festival possible. Interested in sponsoring?{" "}
            <a href="#contact" className={styles.inlineLink}>
              Get in touch.
            </a>
          </p>
          <div className={styles.sponsorTiers}>
            <div>
              <div className={styles.tierLabel}>Gold Sponsors</div>
              <div className={styles.sponsorRow}>
                <div className={`${styles.sponsorSlot} ${styles.goldTier}`}>
                  Your Logo Here
                </div>
                <div className={`${styles.sponsorSlot} ${styles.goldTier}`}>
                  Your Logo Here
                </div>
              </div>
            </div>
            <div>
              <div className={styles.tierLabel}>Silver Sponsors</div>
              <div className={styles.sponsorRow}>
                <div className={`${styles.sponsorSlot} ${styles.silverTier}`}>
                  Sponsor
                </div>
                <div className={`${styles.sponsorSlot} ${styles.silverTier}`}>
                  Sponsor
                </div>
                <div className={`${styles.sponsorSlot} ${styles.silverTier}`}>
                  Sponsor
                </div>
              </div>
            </div>
            <div>
              <div className={styles.tierLabel}>Community Supporters</div>
              <div className={styles.sponsorRow}>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  Supporter
                </div>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  Supporter
                </div>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  Supporter
                </div>
                <div className={`${styles.sponsorSlot} ${styles.bronzeTier}`}>
                  Supporter
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>Get In Touch</p>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.contactSub}>
            Questions about the festival, sponsorship opportunities, or
            volunteering? We&apos;d love to hear from you.
          </p>
          <form className={styles.contactForm}>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <textarea placeholder="Your message..." />
            <button className={styles.btnPrimary} type="button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          Copyright 2026 <span>Rakhine Water Festival Committee</span> - Des
          Moines, Iowa - All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
