import { createInertiaApp } from "@inertiajs/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../../src/index.css";

const queryClient = new QueryClient();

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("../../src/pages/**/*.tsx");
    const page = pages[`../../src/pages/${name}.tsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    return page();
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <App {...props} />
        </TooltipProvider>
      </QueryClientProvider>,
    );
  },
});
