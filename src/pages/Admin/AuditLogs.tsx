import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { History } from "lucide-react";

type AuditLog = {
  id: number;
  user: { name: string; email: string } | null;
  action: string;
  module: string;
  description: string | null;
  ip_address: string | null;
  created_at: string | null;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type PaginatedLogs = {
  data: AuditLog[];
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  to: number | null;
  total: number;
};

const cleanLabel = (label: string) => label.replace("&laquo;", "Previous").replace("&raquo;", "Next");

const actionVariant = (action: string) => {
  if (action === "delete") return "destructive";
  if (action === "create") return "default";
  return "outline";
};

const AuditLogs = ({ logs }: { logs: PaginatedLogs }) => (
  <AdminLayout title="Activity Logs" description="Review who changed important records in the admin panel.">
    <Card className="shadow-soft">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CardTitle className="flex items-center gap-2 text-xl text-secondary">
          <History className="h-5 w-5 text-primary" />
          Audit Trail
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Showing {logs.from ?? 0}-{logs.to ?? 0} of {logs.total}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[920px] text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Action</th>
                <th className="px-4 py-3 font-semibold">Module</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {logs.data.map((log) => (
                <tr key={log.id} className="align-middle hover:bg-muted/30">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{log.created_at}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-secondary">{log.user?.name ?? "System"}</div>
                    <div className="text-xs text-muted-foreground">{log.user?.email ?? "No user"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={actionVariant(log.action)}>{log.action}</Badge>
                  </td>
                  <td className="px-4 py-3"><Badge variant="outline">{log.module}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{log.description ?? "No description"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{log.ip_address ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.data.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No activity logs yet.
          </div>
        )}

        {logs.last_page > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
            {logs.links.map((link) => (
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
        )}
      </CardContent>
    </Card>
  </AdminLayout>
);

export default AuditLogs;
