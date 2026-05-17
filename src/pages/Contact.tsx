import { FormEvent, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/components/layout/Layout";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExternalLink, Mail, MapPin, Phone, MessageCircle, Send, Facebook, Instagram, Linkedin, Twitter, Globe, Code2, Palette, Share2, Server, Camera, ClipboardCheck, Clock3, Wallet } from "lucide-react";
import { toast } from "sonner";
import { defaultSettings, whatsappUrl, type SharedPageProps } from "@/lib/site";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  service_name: string;
  budget_range: string;
  timeline: string;
  message: string;
};

type ContactPageProps = SharedPageProps & {
  flash?: {
    success?: string;
  };
};

const serviceOptions = [
  { label: "Website Design", icon: Globe, subject: "Ombi la Website Design" },
  { label: "System Development", icon: Code2, subject: "Ombi la System Development" },
  { label: "Graphic Design & Branding", icon: Palette, subject: "Ombi la Branding" },
  { label: "Photography & Videography", icon: Camera, subject: "Ombi la Photo/Video" },
  { label: "Social Media Management", icon: Share2, subject: "Ombi la Social Media Management" },
  { label: "Hosting & Domain Support", icon: Server, subject: "Ombi la Hosting na Domain" },
];

const budgetOptions = [
  "Chini ya TZS 500,000",
  "TZS 500,000 - 1,500,000",
  "TZS 1,500,000 - 3,000,000",
  "TZS 3,000,000+",
  "Bado sijajua",
];

const timelineOptions = [
  "Haraka iwezekanavyo",
  "Ndani ya wiki 2-4",
  "Ndani ya mwezi 1-2",
  "Timeline iko flexible",
];

const defaultWhatsAppMessage = "Hello Mwambao, nahitaji ushauri kuhusu website/branding/system kwa biashara yangu. Naomba mnisaidie kujua package, timeline na starting budget.";

