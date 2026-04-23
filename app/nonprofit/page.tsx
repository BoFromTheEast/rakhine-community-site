import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Nonprofit Transparency",
  description: "Transparency and funding approach for the Rakhine Water Festival committee.",
};

export default function NonprofitPage() {
  return (
    <main className={styles.page}>
      <Navbar activePage="about" />
      <article className={styles.main}>
        <h1 className={styles.title}>Nonprofit Transparency</h1>
        <p className={styles.meta}>Last updated: April 23, 2026</p>

        <section className={styles.section}>
          <h2>Our commitment</h2>
          <p>The Rakhine Water Festival Committee operates as a community nonprofit initiative focused on cultural preservation, education, and community celebration.</p>
        </section>

        <section className={styles.section}>
          <h2>How funds are used</h2>
          <ul className={styles.list}>
            <li>Venue and safety costs</li>
            <li>Cultural program and equipment</li>
            <li>Community outreach and operations</li>
            <li>Volunteer support and event logistics</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Community-first operations</h2>
          <p>Any surplus is reinvested into future festival programming and local community impact.</p>
        </section>
      </article>
      <Footer />
    </main>
  );
}
