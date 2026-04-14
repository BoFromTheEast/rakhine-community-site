import type { ScheduleItem } from "../_data/schedule";
import styles from "./schedule-grid.module.css";

type Props = {
  items: ScheduleItem[];
};

export function ScheduleGrid({ items }: Props) {
  return (
    <section>
      <h2 className={styles.title}>Festival Schedule</h2>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={`${item.time}-${item.title}`} className={styles.card}>
            <p className={styles.time}>{item.time}</p>
            <h3 className={styles.name}>{item.title}</h3>
            <p className={styles.desc}>{item.description}</p>
            <span className={styles.tag}>{item.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
