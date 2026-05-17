import { FormEvent, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Eye, Pencil, Plus, Star, Trash2 } from "lucide-react";
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

type TestimonialRecord = {
  id: number;
  name: string;
  company: string;
  service: string;
  rating: number;
  comment: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

type TestimonialForm = Omit<TestimonialRecord, "id">;

const emptyForm: TestimonialForm = {
  name: "",
  company: "",
  service: "",
  rating: 5,
  comment: "",
  is_featured: false,
  is_active: true,
  sort_order: 0,
};

const Testimonials = ({ testimonials }: { testimonials: TestimonialRecord[] }) => {
  const [editing, setEditing] = useState<TestimonialRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { data, setData, post, put, processing, errors, reset } = useForm<TestimonialForm>(emptyForm);

  const startCreate = () => {
    setEditing(null);
    reset();
    setFormOpen(true);
  };

  const startEdit = (testimonial: TestimonialRecord) => {
    setEditing(testimonial);
    setData({
      name: testimonial.name,
      company: testimonial.company,
      service: testimonial.service,
      rating: testimonial.rating,
      comment: testimonial.comment,
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active,
      sort_order: testimonial.sort_order,
    });
    setFormOpen(true);
  };

  const clearForm = () => {
    setEditing(null);
    reset();
    setFormOpen(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const options = { preserveScroll: true, onSuccess: clearForm };

    if (editing) {
      put(`/admin/testimonials/${editing.id}`, options);
      return;
    }

    post("/admin/testimonials", options);
  };

  return (
    <AdminLayout title="Testimonials" description="Review, publish, feature, or hide client testimonials.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/admin/preview/home" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Preview Home
          </Link>
        </Button>
        <Button type="button" onClick={startCreate} className="gradient-primary border-0 text-primary-foreground shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Dialog open={formOpen} onOpenChange={(open) => (open ? setFormOpen(true) : clearForm())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            <DialogDescription>Approve client feedback and control whether it appears on the website.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
              <Label htmlFor="name">Client name</Label>
                <Input id="name" value={data.name} onChange={(event) => setData("name", event.target.value)} required />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={data.company} onChange={(event) => setData("company", event.target.value)} required />
                {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Input id="service" value={data.service} onChange={(event) => setData("service", event.target.value)} required />
                {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input id="rating" type="number" min={1} max={5} value={data.rating} onChange={(event) => setData("rating", Number(event.target.value))} required />
                {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" rows={5} value={data.comment} onChange={(event) => setData("comment", event.target.value)} required />
              {errors.comment && <p className="text-sm text-destructive">{errors.comment}</p>}
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
            <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              {editing ? "Update Testimonial" : "Create Testimonial"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="shadow-soft">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl text-secondary">Testimonial List</CardTitle>
          <div className="text-sm text-muted-foreground">{testimonials.length} testimonials</div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Rating</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="align-middle hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-secondary">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                      <div className="line-clamp-1 max-w-md text-xs text-muted-foreground">{testimonial.comment}</div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline">{testimonial.service}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 text-primary">
                        {Array.from({ length: testimonial.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={testimonial.is_active ? "default" : "outline"}>{testimonial.is_active ? "Published" : "Hidden"}</Badge>
                        {testimonial.is_featured && <Badge>Featured</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{testimonial.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" size="icon" title="Edit testimonial" aria-label={`Edit ${testimonial.name}`} onClick={() => startEdit(testimonial)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button asChild variant="destructive" size="icon" title="Delete testimonial">
                          <Link href={`/admin/testimonials/${testimonial.id}`} method="delete" as="button" preserveScroll aria-label={`Delete ${testimonial.name}`} onBefore={() => confirm("Delete this testimonial?")}>
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
      </Card>
    </AdminLayout>
  );
};

export default Testimonials;
