import { NextResponse } from "next/server";
import { resetPasswordWithToken } from "@/lib/server/auth";

type ResetPasswordPayload = {
  token?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  let body: ResetPasswordPayload;
  try {
    body = (await request.json()) as ResetPasswordPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const token = String(body.token ?? "").trim();
  const password = String(body.password ?? "");

  if (!token) {
    return NextResponse.json({ error: "Reset token is required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  const ok = await resetPasswordWithToken(token, password);
  if (!ok) {
    return NextResponse.json(
      { error: "Reset link is invalid or expired." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
