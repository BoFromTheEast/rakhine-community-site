import Link from "next/link";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/festival">Festival</Link>
        </nav>

        <p className={styles.eyebrow}>Contact</p>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.body}>
          Questions about tickets, sponsorship, or volunteering? Send a message
          and our festival committee will reach out.
        </p>

        <form className={styles.form}>
          <input type="text" placeholder="Your name" />
          <input type="email" placeholder="Your email" />
          <textarea placeholder="Your message..." />
          <button type="button">Send Message</button>
        </form>
      </div>
    </main>
  );
}
