import { Link, usePage } from "@inertiajs/react";
import { ArrowRight, BarChart3, Check, CheckCircle2, Mail, MessageCircle, ShieldCheck, Sparkles, Smartphone, Target, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import PortfolioCard from "@/components/PortfolioCard";
import FaqSection from "@/components/FaqSection";
import SeoHead from "@/components/SeoHead";
import TestimonialsSection from "@/components/TestimonialsSection";
import type { Faq } from "@/lib/faqs";
import { getIcon, type HomePageContent, type MarketingService, type PortfolioProject } from "@/lib/marketing";
import { defaultSettings, whatsappUrl, type SharedPageProps } from "@/lib/site";
import type { Testimonial } from "@/lib/testimonials";
import heroImg from "@/assets/hero.jpg";

const fallbackHome: HomePageContent = {
  hero_eyebrow: "Digital partner for growing businesses",
  hero_title: "Tunatengeneza websites, branding na systems zinazokuletea wateja zaidi",
  hero_subtitle: "Mwambao Youth Technology inasaidia biashara Zanzibar na Tanzania kuonekana professional online, kupata inquiries kupitia WhatsApp, na kusimamia kazi kwa mifumo rahisi kutumia.",
  hero_card_title: "Website inayofanya kazi",
  hero_card_text: "Design nzuri, ujumbe unaouza, SEO basics na WhatsApp flow ya kupata leads.",
  hero_stats: [
    { value: "50+", label: "Projects delivered" },
    { value: "30+", label: "Businesses supported" },
    { value: "5★", label: "Client rating" },
  ],
  trust_items: [
    { icon_name: "MapPin", title: "Tupo Zanzibar" },
    { icon_name: "Clock3", title: "Fast response" },
    { icon_name: "ShieldCheck", title: "Clear process" },
    { icon_name: "Target", title: "Built to convert" },
  ],
};

const painPoints = [
  {
    icon: Smartphone,
    title: "Kuonekana professional online",
    text: "Website na brand visuals zinazoeleweka haraka na kujenga confidence kwa mteja.",
  },
  {
    icon: BarChart3,
    title: "Kupata inquiries zaidi",
    text: "CTA, WhatsApp flow, testimonials na trust signals zinazomshawishi visitor kuchukua hatua.",
  },
  {
    icon: Zap,
    title: "Kurahisisha operations",
    text: "Systems na dashboards za kusimamia records, orders, clients, stock au reports kwa urahisi.",
  },
  {
    icon: ShieldCheck,
    title: "Kuwa na support ya kuaminika",
    text: "Hosting, maintenance, updates na technical support baada ya website au system kwenda live.",
  },
];

const popularPackages = [
  {
    name: "Starter Website",
    service: "Website Design",
    price: "Kuanzia TZS 350,000",
    features: ["1-5 responsive pages", "Contact form", "WhatsApp button"],
  },
  {
    name: "Business Website",
    service: "Website Design",
    price: "Kuanzia TZS 750,000",
    featured: true,
    features: ["Up to 10 pages", "Portfolio showcase", "Lead capture form"],
  },
  {
    name: "Business Management System",
    service: "System Development",
    price: "Kuanzia TZS 2,500,000",
    features: ["Custom workflow", "User roles", "Reports and exports"],
  },
];

const consultationMessage = "Hello Mwambao, nahitaji ushauri kuhusu website/branding/system kwa biashara yangu. Naomba tuanze consultation.";
const mobileHeroTitle = "Websites na systems kwa biashara yako";
const mobileHeroSubtitle = "Tunakusaidia kuonekana professional na kupata inquiries zaidi.";

type IndexProps = {
  home?: HomePageContent | null;
  services: MarketingService[];
  projects: PortfolioProject[];
  testimonials: Testimonial[];
  faqs: Faq[];
};

const Index = ({ home, services, projects, testimonials, faqs }: IndexProps) => {
  const { props } = usePage<SharedPageProps>();
  const settings = props.siteSettings ?? defaultSettings;
  const homeContent = home ?? fallbackHome;
  const homeHeroImage = homeContent.hero_image_url ?? heroImg;

  return (
    <Layout>
      <SeoHead
        title="Website Design Zanzibar, Systems & Branding Tanzania"
        description="Mwambao Youth Technology builds websites, custom systems, branding, hosting, and digital marketing solutions that help businesses in Zanzibar and Tanzania attract more customers."
        path="/"
      />
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero text-secondary-foreground">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="container mx-auto relative grid items-center gap-7 px-4 py-8 sm:gap-10 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-28">
          <div className="relative animate-scale-in lg:order-2 lg:scale-110 lg:pl-6">
            <div className="absolute -inset-4 gradient-primary opacity-30 blur-3xl rounded-full" />
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-elegant sm:rounded-3xl lg:animate-float">
              <img
                src={homeHeroImage}
                alt="MYT digital technology"
                width={1536}
                height={1024}
                className="h-auto w-full"
                loading="eager"
                decoding="async"
              />
              <div className="absolute bottom-3 left-3 max-w-[72%] rounded-xl border border-white/15 bg-secondary/85 p-2.5 text-secondary-foreground shadow-elegant backdrop-blur sm:inset-x-5 sm:bottom-5 sm:max-w-none sm:rounded-2xl sm:p-4">
                <div className="flex items-center gap-2.5 sm:items-start sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:mt-0.5 sm:h-10 sm:w-10 sm:rounded-xl">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="font-display text-xs font-extrabold leading-tight sm:text-lg">{homeContent.hero_card_title}</div>
                    <p className="mt-1 hidden text-xs leading-relaxed text-secondary-foreground/70 sm:block sm:text-sm">
                      {homeContent.hero_card_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {homeContent.hero_eyebrow}
            </span>
            <h1 className="mt-4 hidden font-display text-[2rem] font-extrabold leading-tight sm:mt-5 sm:block sm:text-4xl md:text-5xl lg:text-6xl">
              {homeContent.hero_title}
            </h1>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:hidden">
              {mobileHeroTitle}
            </h1>
            <p className="mt-4 hidden max-w-2xl leading-relaxed text-secondary-foreground/75 sm:mt-5 sm:block sm:text-lg">
              {homeContent.hero_subtitle}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary-foreground/75 sm:hidden">
              {mobileHeroSubtitle}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <Button asChild size="lg" className="border-0 bg-[#25D366] text-white shadow-glow hover:bg-[#1ebe5d]">
                <a href={whatsappUrl(settings, consultationMessage)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Pata Ushauri Bure
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="hidden border-primary/40 bg-transparent text-secondary-foreground hover:bg-primary/10 sm:inline-flex">
                <Link href="/services">Angalia Huduma <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="mt-6 grid max-w-xl grid-cols-3 gap-2 text-[11px] text-secondary-foreground/65 sm:mt-10 sm:gap-3 sm:text-sm">
              {homeContent.hero_stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-2.5 backdrop-blur sm:p-4">
                  <div className="font-display text-lg font-extrabold text-primary sm:text-2xl">{stat.value}</div>
                  <div className="mt-1 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto grid gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-4">
          {homeContent.trust_items.map((item) => {
            const Icon = getIcon(item.icon_name);
            return (
              <div key={item.title} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex min-h-11 items-center">
                  <h3 className="font-display font-bold text-secondary">{item.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <SectionHeading
          eyebrow="How We Help"
          title="Tunasaidia biashara yako kuonekana, kuaminika na kupata inquiries"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover-lift">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-extrabold text-secondary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="What We Do"
          title="Huduma za kidigitali kwa biashara inayotaka kukua"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => <ServiceCard key={s.title} service={s} />)}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground shadow-glow">
            <Link href="/services">Angalia Huduma na Packages <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <SectionHeading
          eyebrow="Popular Packages"
          title="Packages ambazo wateja wengi huanzia nazo"
          subtitle="Chagua package iliyo karibu na mahitaji yako. Tutakushauri scope, timeline na final quote kabla ya kuanza."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {popularPackages.map((item) => (
            <article
              key={item.name}
              className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-soft hover-lift ${
                item.featured ? "border-primary ring-2 ring-primary/15" : "border-border"
              }`}
            >
              {item.featured && (
                <span className="absolute -top-3 left-6 rounded-full gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                  Most Popular
                </span>
              )}
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">{item.service}</div>
              <h3 className="mt-2 font-display text-xl font-extrabold text-secondary">{item.name}</h3>
              <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
                <div className="text-sm text-muted-foreground">Bei ya kuanzia</div>
                <div className="font-display text-2xl font-extrabold text-secondary">{item.price}</div>
              </div>
              <ul className="mt-5 flex-1 space-y-3">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className={item.featured ? "mt-6 gradient-primary border-0 text-primary-foreground shadow-glow" : "mt-6"} variant={item.featured ? "default" : "outline"}>
                <Link href="/services#service-packages">
                  Angalia Package <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Recent Work"
            title="Kazi zinazojenga imani kabla mteja hajawasiliana"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => <PortfolioCard key={p.id} project={p} />)}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/portfolio">Angalia Portfolio Yote <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection className="py-20" testimonials={testimonials} />

      <FaqSection className="bg-muted/40 py-20" faqs={faqs} />

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-2xl gradient-hero p-6 text-center text-secondary-foreground shadow-elegant sm:p-8 md:rounded-3xl md:p-16">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="relative">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl">
              Una project ya website, branding au system? <span className="text-gradient">Tuanze leo.</span>
            </h2>
            <p className="mt-4 text-secondary-foreground/75 max-w-xl mx-auto">
              Tutakusikiliza, tutashauri package inayofaa, na kukupa next steps zilizo wazi kabla ya kuanza kazi.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1ebe5d] text-white border-0">
                <a href={whatsappUrl(settings, consultationMessage)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-4 h-4" /> Ongea Nasi WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow">
                <Link href="/contact"><Mail className="mr-2 w-4 h-4" /> Tuma Maelezo ya Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
