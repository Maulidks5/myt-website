import { Link, usePage } from "@inertiajs/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Boxes, Building2, FileText, History, Home, Inbox, LayoutDashboard, LogOut, Menu, MessageSquareQuote, PanelTop, HelpCircle, PackageCheck, Settings, Monitor, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { defaultSettings, type SharedPageProps } from "@/lib/site";

type AdminLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, permission: "dashboard.view" },
  { href: "/admin/messages", label: "Leads", icon: Inbox, countKey: "unreadMessages", permission: "messages.manage" },
  { href: "/admin/homepage", label: "Homepage", icon: Monitor, permission: "homepage.manage" },
  { href: "/admin/services", label: "Services", icon: PackageCheck, permission: "services.manage" },
  { href: "/admin/packages", label: "Packages", icon: Boxes, permission: "services.manage" },
  { href: "/admin/portfolio", label: "Portfolio", icon: Building2, permission: "portfolio.manage" },
  { href: "/admin/about", label: "About", icon: FileText, permission: "about.manage" },
  { href: "/admin/settings", label: "Settings / SEO", icon: Settings, permission: "settings.manage" },
  { href: "/admin/users", label: "Users", icon: Users, permission: "users.manage" },
  { href: "/admin/activity-logs", label: "Activity Logs", icon: History, permission: "activity-logs.view" },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote, countKey: "pendingTestimonials", permission: "testimonials.manage" },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle, permission: "faqs.manage" },
];

const AdminLayout = ({ title, description, children }: AdminLayoutProps) => {
  const { url, props } = usePage<SharedPageProps>();
  const settings = props.siteSettings ?? defaultSettings;
  const currentUser = props.auth?.user;
  const adminCounts = props.adminCounts;
  const [mobileOpen, setMobileOpen] = useState(false);
  const permissions = currentUser?.permissions ?? [];
  const canAccess = (permission?: string) => !permission || permissions.includes(permission);
  const canAccessOffice = canAccess("clients.manage");
  const visibleNavItems = navItems.filter((item) => canAccess(item.permission));

  useEffect(() => setMobileOpen(false), [url]);

  useEffect(() => {
    if (props.flash?.success) {
      toast.success(props.flash.success);
    }

    if (props.flash?.error) {
      toast.error(props.flash.error);
    }
  }, [props.flash?.error, props.flash?.success]);

  const nav = (
    <nav className="space-y-1">
      {visibleNavItems.map((item) => {
        const Icon = item.icon;
        const active = url === item.href || (item.href !== "/admin" && url.startsWith(item.href));
        const count = item.countKey && adminCounts ? adminCounts[item.countKey] : 0;
        const countLabel = count > 99 ? "99+" : String(count);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
              active ? "bg-accent text-primary shadow-soft" : "text-foreground/70 hover:bg-accent/60 hover:text-primary"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
            {count > 0 && (
              <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-bold leading-none text-primary-foreground">
                {countLabel}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const previewLinks = (
    <div className="rounded-lg border border-border bg-muted/40 p-3 shadow-soft">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview Website</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          { href: "/admin/preview/home", label: "Home" },
          { href: "/admin/preview/services", label: "Services" },
          { href: "/admin/preview/portfolio", label: "Portfolio" },
          { href: "/admin/preview/about", label: "About" },
        ].map((item) => (
          <Link key={item.href} href={item.href} target="_blank" className="rounded-md bg-background px-2 py-1.5 text-center text-foreground/70 shadow-soft transition-smooth hover:text-primary">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between gap-3 px-4">
          <Link href="/admin" className="inline-flex min-w-0 items-center gap-3">
            <img src={settings.logo_url ?? defaultSettings.logo_url ?? "/images/mwambao.png"} alt="Mwambao Youth Technology" className="h-11 w-auto shrink-0 object-contain" />
            <div className="min-w-0">
              <div className="truncate font-display text-sm font-extrabold text-secondary">MYT Admin</div>
              <div className="truncate text-xs text-muted-foreground">Website CMS</div>
            </div>
          </Link>
          <Button type="button" variant="outline" size="icon" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle admin menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {mobileOpen && (
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border px-4 py-4">
            {nav}
            <div className="mt-4 space-y-2">
              {previewLinks}
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  View Website
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/admin/logout" method="post" as="button">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <aside className="hidden border-r border-border bg-background lg:block">
        <div className="sticky top-0 flex min-h-screen flex-col p-5">
          <Link href="/admin" className="mb-8 inline-flex items-center gap-3">
            <img src={settings.logo_url ?? defaultSettings.logo_url ?? "/images/mwambao.png"} alt="Mwambao Youth Technology" className="h-14 w-auto object-contain" />
            <div>
              <div className="font-display text-sm font-extrabold text-secondary">MYT Admin</div>
              <div className="text-xs text-muted-foreground">Website CMS</div>
            </div>
          </Link>

          {nav}

          <div className="mt-auto space-y-2 pt-8">
            {previewLinks}
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                View Website
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/logout" method="post" as="button">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      <section className="min-w-0">
        <header className="border-b border-border bg-background">
          <div className="flex flex-col gap-4 px-4 py-5 sm:px-5 md:px-8 md:py-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <PanelTop className="h-4 w-4" />
                Mwambao Youth Technology
              </div>
              <div className="mt-3">
                <h1 className="font-display text-2xl font-extrabold text-secondary md:text-3xl">{title}</h1>
                {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
              </div>
            </div>
            {canAccessOffice && (
              <Button
                asChild
                variant={url.startsWith("/admin/clients") ? "default" : "outline"}
                className="w-full justify-center sm:w-auto"
              >
                <Link href="/admin/clients">
                  <Building2 className="mr-2 h-4 w-4" />
                  MYT Office
                </Link>
              </Button>
            )}
          </div>
        </header>

        <div className="min-w-0 px-4 py-6 sm:px-5 md:px-8 md:py-8">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
