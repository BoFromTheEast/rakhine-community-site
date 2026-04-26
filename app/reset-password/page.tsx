"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const returnToRaw = searchParams.get("returnTo") ?? "/festival";
  const returnTo = returnToRaw.startsWith("/") ? returnToRaw : "/festival";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const payload = (await response.json()) as { error?: string; ok?: boolean };
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Could not reset password.");
        return;
      }

      setMessage("Password reset successfully. You can now log in.");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Could not reset password.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1rem" }}>
      <section
        style={{
          width: "100%",
          maxWidth: 420,
          border: "1px solid rgba(11,45,78,0.15)",
          borderRadius: 8,
          padding: "1rem",
          background: "#fff",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Reset password</h1>
        <p style={{ marginTop: 0, color: "#4a4a4a", fontSize: "0.9rem" }}>
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.65rem" }}>
          <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.85rem" }}>
            New password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
              style={{ padding: "0.55rem", borderRadius: 4, border: "1px solid rgba(11,45,78,0.2)" }}
            />
          </label>
          <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.85rem" }}>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
              style={{ padding: "0.55rem", borderRadius: 4, border: "1px solid rgba(11,45,78,0.2)" }}
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            style={{
              border: 0,
              borderRadius: 4,
              padding: "0.6rem 0.9rem",
              color: "#fff",
              background: "#0b2d4e",
              cursor: pending ? "not-allowed" : "pointer",
            }}
          >
            {pending ? "Updating..." : "Reset password"}
          </button>
        </form>

        {error ? <p style={{ color: "#a22a2a", marginBottom: 0 }}>{error}</p> : null}
        {message ? (
          <div style={{ marginTop: "0.7rem", display: "grid", gap: "0.5rem" }}>
            <p style={{ color: "#1f7a34", margin: 0 }}>{message}</p>
            <Link
              href={returnTo}
              style={{
                display: "inline-block",
                background: "#0b2d4e",
                color: "#fff",
                textDecoration: "none",
                borderRadius: 4,
                padding: "0.6rem 0.9rem",
                textAlign: "center",
              }}
            >
              Go back to login and post pictures
            </Link>
            <Link
              href="/"
              style={{ fontSize: "0.86rem", color: "#0b2d4e", textAlign: "center" }}
            >
              Back to home
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
