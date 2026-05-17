import { FormEvent, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import Layout from "@/components/layout/Layout";
import FaqSection from "@/components/FaqSection";
import SectionHeading from "@/components/SectionHeading";
import SeoHead from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Faq } from "@/lib/faqs";
import { getIcon, type MarketingService } from "@/lib/marketing";
import { defaultSettings, whatsappUrl, type SharedPageProps } from "@/lib/site";
import { ArrowRight, Boxes, Check, Mail, MessageCircle, Star } from "lucide-react";
import { toast } from "sonner";

const packageId = (serviceTitle: string) => `packages-${serviceTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const quoteLink = (packageName: string, serviceName: string, priceLabel?: string | null, settings = defaultSettings) => {
  const priceText = priceLabel ? ` Bei ya kuanzia iliyoonyeshwa ni ${priceLabel}.` : "";
  const message = `Hello Mwambao, nahitaji quote ya ${packageName} kwenye ${serviceName}.${priceText} Naomba mnitumie details, timeline na final price.`;

  return whatsappUrl(settings, message);
};

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  service_name: string;
  package_name: string;
  message: string;
};

type ServicesPageProps = SharedPageProps & {
  flash?: {
    success?: string;
  };
};

type ServicesProps = {
  services: MarketingService[];
  faqs: Faq[];
};

const quoteSubject = (packageName: string) => `Ombi la quote: ${packageName}`;

const quoteMessage = (packageName: string, serviceName: string, priceLabel?: string | null) =>
  `Hello Mwambao,\n\nNahitaji quote ya ${packageName} kwenye ${serviceName}.${priceLabel ? `\n\nBei ya kuanzia iliyoonyeshwa ni ${priceLabel}.` : ""}\n\nNaomba mnitumie details, timeline na final price.\n\nAsanteni.`;

const quoteFormDefaults = (packageName = "", serviceName = "", priceLabel?: string | null): QuoteFormData => ({
  name: "",
  email: "",
  phone: "",
  subject: packageName ? quoteSubject(packageName) : "",
  service_name: serviceName,
  package_name: packageName,
  message: packageName && serviceName ? quoteMessage(packageName, serviceName, priceLabel) : "",
});

const openQuoteForm = (packageName: string, serviceName: string, priceLabel?: string | null) => ({
  subject: quoteSubject(packageName),
  service_name: serviceName,
  package_name: packageName,
  message: quoteMessage(packageName, serviceName, priceLabel),
});

const Services = ({ services, faqs }: ServicesProps) => {
  const { props } = usePage<ServicesPageProps>();
  const settings = props.siteSettings ?? defaultSettings;
  const initialServiceId = new URLSearchParams(window.location.search).get("service");
  const initialService = services.find((service) => String(service.id) === initialServiceId) ?? services[0];
  const [selectedService, setSelectedService] = useState(initialService?.title ?? "");
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const selectedGroup = services.find((service) => service.title === selectedService) ?? services[0];
  const SelectedIcon = selectedGroup ? getIcon(selectedGroup.icon_name) : null;
  const { data, setData, post, processing, errors, reset } = useForm<QuoteFormData>(quoteFormDefaults());

  const showPackages = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    window.requestAnimationFrame(() => {
      document.getElementById("service-packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const showQuoteForm = (packageName: string, serviceName: string, priceLabel?: string | null) => {
    setData({
      ...quoteFormDefaults(),
      ...openQuoteForm(packageName, serviceName, priceLabel),
    });
    setQuoteDialogOpen(true);
  };

  const submitQuoteForm = (event: FormEvent) => {
    event.preventDefault();
    post("/contact", {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setQuoteDialogOpen(false);
        toast.success(props.flash?.success ?? "Ombi lako la quote limetumwa.");
      },
    });
  };

  return (
    <Layout>
      <SeoHead
        title="Website, Branding & System Packages in Zanzibar"
        description="Compare website design, e-commerce, custom system development, branding, social media, hosting, and domain packages for businesses in Zanzibar and Tanzania."
        path="/services"
      />
      <section className="gradient-hero text-secondary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="container mx-auto px-4 relative text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl">Huduma <span className="text-gradient">Tunazotoa</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-secondary-foreground/75">
            Website Design, Systems, Branding, Social Media, Hosting na support ya kidigitali chini ya sehemu moja.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <SectionHeading
          eyebrow="Huduma Zetu"
          title="Digital services kwa biashara Zanzibar na Tanzania"
          subtitle="Chagua huduma unayohitaji, angalia packages, kisha omba quote kupitia WhatsApp au email."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => {
            const Icon = getIcon(s.icon_name);
            return (
              <div key={s.title} className="p-8 rounded-2xl bg-card border border-border hover-lift">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow shrink-0">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-secondary">{s.title}</h3>
                    {s.is_featured && <Badge className="mt-2">Featured</Badge>}
                    <p className="text-muted-foreground text-sm mt-1">{s.description}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2 mb-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href={`/portfolio?service=${s.id}`}>
                      Angalia Portfolio <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => showPackages(s.title)}
                    className="gradient-primary border-0 text-primary-foreground shadow-glow"
                  >
                    Angalia Packages <Boxes className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="service-packages" className="bg-muted/40 py-20 scroll-mt-28">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Packages"
            title="Chagua package inayolingana na hatua yako"
            subtitle="Chagua option iliyo karibu na mahitaji yako. Tuta-refine scope, timeline na final price pamoja."
          />

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {services.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedService(group.title)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                  selectedService === group.title
                    ? "gradient-primary border-transparent text-primary-foreground shadow-glow"
                    : "border-border bg-card text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {group.title}
              </button>
            ))}
          </div>

          {selectedGroup && <div id={packageId(selectedGroup.title)} className="scroll-mt-28">
            <div className="mb-5 flex items-center gap-3">
              {SelectedIcon && (
                <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary shadow-glow">
                  <SelectedIcon className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
              <div>
                <h3 className="font-display text-2xl font-extrabold text-secondary">{selectedGroup.title}</h3>
                <p className="text-sm text-muted-foreground">Packages za huduma hii</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(selectedGroup.packages ?? []).map((item) => (
                <div
                  key={item.id}
                  className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant ${
                    item.is_featured ? "border-primary ring-2 ring-primary/15" : "border-border"
                  }`}
                >
                  {item.is_featured && (
                    <div className="absolute -top-3 left-6">
                      <Badge className="gradient-primary border-0 text-primary-foreground shadow-glow">
                        <Star className="mr-1 h-3.5 w-3.5" />
                        Recommended
                      </Badge>
                    </div>
                  )}

                  <div className="mb-5">
                    <Badge variant="outline" className="mb-4">
                      {item.tag}
                    </Badge>
                    <h4 className="font-display text-xl font-extrabold text-secondary">{item.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>

                  <div className="mb-6 rounded-xl border border-border bg-muted/40 p-4">
                    <div className="text-sm text-muted-foreground">Bei ya kuanzia</div>
                    <div className="font-display text-2xl font-extrabold text-secondary">
                      {item.price_label ?? "Omba Quote"}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Bei ya mwisho hutegemea scope ya kazi.</div>
                  </div>

                  <ul className="mb-6 flex-1 space-y-3">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      asChild
                      className="border-0 bg-[#25D366] text-white hover:bg-[#1ebe5d]"
                    >
                      <a href={quoteLink(item.name, selectedGroup.title, item.price_label, settings)} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => showQuoteForm(item.name, selectedGroup.title, item.price_label)}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>}
        </div>
      </section>

      <FaqSection className="py-20" faqs={faqs} />

      <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">Omba Quote</DialogTitle>
            <DialogDescription>
              Jaza mawasiliano yako, tutakujibu na package details, bei na timeline.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitQuoteForm} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quote-name">Jina kamili</Label>
                <Input
                  id="quote-name"
                  value={data.name}
                  onChange={(event) => setData("name", event.target.value)}
                  required
                  placeholder="Jina lako"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-email">Email</Label>
                <Input
                  id="quote-email"
                  type="email"
                  value={data.email}
                  onChange={(event) => setData("email", event.target.value)}
                  required
                  placeholder="Barua pepe"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quote-phone">Simu</Label>
                <Input
                  id="quote-phone"
                  value={data.phone}
                  onChange={(event) => setData("phone", event.target.value)}
                  placeholder="+255 657 963 896"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-subject">Kichwa cha ujumbe</Label>
                <Input
                  id="quote-subject"
                  value={data.subject}
                  onChange={(event) => setData("subject", event.target.value)}
                  required
                />
                {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Huduma</div>
                <div className="mt-1 font-semibold text-secondary">{data.service_name}</div>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Package</div>
                <div className="mt-1 font-semibold text-secondary">{data.package_name}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-message">Ujumbe</Label>
              <Textarea
                id="quote-message"
                value={data.message}
                onChange={(event) => setData("message", event.target.value)}
                required
                rows={6}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full gradient-primary border-0 text-primary-foreground shadow-glow sm:w-auto"
            >
              <Mail className="mr-2 h-4 w-4" />
              {processing ? "Inatuma..." : "Tuma Ombi la Quote"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Services;
