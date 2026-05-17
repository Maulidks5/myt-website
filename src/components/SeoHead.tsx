import { Head, usePage } from "@inertiajs/react";
import { defaultSettings, type SharedPageProps } from "@/lib/site";

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const fallbackImage = "/images/mwambao.png";

const SeoHead = ({ title, description, path = "/", image }: SeoHeadProps) => {
  const { props } = usePage<SharedPageProps>();
  const settings = props.siteSettings ?? defaultSettings;
  const seo = props.seoPages?.[path];
  const resolvedTitle = seo?.title ?? title;
  const resolvedDescription = seo?.description ?? description;
  const resolvedImage = seo?.image ?? image ?? settings.default_og_image ?? fallbackImage;
  const pageTitle = `${resolvedTitle} | ${settings.site_name}`;
  const url = `${settings.site_url}${path}`;
  const imageUrl = resolvedImage.startsWith("http") ? resolvedImage : `${settings.site_url}${resolvedImage}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.site_name,
    url: settings.site_url,
    image: imageUrl,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.location,
      addressCountry: "TZ",
    },
    areaServed: ["Zanzibar", "Tanzania"],
    description: resolvedDescription,
    sameAs: [
      settings.facebook_url,
      settings.instagram_url,
      settings.linkedin_url,
      settings.twitter_url,
    ].filter(Boolean),
    makesOffer: [
      "Website design and development",
      "Custom system development",
      "Graphic design and branding",
      "Social media management",
      "Photography and videography",
      "Hosting and domain support",
    ],
  };

  return (
    <Head title={pageTitle}>
      <meta name="description" content={resolvedDescription} />
      <meta name="robots" content={seo?.is_indexable === false ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={settings.site_name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Head>
  );
};

export default SeoHead;
