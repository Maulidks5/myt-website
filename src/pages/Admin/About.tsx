import { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import { Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AboutContent } from "@/lib/marketing";

type AboutForm = Omit<AboutContent, "values"> & {
  values_text: string;
  about_image: File | null;
  _method: "put";
};

const valuesToText = (about: AboutContent) => (about.values ?? []).map((value) => `${value.icon_name} | ${value.title} | ${value.text}`).join("\n");

const About = ({ about }: { about: AboutContent }) => {
  const { data, setData, post, processing, errors } = useForm<AboutForm>({
    hero_title: about.hero_title,
    hero_subtitle: about.hero_subtitle,
    about_image_url: about.about_image_url ?? "",
    story_eyebrow: about.story_eyebrow,
    story_title: about.story_title,
    story_body: about.story_body,
    story_body_extra: about.story_body_extra ?? "",
    mission_title: about.mission_title,
    mission_text: about.mission_text,
    vision_title: about.vision_title,
    vision_text: about.vision_text,
    values_text: valuesToText(about),
    about_image: null,
    _method: "put",
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    post("/admin/about", {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => setData("about_image", null),
    });
  };

  return (
    <AdminLayout title="About Page" description="Edit the story, mission, vision, and values shown on the public About page.">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-secondary">
            <Save className="h-5 w-5 text-primary" />
            About Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hero_title">Hero title</Label>
                <Input id="hero_title" value={data.hero_title} onChange={(event) => setData("hero_title", event.target.value)} required />
                {errors.hero_title && <p className="text-sm text-destructive">{errors.hero_title}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="story_eyebrow">Story eyebrow</Label>
                <Input id="story_eyebrow" value={data.story_eyebrow} onChange={(event) => setData("story_eyebrow", event.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">Hero subtitle</Label>
              <Textarea id="hero_subtitle" rows={3} value={data.hero_subtitle} onChange={(event) => setData("hero_subtitle", event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about_image">About image</Label>
              {about.about_image_url && (
                <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                  <img src={about.about_image_url} alt="Current about page" className="h-56 w-full object-cover" />
                </div>
              )}
              <Input id="about_image" type="file" accept="image/*" onChange={(event) => setData("about_image", event.target.files?.[0] ?? null)} />
              {errors.about_image && <p className="text-sm text-destructive">{errors.about_image}</p>}
              <p className="text-xs text-muted-foreground">Upload JPG, PNG, or WebP. Leave empty to keep the current image.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="story_title">Story title</Label>
              <Input id="story_title" value={data.story_title} onChange={(event) => setData("story_title", event.target.value)} required />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="story_body">Story paragraph 1</Label>
                <Textarea id="story_body" rows={7} value={data.story_body} onChange={(event) => setData("story_body", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story_body_extra">Story paragraph 2</Label>
                <Textarea id="story_body_extra" rows={7} value={data.story_body_extra ?? ""} onChange={(event) => setData("story_body_extra", event.target.value)} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mission_title">Mission title</Label>
                <Input id="mission_title" value={data.mission_title} onChange={(event) => setData("mission_title", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision_title">Vision title</Label>
                <Input id="vision_title" value={data.vision_title} onChange={(event) => setData("vision_title", event.target.value)} required />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mission_text">Mission text</Label>
                <Textarea id="mission_text" rows={5} value={data.mission_text} onChange={(event) => setData("mission_text", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision_text">Vision text</Label>
                <Textarea id="vision_text" rows={5} value={data.vision_text} onChange={(event) => setData("vision_text", event.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="values_text">Values, one per line as Icon | Title | Text</Label>
              <Textarea id="values_text" rows={6} value={data.values_text} onChange={(event) => setData("values_text", event.target.value)} />
              <p className="text-xs text-muted-foreground">Available icons: Award, Heart, Lightbulb, Users.</p>
            </div>
            <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              <Save className="mr-2 h-4 w-4" />
              {processing ? "Saving..." : "Save About Page"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default About;
