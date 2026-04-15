import Link from "next/link";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>Rakhine Water Festival - Des Moines</div>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/festival">Festival</Link>
          <Link href="/about">About</Link>
          <Link href="/contact" className={styles.navLinkActive}>
            Contact
          </Link>
        </div>
      </nav>

      <div className={styles.layout}>
        <aside className={styles.info}>
          <span className={styles.ghostText} aria-hidden="true">
            Hello
          </span>
          <div className={styles.infoInner}>
            <p className={styles.eyebrow}>Contact</p>
            <h1 className={styles.title}>Get in Touch</h1>
            <p className={styles.body}>
              Questions about tickets, sponsorship, or volunteering? Send a
              message and our festival committee will reach out.
            </p>
            <ul className={styles.details}>
              <li>
                <span className={styles.detailLabel}>Location</span>
                Des Moines, Iowa
              </li>
              <li>
                <span className={styles.detailLabel}>Season</span>
                July — Thingyan
              </li>
              <li>
                <span className={styles.detailLabel}>Organized by</span>
                Rakhine Community of Iowa
              </li>
            </ul>
          </div>
        </aside>

        <section className={styles.formSection}>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input id="name" type="text" placeholder="Your name" />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                placeholder="How can we help?"
              />
            </div>
            <button type="button" className={styles.submit}>
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