const Contact = () => {
  const { props } = usePage<ContactPageProps>();
  const settings = props.siteSettings ?? defaultSettings;
  const query = new URLSearchParams(window.location.search);
  const { data, setData, post, processing, errors, reset } = useForm<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: query.get("subject") ?? "",
    service_name: query.get("service") ?? "",
    budget_range: "",
    timeline: "",
    message: query.get("message") ?? "",
  });

  useEffect(() => {
    if (props.flash?.success) {
      toast.success(props.flash.success);
    }
  }, [props.flash?.success]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/contact", {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  const selectService = (serviceName: string, subject: string) => {
    setData((current) => ({
      ...current,
      service_name: serviceName,
      subject: current.subject || subject,
      message: current.message || `Hello Mwambao,\n\nNahitaji msaada wa ${serviceName} kwa biashara yangu.\n\nNaomba mnishauri package inayofaa, timeline na bajeti ya kuanzia.`,
    }));
  };

  return (
    <Layout>
      <SeoHead
        title="Contact Mwambao Youth Technology Zanzibar"
        description="Contact Mwambao Youth Technology in Kariakoo, Zanzibar for website design, custom system development, branding, hosting, social media, and digital support."
        path="/contact"
      />
      <section className="gradient-hero text-secondary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="container mx-auto px-4 relative text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl">Wasiliana <span className="text-gradient">Nasi</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-secondary-foreground/75">
            Tueleze project yako. Tutakujibu na ushauri, package inayofaa na next steps.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#1ebe5d]">
              <a href={whatsappUrl(settings, defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Ongea Nasi WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/40 bg-transparent text-secondary-foreground hover:bg-primary/10">
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-2 h-4 w-4" />
                Piga Simu
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: ClipboardCheck, title: "1. Tueleze project", text: "Chagua huduma, bajeti na timeline ili tuanze na context sahihi." },
            { icon: Clock3, title: "2. Tunapitia haraka", text: "Tutakujibu na maswali muhimu, package inayofaa na next steps." },
            { icon: Wallet, title: "3. Pata quote iliyo wazi", text: "Utapata estimated scope, timeline na final quote kabla ya kuanza." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-display font-bold text-secondary">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
            {[
            { icon: Phone, title: "Piga simu", value: settings.phone },
            { icon: Mail, title: "Email", value: settings.email },
            { icon: MapPin, title: "Mahali", value: settings.location },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="p-5 rounded-2xl bg-card border border-border hover-lift flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.title}</div>
                  <div className="font-semibold text-secondary">{c.value}</div>
                </div>
              </div>
            );
          })}

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <MapPin className="h-4 w-4" />
                Tembelea office
              </div>
              <h2 className="font-display text-xl font-extrabold text-secondary">{settings.location}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Njoo kwa consultation ya project, digital strategy, website planning, system development, branding na support.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Button asChild className="gradient-primary border-0 text-primary-foreground shadow-glow">
                  <a href={settings.maps_url ?? defaultSettings.maps_url ?? "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Fungua Maps
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Piga Simu
                  </a>
                </Button>
                <Button asChild className="bg-[#25D366] text-white hover:bg-[#1ebe5d] sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <a href={whatsappUrl(settings)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="aspect-[4/3] w-full border-t border-border">
              <iframe
                src={settings.map_embed_url ?? defaultSettings.map_embed_url}
                title="Mwambao Youth Technology location in Kariakoo Zanzibar"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border">
            <div className="text-sm font-semibold text-secondary mb-3">Tufuatilie</div>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: settings.facebook_url, label: "Facebook" },
                { icon: Twitter, href: settings.twitter_url, label: "Twitter" },
                { icon: Instagram, href: settings.instagram_url, label: "Instagram" },
                { icon: Linkedin, href: settings.linkedin_url, label: "LinkedIn" },
              ].filter((item) => item.href).map((item) => (
                <a key={item.label} href={item.href ?? "#"} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="w-10 h-10 rounded-lg bg-accent text-primary hover:gradient-primary hover:text-primary-foreground flex items-center justify-center transition-smooth">
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-soft space-y-5 sm:p-6 lg:col-span-3 lg:rounded-3xl lg:p-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-secondary">Tueleze kuhusu project yako</h2>
            <p className="mt-1 text-sm text-muted-foreground">Ukitupa details zaidi, tutakushauri package sahihi kwa haraka zaidi.</p>
          </div>

          <div className="space-y-3">
            <Label>Unahitaji huduma gani?</Label>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {serviceOptions.map((service) => {
                const Icon = service.icon;
                const selected = data.service_name === service.label;
                return (
                  <button
                    key={service.label}
                    type="button"
                    onClick={() => selectService(service.label, service.subject)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-smooth ${
                      selected
                        ? "border-primary bg-accent text-secondary shadow-soft"
                        : "border-border bg-background text-foreground/80 hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${selected ? "gradient-primary text-primary-foreground" : "bg-accent text-primary"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold leading-tight">{service.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Jina kamili</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                placeholder="Jina lako"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                placeholder="Barua pepe"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="service_name">Huduma</Label>
              <select
                id="service_name"
                value={data.service_name}
                onChange={(event) => setData("service_name", event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Chagua huduma</option>
                {serviceOptions.map((service) => (
                  <option key={service.label} value={service.label}>{service.label}</option>
                ))}
              </select>
              {errors.service_name && <p className="text-sm text-destructive">{errors.service_name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget_range">Bajeti</Label>
              <select
                id="budget_range"
                value={data.budget_range}
                onChange={(event) => setData("budget_range", event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Chagua bajeti</option>
                {budgetOptions.map((budget) => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
              {errors.budget_range && <p className="text-sm text-destructive">{errors.budget_range}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <select
                id="timeline"
                value={data.timeline}
                onChange={(event) => setData("timeline", event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Chagua timeline</option>
                {timelineOptions.map((timeline) => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
              {errors.timeline && <p className="text-sm text-destructive">{errors.timeline}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Simu</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                placeholder="+255 657 963 896"
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Kichwa cha ujumbe</Label>
              <Input
                id="subject"
                value={data.subject}
                onChange={(e) => setData("subject", e.target.value)}
                placeholder="Project inquiry"
              />
              {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
            </div>
          </div>
          <div className="space-y-2">
              <Label htmlFor="message">Ujumbe</Label>
            <Textarea
              id="message"
              value={data.message}
              onChange={(e) => setData("message", e.target.value)}
              required
              placeholder="Tueleze kuhusu project yako..."
              rows={6}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={processing}
            className="gradient-primary text-primary-foreground border-0 shadow-glow w-full sm:w-auto"
          >
            <Send className="mr-2 w-4 h-4" /> {processing ? "Inatuma..." : "Tuma Ujumbe"}
          </Button>
        </form>
      </section>
    </Layout>
  );
};

export default Contact;
