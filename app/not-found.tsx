import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Navbar activePage="home" />
      <section className={styles.main}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.meta}>The link may be outdated or the page may have moved.</p>
        <p>
          <Link href="/">Return to homepage</Link>
        </p>
      </section>
      <Footer />
    </main>
  );
}
