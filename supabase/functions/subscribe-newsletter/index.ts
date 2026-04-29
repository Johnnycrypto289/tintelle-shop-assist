import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().trim().max(50).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const json = await req.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase
      .from("newsletter_signups")
      .upsert(
        { email: parsed.data.email.toLowerCase(), source: parsed.data.source ?? "footer" },
        { onConflict: "email" },
      );

    if (error) {
      console.error("newsletter insert error", error);
      return new Response(JSON.stringify({ error: "Could not save signup" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Optional welcome email via Resend (best effort, non-blocking failure)
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (RESEND_API_KEY && LOVABLE_API_KEY) {
      // Resend free tier blocks sending to arbitrary recipients until the
      // domain is verified. Skip the welcome email until then — the signup
      // is still saved to the database.
      try {
        const resp = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: "Tintelle <onboarding@resend.dev>",
            to: [parsed.data.email],
            subject: "Welcome to Tintelle",
            html: `<div style="font-family:Georgia,serif;color:#3a2f33;padding:24px">
              <h1 style="font-weight:400;font-size:28px;margin:0 0 16px">Welcome in.</h1>
              <p style="font-size:15px;line-height:1.6;color:#6b5b60">
                You're on the list for early drops, shade guides, and skin-first rituals from Tintelle.
              </p>
              <p style="font-size:13px;color:#9a8a8f;margin-top:24px">— The Tintelle team</p>
            </div>`,
          }),
        });
        if (!resp.ok) {
          const body = await resp.text();
          console.warn("welcome email skipped (likely unverified domain):", resp.status, body);
        }
      } catch (e) {
        console.error("welcome email failed", e);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("subscribe-newsletter error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
