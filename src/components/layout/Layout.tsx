import { ReactNode } from "react";
import { Link, usePage } from "@inertiajs/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import BackToTop from "./BackToTop";
import type { SharedPageProps } from "@/lib/site";

const Layout = ({ children }: { children: ReactNode }) => {
  const { props } = usePage<SharedPageProps>();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {props.isPreview && (
        <div className="fixed left-0 right-0 top-16 z-50 border-y border-primary/20 bg-primary text-primary-foreground shadow-soft md:top-20">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-3 text-sm font-medium sm:flex-row sm:items-center sm:justify-between">
            <span>Preview mode: hidden and unpublished content is visible here.</span>
            <Link href="/admin" className="underline underline-offset-4">Back to admin</Link>
          </div>
        </div>
      )}
      <main className={`flex-1 pt-16 md:pt-20 ${props.isPreview ? "pt-28 md:pt-32" : ""}`}>{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;
