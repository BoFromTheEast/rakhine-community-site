import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, phone, availability, role, notes } =
    await request.json();

  if (!name || !email || !availability || !role) {
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

  const { error } = await resend.emails.send({
    from: "Volunteer Form <onboarding@resend.dev>",
    to: "hello@rakhinedsm.org",
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
