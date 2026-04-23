import { enforceFormSecurity, isSafeText, isValidEmail, checkHoneypot } from "@/lib/server/formSecurity";
import { getRecipientAddress, getResendClient, getSenderAddress } from "@/lib/server/mail";

export async function POST(request: Request) {
  const security = await enforceFormSecurity(request, "sponsor");
  if (!security.ok) {
    return Response.json({ error: security.error }, { status: security.status });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orgName = String(body.orgName ?? "");
  const contactName = String(body.contactName ?? "");
  const email = String(body.email ?? "");
  const phone = String(body.phone ?? "");
  const tier = String(body.tier ?? "");
  const message = String(body.message ?? "");
  const website = String(body.website ?? "");

  if (!checkHoneypot(website)) {
    return Response.json({ ok: true });
  }

  if (
    !isSafeText(orgName, 180) ||
    !isSafeText(contactName, 120) ||
    !isValidEmail(email) ||
    !isSafeText(tier, 120)
  ) {
    return Response.json(
      {
        error:
          "Organization name, contact name, email, and sponsorship tier are required.",
      },
      { status: 400 }
    );
  }

  const lines = [
    `Organization: ${orgName}`,
    `Contact: ${contactName}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Tier of Interest: ${tier}`,
    message ? `\nMessage:\n${message}` : "",
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
    subject: `Sponsorship inquiry: ${orgName} — ${tier}`,
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
