import {
  Globe, Code2, Palette, Camera, Share2, Server,
  LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description: "Websites za kisasa, fast na mobile-first zinazojenga trust na kuongeza inquiries.",
    features: ["Responsive design", "SEO basics", "Fast loading", "CMS ready"],
  },
  {
    icon: Code2,
    title: "System Development",
    description: "Custom systems na dashboards za kurahisisha records, clients, orders na reports.",
    features: ["Custom dashboards", "Secure auth", "Scalable APIs", "Reliable hosting"],
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    description: "Logo, brand identity na marketing visuals zinazofanya biashara ionekane professional.",
    features: ["Logo design", "Brand guidelines", "Print materials", "Social graphics"],
  },
  {
    icon: Camera,
    title: "Photography & Videography",
    description: "Photo na video production kwa products, events, brands na digital campaigns.",
    features: ["Product shoots", "Brand videos", "Event coverage", "Editing & post"],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Content planning, post designs, scheduling na growth support kwa social media.",
    features: ["Content strategy", "Daily posting", "Audience growth", "Analytics"],
  },
  {
    icon: Server,
    title: "Hosting & Domain Support",
    description: "Hosting salama, domain setup, SSL, backups na ongoing technical support.",
    features: ["99.9% uptime", "SSL included", "Daily backups", "24/7 support"],
  },
];
