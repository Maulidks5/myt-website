import { FormEvent, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Boxes, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { arrayToLines, iconOptions, type MarketingService, type ServicePackage } from "@/lib/marketing";

type ServiceForm = {
  title: string;
  description: string;
  icon_name: string;
  portfolio_category: string;
  features_text: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

type PackageForm = {
  name: string;
  tag: string;
  description: string;
  price_label: string;
  features_text: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

const emptyService: ServiceForm = {
  title: "",
  description: "",
  icon_name: "Globe",
  portfolio_category: "All",
  features_text: "",
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

const emptyPackage: PackageForm = {
  name: "",
  tag: "",
  description: "",
  price_label: "",
  features_text: "",
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

type ServicesProps = {
  services: MarketingService[];
  initialSection?: "services" | "packages";
};

const Services = ({ services, initialSection = "services" }: ServicesProps) => {
  const [activeSection, setActiveSection] = useState<"services" | "packages">(initialSection);
  const [editingService, setEditingService] = useState<MarketingService | null>(null);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? 0);
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(null);
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const serviceForm = useForm<ServiceForm>(emptyService);
  const packageForm = useForm<PackageForm>(emptyPackage);
  const selectedService = services.find((service) => service.id === selectedServiceId) ?? services[0];
  const visiblePackages = selectedService?.packages ?? [];

  const startCreateService = () => {
    setEditingService(null);
    serviceForm.reset();
    setServiceDialogOpen(true);
  };

  const editService = (service: MarketingService) => {
    setEditingService(service);
    serviceForm.setData({
      title: service.title,
      description: service.description,
      icon_name: service.icon_name,
      portfolio_category: service.portfolio_category,
      features_text: arrayToLines(service.features),
      is_featured: service.is_featured,
      is_active: service.is_active,
      sort_order: service.sort_order,
    });
    setServiceDialogOpen(true);
  };

  const clearService = () => {
    setEditingService(null);
    serviceForm.reset();
    setServiceDialogOpen(false);
  };

  const submitService = (event: FormEvent) => {
    event.preventDefault();
    const options = { preserveScroll: true, onSuccess: clearService };

    if (editingService) {
      serviceForm.put(`/admin/services/${editingService.id}`, options);
      return;
    }

    serviceForm.post("/admin/services", options);
  };

  const startCreatePackage = (serviceId = selectedService?.id ?? services[0]?.id ?? 0) => {
    setSelectedServiceId(serviceId);
    setEditingPackage(null);
    packageForm.reset();
    setPackageDialogOpen(true);
  };

  const editPackage = (item: ServicePackage, serviceId: number) => {
    setSelectedServiceId(serviceId);
    setEditingPackage(item);
    packageForm.setData({
      name: item.name,
      tag: item.tag ?? "",
      description: item.description,
      price_label: item.price_label ?? "",
      features_text: arrayToLines(item.features),
      is_featured: item.is_featured,
      is_active: item.is_active,
      sort_order: item.sort_order,
    });
    setPackageDialogOpen(true);
  };

  const clearPackage = () => {
    setEditingPackage(null);
    packageForm.reset();
    setPackageDialogOpen(false);
  };

  const submitPackage = (event: FormEvent) => {
    event.preventDefault();
    const options = { preserveScroll: true, onSuccess: clearPackage };

    if (editingPackage) {
      packageForm.put(`/admin/packages/${editingPackage.id}`, options);
      return;
    }

    packageForm.post(`/admin/services/${selectedService?.id}/packages`, options);
  };

  return (
    <AdminLayout
      title={activeSection === "services" ? "Services" : "Packages"}
      description={activeSection === "services" ? "Manage public services shown on the website." : "Manage quote packages under each service."}
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <Button type="button" variant={activeSection === "services" ? "default" : "outline"} onClick={() => setActiveSection("services")}>
          Services
        </Button>
        <Button type="button" variant={activeSection === "packages" ? "default" : "outline"} onClick={() => setActiveSection("packages")}>
          Packages
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/preview/services" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Preview Services
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/preview/home" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Preview Home
          </Link>
        </Button>
        {activeSection === "services" ? (
          <Button type="button" onClick={startCreateService} className="gradient-primary border-0 text-primary-foreground shadow-glow">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        ) : (
          <Button type="button" onClick={() => startCreatePackage()} className="gradient-primary border-0 text-primary-foreground shadow-glow">
            <Boxes className="mr-2 h-4 w-4" />
            Add Package
          </Button>
        )}
      </div>

      <Dialog open={serviceDialogOpen} onOpenChange={(open) => (open ? setServiceDialogOpen(true) : clearService())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">
              {editingService ? "Edit Service" : "Add Service"}
            </DialogTitle>
            <DialogDescription>Create or update a public service shown on the website.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitService} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-title">Title</Label>
              <Input id="service-title" value={serviceForm.data.title} onChange={(event) => serviceForm.setData("title", event.target.value)} required />
              {serviceForm.errors.title && <p className="text-sm text-destructive">{serviceForm.errors.title}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-description">Description</Label>
              <Textarea id="service-description" rows={4} value={serviceForm.data.description} onChange={(event) => serviceForm.setData("description", event.target.value)} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="icon-name">Icon</Label>
                <select id="icon-name" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={serviceForm.data.icon_name} onChange={(event) => serviceForm.setData("icon_name", event.target.value)}>
                  {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio-category">Portfolio category</Label>
                <Input id="portfolio-category" value={serviceForm.data.portfolio_category} onChange={(event) => serviceForm.setData("portfolio_category", event.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-features">Features, one per line</Label>
              <Textarea id="service-features" rows={5} value={serviceForm.data.features_text} onChange={(event) => serviceForm.setData("features_text", event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="service-sort">Sort order</Label>
                <Input id="service-sort" type="number" min={0} value={serviceForm.data.sort_order} onChange={(event) => serviceForm.setData("sort_order", Number(event.target.value))} />
              </div>
              <div className="flex items-center gap-2 pt-7">
                <Checkbox id="service-featured" checked={serviceForm.data.is_featured} onCheckedChange={(checked) => serviceForm.setData("is_featured", checked === true)} />
                <Label htmlFor="service-featured" className="font-normal">Featured</Label>
              </div>
              <div className="flex items-center gap-2 pt-7">
                <Checkbox id="service-active" checked={serviceForm.data.is_active} onCheckedChange={(checked) => serviceForm.setData("is_active", checked === true)} />
                <Label htmlFor="service-active" className="font-normal">Published</Label>
              </div>
            </div>
            <Button type="submit" disabled={serviceForm.processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              {editingService ? "Update Service" : "Create Service"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={packageDialogOpen} onOpenChange={(open) => (open ? setPackageDialogOpen(true) : clearPackage())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">
              {editingPackage ? "Edit Package" : "Add Package"}
            </DialogTitle>
            <DialogDescription>Connect the package to the service it belongs to, then set its price label and features.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitPackage} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="package-service">Service</Label>
              <select id="package-service" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={selectedService?.id ?? 0} onChange={(event) => setSelectedServiceId(Number(event.target.value))}>
                {services.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="package-name">Name</Label>
                <Input id="package-name" value={packageForm.data.name} onChange={(event) => packageForm.setData("name", event.target.value)} required />
                {packageForm.errors.name && <p className="text-sm text-destructive">{packageForm.errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="package-tag">Tag</Label>
                <Input id="package-tag" value={packageForm.data.tag} onChange={(event) => packageForm.setData("tag", event.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-description">Description</Label>
              <Textarea id="package-description" rows={4} value={packageForm.data.description} onChange={(event) => packageForm.setData("description", event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-price">Price label</Label>
              <Input id="package-price" value={packageForm.data.price_label} onChange={(event) => packageForm.setData("price_label", event.target.value)} placeholder="Kuanzia TZS 350,000" />
              {packageForm.errors.price_label && <p className="text-sm text-destructive">{packageForm.errors.price_label}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="package-features">Features, one per line</Label>
              <Textarea id="package-features" rows={5} value={packageForm.data.features_text} onChange={(event) => packageForm.setData("features_text", event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="package-sort">Sort order</Label>
                <Input id="package-sort" type="number" min={0} value={packageForm.data.sort_order} onChange={(event) => packageForm.setData("sort_order", Number(event.target.value))} />
              </div>
              <div className="flex items-center gap-2 pt-7">
                <Checkbox id="package-featured" checked={packageForm.data.is_featured} onCheckedChange={(checked) => packageForm.setData("is_featured", checked === true)} />
                <Label htmlFor="package-featured" className="font-normal">Featured</Label>
              </div>
              <div className="flex items-center gap-2 pt-7">
                <Checkbox id="package-active" checked={packageForm.data.is_active} onCheckedChange={(checked) => packageForm.setData("is_active", checked === true)} />
                <Label htmlFor="package-active" className="font-normal">Published</Label>
              </div>
            </div>
            <Button type="submit" disabled={packageForm.processing || !selectedService} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              {editingPackage ? "Update Package" : "Create Package"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6">
        {activeSection === "services" && <Card className="shadow-soft">
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl text-secondary">Services</CardTitle>
            <div className="text-sm text-muted-foreground">{services.length} services</div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[860px] text-sm">
                <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Portfolio Type</th>
                    <th className="px-4 py-3 font-semibold">Packages</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Order</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {services.map((service) => (
                    <tr key={service.id} className="align-middle hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-secondary">{service.title}</div>
                        <div className="line-clamp-1 max-w-md text-xs text-muted-foreground">{service.description}</div>
                      </td>
                      <td className="px-4 py-3"><Badge variant="outline">{service.portfolio_category}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{service.packages?.length ?? 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={service.is_active ? "default" : "outline"}>{service.is_active ? "Published" : "Hidden"}</Badge>
                          {service.is_featured && <Badge>Featured</Badge>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{service.sort_order}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" size="icon" title="Edit service" aria-label={`Edit ${service.title}`} onClick={() => editService(service)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="outline" size="icon" title="Add package" aria-label={`Add package for ${service.title}`} onClick={() => startCreatePackage(service.id)}>
                            <Boxes className="h-4 w-4" />
                          </Button>
                          <Button asChild variant="destructive" size="icon" title="Delete service">
                            <Link href={`/admin/services/${service.id}`} method="delete" as="button" preserveScroll aria-label={`Delete ${service.title}`} onBefore={() => confirm("Delete this service and its packages?")}>
                              <Trash2 className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>}

        {activeSection === "packages" && <Card className="shadow-soft">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-xl text-secondary">Packages</CardTitle>
              <div className="text-sm text-muted-foreground">{visiblePackages.length} packages</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                    selectedService?.id === service.id
                      ? "gradient-primary border-transparent text-primary-foreground shadow-glow"
                      : "border-border bg-background text-foreground/70 hover:border-primary hover:text-primary"
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Package</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Order</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {visiblePackages.map((item) => (
                    <tr key={item.id} className="align-middle hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-secondary">{item.name}</div>
                        <div className="line-clamp-1 max-w-md text-xs text-muted-foreground">{item.description}</div>
                        {item.tag && <div className="mt-1 text-xs text-primary">{item.tag}</div>}
                      </td>
                      <td className="px-4 py-3 font-semibold text-secondary">{item.price_label ?? "Request Quote"}</td>
                      <td className="px-4 py-3"><Badge variant="outline">{selectedService?.title}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={item.is_active ? "default" : "outline"}>{item.is_active ? "Published" : "Hidden"}</Badge>
                          {item.is_featured && <Badge>Featured</Badge>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.sort_order}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" size="icon" title="Edit package" aria-label={`Edit ${item.name}`} onClick={() => editPackage(item, selectedService?.id ?? 0)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button asChild variant="destructive" size="icon" title="Delete package">
                            <Link href={`/admin/packages/${item.id}`} method="delete" as="button" preserveScroll aria-label={`Delete ${item.name}`} onBefore={() => confirm("Delete this package?")}>
                              <Trash2 className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visiblePackages.length === 0 && (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No packages for this service yet.
              </div>
            )}
          </CardContent>
        </Card>}
      </div>
    </AdminLayout>
  );
};

export default Services;
