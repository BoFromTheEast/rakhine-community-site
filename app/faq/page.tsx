import { cookies } from "next/headers";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import FaqAccordion from "./_components/FaqAccordion";
import styles from "./page.module.css";
import en from "@/locales/en.json";
import my from "@/locales/my.json";
import type { Locale } from "@/lib/useTranslation";

const dicts = { en, my };

export default async function FaqPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "en") as Locale;
  const categories = dicts[locale].faq.categories;

  return (
    <main className={styles.page}>
      <Navbar activePage="faq" />

      <section className={styles.hero}>
        <span className={styles.ghostText} aria-hidden="true">
          FAQ
        </span>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Questions &amp; Answers</p>
          <h1 className={styles.title}>Everything you need&nbsp;to know</h1>
          <p className={styles.lead}>
            Find answers to the most common questions about the festival,
            location, and how to get involved. Still have questions?{" "}
            <a href="/contact" className={styles.leadLink}>
              Reach out directly.
            </a>
          </p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <div key={cat.label} className={styles.category}>
              <p className={styles.categoryLabel}>{cat.label}</p>
              <FaqAccordion items={cat.items} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
