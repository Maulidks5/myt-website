import { FormEvent, useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { MessageSquarePlus, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import type { Testimonial } from "@/lib/testimonials";
import type { SharedPageProps } from "@/lib/site";
import { toast } from "sonner";

type TestimonialsSectionProps = {
  className?: string;
  testimonials: Testimonial[];
};

type TestimonialForm = {
  name: string;
  company: string;
  service: string;
  rating: number;
  comment: string;
};

type PageProps = SharedPageProps & {
  flash?: {
    success?: string;
  };
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TestimonialsSection = ({ className = "", testimonials }: TestimonialsSectionProps) => {
  const { props } = usePage<PageProps>();
  const [open, setOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm<TestimonialForm>({
    name: "",
    company: "",
    service: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (props.flash?.success) {
      toast.success(props.flash.success);
    }
  }, [props.flash?.success]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    post("/testimonials", {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title="Wateja wanasemaje kuhusu kazi zetu"
        />

        <div className="-mt-8 mb-10 flex justify-center">
          <Button type="button" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setOpen(true)}>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Shiriki Maoni Yako
          </Button>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="mx-auto max-w-6xl">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={`${testimonial.name}-${testimonial.company}`} className="md:basis-1/2 lg:basis-1/3">
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: testimonial.rating }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-primary/25" />
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">"{testimonial.comment}"</p>

                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-primary font-display text-sm font-extrabold text-primary-foreground shadow-glow">
                        {initials(testimonial.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-secondary">{testimonial.name}</div>
                        <div className="truncate text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                      Verified client - {testimonial.service}
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 bg-background md:-left-5" />
          <CarouselNext className="-right-3 bg-background md:-right-5" />
        </Carousel>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-extrabold text-secondary">Shiriki Maoni Yako</DialogTitle>
              <DialogDescription>
                Maoni yako yatapitiwa kabla hayajaonekana kwenye website.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-name">Jina</Label>
                  <Input id="testimonial-name" value={data.name} onChange={(event) => setData("name", event.target.value)} required />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial-company">Company</Label>
                  <Input id="testimonial-company" value={data.company} onChange={(event) => setData("company", event.target.value)} required />
                  {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-service">Huduma uliyopata</Label>
                  <Input id="testimonial-service" value={data.service} onChange={(event) => setData("service", event.target.value)} placeholder="Business Website" required />
                  {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial-rating">Rating</Label>
                  <Input id="testimonial-rating" type="number" min={1} max={5} value={data.rating} onChange={(event) => setData("rating", Number(event.target.value))} required />
                  {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial-comment">Maoni</Label>
                <Textarea id="testimonial-comment" rows={5} value={data.comment} onChange={(event) => setData("comment", event.target.value)} required placeholder="Tueleze nini kilibadilika kwenye biashara yako..." />
                {errors.comment && <p className="text-sm text-destructive">{errors.comment}</p>}
              </div>

              <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
                {processing ? "Inatuma..." : "Tuma Maoni"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TestimonialsSection;
