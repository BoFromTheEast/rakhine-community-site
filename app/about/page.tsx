import Link from "next/link";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/festival">Festival</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <p className={styles.eyebrow}>Our Story</p>
        <h1 className={styles.title}>About the Rakhine Water Festival</h1>
        <p className={styles.body}>
          The Rakhine community in Des Moines gathers each year to celebrate
          Thingyan, the Burmese New Year water festival. What started as a small
          neighborhood gathering has become a larger cultural celebration open to
          families, friends, and neighbors across Iowa.
        </p>
        <p className={styles.body}>
          Our goal is to preserve tradition, create joy across generations, and
          invite the wider community to experience food, music, and the spirit
          of renewal together.
        </p>
      </div>
    </main>
  );
}
