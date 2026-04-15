"use client";

import { useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";

const ROLES = [
  "Stage & Sound Setup",
  "Food & Beverage",
  "Guest Welcome",
  "Cleanup Crew",
  "Kids Area",
  "Photography",
] as const;

const AVAILABILITY = ["Full Day", "Morning Only", "Afternoon Only"] as const;

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, availability, role, notes }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong.");
    } else {
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setAvailability("");
      setRole("");
      setNotes("");
    }
  }

  return (
    <main className={styles.page}>
      <Navbar activePage="volunteer" />

      <div className={styles.layout}>
        {/* ── Left info pane ── */}
        <aside className={styles.info}>
          <span className={styles.ghostText} aria-hidden="true">
            Volunteer
          </span>
          <div className={styles.infoInner}>
            <p className={styles.eyebrow}>Get Involved</p>
            <h1 className={styles.title}>Help make Thingyan happen</h1>
            <p className={styles.body}>
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

        {/* ── Right form pane ── */}
        <section className={styles.formSection}>
          {status === "success" ? (
            <div className={styles.successMsg}>
              <p className={styles.successTitle}>You&apos;re signed up!</p>
              <p className={styles.successBody}>
                Thank you, {name || "friend"}. Our committee will be in touch
                with details ahead of the festival.
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
                <label htmlFor="name" className={styles.label}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <label htmlFor="notes" className={styles.label}>
                  Additional Notes{" "}
                  <span className={styles.labelOptional}>(optional)</span>
                </label>
                <textarea
                  id="notes"
                  placeholder="Anything else we should know?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                {status === "loading" ? "Submitting…" : "Sign Up to Volunteer"}
              </button>
            </form>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
