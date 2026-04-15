import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { orgName, contactName, email, phone, tier, message } =
    await request.json();

  if (!orgName || !contactName || !email || !tier) {
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

  const { error } = await resend.emails.send({
    from: "Sponsorship Form <onboarding@resend.dev>",
    to: "hello@rakhinedsm.org",
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
