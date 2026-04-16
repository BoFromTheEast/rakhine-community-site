import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>Rakhine Water Festival</div>
          <p className={styles.footerTagline}>
            Celebrating Thingyan and Rakhine heritage in the heart of Iowa
            since 2015.
          </p>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Our History</h4>
          <p className={styles.footerText}>
            The Rakhine community of Des Moines began celebrating Thingyan in
            2015 with a small neighborhood gathering. Over a decade later, the
            festival has grown into one of Iowa&apos;s most anticipated cultural
            events — drawing hundreds of attendees each spring.
          </p>
          <Link href="/festival" className={styles.footerLink}>
            View the archive →
          </Link>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Mission &amp; Values</h4>
          <ul className={styles.footerList}>
            <li>Preserve Rakhine culture and tradition</li>
            <li>Foster joy and renewal across generations</li>
            <li>Welcome all neighbors and communities</li>
            <li>Operate transparently as a nonprofit</li>
            <li>Invest every dollar back into the festival</li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Leadership</h4>
          <ul className={styles.footerLeadership}>
            <li>
              <span className={styles.leaderName}>Festival Director</span>
              <span className={styles.leaderRole}>Committee Chair</span>
            </li>
            <li>
              <span className={styles.leaderName}>Operations Lead</span>
              <span className={styles.leaderRole}>Logistics &amp; Venue</span>
            </li>
            <li>
              <span className={styles.leaderName}>Cultural Director</span>
              <span className={styles.leaderRole}>Ceremonies &amp; Program</span>
            </li>
            <li>
              <span className={styles.leaderName}>Community Outreach</span>
              <span className={styles.leaderRole}>
                Partnerships &amp; Sponsors
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.footerNav}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/festival">Festival Archive</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/get-involved">Get Involved</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <h4 className={`${styles.footerHeading} ${styles.footerHeadingSpaced}`}>
            Location
          </h4>
          <p className={styles.footerText}>
            Des Moines, Iowa
            <br />
            Every July — Thingyan Season
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; 2026{" "}
          <span className={styles.footerHighlight}>
            Rakhine Water Festival Committee
          </span>{" "}
          — Des Moines, Iowa. All rights reserved.
        </p>
        <p className={styles.footerNonprofit}>
          A nonprofit community organization.
        </p>
      </div>
    </footer>
  );
}
