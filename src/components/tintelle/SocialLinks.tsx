import { Facebook, Instagram } from "lucide-react";

export const SOCIALS = {
  instagram: "https://www.instagram.com/tintellebeauty_?igsh=MWFxaXNrcGVoOTQ0cw==",
  facebook: "https://www.facebook.com/share/14Ji8Up7P9Z/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@tintellebeauty?_r=1&_t=ZP-962S9KjHB7u",
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52V6.7a4.85 4.85 0 0 1-1.84-.01z" />
  </svg>
);

interface Props {
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
  label?: string;
}

export const SocialLinks = ({
  className = "",
  iconClassName = "h-5 w-5",
  linkClassName = "text-mauve hover:text-primary",
  label = "Follow Tintelle on",
}: Props) => {
  const linkCls = `${linkClassName} transition-colors inline-flex items-center justify-center`;
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label={`${label} Instagram`} className={linkCls}>
        <Instagram className={iconClassName} strokeWidth={1.5} />
      </a>
      <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" aria-label={`${label} TikTok`} className={linkCls}>
        <TikTokIcon className={iconClassName} />
      </a>
      <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" aria-label={`${label} Facebook`} className={linkCls}>
        <Facebook className={iconClassName} strokeWidth={1.5} />
      </a>
    </div>
  );
};
