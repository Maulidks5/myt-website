import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { defaultSettings, type SharedPageProps } from "@/lib/site";

const links = [
  { to: "/", label: "Mwanzo" },
  { to: "/about", label: "Kuhusu" },
  { to: "/services", label: "Huduma" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Mawasiliano" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { url, props } = usePage<SharedPageProps>();
  const settings = props.siteSettings ?? defaultSettings;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [url]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-smooth",
        scrolled
          ? "border-b border-border/80 bg-background/90 shadow-soft backdrop-blur-xl"
          : "bg-background/75 backdrop-blur-lg"
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link
          href="/"
          className="group -ml-2 flex items-center rounded-2xl px-2 py-1 transition-smooth hover:bg-accent/70"
          aria-label="Mwambao Youth Technology home"
        >
          <img
            src={settings.logo_url ?? defaultSettings.logo_url ?? "/images/mwambao.png"}
            alt="Mwambao Youth Technology"
            className="h-12 w-auto object-contain transition-smooth group-hover:scale-105 md:h-16"
          />
        </Link>

        <ul className="hidden items-center gap-1 rounded-2xl border border-border/70 bg-background/70 p-1 shadow-soft backdrop-blur lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                href={l.to}
                className={cn(
                  "relative block rounded-xl px-4 py-2.5 text-[15px] font-semibold text-foreground/70 transition-smooth",
                  url === l.to
                    ? "bg-accent text-primary shadow-soft"
                    : "hover:bg-accent/70 hover:text-primary"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild size="lg" className="h-12 border-0 gradient-primary px-5 text-primary-foreground shadow-glow hover:opacity-95">
            <Link href="/contact">
              <Sparkles className="mr-2 h-4 w-4" />
              Anza Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-background/80 text-secondary shadow-soft transition-smooth hover:bg-accent hover:text-primary lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-border/80 bg-background/95 shadow-elegant backdrop-blur-xl lg:hidden">
          <ul className="container mx-auto space-y-2 px-4 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  href={l.to}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-base font-semibold transition-smooth",
                    url === l.to
                      ? "border-primary/20 bg-accent text-primary shadow-soft"
                      : "border-transparent text-foreground/80 hover:border-border hover:bg-accent/70 hover:text-primary"
                  )}
                >
                  <span>{l.label}</span>
                  {url === l.to && <span className="h-2 w-2 rounded-full bg-primary" />}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Button asChild size="lg" className="h-12 w-full border-0 gradient-primary text-primary-foreground shadow-glow">
                <Link href="/contact">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Anza Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
