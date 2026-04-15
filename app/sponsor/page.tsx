"use client";

import { useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";

const TIERS = [
  {
    price: "$250+",
    name: "Community Friend",
    benefits: [
      "Logo on festival website",
      "Social media mention",
      "2 complimentary entries",
    ],
    featured: false,
  },
  {
    price: "$500+",
    name: "Festival Partner",
    benefits: [
      "Everything in Community Friend",
      "Logo on event banner",
      "Booth space at the festival",
      "5 complimentary entries",
    ],
    featured: false,
  },
  {
    price: "$1,000+",
    name: "Presenting Sponsor",
    benefits: [
      "Everything in Festival Partner",
      "Stage recognition",
      "Featured logo on all materials",
      "10 complimentary entries",
      "Speaking opportunity",
    ],
    featured: true,
  },
] as const;

const TIER_NAMES = TIERS.map((t) => t.name);

export default function SponsorPage() {
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/sponsor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgName, contactName, email, phone, tier, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong.");
    } else {
      setStatus("success");
      setOrgName("");
      setContactName("");
      setEmail("");
      setPhone("");
      setTier("");
      setMessage("");
    }
  }

  return (
    <main className={styles.page}>
      <Navbar activePage="sponsor" />

      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroGhostText} aria-hidden="true">
          Sponsor
        </span>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Support the Festival</p>
          <h1 className={styles.title}>
            Partner with the Rakhine&nbsp;Community
          </h1>
          <p className={styles.lead}>
            The Rakhine Water Festival brings together hundreds of families
            across Iowa every year. Sponsoring gives your organization direct
            visibility with a diverse, engaged audience while helping preserve a
            cultural tradition that matters.
          </p>
        </div>
      </section>

      {/* ── 2. Tier cards ── */}
      <section className={styles.tiers}>
        <div className={styles.tiersHeader}>
          <p className={styles.tiersLabel}>Sponsorship Tiers</p>
          <h2 className={styles.tiersTitle}>Find the right level of support</h2>
        </div>
        <div className={styles.tiersGrid}>
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`${styles.tierCard} ${t.featured ? styles.tierCardFeatured : ""}`}
            >
              <span className={styles.tierPrice}>{t.price}</span>
              <h3 className={styles.tierName}>{t.name}</h3>
              <ul className={styles.tierBenefits}>
                {t.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Download section ── */}
      <div className={styles.packet}>
        <p className={styles.packetText}>Want the full sponsor packet?</p>
        <a href="/sponsor-packet.pdf" className={styles.packetBtn}>
          Download Packet
        </a>
      </div>

      {/* ── 4. Inquiry form — two-column ── */}
      <div className={styles.inquiryLayout}>
        {/* Left info pane */}
        <aside className={styles.info}>
          <span className={styles.ghostText} aria-hidden="true">
            Partner
          </span>
          <div className={styles.infoInner}>
            <p className={styles.eyebrow}>Sponsorship Inquiry</p>
            <h2 className={styles.formTitle}>Ready to partner with us?</h2>
            <p className={styles.body}>
              Fill out the form and our team will follow up with the full
              sponsorship packet and next steps. We aim to respond within 3–5
              business days.
            </p>
            <ul className={styles.details}>
              <li>
                <span className={styles.detailLabel}>Organized by</span>
                Rakhine Water Festival Committee
              </li>
              <li>
                <span className={styles.detailLabel}>Response time</span>
                3–5 business days
              </li>
              <li>
                <span className={styles.detailLabel}>Festival</span>
                July 2026 — Des Moines, Iowa
              </li>
            </ul>
          </div>
        </aside>

        {/* Right form pane */}
        <section className={styles.formSection}>
          {status === "success" ? (
            <div className={styles.successMsg}>
              <p className={styles.successTitle}>Inquiry received!</p>
              <p className={styles.successBody}>
                Thank you, {orgName || "friend"}. We&apos;ll be in touch with
                the sponsorship packet and next steps shortly.
              </p>
              <button
                type="button"
                className={styles.submit}
                onClick={() => setStatus("idle")}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="orgName" className={styles.label}>
                  Organization Name
                </label>
                <input
                  id="orgName"
                  type="text"
                  placeholder="Your organization"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contactName" className={styles.label}>
                  Contact Name
                </label>
                <input
                  id="contactName"
                  type="text"
                  placeholder="Your full name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>
                  Phone{" "}
                  <span className={styles.labelOptional}>(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="tier" className={styles.label}>
                  Sponsorship Tier
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id="tier"
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    required
                    style={{
                      color: tier ? "#fff" : "rgb(255 255 255 / 25%)",
                    }}
                  >
                    <option value="" disabled>
                      Select a tier
                    </option>
                    {TIER_NAMES.map((t) => (
                      <option key={t} value={t} style={{ color: "#1c1c1c" }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  Message{" "}
                  <span className={styles.labelOptional}>(optional)</span>
                </label>
                <textarea
                  id="message"
                  placeholder="Questions, special requests, or anything else…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {status === "error" && (
                <p className={styles.errorMsg}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting…" : "Send Inquiry"}
              </button>
            </form>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
