"use client";

import { useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong.");
    } else {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <main className={styles.page}>
      <Navbar activePage="contact" />

      <div className={styles.layout}>
        <aside className={styles.info}>
          <span className={styles.ghostText} aria-hidden="true">
            Hello
          </span>
          <div className={styles.infoInner}>
            <p className={styles.eyebrow}>Contact</p>
            <h1 className={styles.title}>Get in Touch</h1>
            <p className={styles.body}>
              Questions about tickets, sponsorship, or volunteering? Send a
              message and our festival committee will reach out.
            </p>
            <ul className={styles.details}>
              <li>
                <span className={styles.detailLabel}>Location</span>
                Des Moines, Iowa
              </li>
              <li>
                <span className={styles.detailLabel}>Season</span>
                July — Thingyan
              </li>
              <li>
                <span className={styles.detailLabel}>Organized by</span>
                Rakhine Community of Iowa
              </li>
            </ul>
          </div>
        </aside>

        <section className={styles.formSection}>
          {status === "success" ? (
            <div className={styles.successMsg}>
              <p className={styles.successTitle}>Message sent!</p>
              <p className={styles.successBody}>
                Thank you, {name || "friend"}. We&apos;ll get back to you as
                soon as we can.
              </p>
              <button
                type="button"
                className={styles.submit}
                onClick={() => setStatus("idle")}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
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
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="How can we help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
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
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
