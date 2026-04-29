import { Mail, MessageCircle, MapPin } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";

const inputCls =
  "w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm rounded-none transition-colors";
const labelCls = "block text-[11px] tracking-[0.2em] uppercase text-taupe mb-2";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hi@tintelle.com", note: "Replies within 1 business day" },
  { icon: MessageCircle, label: "Live chat", value: "Mon–Fri · 9am–6pm PT", note: "From the help icon, bottom-right" },
  { icon: MapPin, label: "Studio", value: "1280 Hayes Street, San Francisco", note: "By appointment only" },
];

const Contact = () => (
  <PageShell title="Contact" description="Get in touch with Tintelle — email, chat, or our studio.">
    <section className="container pt-14 pb-12">
      <p className="text-xs tracking-[0.3em] uppercase text-taupe">Contact</p>
      <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
        Say hi.
      </h1>
      <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
        Questions on shade, ingredients, an order, a partnership — we read everything.
      </p>
    </section>

    <section className="container pb-24 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-card border border-border p-7 md:p-8 space-y-5"
      >
        <h2 className="font-serif text-xl text-mauve">Send a message</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>First name</label><input required className={inputCls} /></div>
          <div><label className={labelCls}>Last name</label><input required className={inputCls} /></div>
        </div>
        <div><label className={labelCls}>Email</label><input type="email" required className={inputCls} /></div>
        <div>
          <label className={labelCls}>Topic</label>
          <select className={inputCls} defaultValue="">
            <option value="" disabled>Choose a topic</option>
            <option>Order or shipping</option>
            <option>Shade or ingredient question</option>
            <option>Press / partnerships</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Message</label>
          <textarea rows={5} required className={`${inputCls} resize-y`} />
        </div>
        <Button type="submit" size="lg" className="rounded-none h-12 text-xs tracking-[0.18em] uppercase">
          Send message
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
      </aside>
    </section>
  </PageShell>
);

export default Contact;
