"use client";

import { useState } from "react";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation } from "@/lib/useTranslation";
import { trackEvent } from "@/lib/analytics";
import styles from "@/app/page.module.css";

export default function HomeContactForm() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
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
        return;
      }

      trackEvent("contact_submit_success", { source: "home" });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setErrorMsg(t("form.network_error"));
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
      <input type="text" placeholder={t("contact.name_placeholder")} value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder={t("contact.email_placeholder")} value={email} onChange={(e) => setEmail(e.target.value)} required />
      <textarea placeholder={t("contact.message_placeholder")} value={message} onChange={(e) => setMessage(e.target.value)} required />

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />

      {status === "error" ? <p className={styles.contactError} role="alert">{errorMsg}</p> : null}
      {status === "success" ? <p className={styles.contactSuccess} role="status">{t("contact.success")}</p> : null}

      <button className={styles.btnPrimary} type="submit" disabled={status === "loading"}>
        {status === "loading" ? t("form.sending") : t("contact.btn_send")}
      </button>
    </form>
  );
}
