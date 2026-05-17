export type SiteSettings = {
  site_name: string;
  site_url: string;
  logo_url?: string | null;
  email: string;
  phone: string;
  whatsapp_number: string;
  location: string;
  maps_url?: string | null;
  map_embed_url?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  footer_text?: string | null;
  default_og_image: string;
};

export type SeoPage = {
  id: number;
  path: string;
  title: string;
  description: string;
  image?: string | null;
  is_indexable: boolean;
};

export type SharedPageProps = {
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
      is_active: boolean;
      can_access_client_dashboard: boolean;
      permissions: string[];
    } | null;
  };
  flash?: {
    success?: string | null;
    error?: string | null;
  };
  adminCounts?: {
    unreadMessages: number;
    pendingTestimonials: number;
  } | null;
  siteSettings?: SiteSettings | null;
  seoPages?: Record<string, SeoPage>;
  isPreview?: boolean;
};

export const defaultSettings: SiteSettings = {
  site_name: "Mwambao Youth Technology",
  site_url: "https://myt.co.tz",
  logo_url: "/images/mwambao.png",
  email: "info@myt.co.tz",
  phone: "+255 657 963 896",
  whatsapp_number: "255657963896",
  location: "Kariakoo, Zanzibar",
  maps_url: "https://www.google.com/maps/search/?api=1&query=Kariakoo%2C%20Zanzibar",
  map_embed_url: "https://www.google.com/maps?q=Kariakoo%2C%20Zanzibar&output=embed",
  footer_text: "Mwambao Youth Technology - transforming businesses with modern websites, systems and creative digital solutions.",
  default_og_image: "/images/mwambao.png",
};

export const whatsappUrl = (settings: SiteSettings, message?: string) => {
  const base = `https://wa.me/${settings.whatsapp_number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
