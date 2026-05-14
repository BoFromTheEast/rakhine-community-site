"use client";

import { useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation } from "@/lib/useTranslation";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

type PathKey = "volunteer" | "sponsor" | "perform";

const IMPACT_POINTS = [
  {
    title: "Stronger Together",
    body: "Volunteers are the heart that keeps the festival running.",
  },
  {
    title: "Sustainable Tradition",
    body: "Sponsors help fund and grow our cultural celebration.",
  },
  {
    title: "Share Our Culture",
    body: "Performers bring our music, dance, and heritage to life.",
  },
] as const;

const HELP_PATHS: {
  key: PathKey;
  title: string;
  description: string;
  button: string;
}[] = [
  {
    key: "volunteer",
    title: "Volunteer",
    description: "Help with setup, food, games, guest welcome, cleanup, photography, and more.",
    button: "Sign Up to Volunteer",
  },
  {
    key: "sponsor",
    title: "Sponsor",
    description: "Support the festival as a business, family, or organization and help fund the celebration.",
    button: "Become a Sponsor",
  },
  {
    key: "perform",
    title: "Perform",
    description: "Share your music, dance, cultural performances, or stage ideas with our community.",
    button: "Apply to Perform",
  },
];

const ROLES = [
  "Stage & Sound Setup",
  "Food & Beverage",
  "Guest Welcome",
  "Cleanup Crew",
  "Kids Area",
  "Photography",
] as const;

const AVAILABILITY = ["Full Day", "Morning Only", "Afternoon Only"] as const;

const SPONSOR_TIERS = [
  {
    price: "$250+",
    name: "Community Friend",
    benefits: "Logo on website, social media mention",
  },
  {
    price: "$500+",
    name: "Festival Partner",
    benefits: "Logo on banner, booth space, website recognition",
  },
  {
    price: "$1,000+",
    name: "Presenting Sponsor",
    benefits: "Stage recognition, featured logo, speaking opportunity",
  },
] as const;

const PERFORMANCE_NOTES = [
  "Cultural dances",
  "Live music",
  "Youth performances",
  "Community karaoke",
  "Traditional showcases",
] as const;

const PERFORMANCE_TYPES = [
  "Cultural Dance",
  "Live Music",
  "Youth Performance",
  "Community Karaoke",
  "Traditional Showcase",
  "Other Stage Idea",
] as const;

const FORM_COPY: Record<PathKey, { eyebrow: string; title: string }> = {
  volunteer: {
    eyebrow: "Volunteer Sign Up",
    title: "Be part of the team",
  },
  sponsor: {
    eyebrow: "Sponsorship Inquiry",
    title: "Help fund the celebration",
  },
  perform: {
    eyebrow: "Performance Interest",
    title: "Share your talent",
  },
};

