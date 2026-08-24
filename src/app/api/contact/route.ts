import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Zero-config by default: it validates the submission, logs it, and returns
 * success so the form works the moment the site is deployed.
 *
 * To actually deliver messages by email, set these env vars (see .env.example):
 *   RESEND_API_KEY   — from https://resend.com
 *   CONTACT_TO_EMAIL — where inquiries should land
 *   CONTACT_FROM_EMAIL (optional) — a verified sender; defaults to onboarding@resend.dev
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: silently accept and drop bot submissions.
  if (body.website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message) {
    return NextResponse.json(
      { ok: false, error: "Please include your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // Not wired up yet — don't lose the lead in the void; log it.
    console.info("[contact] new inquiry (email delivery not configured):", {
      ...body,
      website: undefined,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const source = body.source === "attorney" ? "Attorney / fiduciary" : "Homeowner";
    const lines = [
      `Source: ${source}`,
      `Name: ${name}`,
      body.organization && `Organization: ${body.organization}`,
      `Email: ${email}`,
      body.phone && `Phone: ${body.phone}`,
      body.role && `Role: ${body.role}`,
      body.city && `City: ${body.city}`,
      "",
      message,
    ].filter(Boolean);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Well Kept Estates <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New inquiry — ${source} — ${name}`,
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send message." },
      { status: 502 },
    );
  }
}
