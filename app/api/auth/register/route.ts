import { NextResponse } from "next/server";
import {
  createSession,
  getSessionMaxAgeSeconds,
  registerUser,
  SESSION_COOKIE_NAME,
} from "@/lib/server/auth";

type RegisterPayload = {
  email?: unknown;
  password?: unknown;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: RegisterPayload;
  try {
    body = (await request.json()) as RegisterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  try {
    const user = await registerUser(email, password);
    const token = await createSession(user.id);
    const response = NextResponse.json({ ok: true, user });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: getSessionMaxAgeSeconds(),
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create account.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
