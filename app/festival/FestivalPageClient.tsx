"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import styles from "./page.module.css";
import { useLocale } from "@/lib/LocaleProvider";
import { useTranslation } from "@/lib/useTranslation";
import { site } from "@/lib/site";

type YearEntry = {
  year: number;
  edition: string;
  title: string;
  subtitle: string;
  note: string;
};

type SessionUser = {
  id: string;
  email: string;
};

type FestivalPhoto = {
  id: string;
  year: number;
  description: string;
  imageUrl: string;
  uploadedBy: string;
  createdAt: string;
};

const START_YEAR = 2015;
const CURRENT_YEAR = site.event.year;

function getOrdinal(value: number): string {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
  if (value % 10 === 1) return `${value}st`;
  if (value % 10 === 2) return `${value}nd`;
  if (value % 10 === 3) return `${value}rd`;
  return `${value}th`;
}

export default function FestivalPageClient() {
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [authPending, setAuthPending] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotPending, setForgotPending] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotResetLink, setForgotResetLink] = useState<string | null>(null);
  const [photos, setPhotos] = useState<FestivalPhoto[]>([]);
  const [photosPending, setPhotosPending] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoMessage, setPhotoMessage] = useState<string | null>(null);
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPending, setUploadPending] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  const yearOverrides: Record<number, Partial<YearEntry>> = {
    2015: {
      title: t("festival.year_2015_title"),
      subtitle: t("festival.year_2015_subtitle"),
    },
    2019: {
      title: t("festival.year_2019_title"),
      subtitle: t("festival.year_2019_subtitle"),
    },
    2022: {
      title: t("festival.year_2022_title"),
      subtitle: t("festival.year_2022_subtitle"),
    },
    2024: {
      title: t("festival.year_2024_title"),
      subtitle: t("festival.year_2024_subtitle"),
    },
    2025: {
      edition: t("festival.year_2025_edition"),
      title: t("festival.year_2025_title"),
      subtitle: t("festival.year_2025_subtitle"),
    },
    2026: {
      edition: t("festival.year_2026_edition"),
      title: t("festival.year_2026_title"),
      subtitle: t("festival.year_2026_subtitle"),
    },
  };

  const archiveYears: YearEntry[] = Array.from(
    { length: CURRENT_YEAR - START_YEAR + 1 },
    (_, index) => {
      const year = START_YEAR + index;
      const editionNumber = year - START_YEAR + 1;
      const defaultEntry: YearEntry = {
        year,
        edition: `${getOrdinal(editionNumber)} Annual`,
        title: `${year} ${t("festival.default_title_suffix")}`,
        subtitle: t("festival.default_subtitle"),
        note: `${t("festival.default_note_prefix")} ${year}.`,
      };
      return { ...defaultEntry, ...yearOverrides[year] };
    },
  );

  const activeYear = useMemo(
    () =>
      archiveYears.find((item) => item.year === selectedYear) ??
      archiveYears[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedYear, locale],
  );

  const selectedPhotos = useMemo(
    () => photos.filter((photo) => photo.year === selectedYear),
    [photos, selectedYear],
  );

  useEffect(() => {
    async function loadSession() {
      const response = await fetch("/api/auth/me", { credentials: "include" });
      if (!response.ok) {
        setSessionUser(null);
        return;
      }

      const payload = (await response.json()) as { user?: SessionUser | null };
      setSessionUser(payload.user ?? null);
    }

    loadSession().catch(() => {
      setSessionUser(null);
    });
  }, []);

  useEffect(() => {
    async function loadPhotos() {
      setPhotosPending(true);
      setPhotoError(null);

      try {
        const response = await fetch(`/api/festival-photos?year=${selectedYear}`);
        if (!response.ok) {
          throw new Error("Could not load photo archive.");
        }

        const payload = (await response.json()) as { photos?: FestivalPhoto[] };
        setPhotos(payload.photos ?? []);
      } catch {
        setPhotoError("Could not load photos yet.");
      } finally {
        setPhotosPending(false);
      }
    }

    loadPhotos().catch(() => {
      setPhotoError("Could not load photos yet.");
      setPhotosPending(false);
    });
  }, [selectedYear]);

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthPending(true);
    setAuthError(null);
    setAuthMessage(null);

    try {
      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });

      const payload = (await response.json()) as {
        error?: string;
        user?: SessionUser;
      };

      if (!response.ok || !payload.user) {
        setAuthError(payload.error ?? "Authentication failed.");
        return;
      }

      setSessionUser(payload.user);
      setAuthPassword("");
      setAuthMessage(authMode === "login" ? "You are now logged in." : "Account created and logged in.");
    } catch {
      setAuthError("Could not reach the auth service.");
    } finally {
      setAuthPending(false);
    }
  }

  async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForgotPending(true);
    setAuthError(null);
    setAuthMessage(null);
    setForgotResetLink(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, returnTo: "/festival" }),
      });

      const payload = (await response.json()) as {
        error?: string;
        message?: string;
        resetLink?: string;
      };

      if (!response.ok) {
        setAuthError(payload.error ?? "Could not send reset email.");
        return;
      }

      setAuthMessage(payload.message ?? "If that email exists, a reset link has been sent.");
      if (payload.resetLink) {
        setForgotResetLink(payload.resetLink);
      }
    } catch {
      setAuthError("Could not send reset email.");
    } finally {
      setForgotPending(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setSessionUser(null);
    setAuthMessage("You have logged out.");
    setPhotoMessage(null);
    setUploadDescription("");
    setUploadFile(null);
  }

  async function handleUploadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!uploadFile) {
      setPhotoError("Please choose an image file.");
      return;
    }

    setUploadPending(true);
    setPhotoError(null);
    setPhotoMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("description", uploadDescription);
      formData.append("year", String(selectedYear));

      const response = await fetch("/api/festival-photos", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const payload = (await response.json()) as { error?: string; photo?: FestivalPhoto };
      if (!response.ok || !payload.photo) {
        setPhotoError(payload.error ?? "Upload failed.");
        return;
      }

      const uploadedPhoto = payload.photo;
      setPhotos((current) => [uploadedPhoto, ...current.filter((item) => item.id !== uploadedPhoto.id)]);
      setUploadDescription("");
      setUploadFile(null);
      setPhotoMessage("Photo uploaded successfully.");
    } catch {
      setPhotoError("Upload failed. Please try again.");
    } finally {
      setUploadPending(false);
    }
  }

  async function handleDeletePhoto(photoId: string) {
    setDeletingPhotoId(photoId);
    setPhotoError(null);
    setPhotoMessage(null);

    try {
      const response = await fetch(`/api/festival-photos/${photoId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const payload = (await response.json()) as {
        error?: string;
        ok?: boolean;
      };

      if (!response.ok || !payload.ok) {
        setPhotoError(payload.error ?? "Delete failed.");
        return;
      }

      setPhotos((current) => current.filter((photo) => photo.id !== photoId));
      setPhotoMessage("Photo deleted.");
    } catch {
      setPhotoError("Delete failed. Please try again.");
    } finally {
      setDeletingPhotoId(null);
    }
  }

  return (
    <main className={styles.page}>
      <Navbar activePage="festival" />

      <aside
        className={styles.floatingYears}
        aria-label={t("festival.year_aria")}
      >
        {archiveYears.map((entry) => (
          <button
            key={entry.year}
            type="button"
            className={`${styles.yearButton} ${
              activeYear.year === entry.year ? styles.yearButtonActive : ""
            }`}
            onClick={() => setSelectedYear(entry.year)}
          >
            {entry.year}
          </button>
        ))}
      </aside>

      <section className={styles.content}>
        <span className={styles.ghostYear} aria-hidden="true">
          {activeYear.year}
        </span>

        <div className={styles.header}>
          <p className={styles.edition}>{activeYear.edition}</p>
          <h1 className={styles.title}>{activeYear.title}</h1>
          <p className={styles.subtitle}>{activeYear.subtitle}</p>
          <p className={styles.venuePlaceholder}>
            {t("venue.label")}: {site.event.venue.name} - {site.event.venue.line1}
          </p>
        </div>

        <div className={styles.divider} />

        <section className={styles.authPanel}>
          <h2 className={styles.authTitle}>Festival photo contributors</h2>
          {!sessionUser ? (
            <>
              <div className={styles.authModeRow}>
                <button
                  type="button"
                  className={`${styles.authModeButton} ${authMode === "login" ? styles.authModeButtonActive : ""}`}
                  onClick={() => setAuthMode("login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`${styles.authModeButton} ${authMode === "register" ? styles.authModeButtonActive : ""}`}
                  onClick={() => setAuthMode("register")}
                >
                  Sign up
                </button>
              </div>
              <form className={styles.authForm} onSubmit={handleAuthSubmit}>
                <label className={styles.fieldLabel}>
                  Email
                  <input
                    type="email"
                    className={styles.fieldInput}
                    value={authEmail}
                    onChange={(event) => setAuthEmail(event.target.value)}
                    required
                  />
                </label>
                <label className={styles.fieldLabel}>
                  Password
                  <input
                    type="password"
                    className={styles.fieldInput}
                    value={authPassword}
                    onChange={(event) => setAuthPassword(event.target.value)}
                    minLength={8}
                    required
                  />
                </label>
                <button type="submit" className={styles.primaryButton} disabled={authPending}>
                  {authPending ? "Please wait..." : authMode === "login" ? "Login" : "Create account"}
                </button>
              </form>
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => {
                  setForgotMode((current) => !current);
                  setForgotEmail(authEmail);
                  setForgotResetLink(null);
                  setAuthError(null);
                  setAuthMessage(null);
                }}
              >
                {forgotMode ? "Hide forgot password" : "Forgot password?"}
              </button>
              {forgotMode ? (
                <form className={styles.authForm} onSubmit={handleForgotPassword}>
                  <label className={styles.fieldLabel}>
                    Account email
                    <input
                      type="email"
                      className={styles.fieldInput}
                      value={forgotEmail}
                      onChange={(event) => setForgotEmail(event.target.value)}
                      required
                    />
                  </label>
                  <button type="submit" className={styles.secondaryButton} disabled={forgotPending}>
                    {forgotPending ? "Sending..." : "Send reset link"}
                  </button>
                </form>
              ) : null}
              {forgotResetLink ? (
                <p className={styles.devResetLink}>
                  Account found. Since email is not configured yet, use direct reset:
                  {" "}
                  <a href={forgotResetLink} className={styles.devResetButton}>
                    Reset password now
                  </a>
                </p>
              ) : null}
            </>
          ) : (
            <div className={styles.loggedInWrap}>
              <p className={styles.loggedInText}>
                Logged in as <strong>{sessionUser.email}</strong>
              </p>
              <button type="button" className={styles.secondaryButton} onClick={handleLogout}>
                Logout
              </button>
              <form className={styles.uploadForm} onSubmit={handleUploadSubmit}>
                <label className={styles.fieldLabel}>
                  Upload image for {selectedYear}
                  <input
                    type="file"
                    className={styles.fieldInput}
                    accept="image/*"
                    onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)}
                    required
                  />
                </label>
                <label className={styles.fieldLabel}>
                  Description
                  <input
                    type="text"
                    className={styles.fieldInput}
                    value={uploadDescription}
                    onChange={(event) => setUploadDescription(event.target.value)}
                    maxLength={280}
                    placeholder="Write what this picture is about..."
                    required
                  />
                </label>
                <button type="submit" className={styles.primaryButton} disabled={uploadPending}>
                  {uploadPending ? "Uploading..." : "Post picture"}
                </button>
              </form>
            </div>
          )}

          {authError ? <p className={styles.errorText}>{authError}</p> : null}
          {authMessage ? <p className={styles.successText}>{authMessage}</p> : null}
          {photoError ? <p className={styles.errorText}>{photoError}</p> : null}
          {photoMessage ? <p className={styles.successText}>{photoMessage}</p> : null}
        </section>

        <div className={styles.mediaGrid}>
          {photosPending ? (
            <div className={styles.mediaCard}>Loading photos...</div>
          ) : selectedPhotos.length === 0 ? (
            <>
              <div className={styles.mediaCard}>{t("festival.media_featured")}</div>
              <div className={styles.mediaCard}>{t("festival.media_photo")}</div>
              <div className={`${styles.mediaCard} ${styles.videoCard}`}>
                {t("festival.media_video")}
              </div>
            </>
          ) : (
            selectedPhotos.slice(0, 3).map((photo) => (
              <article key={photo.id} className={`${styles.mediaCard} ${styles.photoCard}`}>
                <div className={styles.photoTextRow}>
                  <p className={styles.photoDescription}>
                    {photo.description || `Shared by ${photo.uploadedBy}`}
                  </p>
                  {sessionUser?.email === photo.uploadedBy ? (
                    <button
                      type="button"
                      className={styles.deleteButton}
                      disabled={deletingPhotoId === photo.id}
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      {deletingPhotoId === photo.id ? "Deleting..." : "Delete"}
                    </button>
                  ) : null}
                </div>
                <div className={styles.photoMedia}>
                  <Image
                    src={photo.imageUrl}
                    alt={photo.description || `Festival photo ${photo.year}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 70vw, 420px"
                    className={styles.photoImage}
                  />
                </div>
              </article>
            ))
          )}
        </div>

        <div className={styles.noteBox}>
          <p>{activeYear.note}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
