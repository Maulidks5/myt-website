import { FormEvent, useMemo, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Banknote, Eye, EyeOff, KeyRound, Pencil, Plus, Trash2, WalletCards } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type ClientRecord = {
  id: number;
  client_name: string;
  business_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  location: string | null;
  service_type: string;
  project_name: string;
  status: string;
  start_date: string | null;
  deadline: string | null;
  total_price: string | number;
  amount_paid: string | number;
  expenses: string | number;
  balance: number;
  profit: number;
  notes: string | null;
  credential_url: string | null;
  credential_username: string | null;
  credential_password: string | null;
  credential_notes: string | null;
};

type ClientForm = {
  client_name: string;
  business_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  service_type: string;
  project_name: string;
  status: string;
  start_date: string;
  deadline: string;
  total_price: string;
  amount_paid: string;
  expenses: string;
  notes: string;
  credential_url: string;
  credential_username: string;
  credential_password: string;
  credential_notes: string;
};

type ClientsProps = {
  records: ClientRecord[];
  serviceOptions: string[];
  statusOptions: string[];
  summary: {
    clients: number;
    projects: number;
    revenue: number;
    balance: number;
    profit: number;
  };
  serviceSummary: Array<{
    service: string;
    projects: number;
    revenue: number;
    profit: number;
  }>;
};

const emptyForm: ClientForm = {
  client_name: "",
  business_name: "",
  phone: "",
  whatsapp: "",
  email: "",
  location: "",
  service_type: "Website",
  project_name: "",
  status: "New",
  start_date: "",
  deadline: "",
  total_price: "0",
  amount_paid: "0",
  expenses: "0",
  notes: "",
  credential_url: "",
  credential_username: "",
  credential_password: "",
  credential_notes: "",
};

const money = (value: number | string) =>
  new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const statusVariant = (status: string) => {
  if (status === "Completed") return "default";
  if (status === "Cancelled" || status === "Paused") return "outline";
  return "secondary";
};

const credentialServices = new Set(["Website", "System", "Hosting"]);
const hasCredentialAccess = (service: string) => credentialServices.has(service);

