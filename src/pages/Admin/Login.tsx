import { FormEvent } from "react";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Lock, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const { data, setData, post, processing, errors } = useForm<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    post("/admin/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-md">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to website
        </Link>

        <Card className="border-border/70 shadow-soft">
          <CardHeader className="space-y-5 text-center">
            <img
              src="/images/mwambao.png"
              alt="Mwambao Youth Technology"
              className="mx-auto h-20 w-auto object-contain"
            />
            <div>
              <CardTitle className="font-display text-2xl font-extrabold text-secondary">Admin Login</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your website.</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(event) => setData("email", event.target.value)}
                    className="pl-9"
                    placeholder="admin@myt.co.tz"
                    required
                    autoFocus
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(event) => setData("password", event.target.value)}
                    className="pl-9"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={data.remember}
                  onCheckedChange={(checked) => setData("remember", checked === true)}
                />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Remember me
                </Label>
              </div>

              <Button type="submit" disabled={processing} className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                {processing ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Login;
