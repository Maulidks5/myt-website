import { Link } from "@inertiajs/react";
import { useState } from "react";
import { CheckCircle2, Eye, Inbox, Mail, MapPin, Phone, Trash2 } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  service_name: string | null;
  package_name: string | null;
  budget_range: string | null;
  timeline: string | null;
  message: string;
  is_read: boolean;
  created_at: string | null;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type PaginatedMessages = {
  data: ContactMessage[];
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  per_page: number;
  to: number | null;
  total: number;
};

type MessagesProps = {
  messages: PaginatedMessages;
  unreadCount: number;
};

const cleanLabel = (label: string) => label.replace("&laquo;", "Previous").replace("&raquo;", "Next");

const Messages = ({ messages, unreadCount }: MessagesProps) => {
  const latestMessage = messages.data[0];
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  return (
    <AdminLayout title="Leads" description="Customer inquiries submitted through the website contact form.">
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Inbox className="h-4 w-4 text-primary" />
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{messages.total}</div>
              <div className="text-sm text-muted-foreground">{unreadCount} unread</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                Latest Lead
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="truncate text-lg font-bold text-secondary">{latestMessage?.name ?? "No leads yet"}</div>
              <div className="truncate text-sm text-muted-foreground">{latestMessage?.email ?? "Waiting for the first inquiry"}</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Business Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-secondary">Kariakoo, Zanzibar</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                +255 657 963 896
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl text-secondary">Inbox</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing {messages.from ?? 0}-{messages.to ?? 0} of {messages.total}
              </p>
            </div>
            <Badge variant="outline">Page {messages.current_page} of {messages.last_page}</Badge>
          </CardHeader>
          <CardContent>
            {messages.data.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Service / Package</TableHead>
                      <TableHead>Budget / Timeline</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.data.map((message) => (
                      <TableRow key={message.id} className={message.is_read ? "" : "bg-accent/35"}>
                        <TableCell>
                          <div className="font-semibold text-secondary">{message.name}</div>
                          <div className="text-xs text-muted-foreground">#{message.id}</div>
                        </TableCell>
                        <TableCell>
                          <a href={`mailto:${message.email}`} className="block font-medium text-primary hover:underline">
                            {message.email}
                          </a>
                          {message.phone && (
                            <a href={`tel:${message.phone}`} className="block text-sm text-muted-foreground hover:text-primary">
                              {message.phone}
                            </a>
                          )}
                        </TableCell>
                        <TableCell className="max-w-44">
                          <span className="line-clamp-2">{message.subject || "No subject"}</span>
                        </TableCell>
                        <TableCell className="max-w-56">
                          {message.service_name || message.package_name ? (
                            <div className="space-y-1">
                              {message.service_name && <div className="text-sm font-semibold text-secondary">{message.service_name}</div>}
                              {message.package_name && <Badge variant="outline">{message.package_name}</Badge>}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">General inquiry</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-52">
                          <div className="space-y-1 text-sm">
                            <div className="font-semibold text-secondary">{message.budget_range || "Budget not set"}</div>
                            <div className="text-muted-foreground">{message.timeline || "Timeline not set"}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="line-clamp-3 text-sm text-muted-foreground">{message.message}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant={message.is_read ? "outline" : "default"}>
                            {message.is_read ? "Read" : "Unread"}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right text-sm text-muted-foreground">
                          {message.created_at}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              title="View details"
                              aria-label={`View message from ${message.name}`}
                              onClick={() => setSelectedMessage(message)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {!message.is_read && (
                              <Button asChild size="icon" variant="outline" title="Mark as read">
                                <Link href={`/admin/messages/${message.id}/read`} method="patch" as="button" preserveScroll aria-label={`Mark message from ${message.name} as read`}>
                                  <CheckCircle2 className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            <Button asChild size="icon" variant="destructive" title="Delete message">
                              <Link
                                href={`/admin/messages/${message.id}`}
                                method="delete"
                                as="button"
                                preserveScroll
                                aria-label={`Delete message from ${message.name}`}
                                onBefore={() => confirm("Delete this message?")}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
                  {messages.links.map((link) => (
                    <Button
                      key={`${link.label}-${link.url}`}
                      asChild={Boolean(link.url)}
                      disabled={!link.url}
                      variant={link.active ? "default" : "outline"}
                      size="sm"
                      className={link.active ? "gradient-primary border-0 text-primary-foreground" : ""}
                    >
                      {link.url ? <Link href={link.url}>{cleanLabel(link.label)}</Link> : <span>{cleanLabel(link.label)}</span>}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border text-center">
                <Inbox className="mb-4 h-10 w-10 text-primary" />
                <h2 className="font-display text-xl font-bold text-secondary">No leads yet</h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  When a visitor submits the contact form, their inquiry will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={Boolean(selectedMessage)} onOpenChange={(open) => !open && setSelectedMessage(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-extrabold text-secondary">{selectedMessage.name}</DialogTitle>
                  <DialogDescription>{selectedMessage.subject || "No subject"}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                    <a href={`mailto:${selectedMessage.email}`} className="mt-1 block font-semibold text-primary hover:underline">{selectedMessage.email}</a>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                    <div className="mt-1 font-semibold text-secondary">{selectedMessage.phone || "Not provided"}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Service</div>
                    <div className="mt-1 font-semibold text-secondary">{selectedMessage.service_name || "General inquiry"}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Package</div>
                    <div className="mt-1 font-semibold text-secondary">{selectedMessage.package_name || "Not selected"}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Budget</div>
                    <div className="mt-1 font-semibold text-secondary">{selectedMessage.budget_range || "Not selected"}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Timeline</div>
                    <div className="mt-1 font-semibold text-secondary">{selectedMessage.timeline || "Not selected"}</div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Message</div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">{selectedMessage.message}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge variant={selectedMessage.is_read ? "outline" : "default"}>{selectedMessage.is_read ? "Read" : "Unread"}</Badge>
                  <div className="text-sm text-muted-foreground">{selectedMessage.created_at}</div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </AdminLayout>
  );
};

export default Messages;
