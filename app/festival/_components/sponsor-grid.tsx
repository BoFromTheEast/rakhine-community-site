import type { SponsorTier } from "../_data/sponsors";
import styles from "./sponsor-grid.module.css";

type Props = {
  tiers: SponsorTier[];
};

export function SponsorGrid({ tiers }: Props) {
  return (
    <section>
      <h2 className={styles.title}>Sponsors</h2>
      <div className={styles.tiers}>
        {tiers.map((tier) => (
          <div key={tier.label}>
            <p className={styles.tierLabel}>{tier.label}</p>
            <div className={styles.row}>
              {tier.slots.map((slot, idx) => (
                <div className={styles.slot} key={`${tier.label}-${idx}`}>
                  {slot}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
