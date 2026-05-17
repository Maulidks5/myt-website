import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/SectionHeading";
import SeoHead from "@/components/SeoHead";
import { CheckCircle2, Clock3, Eye, Headphones, MapPin, ShieldCheck, Target } from "lucide-react";
import { getIcon, type AboutContent } from "@/lib/marketing";
import heroImg from "@/assets/hero.jpg";

const fallbackAbout: AboutContent = {
  hero_title: "Kuhusu MYT",
  hero_subtitle: "Sisi ni digital studio ya vijana wenye ubunifu, tukijenga websites, systems na branding kwa biashara zinazotaka kukua.",
  story_eyebrow: "Story Yetu",
  story_title: "Kutoka wazo dogo hadi digital partner wa biashara",
  story_body: "Mwambao Youth Technology ilianzishwa na vijana wabunifu na developers wenye imani moja: technology ya kisasa inapaswa kufikiwa na kila biashara.",
  story_body_extra: "Tunaunganisha technical excellence na creative thinking ili kazi ionekane vizuri na ilete matokeo ya biashara.",
  mission_title: "Mission Yetu",
  mission_text: "Kuwezesha biashara kwa affordable digital solutions zinazosaidia growth na kufungua opportunities mpya.",
  vision_title: "Vision Yetu",
  vision_text: "Kuwa technology na creative partner anayeaminika zaidi kwa brands zinazotaka kukua ndani na nje ya Tanzania.",
  values: [],
  about_image_url: null,
};

const About = ({ about }: { about?: AboutContent | null }) => {
  const content = about ?? fallbackAbout;
  const aboutImage = content.about_image_url ?? heroImg;
  const trustItems = [
    { icon: MapPin, title: "Kariakoo, Zanzibar", text: "Tupo local, na tunatoa remote support kwa clients Tanzania nzima." },
    { icon: ShieldCheck, title: "Scope iliyo wazi", text: "Timeline, features na quote vinawekwa wazi kabla ya kazi kuanza." },
    { icon: Headphones, title: "Support baada ya launch", text: "Maintenance, updates, hosting na technical guidance baada ya delivery." },
    { icon: Clock3, title: "Mawasiliano ya haraka", text: "WhatsApp, email na project updates wakati wote wa kazi." },
  ];

  return (
  <Layout>
    <SeoHead
      title="About Mwambao Youth Technology Zanzibar"
      description="Learn about Mwambao Youth Technology, a Zanzibar digital studio helping businesses grow through website design, custom systems, branding, hosting, and digital marketing."
      path="/about"
    />
    <section className="gradient-hero text-secondary-foreground py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      <div className="container mx-auto px-4 relative text-center">
        <h1 className="font-display font-extrabold text-4xl md:text-6xl">{content.hero_title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-secondary-foreground/75">
          {content.hero_subtitle}
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="rounded-3xl overflow-hidden shadow-elegant border border-border">
          <img src={aboutImage} alt="Mwambao Youth Technology digital work setup" loading="lazy" width={1536} height={1024} className="w-full h-auto" />
        </div>
        <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-secondary/90 p-4 text-secondary-foreground shadow-elegant backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-extrabold">Digital partner kwa brands zinazokua</div>
              <p className="mt-1 text-sm leading-relaxed text-secondary-foreground/70">
                Websites, systems, branding na support zinazojengwa kwa malengo halisi ya biashara.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold uppercase tracking-wider mb-4">{content.story_eyebrow}</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-secondary leading-tight">
          {content.story_title}
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {content.story_body}
        </p>
        {content.story_body_extra && <p className="mt-3 text-muted-foreground leading-relaxed">{content.story_body_extra}</p>}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["50+", "Projects"],
            ["30+", "Clients"],
            ["5★", "Rating"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="font-display text-2xl font-extrabold text-primary">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 pb-20">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover-lift">
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

    <section className="bg-muted/40 py-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl bg-card border border-border hover-lift">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-4">
            <Target className="w-7 h-7 text-primary-foreground" />
          </div>
          <h3 className="font-display font-bold text-2xl text-secondary">{content.mission_title}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            {content.mission_text}
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-card border border-border hover-lift">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-4">
            <Eye className="w-7 h-7 text-primary-foreground" />
          </div>
          <h3 className="font-display font-bold text-2xl text-secondary">{content.vision_title}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            {content.vision_text}
          </p>
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-20">
      <SectionHeading eyebrow="Values Zetu" title="Principles zinazoongoza kazi yetu" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.values.map((v) => {
          const Icon = getIcon(v.icon_name);
          return (
            <div key={v.title} className="p-6 rounded-2xl bg-card border border-border hover-lift text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent mx-auto flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-secondary">{v.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{v.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  </Layout>
  );
};

export default About;
