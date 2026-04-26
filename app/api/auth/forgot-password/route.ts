import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/server/auth";
import { getResendClient, getSenderAddress } from "@/lib/server/mail";

type ForgotPasswordPayload = {
  email?: unknown;
  returnTo?: unknown;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getOrigin(request: NextRequest): string {
  return request.nextUrl.origin || "http://localhost:3000";
}

export async function POST(request: NextRequest) {
  let body: ForgotPasswordPayload;
  try {
    body = (await request.json()) as ForgotPasswordPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const returnToRaw = String(body.returnTo ?? "").trim();
  const returnTo = returnToRaw.startsWith("/") ? returnToRaw : "/festival";
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
  }

  const token = await createPasswordResetToken(email);
  if (!token) {
    return NextResponse.json({
      ok: true,
      message: "If that email exists, a reset link has been sent.",
    });
  }

  const resetUrl = new URL("/reset-password", getOrigin(request));
  resetUrl.searchParams.set("token", token);
  resetUrl.searchParams.set("returnTo", returnTo);
  const resetLink = resetUrl.toString();
  const resend = getResendClient();

  if (!resend) {
    // Dev fallback when email provider is not configured.
    return NextResponse.json({
      ok: true,
      message: "Email service is not configured. Use the reset link below for local testing.",
      resetLink,
    });
  }

  const { error } = await resend.emails.send({
    from: getSenderAddress(),
    to: email,
    subject: "Reset your password",
    text: `We received a request to reset your password.\n\nReset link: ${resetLink}\n\nThis link expires in 1 hour.`,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send reset email right now." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "If that email exists, a reset link has been sent.",
  });
}
