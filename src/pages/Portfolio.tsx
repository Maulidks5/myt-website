import { useState } from "react";
import { Link } from "@inertiajs/react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/SectionHeading";
import PortfolioCard from "@/components/PortfolioCard";
import SeoHead from "@/components/SeoHead";
import type { MarketingService, PortfolioProject } from "@/lib/marketing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const projectsPerPage = 9;

type PortfolioProps = {
  projects: PortfolioProject[];
  services: MarketingService[];
};

const Portfolio = ({ projects, services }: PortfolioProps) => {
  const query = new URLSearchParams(window.location.search);
  const initialService = query.get("service") ?? "All";
  const [activeService, setActiveService] = useState(services.some((service) => String(service.id) === initialService) ? initialService : "All");
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = projects.filter((project) => {
    const serviceMatch = activeService === "All" || String(project.marketing_service_id) === activeService;

    return serviceMatch;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / projectsPerPage));
  const pageStart = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = filtered.slice(pageStart, pageStart + projectsPerPage);

  const selectService = (serviceId: string) => {
    setActiveService(serviceId);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <SeoHead
        title="Portfolio & Case Studies for Zanzibar Businesses"
        description="View website design, system development, branding, and social media case studies by Mwambao Youth Technology for businesses in Zanzibar and Tanzania."
        path="/portfolio"
      />
      <section className="gradient-hero text-secondary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="container mx-auto px-4 relative text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl">Kazi <span className="text-gradient">Tulizofanya</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-secondary-foreground/75">
            Baadhi ya projects za Website Design, Systems, Branding na Content tulizowafanyia clients.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <SectionHeading
          eyebrow="Portfolio"
          title="Case studies zinazoonyesha design, strategy na results"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => selectService("All")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-smooth border",
              activeService === "All"
                ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
                : "bg-card text-foreground/70 border-border hover:border-primary hover:text-primary"
            )}
          >
            Huduma Zote
          </button>
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => selectService(String(service.id))}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-smooth border",
                activeService === String(service.id)
                  ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
                  : "bg-card text-foreground/70 border-border hover:border-primary hover:text-primary"
              )}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((p) => <PortfolioCard key={p.id} project={p} />)}
        </div>

        {filtered.length > projectsPerPage && (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              Ukurasa {currentPage} kati ya {totalPages}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                Nyuma
              </Button>
              <Button
                type="button"
                className="gradient-primary border-0 text-primary-foreground shadow-glow"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              >
                Mbele
              </Button>
            </div>
          </div>
        )}

        <div className="mt-16 rounded-2xl gradient-hero p-6 text-center text-secondary-foreground shadow-elegant sm:p-8 md:rounded-3xl md:p-12">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Unataka project kama hizi?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-secondary-foreground/75">
            Tueleze biashara yako na tutakushauri solution inayofaa: website, system, branding, content au hosting.
          </p>
          <Button asChild size="lg" className="mt-6 gradient-primary border-0 text-primary-foreground shadow-glow">
            <Link href="/contact?subject=Project%20inquiry&message=Hello%20Mwambao%2C%20I%20saw%20your%20portfolio%20and%20I%20want%20a%20similar%20solution%20for%20my%20business.%20Please%20advise%20the%20best%20package%2C%20timeline%2C%20and%20starting%20budget.">
              <MessageCircle className="mr-2 h-4 w-4" />
              Omba Ushauri wa Project
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
