import { usePage } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";
import { defaultSettings, whatsappUrl, type SharedPageProps } from "@/lib/site";

const WhatsAppFloat = () => {
  const { props } = usePage<SharedPageProps>();
  const settings = props.siteSettings ?? defaultSettings;

  return (
    <a
      href={whatsappUrl(settings)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant hover:scale-105 transition-smooth"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppFloat;
