import {
  Award,
  Camera,
  Clock3,
  Code2,
  Eye,
  Globe,
  Heart,
  Lightbulb,
  MapPin,
  Palette,
  Server,
  Share2,
  ShieldCheck,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ServicePackage = {
  id: number;
  name: string;
  tag?: string | null;
  description: string;
  price_label?: string | null;
  features: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

export type MarketingService = {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  portfolio_category: string;
  features: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  packages?: ServicePackage[];
};

export type PortfolioProject = {
  id: number;
  marketing_service_id?: number | null;
  title: string;
  client_name?: string | null;
  category: string;
  gradient: string;
  image_url?: string | null;
  project_url?: string | null;
  description?: string | null;
  challenge?: string | null;
  solution?: string | null;
  result?: string | null;
  is_featured?: boolean;
  is_active?: boolean;
  sort_order?: number;
  service?: MarketingService | null;
};

export type AboutValue = {
  icon_name: string;
  title: string;
  text: string;
};

export type AboutContent = {
  hero_title: string;
  hero_subtitle: string;
  story_eyebrow: string;
  story_title: string;
  story_body: string;
  story_body_extra?: string | null;
  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;
  values: AboutValue[];
  about_image_url?: string | null;
};

export type HomePageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url?: string | null;
  hero_card_title: string;
  hero_card_text?: string | null;
  hero_stats: Array<{ value: string; label: string }>;
  trust_items: Array<{ icon_name: string; title: string }>;
};

export const iconOptions = ["Globe", "Code2", "Palette", "Camera", "Share2", "Server"] as const;
export const aboutIconOptions = ["Award", "Heart", "Lightbulb", "Users"] as const;

export const iconMap: Record<string, LucideIcon> = {
  Award,
  Camera,
  Clock3,
  Code2,
  Eye,
  Globe,
  Heart,
  Lightbulb,
  MapPin,
  Palette,
  Server,
  Share2,
  ShieldCheck,
  Target,
  Users,
};

export const getIcon = (name?: string | null) => iconMap[name ?? ""] ?? Globe;

export const linesToArray = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export const arrayToLines = (value?: string[] | null) => (value ?? []).join("\n");
