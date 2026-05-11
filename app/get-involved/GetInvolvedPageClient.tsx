"use client";

import { useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation } from "@/lib/useTranslation";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

const ROLES = [
  "Stage & Sound Setup",
  "Food & Beverage",
  "Guest Welcome",
  "Cleanup Crew",
  "Kids Area",
  "Photography",
] as const;

const AVAILABILITY = ["Full Day", "Morning Only", "Afternoon Only"] as const;

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

export default function GetInvolvedPageClient() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  // Volunteer form state
  const [volName, setVolName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPhone, setVolPhone] = useState("");
  const [availability, setAvailability] = useState("");
  const [role, setRole] = useState("");
  const [volNotes, setVolNotes] = useState("");
  const [volWebsite, setVolWebsite] = useState("");
  const [submittedVolName, setSubmittedVolName] = useState("");
  const [volStatus, setVolStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [volErrorMsg, setVolErrorMsg] = useState("");

  // Sponsor form state
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [sponsorPhone, setSponsorPhone] = useState("");
  const [tier, setTier] = useState("");
  const [message, setMessage] = useState("");
  const [sponsorWebsite, setSponsorWebsite] = useState("");
  const [submittedOrgName, setSubmittedOrgName] = useState("");
  const [sponsorStatus, setSponsorStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sponsorErrorMsg, setSponsorErrorMsg] = useState("");

  async function handleVolunteerSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setVolStatus("loading");
    setVolErrorMsg("");

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: volName,
          email: volEmail,
          phone: volPhone,
          availability,
          role,
          notes: volNotes,
          website: volWebsite,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setVolStatus("error");
        setVolErrorMsg(data.error ?? t("form.generic_error"));
      } else {
        trackEvent("volunteer_submit_success");
        setSubmittedVolName(volName);
        setVolStatus("success");
        setVolName("");
        setVolEmail("");
        setVolPhone("");
        setAvailability("");
        setRole("");
        setVolNotes("");
        setVolWebsite("");
      }
    } catch {
      setVolStatus("error");
      setVolErrorMsg(t("form.network_error"));
    }
  }

  async function handleSponsorSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSponsorStatus("loading");
    setSponsorErrorMsg("");

    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName,
          contactName,
          email: sponsorEmail,
          phone: sponsorPhone,
          tier,
          message,
          website: sponsorWebsite,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setSponsorStatus("error");
        setSponsorErrorMsg(data.error ?? t("form.generic_error"));
      } else {
        trackEvent("sponsor_submit_success");
        setSubmittedOrgName(orgName);
        setSponsorStatus("success");
        setOrgName("");
        setContactName("");
        setSponsorEmail("");
        setSponsorPhone("");
        setTier("");
        setMessage("");
        setSponsorWebsite("");
      }
    } catch {
      setSponsorStatus("error");
      setSponsorErrorMsg(t("form.network_error"));
    }
  }

  return (
    <main className={styles.page}>
      <Navbar activePage="get-involved" />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <span className={styles.heroGhostText} aria-hidden="true">
          Get Involved
        </span>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Join the Community</p>
          <h1 className={styles.heroTitle}>Get Involved</h1>
          <p className={styles.heroLead}>
            Volunteer your time, sponsor the festival, or perform on stage —
            every contribution helps keep this tradition alive for our community.
          </p>
        </div>
      </section>

      <section className={styles.pathSection} aria-label="Ways to get involved">
        <a className={styles.pathCard} href="#volunteer">
          <span className={styles.pathKicker}>01</span>
          <strong>Volunteer</strong>
          <span>Help with setup, food, guests, activities, and cleanup.</span>
        </a>
        <a className={styles.pathCard} href="#sponsor">
          <span className={styles.pathKicker}>02</span>
          <strong>Sponsor</strong>
          <span>Support the festival as a business, family, or organization.</span>
        </a>
        <a className={styles.pathCard} href="/about#contact">
          <span className={styles.pathKicker}>03</span>
          <strong>Perform</strong>
          <span>Reach out about music, dance, cultural groups, or stage ideas.</span>
        </a>
      </section>

      {/* ── Volunteer Section ── */}
      <section id="volunteer" className={styles.volSection}>
        <div className={styles.volLayout}>
          {/* Left info pane */}
          <aside className={styles.volInfo}>
            <span className={styles.volGhostText} aria-hidden="true">
              Volunteer
            </span>
            <div className={styles.volInfoInner}>
              <p className={styles.eyebrow}>Get Involved</p>
              <h2 className={styles.volTitle}>Help make Thingyan happen</h2>
              <p className={styles.infoBody}>
                Volunteers are the backbone of the festival. From setup to
                cleanup, every pair of hands makes this celebration possible for
                our whole community.
              </p>
              <div className={styles.rolesSection}>
                <p className={styles.rolesLabel}>Open Roles</p>
                <ul className={styles.rolesList}>
                  {ROLES.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Right form pane */}
          <div className={styles.formSection}>
            {volStatus === "success" ? (
              <div className={styles.successMsg}>
                <p className={styles.successTitle}>You&apos;re signed up!</p>
                <p className={styles.successBody}>
                  Thank you, {submittedVolName || t("form.friend")}. Our committee will be in touch
                  with details ahead of the festival.
                </p>
                <button
                  type="button"
                  className={styles.submit}
                  onClick={() => setVolStatus("idle")}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleVolunteerSubmit}>
                <div className={styles.field}>
                  <label htmlFor="volName" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    id="volName"
                    type="text"
                    placeholder="Your full name"
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="volEmail" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="volEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={volEmail}
                    onChange={(e) => setVolEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="volPhone" className={styles.label}>
                    Phone{" "}
                    <span className={styles.labelOptional}>(optional)</span>
                  </label>
                  <input
                    id="volPhone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={volPhone}
                    onChange={(e) => setVolPhone(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="availability" className={styles.label}>
                    Availability
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="availability"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      required
                      style={{
                        color: availability ? "#fff" : "rgb(255 255 255 / 25%)",
                      }}
                    >
                      <option value="" disabled>
                        Select availability
                      </option>
                      {AVAILABILITY.map((a) => (
                        <option key={a} value={a} style={{ color: "#1c1c1c" }}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="role" className={styles.label}>
                    Preferred Role
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      style={{
                        color: role ? "#fff" : "rgb(255 255 255 / 25%)",
                      }}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {ROLES.map((r) => (
                        <option key={r} value={r} style={{ color: "#1c1c1c" }}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="volNotes" className={styles.label}>
                    Additional Notes{" "}
                    <span className={styles.labelOptional}>(optional)</span>
                  </label>
                  <textarea
                    id="volNotes"
                    placeholder="Anything else we should know?"
                    value={volNotes}
                    onChange={(e) => setVolNotes(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={volWebsite}
                  onChange={(e) => setVolWebsite(e.target.value)}
                  className={styles.honeypot}
                />

                {volStatus === "error" && (
                  <p className={styles.errorMsg} role="alert">{volErrorMsg}</p>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={volStatus === "loading"}
                >
                  {volStatus === "loading" ? "Submitting…" : "Sign Up to Volunteer"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Sponsor Section ── */}
      <section id="sponsor" className={styles.sponsorSection}>
        {/* Tier cards */}
        <div className={styles.tiers}>
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
        </div>

        {/* Download packet */}
        <div className={styles.packet}>
          <p className={styles.packetText}>Want the full sponsor packet?</p>
          <a href="/about#contact" className={styles.packetBtn}>
            Download Packet
          </a>
        </div>

        {/* Inquiry form */}
        <div className={styles.inquiryLayout}>
          {/* Left info pane */}
          <aside className={styles.sponsorInfo}>
            <span className={styles.sponsorGhostText} aria-hidden="true">
              Partner
            </span>
            <div className={styles.sponsorInfoInner}>
              <p className={styles.eyebrow}>Sponsorship Inquiry</p>
              <h2 className={styles.formTitle}>Ready to partner with us?</h2>
              <p className={styles.infoBody}>
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
                  {site.event.seasonLabel} - {site.event.city}, {site.event.state}
                </li>
              </ul>
            </div>
          </aside>

          {/* Right form pane */}
          <div className={styles.formSection}>
            {sponsorStatus === "success" ? (
              <div className={styles.successMsg}>
                <p className={styles.successTitle}>Inquiry received!</p>
                <p className={styles.successBody}>
                  Thank you, {submittedOrgName || t("form.friend")}. We&apos;ll be in touch with
                  the sponsorship packet and next steps shortly.
                </p>
                <button
                  type="button"
                  className={styles.submit}
                  onClick={() => setSponsorStatus("idle")}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSponsorSubmit}>
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
                  <label htmlFor="sponsorEmail" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="sponsorEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={sponsorEmail}
                    onChange={(e) => setSponsorEmail(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="sponsorPhone" className={styles.label}>
                    Phone{" "}
                    <span className={styles.labelOptional}>(optional)</span>
                  </label>
                  <input
                    id="sponsorPhone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={sponsorPhone}
                    onChange={(e) => setSponsorPhone(e.target.value)}
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
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={sponsorWebsite}
                  onChange={(e) => setSponsorWebsite(e.target.value)}
                  className={styles.honeypot}
                />

                {sponsorStatus === "error" && (
                  <p className={styles.errorMsg} role="alert">{sponsorErrorMsg}</p>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={sponsorStatus === "loading"}
                >
                  {sponsorStatus === "loading" ? "Submitting…" : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
