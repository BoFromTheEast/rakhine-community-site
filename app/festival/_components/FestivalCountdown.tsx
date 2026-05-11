"use client";

import { useEffect, useState } from "react";
import styles from "./FestivalCountdown.module.css";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function FestivalCountdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate);
  // null on server — avoids SSR/client mismatch from Date.now() drift
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className={styles.grid}>
      {UNITS.map(({ key, label }, i) => (
        <div key={key} className={styles.unit}>
          {i > 0 && <span className={styles.sep} aria-hidden="true">:</span>}
          <span className={styles.num}>
            {time ? String(time[key]).padStart(2, "0") : "--"}
          </span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}
