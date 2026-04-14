import Link from "next/link";
import { ScheduleGrid } from "./_components/schedule-grid";
import { SponsorGrid } from "./_components/sponsor-grid";
import { scheduleItems } from "./_data/schedule";
import { sponsorTiers } from "./_data/sponsors";
import styles from "./page.module.css";

export default function FestivalPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <p className={styles.eyebrow}>Thingyan 2026</p>
        <h1 className={styles.title}>Festival Details</h1>
        <p className={styles.body}>
          Explore the schedule, community highlights, and sponsorship information
          for this year&apos;s Rakhine Water Festival in Des Moines.
        </p>

        <ScheduleGrid items={scheduleItems} />
        <SponsorGrid tiers={sponsorTiers} />
      </div>
    </main>
  );
}
