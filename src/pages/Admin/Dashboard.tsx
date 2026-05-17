import { Link } from "@inertiajs/react";
import { ContactRound, HelpCircle, Inbox, Mail, MessageSquareQuote } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type LatestMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  created_at: string | null;
};

type DashboardProps = {
  stats: {
    messages: number;
    unreadMessages: number;
    clients: number;
    clientProjects: number;
    testimonials: number;
    faqs: number;
  };
  latestMessages: LatestMessage[];
};

const Dashboard = ({ stats, latestMessages }: DashboardProps) => (
  <AdminLayout title="Dashboard" description="Overview of website inquiries, testimonials, and content activity.">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[
        { label: "Leads", value: stats.messages, helper: `${stats.unreadMessages} unread`, icon: Inbox },
        { label: "Clients", value: stats.clients, helper: `${stats.clientProjects} projects`, icon: ContactRound },
        { label: "Testimonials", value: stats.testimonials, helper: "client feedback", icon: MessageSquareQuote },
        { label: "FAQ", value: stats.faqs, helper: "live questions", icon: HelpCircle },
        { label: "Follow-up", value: stats.unreadMessages, helper: "need response", icon: Mail },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.label} className="border-border bg-card shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.helper}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>

    <Card className="mt-6 border-border shadow-soft">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-xl text-secondary">Latest Inquiries</CardTitle>
        <Button asChild variant="outline">
          <Link href="/admin/messages">View All Leads</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {latestMessages.length > 0 ? (
          <div className="divide-y divide-border">
            {latestMessages.map((message) => (
              <div key={message.id} className="flex flex-col gap-1 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-secondary">{message.name}</div>
                  <div className="text-sm text-muted-foreground">{message.subject ?? "No subject"}</div>
                </div>
                <div className="text-sm text-muted-foreground">{message.created_at}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No inquiries yet.
          </div>
        )}
      </CardContent>
    </Card>
  </AdminLayout>
);

export default Dashboard;
