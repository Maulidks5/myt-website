import { FormEvent, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Pencil, Plus, Trash2, UserCog } from "lucide-react";
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
import type { SharedPageProps } from "@/lib/site";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  can_access_client_dashboard: boolean;
  permissions: string[];
  created_at: string | null;
};

type UserForm = {
  name: string;
  email: string;
  is_active: boolean;
  permissions: string[];
  password: string;
  password_confirmation: string;
};

const emptyForm: UserForm = {
  name: "",
  email: "",
  is_active: true,
  permissions: ["dashboard.view"],
  password: "",
  password_confirmation: "",
};

const Users = ({ users, availablePermissions }: { users: AdminUser[]; availablePermissions: Record<string, string> }) => {
  const { props } = usePage<SharedPageProps>();
  const currentUser = props.auth?.user;
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { data, setData, post, put, processing, errors, reset } = useForm<UserForm>(emptyForm);

  const startCreate = () => {
    setEditing(null);
    reset();
    setFormOpen(true);
  };

  const startEdit = (user: AdminUser) => {
    setEditing(user);
    setData({
      name: user.name,
      email: user.email,
      is_active: user.is_active,
      permissions: user.permissions ?? [],
      password: "",
      password_confirmation: "",
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
      put(`/admin/users/${editing.id}`, options);
      return;
    }

    post("/admin/users", options);
  };

  const togglePermission = (permission: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...data.permissions, permission]))
      : data.permissions.filter((item) => item !== permission);

    setData("permissions", next);
  };

  return (
    <AdminLayout title="Users" description="Manage admin accounts and section access.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button type="button" onClick={startCreate} className="gradient-primary border-0 text-primary-foreground shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Dialog open={formOpen} onOpenChange={(open) => (open ? setFormOpen(true) : clearForm())}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold text-secondary">{editing ? "Edit User" : "Add User"}</DialogTitle>
            <DialogDescription>
              Tick only the sections this account should open and manage.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={data.name} onChange={(event) => setData("name", event.target.value)} required />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={data.email} onChange={(event) => setData("email", event.target.value)} required />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData("is_active", checked === true)} />
                <Label htmlFor="is_active" className="font-normal">Active account</Label>
              </div>
              {errors.is_active && <p className="text-sm text-destructive">{errors.is_active}</p>}
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-3">
                <h3 className="font-display text-base font-extrabold text-secondary">Access Permissions</h3>
                <p className="text-sm text-muted-foreground">Tick the admin sections this user can open and manage.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(availablePermissions).map(([permission, label]) => (
                  <label key={permission} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-sm">
                    <Checkbox
                      checked={data.permissions.includes(permission)}
                      disabled={permission === "dashboard.view"}
                      onCheckedChange={(checked) => togglePermission(permission, checked === true)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              {errors.permissions && <p className="mt-2 text-sm text-destructive">{errors.permissions}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">{editing ? "New password" : "Password"}</Label>
                <Input id="password" type="password" value={data.password} onChange={(event) => setData("password", event.target.value)} required={!editing} />
                {editing && <p className="text-xs text-muted-foreground">Leave empty to keep the current password.</p>}
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(event) => setData("password_confirmation", event.target.value)} required={!editing || Boolean(data.password)} />
              </div>
            </div>
            <Button type="submit" disabled={processing} className="gradient-primary border-0 text-primary-foreground shadow-glow">
              {editing ? "Update User" : "Create User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="shadow-soft">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle className="flex items-center gap-2 text-xl text-secondary">
            <UserCog className="h-5 w-5 text-primary" />
            Admin Users
          </CardTitle>
          <div className="text-sm text-muted-foreground">{users.length} users</div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Access</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {users.map((user) => {
                  const isSelf = currentUser?.id === user.id;

                  return (
                    <tr key={user.id} className="align-middle hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-secondary">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex max-w-sm flex-wrap gap-1.5">
                          {user.permissions?.length ? (
                            user.permissions.slice(0, 3).map((permission) => (
                              <Badge key={permission} variant={permission === "clients.manage" ? "default" : "outline"}>
                                {availablePermissions[permission] ?? permission}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline">No access</Badge>
                          )}
                          {user.permissions?.length > 3 && (
                            <Badge variant="outline">+{user.permissions.length - 3}</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={user.is_active ? "default" : "outline"}>{user.is_active ? "Active" : "Disabled"}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{user.created_at}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" size="icon" title="Edit user" aria-label={`Edit ${user.name}`} onClick={() => startEdit(user)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button asChild variant="destructive" size="icon" title={isSelf ? "You cannot delete your own account" : "Delete user"} disabled={isSelf}>
                            <Link href={`/admin/users/${user.id}`} method="delete" as="button" preserveScroll aria-label={`Delete ${user.name}`} onBefore={() => !isSelf && confirm("Delete this user?")}>
                              <Trash2 className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Users;