const Clients = ({ records, serviceOptions, statusOptions, summary, serviceSummary }: ClientsProps) => {
  const [editing, setEditing] = useState<ClientRecord | null>(null);
  const [selected, setSelected] = useState<ClientRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const { data, setData, post, put, processing, errors, reset } = useForm<ClientForm>(emptyForm);

  const previewBalance = useMemo(() => Math.max(Number(data.total_price || 0) - Number(data.amount_paid || 0), 0), [data.total_price, data.amount_paid]);
  const previewProfit = useMemo(() => Number(data.amount_paid || 0) - Number(data.expenses || 0), [data.amount_paid, data.expenses]);
  const showCredentialFields = hasCredentialAccess(data.service_type);

  const startCreate = () => {
    setEditing(null);
    reset();
    setFormOpen(true);
  };

  const startEdit = (record: ClientRecord) => {
    setEditing(record);
    setData({
      client_name: record.client_name,
      business_name: record.business_name ?? "",
      phone: record.phone ?? "",
      whatsapp: record.whatsapp ?? "",
      email: record.email ?? "",
      location: record.location ?? "",
      service_type: record.service_type,
      project_name: record.project_name,
      status: record.status,
      start_date: record.start_date ?? "",
      deadline: record.deadline ?? "",
      total_price: String(record.total_price ?? 0),
      amount_paid: String(record.amount_paid ?? 0),
      expenses: String(record.expenses ?? 0),
      notes: record.notes ?? "",
      credential_url: record.credential_url ?? "",
      credential_username: record.credential_username ?? "",
      credential_password: record.credential_password ?? "",
      credential_notes: record.credential_notes ?? "",
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
      put(`/admin/clients/${editing.id}`, options);
      return;
    }

    post("/admin/clients", options);
  };

  const openDetails = (record: ClientRecord) => {
    setSelected(record);
    setShowCredentials(false);
  };

  return (
    <AdminLayout title="Clients" description="Track client projects, payments, profit, and project credentials in one simple place.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button type="button" onClick={startCreate} className="gradient-primary border-0 text-primary-foreground shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add Client Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Clients", value: summary.clients, helper: `${summary.projects} projects`, icon: WalletCards },
          { label: "Revenue", value: money(summary.revenue), helper: "paid amount", icon: Banknote },
          { label: "Balance", value: money(summary.balance), helper: "unpaid amount", icon: Banknote },
          { label: "Profit", value: money(summary.profit), helper: "paid minus expenses", icon: Banknote },
          { label: "Services", value: serviceSummary.length, helper: "tracked categories", icon: WalletCards },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className="shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="truncate text-2xl font-bold text-secondary">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.helper}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {serviceSummary.length > 0 && (
        <Card className="mt-6 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {serviceSummary.map((item) => (
                <div key={item.service} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-secondary">{item.service}</div>
                    <Badge variant="outline">{item.projects} projects</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Revenue</div>
                      <div className="font-semibold text-secondary">{money(item.revenue)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Profit</div>
                      <div className="font-semibold text-secondary">{money(item.profit)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={formOpen} onOpenChange={(open) => (open ? setFormOpen(true) : clearForm())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">{editing ? "Edit Client Project" : "Add Client Project"}</DialogTitle>
            <DialogDescription>Keep the form simple: client details, project status, money, and credentials.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-6">
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-4 font-display text-lg font-bold text-secondary">Client Info</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Client name</Label>
                  <Input id="client_name" value={data.client_name} onChange={(event) => setData("client_name", event.target.value)} required />
                  {errors.client_name && <p className="text-sm text-destructive">{errors.client_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_name">Business name</Label>
                  <Input id="business_name" value={data.business_name} onChange={(event) => setData("business_name", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={data.phone} onChange={(event) => setData("phone", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" value={data.whatsapp} onChange={(event) => setData("whatsapp", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={data.email} onChange={(event) => setData("email", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={data.location} onChange={(event) => setData("location", event.target.value)} />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-4 font-display text-lg font-bold text-secondary">Project & Money</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="project_name">Project name</Label>
                  <Input id="project_name" value={data.project_name} onChange={(event) => setData("project_name", event.target.value)} required />
                  {errors.project_name && <p className="text-sm text-destructive">{errors.project_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_type">Service</Label>
                  <select id="service_type" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={data.service_type} onChange={(event) => setData("service_type", event.target.value)}>
                    {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select id="status" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={data.status} onChange={(event) => setData("status", event.target.value)}>
                    {statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start date</Label>
                  <Input id="start_date" type="date" value={data.start_date} onChange={(event) => setData("start_date", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" value={data.deadline} onChange={(event) => setData("deadline", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_price">Total price</Label>
                  <Input id="total_price" type="number" min={0} value={data.total_price} onChange={(event) => setData("total_price", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount_paid">Paid</Label>
                  <Input id="amount_paid" type="number" min={0} value={data.amount_paid} onChange={(event) => setData("amount_paid", event.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenses">Expenses</Label>
                  <Input id="expenses" type="number" min={0} value={data.expenses} onChange={(event) => setData("expenses", event.target.value)} />
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Balance</div>
                  <div className="font-display text-xl font-bold text-secondary">{money(previewBalance)}</div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Profit</div>
                  <div className="font-display text-xl font-bold text-secondary">{money(previewProfit)}</div>
                </div>
              </div>
            </div>

            {showCredentialFields && (
              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-4 font-display text-lg font-bold text-secondary">Credentials</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="credential_url">Login URL</Label>
                    <Input id="credential_url" type="url" value={data.credential_url} onChange={(event) => setData("credential_url", event.target.value)} placeholder="https://example.com/cpanel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credential_username">Username</Label>
                    <Input id="credential_username" value={data.credential_username} onChange={(event) => setData("credential_username", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credential_password">Password</Label>
                    <Input id="credential_password" value={data.credential_password} onChange={(event) => setData("credential_password", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credential_notes">Credential notes</Label>
                    <Input id="credential_notes" value={data.credential_notes} onChange={(event) => setData("credential_notes", event.target.value)} placeholder="cPanel, domain, system admin..." />
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Credential details are shown only to users with MYT Office access.</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Project notes</Label>
              <Textarea id="notes" rows={4} value={data.notes} onChange={(event) => setData("notes", event.target.value)} />
            </div>

            <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              {editing ? "Update Record" : "Save Record"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="mt-6 shadow-soft">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl text-secondary">Client Projects</CardTitle>
          <div className="text-sm text-muted-foreground">{records.length} records</div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[1080px] text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Paid</th>
                  <th className="px-4 py-3 font-semibold">Balance</th>
                  <th className="px-4 py-3 font-semibold">Profit</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {records.map((record) => (
                  <tr key={record.id} className="align-middle hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-secondary">{record.client_name}</div>
                      <div className="text-xs text-muted-foreground">{record.business_name || record.phone || record.email || "No contact details"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-secondary">{record.project_name}</div>
                      <div className="text-xs text-muted-foreground">{record.deadline ? `Due ${record.deadline}` : "No deadline"}</div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline">{record.service_type}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(record.status)}>{record.status}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{money(record.total_price)}</td>
                    <td className="px-4 py-3 font-semibold text-secondary">{money(record.amount_paid)}</td>
                    <td className="px-4 py-3 font-semibold text-secondary">{money(record.balance)}</td>
                    <td className="px-4 py-3 font-semibold text-secondary">{money(record.profit)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" size="icon" title="View details" aria-label={`View ${record.project_name}`} onClick={() => openDetails(record)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="outline" size="icon" title="Edit record" aria-label={`Edit ${record.project_name}`} onClick={() => startEdit(record)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button asChild variant="destructive" size="icon" title="Delete record">
                          <Link href={`/admin/clients/${record.id}`} method="delete" as="button" preserveScroll aria-label={`Delete ${record.project_name}`} onBefore={() => confirm("Delete this client project?")}>
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

          {records.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No client projects yet. Add your first record to start tracking work and payments.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-extrabold text-secondary">{selected.project_name}</DialogTitle>
                <DialogDescription>{selected.client_name}{selected.business_name ? ` - ${selected.business_name}` : ""}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Total</div>
                  <div className="mt-1 font-semibold text-secondary">{money(selected.total_price)}</div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Balance</div>
                  <div className="mt-1 font-semibold text-secondary">{money(selected.balance)}</div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Profit</div>
                  <div className="mt-1 font-semibold text-secondary">{money(selected.profit)}</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border p-4">
                  <div className="font-display font-bold text-secondary">Client Info</div>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div>Phone: {selected.phone || "Not set"}</div>
                    <div>WhatsApp: {selected.whatsapp || "Not set"}</div>
                    <div>Email: {selected.email || "Not set"}</div>
                    <div>Location: {selected.location || "Not set"}</div>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="font-display font-bold text-secondary">Project Info</div>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div>Service: {selected.service_type}</div>
                    <div>Status: {selected.status}</div>
                    <div>Start: {selected.start_date || "Not set"}</div>
                    <div>Deadline: {selected.deadline || "Not set"}</div>
                  </div>
                </div>
              </div>

              {hasCredentialAccess(selected.service_type) && (
                <div className="rounded-lg border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-display font-bold text-secondary">
                      <KeyRound className="h-4 w-4 text-primary" />
                      Credentials
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowCredentials((value) => !value)}>
                      {showCredentials ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                      {showCredentials ? "Hide" : "Show"}
                    </Button>
                  </div>
                  {showCredentials ? (
                    <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Login URL</div>
                        <div className="break-all font-semibold text-secondary">{selected.credential_url || "Not set"}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Username</div>
                        <div className="break-all font-semibold text-secondary">{selected.credential_username || "Not set"}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Password</div>
                        <div className="break-all font-semibold text-secondary">{selected.credential_password || "Not set"}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Notes</div>
                        <div className="break-all font-semibold text-secondary">{selected.credential_notes || "Not set"}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                      Credentials are hidden. Use Show only when you need to view login details.
                    </div>
                  )}
                </div>
              )}

              {selected.notes && (
                <div className="rounded-lg border border-border p-4">
                  <div className="font-display font-bold text-secondary">Notes</div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{selected.notes}</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Clients;
