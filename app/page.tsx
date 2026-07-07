import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Archived",
  description:
    "The 2026 Iowa Water Festival has wrapped. Thank you for celebrating with us.",
};

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.archive}>
        <div className={styles.logoWrap}>
          <Image
            src="/organization/arrakan-roots-rise.png"
            alt="Arakan Roots & Rise"
            width={1254}
            height={1254}
            sizes="96px"
            priority
          />
        </div>

        {/* <p className={styles.eyebrow}>Rakhine Water Festival - Des Moines</p> */}
        <h1 className={styles.title}>
          Thank you for making it to our Iowa Water Festival of 2026.
        </h1>
        <p className={styles.body}>
          We are grateful to everyone who gathered, volunteered, performed,
          sponsored, cooked, played, traveled, and celebrated with the community.
          We&apos;ll be back.
        </p>

        <div className={styles.links} aria-label="Festival links">
          <a href={`mailto:${site.contactEmail}`}>Contact the committee</a>
          <a href={site.social.instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </section>
    </main>
  );
}
