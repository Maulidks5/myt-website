import { Link, usePage } from "@inertiajs/react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck, Twitter } from "lucide-react";
import { defaultSettings, type SharedPageProps } from "@/lib/site";

const Footer = () => {
  const { props } = usePage<SharedPageProps>();
  const settings = props.siteSettings ?? defaultSettings;

  return (
    <footer className="mt-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.1fr] lg:gap-12">
        <div className="max-w-sm">
          <Link href="/" className="mb-5 inline-flex items-center" aria-label="Mwambao Youth Technology home">
            <img
              src={settings.logo_url ?? defaultSettings.logo_url ?? "/images/mwambao.png"}
              alt="Mwambao Youth Technology"
              className="h-20 w-auto object-contain brightness-0 invert"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="text-sm leading-relaxed text-secondary-foreground/70">
            {settings.footer_text ?? defaultSettings.footer_text}
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-extrabold uppercase tracking-wider text-secondary-foreground">Kurasa Muhimu</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            {[
              { label: "Mwanzo", href: "/" },
              { label: "Kuhusu", href: "/about" },
              { label: "Huduma", href: "/services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Mawasiliano", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-smooth hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-extrabold uppercase tracking-wider text-secondary-foreground">Huduma</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li>Website Design</li>
            <li>System Development</li>
            <li>Graphic & Branding</li>
            <li>Photography & Video</li>
            <li>Social Media</li>
            <li>Hosting & Domain</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-extrabold uppercase tracking-wider text-secondary-foreground">Mawasiliano</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition-smooth hover:text-primary">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${settings.email}`} className="transition-smooth hover:text-primary">
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{settings.location}</span>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Facebook, href: settings.facebook_url, label: "Facebook" },
              { icon: Twitter, href: settings.twitter_url, label: "Twitter" },
              { icon: Instagram, href: settings.instagram_url, label: "Instagram" },
              { icon: Linkedin, href: settings.linkedin_url, label: "LinkedIn" },
            ].filter((item) => item.href).map((item) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-foreground/10 transition-smooth hover:bg-primary hover:text-primary-foreground"
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-5 text-center text-sm text-secondary-foreground/60 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Mwambao Youth Technology. All rights reserved.</p>
          <a
            href="/admin/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-foreground/10 text-secondary-foreground/70 transition-smooth hover:bg-primary hover:text-primary-foreground"
            aria-label="Admin login"
            title="Admin login"
          >
            <ShieldCheck className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