export default function GetInvolvedPageClient() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);
  const [activePath, setActivePath] = useState<PathKey>("volunteer");

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

  const [performerName, setPerformerName] = useState("");
  const [performContact, setPerformContact] = useState("");
  const [performEmail, setPerformEmail] = useState("");
  const [performPhone, setPerformPhone] = useState("");
  const [performanceType, setPerformanceType] = useState("");
  const [duration, setDuration] = useState("");
  const [performMessage, setPerformMessage] = useState("");
  const [submittedPerformer, setSubmittedPerformer] = useState("");
  const [performStatus, setPerformStatus] = useState<"idle" | "success">("idle");

  function selectPath(path: PathKey) {
    setActivePath(path);
    requestAnimationFrame(() => {
      document.getElementById("involvement-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

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

  function handlePerformSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedPerformer(performerName);
    setPerformStatus("success");
    setPerformerName("");
    setPerformContact("");
    setPerformEmail("");
    setPerformPhone("");
    setPerformanceType("");
    setDuration("");
    setPerformMessage("");
  }

  const activeCopy = FORM_COPY[activePath];

  return (
    <main className={styles.page}>
      <Navbar activePage="get-involved" />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Join the Community</p>
          <h1 className={styles.heroTitle}>Bring Thingyan to life.</h1>
          <p className={styles.heroLead}>
            Every hour you give, every dollar you share, and every talent you bring helps keep
            Thingyan alive for generations to come.
          </p>
          <div className={styles.heroActions} aria-label="Get involved options">
            {HELP_PATHS.map((path) => (
              <button
                type="button"
                key={path.key}
                className={`${styles.heroAction} ${
                  activePath === path.key ? styles.heroActionActive : ""
                }`}
                onClick={() => selectPath(path.key)}
              >
                {path.title}
              </button>
            ))}
          </div>
          <div className={styles.heroDetails} aria-label="Event details">
            <span>July 4-5, {site.event.year}</span>
            <span>{site.event.venue.name}</span>
            <span>{site.event.city}, {site.event.state}</span>
          </div>
        </div>
      </section>

      <section className={styles.impactBar} aria-label="Community impact">
        {IMPACT_POINTS.map((point) => (
          <article className={styles.impactItem} key={point.title}>
            <div>
              <h2>{point.title}</h2>
              <p>{point.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.backgroundSection} aria-labelledby="background-heading">
        <div className={styles.backgroundGrid}>
          <div>
            <p className={styles.eyebrow}>{t("about_page.background_label")}</p>
            <h2 id="background-heading">{t("about_page.background_title")}</h2>
          </div>
          <div className={styles.backgroundCopy}>
            <p>{t("about_page.body_1")}</p>
            <p>{t("about_page.body_2")}</p>
          </div>
        </div>

        <div className={styles.pillars}>
          <article className={styles.pillar}>
            <span>01</span>
            <h3>{t("about_page.pillar_1_title")}</h3>
            <p>{t("about_page.pillar_1_body")}</p>
          </article>
          <article className={styles.pillar}>
            <span>02</span>
            <h3>{t("about_page.pillar_2_title")}</h3>
            <p>{t("about_page.pillar_2_body")}</p>
          </article>
          <article className={styles.pillar}>
            <span>03</span>
            <h3>{t("about_page.pillar_3_title")}</h3>
            <p>{t("about_page.pillar_3_body")}</p>
          </article>
        </div>
      </section>

      <section className={styles.choiceSection} aria-labelledby="help-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>How You Can Help</p>
          <h2 id="help-heading">Choose your path</h2>
        </div>

        <div className={styles.choiceGrid}>
          {HELP_PATHS.map((path, index) => (
            <button
              type="button"
              key={path.key}
              className={`${styles.choiceCard} ${activePath === path.key ? styles.choiceCardActive : ""}`}
              onClick={() => selectPath(path.key)}
              aria-pressed={activePath === path.key}
            >
              <span className={styles.choiceNumber}>0{index + 1}</span>
              <span className={styles.choiceCheck} aria-hidden="true" />
              <strong>{path.title}</strong>
              <span>{path.description}</span>
              <em>{path.button}</em>
            </button>
          ))}
        </div>
      </section>

      <section
        id="involvement-form"
        className={styles.formShell}
        aria-labelledby="form-heading"
      >
        <div className={styles.tabs} role="tablist" aria-label="Get involved forms">
          {HELP_PATHS.map((path) => (
            <button
              type="button"
              key={path.key}
              id={`${path.key}-tab`}
              className={`${styles.tab} ${activePath === path.key ? styles.tabActive : ""}`}
              role="tab"
              aria-selected={activePath === path.key}
              aria-controls={`${path.key}-panel`}
              tabIndex={activePath === path.key ? 0 : -1}
              onClick={() => setActivePath(path.key)}
            >
              {path.title}
            </button>
          ))}
        </div>

        <div className={styles.formLayout}>
          <aside className={styles.formInfo}>
            <p className={styles.eyebrow}>{activeCopy.eyebrow}</p>
            <h2 id="form-heading">{activeCopy.title}</h2>
            {activePath === "volunteer" && (
              <div id="volunteer-panel" role="tabpanel" aria-labelledby="volunteer-tab">
                <p className={styles.infoBody}>
                  Volunteers are the backbone of Thingyan. From setup to cleanup, every pair of
                  hands makes this celebration possible.
                </p>
                <InfoList label="Open Roles" items={ROLES} />
              </div>
            )}
            {activePath === "sponsor" && (
              <div id="sponsor-panel" role="tabpanel" aria-labelledby="sponsor-tab">
                <p className={styles.infoBody}>
                  Sponsors help cover the cost of the venue, stage, sound, food support, cultural
                  programming, and community activities.
                </p>
                <div className={styles.tierList}>
                  {SPONSOR_TIERS.map((sponsorTier) => (
                    <article className={styles.tierItem} key={sponsorTier.name}>
                      <h3>
                        {sponsorTier.name} <span>{sponsorTier.price}</span>
                      </h3>
                      <p>Benefits: {sponsorTier.benefits}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
            {activePath === "perform" && (
              <div id="perform-panel" role="tabpanel" aria-labelledby="perform-tab">
                <p className={styles.infoBody}>
                  We welcome dancers, singers, musicians, cultural groups, youth performances, and
                  stage ideas that celebrate our community.
                </p>
                <InfoList label="Performance Notes" items={PERFORMANCE_NOTES} />
              </div>
            )}
          </aside>

          <div className={styles.formPanel}>
            {activePath === "volunteer" && (
              <>
                {volStatus === "success" ? (
                  <SuccessMessage
                    title="You're signed up!"
                    body={`Thank you, ${submittedVolName || t("form.friend")}. Our committee will be in touch with details ahead of the festival.`}
                    button="Submit Another"
                    onReset={() => setVolStatus("idle")}
                  />
                ) : (
                  <form className={styles.form} onSubmit={handleVolunteerSubmit}>
                    <TextField id="volName" label="Full Name" value={volName} onChange={setVolName} required />
                    <TextField id="volEmail" label="Email" type="email" value={volEmail} onChange={setVolEmail} required />
                    <TextField id="volPhone" label="Phone" optional type="tel" value={volPhone} onChange={setVolPhone} />
                    <SelectField id="availability" label="Availability" value={availability} onChange={setAvailability} options={AVAILABILITY} required />
                    <SelectField id="role" label="Preferred Role" value={role} onChange={setRole} options={ROLES} required />
                    <TextAreaField id="volNotes" label="Additional Notes" optional value={volNotes} onChange={setVolNotes} />
                    <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={volWebsite} onChange={(e) => setVolWebsite(e.target.value)} className={styles.honeypot} />
                    {volStatus === "error" && <p className={styles.errorMsg} role="alert">{volErrorMsg}</p>}
                    <button type="submit" className={styles.submit} disabled={volStatus === "loading"}>
                      {volStatus === "loading" ? "Submitting..." : "Sign Up to Volunteer"}
                    </button>
                  </form>
                )}
              </>
            )}

            {activePath === "sponsor" && (
              <>
                {sponsorStatus === "success" ? (
                  <SuccessMessage
                    title="Inquiry received!"
                    body={`Thank you, ${submittedOrgName || t("form.friend")}. We'll be in touch with the sponsorship packet and next steps shortly.`}
                    button="Submit Another"
                    onReset={() => setSponsorStatus("idle")}
                  />
                ) : (
                  <form className={styles.form} onSubmit={handleSponsorSubmit}>
                    <TextField id="orgName" label="Organization Name" value={orgName} onChange={setOrgName} required />
                    <TextField id="contactName" label="Contact Name" value={contactName} onChange={setContactName} required />
                    <TextField id="sponsorEmail" label="Email" type="email" value={sponsorEmail} onChange={setSponsorEmail} required />
                    <TextField id="sponsorPhone" label="Phone" optional type="tel" value={sponsorPhone} onChange={setSponsorPhone} />
                    <SelectField id="tier" label="Sponsorship Tier" value={tier} onChange={setTier} options={SPONSOR_TIERS.map((sponsorTier) => sponsorTier.name)} required />
                    <TextAreaField id="message" label="Message" optional value={message} onChange={setMessage} />
                    <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={sponsorWebsite} onChange={(e) => setSponsorWebsite(e.target.value)} className={styles.honeypot} />
                    {sponsorStatus === "error" && <p className={styles.errorMsg} role="alert">{sponsorErrorMsg}</p>}
                    <div className={styles.formActions}>
                      <button type="submit" className={styles.submit} disabled={sponsorStatus === "loading"}>
                        {sponsorStatus === "loading" ? "Submitting..." : "Send Sponsor Inquiry"}
                      </button>
                      <a className={styles.secondaryAction} href={`mailto:${site.contactEmail}`}>Email Committee</a>
                    </div>
                  </form>
                )}
              </>
            )}

            {activePath === "perform" && (
              <>
                {performStatus === "success" ? (
                  <SuccessMessage
                    title="Performance interest saved"
                    body={`Thank you, ${submittedPerformer || t("form.friend")}. This is a placeholder for now, and the committee can connect it to a backend later.`}
                    button="Submit Another"
                    onReset={() => setPerformStatus("idle")}
                  />
                ) : (
                  <form className={styles.form} onSubmit={handlePerformSubmit}>
                    <TextField id="performerName" label="Performer / Group Name" value={performerName} onChange={setPerformerName} required />
                    <TextField id="performContact" label="Contact Name" value={performContact} onChange={setPerformContact} required />
                    <TextField id="performEmail" label="Email" type="email" value={performEmail} onChange={setPerformEmail} required />
                    <TextField id="performPhone" label="Phone" optional type="tel" value={performPhone} onChange={setPerformPhone} />
                    <SelectField id="performanceType" label="Performance Type" value={performanceType} onChange={setPerformanceType} options={PERFORMANCE_TYPES} required />
                    <TextField id="duration" label="Estimated Duration" value={duration} onChange={setDuration} required />
                    <TextAreaField id="performMessage" label="Message" optional value={performMessage} onChange={setPerformMessage} />
                    <button type="submit" className={styles.submit}>Apply to Perform</button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div>
          <p className={styles.eyebrow}>Still deciding?</p>
          <h2>Not sure where you fit?</h2>
          <p>We&apos;d love to help you find the best way to get involved.</p>
        </div>
        <div className={styles.bottomActions}>
          <a href={`mailto:${site.contactEmail}`} className={styles.outlineButton}>Contact the Committee</a>
          <a
            href={site.social.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.outlineButton}
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoList({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className={styles.infoListWrap}>
      <p className={styles.listLabel}>{label}</p>
      <ul className={styles.infoList}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SuccessMessage({
  title,
  body,
  button,
  onReset,
}: {
  title: string;
  body: string;
  button: string;
  onReset: () => void;
}) {
  return (
    <div className={styles.successMsg}>
      <p className={styles.successTitle}>{title}</p>
      <p className={styles.successBody}>{body}</p>
      <button type="button" className={styles.submit} onClick={onReset}>
        {button}
      </button>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  optional = false,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
  required?: boolean;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label} {optional && <span className={styles.labelOptional}>(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  optional = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label} {optional && <span className={styles.labelOptional}>(optional)</span>}
      </label>
      <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} required={required}>
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
