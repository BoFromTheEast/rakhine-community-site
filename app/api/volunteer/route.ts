import { enforceFormSecurity, isSafeText, isValidEmail, checkHoneypot } from "@/lib/server/formSecurity";
import { getRecipientAddress, getResendClient, getSenderAddress } from "@/lib/server/mail";

export async function POST(request: Request) {
  const security = await enforceFormSecurity(request, "volunteer");
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
  const phone = String(body.phone ?? "");
  const availability = String(body.availability ?? "");
  const role = String(body.role ?? "");
  const notes = String(body.notes ?? "");
  const website = String(body.website ?? "");

  if (!checkHoneypot(website)) {
    return Response.json({ ok: true });
  }

  if (
    !isSafeText(name, 120) ||
    !isValidEmail(email) ||
    !isSafeText(availability, 80) ||
    !isSafeText(role, 120)
  ) {
    return Response.json(
      { error: "Name, email, availability, and preferred role are required." },
      { status: 400 }
    );
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Availability: ${availability}`,
    `Preferred Role: ${role}`,
    notes ? `\nAdditional Notes:\n${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const resend = getResendClient();
  if (!resend) {
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: getSenderAddress(),
    to: getRecipientAddress(),
    replyTo: email,
    subject: `New volunteer sign-up: ${name} (${role})`,
    text: lines,
  });

  if (error) {
    return Response.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
