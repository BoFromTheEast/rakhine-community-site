import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Website terms of use for the Rakhine Water Festival.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <Navbar activePage="contact" />
      <article className={styles.main}>
        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.meta}>Last updated: April 23, 2026</p>

        <section className={styles.section}>
          <h2>Use of this website</h2>
          <p>This website is provided for festival information, registration interest, and community outreach. You agree not to misuse forms, submit spam, or interfere with site functionality.</p>
        </section>

        <section className={styles.section}>
          <h2>Content and updates</h2>
          <p>Event schedules, venue information, and sponsor details may change. We may update site content at any time without prior notice.</p>
        </section>

        <section className={styles.section}>
          <h2>Liability</h2>
          <p>We strive for accuracy but cannot guarantee all information is complete or error-free at all times.</p>
        </section>
      </article>
      <Footer />
    </main>
  );
}
