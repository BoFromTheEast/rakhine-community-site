import { enforceFormSecurity } from "@/lib/server/formSecurity";

export async function POST(request: Request) {
  const security = await enforceFormSecurity(request, "analytics");
  if (!security.ok) {
    return Response.json({ error: security.error }, { status: security.status });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Placeholder analytics sink; wire to GA/Segment/Plausible later.
  console.info("[analytics]", payload);

  return Response.json({ ok: true });
}
