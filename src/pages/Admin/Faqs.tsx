import { FormEvent, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
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

type FaqRecord = {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
};

type FaqForm = Omit<FaqRecord, "id">;

const emptyForm: FaqForm = {
  question: "",
  answer: "",
  is_active: true,
  sort_order: 0,
};

const Faqs = ({ faqs }: { faqs: FaqRecord[] }) => {
  const [editing, setEditing] = useState<FaqRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { data, setData, post, put, processing, errors, reset } = useForm<FaqForm>(emptyForm);

  const startCreate = () => {
    setEditing(null);
    reset();
    setFormOpen(true);
  };

  const startEdit = (faq: FaqRecord) => {
    setEditing(faq);
    setData({
      question: faq.question,
      answer: faq.answer,
      is_active: faq.is_active,
      sort_order: faq.sort_order,
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
      put(`/admin/faqs/${editing.id}`, options);
      return;
    }

    post("/admin/faqs", options);
  };

  return (
    <AdminLayout title="FAQ" description="Manage questions and answers shown on the public website.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button type="button" onClick={startCreate} className="gradient-primary border-0 text-primary-foreground shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      <Dialog open={formOpen} onOpenChange={(open) => (open ? setFormOpen(true) : clearForm())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">{editing ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            <DialogDescription>Create helpful answers for common client questions.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input id="question" value={data.question} onChange={(event) => setData("question", event.target.value)} required />
              {errors.question && <p className="text-sm text-destructive">{errors.question}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea id="answer" rows={7} value={data.answer} onChange={(event) => setData("answer", event.target.value)} required />
              {errors.answer && <p className="text-sm text-destructive">{errors.answer}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort order</Label>
                <Input id="sort_order" type="number" min={0} value={data.sort_order} onChange={(event) => setData("sort_order", Number(event.target.value))} />
              </div>
              <div className="flex items-center gap-2 pt-7">
                <Checkbox id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData("is_active", checked === true)} />
                <Label htmlFor="is_active" className="font-normal">Published</Label>
              </div>
            </div>
            <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              {editing ? "Update FAQ" : "Create FAQ"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="shadow-soft">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl text-secondary">FAQ List</CardTitle>
          <div className="text-sm text-muted-foreground">{faqs.length} questions</div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Question</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="align-middle hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-secondary">{faq.question}</div>
                      <div className="line-clamp-1 max-w-2xl text-xs text-muted-foreground">{faq.answer}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={faq.is_active ? "default" : "outline"}>{faq.is_active ? "Published" : "Hidden"}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{faq.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" size="icon" title="Edit FAQ" aria-label={`Edit ${faq.question}`} onClick={() => startEdit(faq)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button asChild variant="destructive" size="icon" title="Delete FAQ">
                          <Link href={`/admin/faqs/${faq.id}`} method="delete" as="button" preserveScroll aria-label={`Delete ${faq.question}`} onBefore={() => confirm("Delete this FAQ?")}>
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

export default Faqs;
