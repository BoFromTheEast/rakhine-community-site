"use client";

import { useState } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation } from "@/lib/useTranslation";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

export default function ContactPageClient() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? t("form.generic_error"));
      } else {
        trackEvent("contact_submit_success", { source: "contact-page" });
        setSubmittedName(name);
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setWebsite("");
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("form.network_error"));
    }
  }

  return (
    <main className={styles.page}>
      <Navbar activePage="contact" />

      <div className={styles.layout}>
        <aside className={styles.info}>
          <span className={styles.ghostText} aria-hidden="true">
            {t("contact_page.ghost")}
          </span>
          <div className={styles.infoInner}>
            <p className={styles.eyebrow}>{t("contact_page.eyebrow")}</p>
            <h1 className={styles.title}>{t("contact_page.title")}</h1>
            <p className={styles.body}>
              {t("contact_page.body")}
            </p>
            <ul className={styles.details}>
              <li>
                <span className={styles.detailLabel}>{t("venue.label")}</span>
                {site.event.venue.name} - {site.event.venue.cityState}
              </li>
              <li>
                <span className={styles.detailLabel}>{t("venue.address_label")}</span>
                {site.event.venue.line1}
              </li>
              <li>
                <span className={styles.detailLabel}>{t("contact_page.organized_by_label")}</span>
                {t("contact_page.organized_by_value")}
              </li>
            </ul>
            <p className={styles.venueNote}>{site.event.venue.note}</p>
          </div>
        </aside>

        <section className={styles.formSection}>
          {status === "success" ? (
            <div className={styles.successMsg}>
              <p className={styles.successTitle}>{t("contact_page.success_title")}</p>
              <p className={styles.successBody}>
                {t("contact_page.success_body_prefix")} {submittedName || t("form.friend")}{" "}
                {t("contact_page.success_body_suffix")}
              </p>
              <button
                type="button"
                className={styles.submit}
                onClick={() => setStatus("idle")}
              >
                {t("contact_page.send_another")}
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  {t("contact_page.form_name")}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t("contact.name_placeholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  {t("contact_page.form_email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("contact.email_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  {t("contact_page.form_message")}
                </label>
                <textarea
                  id="message"
                  placeholder={t("contact_page.form_message_placeholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={styles.honeypot}
              />
              {status === "error" && (
                <p className={styles.errorMsg} role="alert">{errorMsg}</p>
              )}
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "loading"}
              >
                {status === "loading" ? t("form.sending") : t("contact.btn_send")}
              </button>
            </form>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
