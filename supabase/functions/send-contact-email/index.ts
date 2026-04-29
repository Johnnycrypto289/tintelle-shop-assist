import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  topic: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(4000),
});

const DESTINATION = "hi@tintelle.com";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const json = await req.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!RESEND_API_KEY || !LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { firstName, lastName, email, topic, message } = parsed.data;

    const html = `<div style="font-family:Georgia,serif;color:#3a2f33;max-width:560px">
      <h2 style="font-weight:400;font-size:22px;margin:0 0 16px">New contact form message</h2>
      <table style="font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 12px 6px 0;color:#9a8a8f">From</td><td>${escape(firstName)} ${escape(lastName)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#9a8a8f">Email</td><td>${escape(email)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#9a8a8f">Topic</td><td>${escape(topic)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e8dfe2;margin:18px 0" />
      <p style="font-size:14px;line-height:1.6;white-space:pre-wrap">${escape(message)}</p>
    </div>`;

    const resp = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Tintelle Contact <onboarding@resend.dev>",
        to: [DESTINATION],
        reply_to: email,
        subject: `[Tintelle] ${topic} — ${firstName} ${lastName}`,
        html,
      }),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      console.error("Resend error", resp.status, data);
      return new Response(JSON.stringify({ error: "Email send failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-contact-email error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
