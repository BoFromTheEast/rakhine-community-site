import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Rakhine Water Festival website.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <Navbar activePage="contact" />
      <article className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.meta}>Last updated: April 23, 2026</p>

        <section className={styles.section}>
          <h2>What we collect</h2>
          <p>We collect information you submit through contact, volunteer, and sponsorship forms, including your name, email, and message details.</p>
        </section>

        <section className={styles.section}>
          <h2>How we use your data</h2>
          <p>We use your information only to respond to your request and coordinate festival-related communication. We do not sell your personal data.</p>
        </section>

        <section className={styles.section}>
          <h2>Data retention</h2>
          <p>We retain submitted form data only as long as needed for festival operations, recordkeeping, and legal obligations.</p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>If you have privacy questions, contact hello@rakhinedsm.org.</p>
        </section>
      </article>
      <Footer />
    </main>
  );
}
