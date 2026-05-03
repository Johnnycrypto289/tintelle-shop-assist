import { useState } from "react";
import { Mail, MessageCircle, Loader2 } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { SocialLinks } from "@/components/tintelle/SocialLinks";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const inputCls =
  "w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm rounded-none transition-colors";
const labelCls = "block text-[11px] tracking-[0.2em] uppercase text-taupe mb-2";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hi@tintellebeauty.com", note: "Replies within 1 business day" },
  { icon: MessageCircle, label: "Live chat", value: "Mon–Fri · 9am–6pm PT", note: "From the help icon, bottom-right" },
  { icon: MapPin, label: "Studio", value: "1280 Hayes Street, San Francisco", note: "By appointment only" },
];

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      topic: String(fd.get("topic") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.topic || !payload.message) {
      toast.error("Please fill out every field.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: payload });
      if (error) throw error;
      toast.success("Message sent — we'll get back to you within 1 business day.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error("Could not send message. Please try again or email hi@tintellebeauty.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell title="Contact" description="Get in touch with Tintelle — email, chat, or our studio.">
      <section className="container pt-14 pb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Contact</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">Say hi.</h1>
        <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
          Questions on shade, ingredients, an order, a partnership — we read everything.
        </p>
      </section>

      <section className="container pb-24 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14">
        <form onSubmit={handleSubmit} className="bg-card border border-border p-7 md:p-8 space-y-5">
          <h2 className="font-serif text-xl text-mauve">Send a message</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>First name</label><input name="firstName" required maxLength={80} className={inputCls} /></div>
            <div><label className={labelCls}>Last name</label><input name="lastName" required maxLength={80} className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Email</label><input name="email" type="email" required maxLength={255} className={inputCls} /></div>
          <div>
            <label className={labelCls}>Topic</label>
            <select name="topic" required className={inputCls} defaultValue="">
              <option value="" disabled>Choose a topic</option>
              <option>Order or shipping</option>
              <option>Shade or ingredient question</option>
              <option>Press / partnerships</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Message</label>
            <textarea name="message" rows={5} required maxLength={4000} className={`${inputCls} resize-y`} />
          </div>
          <Button type="submit" size="lg" disabled={submitting} className="rounded-none h-12 text-xs tracking-[0.18em] uppercase">
            {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending</> : "Send message"}
          </Button>
        </form>

        <aside className="space-y-4">
          {CHANNELS.map(({ icon: Icon, label, value, note }) => (
            <div key={label} className="bg-card border border-border p-6">
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <p className="text-[11px] tracking-[0.25em] uppercase text-taupe mt-3">{label}</p>
              <p className="font-serif text-mauve text-lg mt-1">{value}</p>
              <p className="text-sm text-taupe mt-1">{note}</p>
            </div>
          ))}
          <div className="bg-card border border-border p-6">
            <p className="text-[11px] tracking-[0.25em] uppercase text-taupe">Follow us</p>
            <p className="font-serif text-mauve text-lg mt-1">@tintellebeauty</p>
            <p className="text-sm text-taupe mt-1 mb-4">Tag us for a chance to be featured.</p>
            <SocialLinks iconClassName="h-6 w-6" />
          </div>
        </aside>
      </section>
    </PageShell>
  );
};

export default Contact;
