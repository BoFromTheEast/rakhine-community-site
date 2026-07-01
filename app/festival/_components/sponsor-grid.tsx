import Image from "next/image";
import type { Sponsor } from "../_data/sponsors";
import styles from "./sponsor-grid.module.css";

type Props = {
  sponsors: Sponsor[];
};

export function SponsorGrid({ sponsors }: Props) {
  return (
    <section>
      <h2 className={styles.title}>Sponsors</h2>
      <div className={styles.row}>
        {sponsors.map((sponsor) => (
          <div className={styles.slot} key={sponsor.name}>
            {sponsor.logoSrc ? (
              <Image
                src={sponsor.logoSrc}
                alt={sponsor.name}
                width={180}
                height={72}
              />
            ) : (
              <>
                <strong>{sponsor.name}</strong>
                {sponsor.organization && <span>{sponsor.organization}</span>}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
