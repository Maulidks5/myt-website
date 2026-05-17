import { useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowUpRight, Building2, ExternalLink, Lightbulb, MessageCircle, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioProject } from "@/lib/marketing";

const contactHref = (project: PortfolioProject) => {
  const subject = `Project inquiry: ${project.title}`;
  const message = `Hello Mwambao,\n\nNimeona project ya ${project.title} na nahitaji solution inayofanana kwa biashara yangu.\n\nNaomba mnishauri package, timeline na bajeti ya kuanzia.`;

  return `/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
};

const hasCaseStudy = (project: PortfolioProject) => Boolean(project.challenge || project.solution || project.result);

const PortfolioCard = ({ project }: { project: PortfolioProject }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover-lift">
        <button
          type="button"
          onClick={() => project.image_url && setOpen(true)}
          className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden text-left"
          style={{ background: project.gradient }}
          aria-label={project.image_url ? `View ${project.title} image` : project.title}
        >
          {project.is_featured && <Badge className="absolute left-4 top-4 z-10">Featured</Badge>}
          {project.image_url ? (
            <>
              <img
                src={project.image_url}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-smooth group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-secondary/70 px-4 py-3 text-sm font-semibold text-secondary-foreground opacity-0 transition-smooth group-hover:opacity-100">
                Bonyeza kuona picha kamili
              </span>
            </>
          ) : (
            <div className="absolute inset-6 flex flex-col overflow-hidden rounded-xl bg-background/95 shadow-elegant backdrop-blur transition-smooth group-hover:scale-105">
              <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-destructive/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                <span className="h-2 w-2 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 space-y-1.5 p-3">
                <div className="h-2 w-1/3 rounded-full bg-primary/70" />
                <div className="h-1.5 w-2/3 rounded-full bg-muted" />
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  <div className="h-8 rounded bg-accent" />
                  <div className="h-8 rounded bg-muted" />
                  <div className="h-8 rounded bg-accent" />
                </div>
                <div className="mt-2 h-1.5 w-1/2 rounded-full bg-muted" />
                <div className="h-1.5 w-3/4 rounded-full bg-muted" />
              </div>
            </div>
          )}
        </button>
        <div className="p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">{project.service?.title ?? project.category}</div>
            <h3 className="mt-1 font-display text-lg font-bold text-secondary">{project.title}</h3>
            {project.client_name && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                {project.client_name}
              </div>
            )}
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent transition-smooth group-hover:gradient-primary group-hover:text-primary-foreground"
              aria-label={`View ${project.title} details`}
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
          {project.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-5xl">
          <DialogHeader className="px-5 pt-5">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant="outline">{project.service?.title ?? project.category}</Badge>
              {project.client_name && <Badge>{project.client_name}</Badge>}
            </div>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">{project.title}</DialogTitle>
            <DialogDescription>{project.description ?? "Project ya portfolio kutoka Mwambao Youth Technology."}</DialogDescription>
          </DialogHeader>
          <div className="px-5 pb-5">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.title}
                className="max-h-[72vh] w-full rounded-lg border border-border object-contain"
              />
            ) : (
              <div className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden rounded-lg border border-border" style={{ background: project.gradient }}>
                <div className="absolute inset-0 bg-secondary/10" />
                <div className="relative mx-6 max-w-lg rounded-xl bg-background/95 p-6 text-center shadow-elegant backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">{project.category}</div>
                  <div className="mt-2 font-display text-2xl font-extrabold text-secondary">{project.title}</div>
                  {project.client_name && <div className="mt-2 text-sm text-muted-foreground">{project.client_name}</div>}
                </div>
              </div>
            )}

            {hasCaseStudy(project) && (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { icon: Target, label: "Changamoto", value: project.challenge },
                  { icon: Lightbulb, label: "Solution", value: project.solution },
                  { icon: TrendingUp, label: "Matokeo", value: project.result },
                ].filter((item) => item.value).map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.label} className="rounded-xl border border-border bg-card p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-secondary">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        {item.label}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.value}</p>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-display font-bold text-secondary">Unataka project kama hii?</div>
                <p className="text-sm text-muted-foreground">Tueleze biashara yako, tutakushauri package, timeline na quote.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                {project.project_url && (
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Tembelea
                    </a>
                  </Button>
                )}
                <Button asChild className="gradient-primary border-0 text-primary-foreground shadow-glow">
                  <Link href={contactHref(project)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Omba Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioCard;
