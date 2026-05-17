import { Link } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { getIcon, type MarketingService } from "@/lib/marketing";

const ServiceCard = ({ service, detailed = false }: { service: MarketingService; detailed?: boolean }) => {
  const Icon = getIcon(service.icon_name);
  return (
    <Card asChild className="h-full cursor-pointer border border-border gradient-card p-6 hover-lift group md:p-8">
      <Link href={`/services?service=${service.id}#service-packages`} aria-label={`Angalia packages za ${service.title}`}>
      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-smooth">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="font-display font-bold text-xl text-secondary mb-2">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
      {detailed && (
        <ul className="mt-5 space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-foreground/80">{f}</span>
            </li>
          ))}
        </ul>
      )}
      </Link>
    </Card>
  );
};

export default ServiceCard;
