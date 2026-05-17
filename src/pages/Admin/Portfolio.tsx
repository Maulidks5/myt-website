import { FormEvent, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Eye, ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
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
import type { MarketingService, PortfolioProject } from "@/lib/marketing";

const projectsPerPage = 8;

type ProjectForm = {
  marketing_service_id: number;
  title: string;
  client_name: string;
  image: File | null;
  project_url: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

const emptyForm: ProjectForm = {
  marketing_service_id: 0,
  title: "",
  client_name: "",
  image: null,
  project_url: "",
  description: "",
  challenge: "",
  solution: "",
  result: "",
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

type PortfolioProps = {
  projects: PortfolioProject[];
  services: MarketingService[];
};

const Portfolio = ({ projects, services }: PortfolioProps) => {
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [activeService, setActiveService] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm<ProjectForm>(emptyForm);
  const visibleProjects = activeService === "All" ? projects : projects.filter((project) => String(project.marketing_service_id) === activeService);
  const totalPages = Math.max(1, Math.ceil(visibleProjects.length / projectsPerPage));
  const pageStart = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = visibleProjects.slice(pageStart, pageStart + projectsPerPage);
  const pageFrom = visibleProjects.length === 0 ? 0 : pageStart + 1;
  const pageTo = Math.min(pageStart + projectsPerPage, visibleProjects.length);

  const selectService = (serviceId: string) => {
    setActiveService(serviceId);
    setCurrentPage(1);
  };

  const startEdit = (project: PortfolioProject) => {
    setEditing(project);
    setData({
      marketing_service_id: project.marketing_service_id ?? services[0]?.id ?? 0,
      title: project.title,
      client_name: project.client_name ?? "",
      image: null,
      project_url: project.project_url ?? "",
      description: project.description ?? "",
      challenge: project.challenge ?? "",
      solution: project.solution ?? "",
      result: project.result ?? "",
      is_featured: project.is_featured ?? false,
      is_active: project.is_active ?? true,
      sort_order: project.sort_order ?? 0,
    });
    setFormOpen(true);
  };

  const clearForm = () => {
    setEditing(null);
    reset();
    setFormOpen(false);
  };

  const startCreate = () => {
    setEditing(null);
    setData({
      ...emptyForm,
      marketing_service_id: services[0]?.id ?? 0,
    });
    setFormOpen(true);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const options = { preserveScroll: true, onSuccess: clearForm };

    if (editing) {
      post(`/admin/portfolio/${editing.id}`, { ...options, forceFormData: true });
      return;
    }

    post("/admin/portfolio", { ...options, forceFormData: true });
  };

  return (
    <AdminLayout title="Portfolio" description="Manage project cards, case studies, and categories shown on the portfolio page.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/admin/preview/portfolio" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Preview Portfolio
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/preview/home" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Preview Home
          </Link>
        </Button>
        <Button type="button" onClick={startCreate} className="gradient-primary border-0 text-primary-foreground shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <Dialog open={formOpen} onOpenChange={(open) => (open ? setFormOpen(true) : clearForm())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">
              {editing ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription>
              Add a portfolio item and a short case study so clients can review completed work.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marketing_service_id">Related service</Label>
                <select
                  id="marketing_service_id"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={data.marketing_service_id}
                  onChange={(event) => setData("marketing_service_id", Number(event.target.value))}
                  required
                >
                  <option value={0} disabled>Select service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.title}</option>
                  ))}
                </select>
                {errors.marketing_service_id && <p className="text-sm text-destructive">{errors.marketing_service_id}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={data.title} onChange={(event) => setData("title", event.target.value)} required />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                <Label htmlFor="client_name">Client name</Label>
                  <Input id="client_name" value={data.client_name} onChange={(event) => setData("client_name", event.target.value)} placeholder="Zanzibar Coastal Tours" />
                  {errors.client_name && <p className="text-sm text-destructive">{errors.client_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_url">Project URL</Label>
                  <Input id="project_url" type="url" value={data.project_url} onChange={(event) => setData("project_url", event.target.value)} placeholder="https://example.com" />
                  {errors.project_url && <p className="text-sm text-destructive">{errors.project_url}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Project image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setData("image", event.target.files?.[0] ?? null)}
                />
                {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                <p className="text-xs text-muted-foreground">Upload JPG, PNG, or WebP. Maximum size 4MB.</p>
              </div>
              {editing?.image_url && (
                <div className="overflow-hidden rounded-lg border border-border">
                  <img src={editing.image_url} alt="Current project" className="h-32 w-full object-cover" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} value={data.description} onChange={(event) => setData("description", event.target.value)} />
              </div>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="challenge">Challenge</Label>
                  <Textarea id="challenge" rows={3} value={data.challenge} onChange={(event) => setData("challenge", event.target.value)} placeholder="What problem did the client have?" />
                  {errors.challenge && <p className="text-sm text-destructive">{errors.challenge}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea id="solution" rows={3} value={data.solution} onChange={(event) => setData("solution", event.target.value)} placeholder="What did MYT build or improve?" />
                  {errors.solution && <p className="text-sm text-destructive">{errors.solution}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="result">Result</Label>
                  <Textarea id="result" rows={3} value={data.result} onChange={(event) => setData("result", event.target.value)} placeholder="What changed for the client?" />
                  {errors.result && <p className="text-sm text-destructive">{errors.result}</p>}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort order</Label>
                  <Input id="sort_order" type="number" min={0} value={data.sort_order} onChange={(event) => setData("sort_order", Number(event.target.value))} />
                </div>
                <div className="flex items-center gap-2 pt-7">
                  <Checkbox id="is_featured" checked={data.is_featured} onCheckedChange={(checked) => setData("is_featured", checked === true)} />
                  <Label htmlFor="is_featured" className="font-normal">Featured</Label>
                </div>
                <div className="flex items-center gap-2 pt-7">
                  <Checkbox id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData("is_active", checked === true)} />
                  <Label htmlFor="is_active" className="font-normal">Published</Label>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">{editing ? "Update" : "Create"}</Button>
                {editing && <Button type="button" variant="outline" onClick={clearForm}>Cancel</Button>}
              </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6">
        <Card className="shadow-soft">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-xl text-secondary">Project List</CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {pageFrom}-{pageTo} of {visibleProjects.length} projects
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => selectService("All")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                  activeService === "All"
                    ? "gradient-primary border-transparent text-primary-foreground shadow-glow"
                    : "border-border bg-background text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                All Services
              </button>
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => selectService(String(service.id))}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
                    activeService === String(service.id)
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
              <table className="w-full min-w-[980px] text-sm">
                <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Project</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Client</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Order</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {paginatedProjects.map((project) => (
                    <tr key={project.id} className="align-middle hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-20 overflow-hidden rounded-md border border-border bg-muted">
                            {project.image_url ? (
                              <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center" style={{ background: project.gradient }}>
                                <ImageIcon className="h-5 w-5 text-white/80" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-secondary">{project.title}</div>
                            <div className="line-clamp-1 max-w-md text-xs text-muted-foreground">
                              {project.description || "No description yet."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{project.service?.title ?? "No service"}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{project.client_name ?? "Not set"}</td>
                      <td className="px-4 py-3">
                        <span className="text-muted-foreground">{project.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={project.is_active ? "default" : "outline"}>{project.is_active ? "Published" : "Hidden"}</Badge>
                          {project.is_featured && <Badge>Featured</Badge>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{project.sort_order ?? 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" size="icon" title="Edit project" aria-label={`Edit ${project.title}`} onClick={() => startEdit(project)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button asChild variant="destructive" size="icon" title="Delete project">
                            <Link href={`/admin/portfolio/${project.id}`} method="delete" as="button" preserveScroll aria-label={`Delete ${project.title}`} onBefore={() => confirm("Delete this project?")}>
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
            {visibleProjects.length === 0 && (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No projects for this service.
              </div>
            )}
            {visibleProjects.length > projectsPerPage && (
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Portfolio;
