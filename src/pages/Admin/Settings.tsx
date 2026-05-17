import { FormEvent, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Globe2, Save, Search } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SeoPage, SiteSettings } from "@/lib/site";

type SettingsProps = {
  settings: SiteSettings;
  seoPages: SeoPage[];
};

type SettingsForm = SiteSettings & {
  logo_file: File | null;
  default_og_image_file: File | null;
  _method: "put";
};

type SeoForm = {
  title: string;
  description: string;
  image: string;
  image_file: File | null;
  is_indexable: boolean;
  _method: "put";
};

const Settings = ({ settings, seoPages }: SettingsProps) => {
  const [editingSeo, setEditingSeo] = useState(seoPages[0] ?? null);
  const settingsForm = useForm<SettingsForm>({
    ...settings,
    logo_url: settings.logo_url ?? "/images/mwambao.png",
    maps_url: settings.maps_url ?? "",
    map_embed_url: settings.map_embed_url ?? "",
    facebook_url: settings.facebook_url ?? "",
    twitter_url: settings.twitter_url ?? "",
    instagram_url: settings.instagram_url ?? "",
    linkedin_url: settings.linkedin_url ?? "",
    footer_text: settings.footer_text ?? "",
    logo_file: null,
    default_og_image_file: null,
    _method: "put",
  });
  const seoForm = useForm<SeoForm>({
    title: editingSeo?.title ?? "",
    description: editingSeo?.description ?? "",
    image: editingSeo?.image ?? "",
    image_file: null,
    is_indexable: editingSeo?.is_indexable ?? true,
    _method: "put",
  });

  const selectSeo = (page: SeoPage) => {
    setEditingSeo(page);
    seoForm.setData({
      title: page.title,
      description: page.description,
      image: page.image ?? "",
      image_file: null,
      is_indexable: page.is_indexable,
      _method: "put",
    });
  };

  const submitSettings = (event: FormEvent) => {
    event.preventDefault();
    settingsForm.post("/admin/settings", {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        settingsForm.setData("logo_file", null);
        settingsForm.setData("default_og_image_file", null);
      },
    });
  };

  const submitSeo = (event: FormEvent) => {
    event.preventDefault();
    if (!editingSeo) return;
    seoForm.post(`/admin/seo/${editingSeo.id}`, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => seoForm.setData("image_file", null),
    });
  };

  return (
    <AdminLayout title="Settings / SEO" description="Manage company details, social links, and page metadata used by search engines.">
      <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-secondary">
              <Globe2 className="h-5 w-5 text-primary" />
              Website Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitSettings} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Site name</Label>
                  <Input id="site_name" value={settingsForm.data.site_name} onChange={(event) => settingsForm.setData("site_name", event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_url">Site URL</Label>
                  <Input id="site_url" value={settingsForm.data.site_url} onChange={(event) => settingsForm.setData("site_url", event.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo_file">Brand logo</Label>
                <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
                  <img src={settingsForm.data.logo_url ?? "/images/mwambao.png"} alt="Current logo" className="h-20 w-auto object-contain" />
                  <div className="text-sm text-muted-foreground">This logo is used in the website header, footer, and admin layout.</div>
                </div>
                <Input id="logo_file" type="file" accept="image/*" onChange={(event) => settingsForm.setData("logo_file", event.target.files?.[0] ?? null)} />
                <p className="text-xs text-muted-foreground">Upload a transparent PNG or WebP logo for best results.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={settingsForm.data.email} onChange={(event) => settingsForm.setData("email", event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={settingsForm.data.phone} onChange={(event) => settingsForm.setData("phone", event.target.value)} required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp_number">WhatsApp number</Label>
                  <Input id="whatsapp_number" value={settingsForm.data.whatsapp_number} onChange={(event) => settingsForm.setData("whatsapp_number", event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={settingsForm.data.location} onChange={(event) => settingsForm.setData("location", event.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maps_url">Google Maps link</Label>
                <Input id="maps_url" value={settingsForm.data.maps_url ?? ""} onChange={(event) => settingsForm.setData("maps_url", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="map_embed_url">Google Maps embed URL</Label>
                <Input id="map_embed_url" value={settingsForm.data.map_embed_url ?? ""} onChange={(event) => settingsForm.setData("map_embed_url", event.target.value)} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook</Label>
                  <Input id="facebook_url" value={settingsForm.data.facebook_url ?? ""} onChange={(event) => settingsForm.setData("facebook_url", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter_url">Twitter/X</Label>
                  <Input id="twitter_url" value={settingsForm.data.twitter_url ?? ""} onChange={(event) => settingsForm.setData("twitter_url", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram</Label>
                  <Input id="instagram_url" value={settingsForm.data.instagram_url ?? ""} onChange={(event) => settingsForm.setData("instagram_url", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input id="linkedin_url" value={settingsForm.data.linkedin_url ?? ""} onChange={(event) => settingsForm.setData("linkedin_url", event.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer_text">Footer text</Label>
                <Textarea id="footer_text" rows={4} value={settingsForm.data.footer_text ?? ""} onChange={(event) => settingsForm.setData("footer_text", event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default_og_image_file">Default preview image</Label>
                <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                  <img src={settingsForm.data.default_og_image} alt="Current default preview" className="h-32 w-full object-cover" />
                </div>
                <Input
                  id="default_og_image_file"
                  type="file"
                  accept="image/*"
                  onChange={(event) => settingsForm.setData("default_og_image_file", event.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">Upload JPG, PNG, or WebP. Leave empty to keep the current image.</p>
              </div>

              <Button type="submit" disabled={settingsForm.processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
                <Save className="mr-2 h-4 w-4" />
                {settingsForm.processing ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-secondary">
                <Search className="h-5 w-5 text-primary" />
                Page SEO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-5 flex flex-wrap gap-2">
                {seoPages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => selectSeo(page)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                      editingSeo?.id === page.id ? "gradient-primary border-transparent text-primary-foreground shadow-glow" : "border-border bg-card text-foreground/70 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {page.path}
                  </button>
                ))}
              </div>

              {editingSeo && (
                <form onSubmit={submitSeo} className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{editingSeo.path}</Badge>
                    <Badge variant={seoForm.data.is_indexable ? "default" : "secondary"}>{seoForm.data.is_indexable ? "Indexable" : "Noindex"}</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO title</Label>
                    <Input id="seo-title" value={seoForm.data.title} onChange={(event) => seoForm.setData("title", event.target.value)} required />
                    {seoForm.errors.title && <p className="text-sm text-destructive">{seoForm.errors.title}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-description">Meta description</Label>
                    <Textarea id="seo-description" rows={4} value={seoForm.data.description} onChange={(event) => seoForm.setData("description", event.target.value)} required />
                    <p className="text-xs text-muted-foreground">{seoForm.data.description.length}/300 characters</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-image-file">Open Graph image</Label>
                    {(seoForm.data.image || settingsForm.data.default_og_image) && (
                      <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                        <img src={seoForm.data.image || settingsForm.data.default_og_image} alt="Current SEO preview" className="h-36 w-full object-cover" />
                      </div>
                    )}
                    <Input
                      id="seo-image-file"
                      type="file"
                      accept="image/*"
                      onChange={(event) => seoForm.setData("image_file", event.target.files?.[0] ?? null)}
                    />
                    <p className="text-xs text-muted-foreground">Upload the image for this page. Leave empty to keep the current image.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="is_indexable" checked={seoForm.data.is_indexable} onCheckedChange={(checked) => seoForm.setData("is_indexable", checked === true)} />
                    <Label htmlFor="is_indexable" className="font-normal">Ruhusu search engines zi-index page hii</Label>
                  </div>
                  <Button type="submit" disabled={seoForm.processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
                    <Save className="mr-2 h-4 w-4" />
                    {seoForm.processing ? "Saving..." : "Save SEO"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
