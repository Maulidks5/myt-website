import { FormEvent } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Eye, ImageIcon, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { HomePageContent } from "@/lib/marketing";

type HomepageForm = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_card_title: string;
  hero_card_text: string;
  hero_stats_text: string;
  trust_items_text: string;
  hero_image: File | null;
  _method: "put";
};

const statsToText = (home: HomePageContent) => (home.hero_stats ?? []).map((item) => `${item.value} | ${item.label}`).join("\n");
const trustToText = (home: HomePageContent) => (home.trust_items ?? []).map((item) => `${item.icon_name} | ${item.title}`).join("\n");

const Homepage = ({ home }: { home: HomePageContent }) => {
  const { data, setData, post, processing, errors } = useForm<HomepageForm>({
    hero_eyebrow: home.hero_eyebrow,
    hero_title: home.hero_title,
    hero_subtitle: home.hero_subtitle,
    hero_card_title: home.hero_card_title,
    hero_card_text: home.hero_card_text ?? "",
    hero_stats_text: statsToText(home),
    trust_items_text: trustToText(home),
    hero_image: null,
    _method: "put",
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    post("/admin/homepage", {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => setData("hero_image", null),
    });
  };

  return (
    <AdminLayout title="Homepage" description="Manage the homepage hero, main image, stats, and trust highlights.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/admin/preview/home" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Preview Home
          </Link>
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-secondary">
            <ImageIcon className="h-5 w-5 text-primary" />
            Hero Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hero_eyebrow">Hero eyebrow</Label>
                <Input id="hero_eyebrow" value={data.hero_eyebrow} onChange={(event) => setData("hero_eyebrow", event.target.value)} required />
                {errors.hero_eyebrow && <p className="text-sm text-destructive">{errors.hero_eyebrow}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_card_title">Image card title</Label>
                <Input id="hero_card_title" value={data.hero_card_title} onChange={(event) => setData("hero_card_title", event.target.value)} required />
                {errors.hero_card_title && <p className="text-sm text-destructive">{errors.hero_card_title}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_title">Hero title</Label>
              <Textarea id="hero_title" rows={3} value={data.hero_title} onChange={(event) => setData("hero_title", event.target.value)} required />
              {errors.hero_title && <p className="text-sm text-destructive">{errors.hero_title}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">Hero subtitle</Label>
              <Textarea id="hero_subtitle" rows={4} value={data.hero_subtitle} onChange={(event) => setData("hero_subtitle", event.target.value)} required />
              {errors.hero_subtitle && <p className="text-sm text-destructive">{errors.hero_subtitle}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_card_text">Image card text</Label>
              <Textarea id="hero_card_text" rows={3} value={data.hero_card_text} onChange={(event) => setData("hero_card_text", event.target.value)} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hero_stats_text">Hero stats, one per line as Value | Label</Label>
                <Textarea id="hero_stats_text" rows={5} value={data.hero_stats_text} onChange={(event) => setData("hero_stats_text", event.target.value)} />
                <p className="text-xs text-muted-foreground">Example: 50+ | Projects delivered</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trust_items_text">Trust highlights, one per line as Icon | Title</Label>
                <Textarea id="trust_items_text" rows={5} value={data.trust_items_text} onChange={(event) => setData("trust_items_text", event.target.value)} />
                <p className="text-xs text-muted-foreground">Available icons: MapPin, Clock3, ShieldCheck, Target.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_image">Hero image</Label>
              {home.hero_image_url && (
                <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                  <img src={home.hero_image_url} alt="Current homepage hero" className="h-56 w-full object-cover" />
                </div>
              )}
              <Input id="hero_image" type="file" accept="image/*" onChange={(event) => setData("hero_image", event.target.files?.[0] ?? null)} />
              {errors.hero_image && <p className="text-sm text-destructive">{errors.hero_image}</p>}
              <p className="text-xs text-muted-foreground">Upload JPG, PNG, or WebP. Leave empty to keep the current image.</p>
            </div>
            <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              <Save className="mr-2 h-4 w-4" />
              {processing ? "Saving..." : "Save Homepage"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Homepage;
