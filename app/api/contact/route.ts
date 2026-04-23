import { enforceFormSecurity, isSafeText, isValidEmail, checkHoneypot } from "@/lib/server/formSecurity";
import { getRecipientAddress, getResendClient, getSenderAddress } from "@/lib/server/mail";

export async function POST(request: Request) {
  const security = await enforceFormSecurity(request, "contact");
  if (!security.ok) {
    return Response.json({ error: security.error }, { status: security.status });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "");
  const email = String(body.email ?? "");
  const message = String(body.message ?? "");
  const website = String(body.website ?? "");

  if (!checkHoneypot(website)) {
    // Pretend success to avoid tipping off bots.
    return Response.json({ ok: true });
  }

  if (!isSafeText(name, 120) || !isValidEmail(email) || !isSafeText(message, 3000)) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const resend = getResendClient();
  if (!resend) {
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: getSenderAddress(),
    to: getRecipientAddress(),
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return Response.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
