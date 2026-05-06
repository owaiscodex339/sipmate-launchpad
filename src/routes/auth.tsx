import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — SipMate" }] }),
});

const emailSchema = z.string().email().max(255);
const passwordSchema = z.string().min(6).max(72);
const nameSchema = z.string().trim().min(1).max(100);

function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/shop" });
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parse = z.object({
      full_name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
    }).safeParse(Object.fromEntries(fd));
    if (!parse.success) { toast.error(parse.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parse.data.email,
      password: parse.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/shop`,
        data: { full_name: parse.data.full_name },
      },
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Account created!"); navigate({ to: "/shop" }); }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parse = z.object({ email: emailSchema, password: passwordSchema }).safeParse(Object.fromEntries(fd));
    if (!parse.success) { toast.error(parse.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parse.data);
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Welcome back!"); navigate({ to: "/shop" }); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16">
        <Link to="/" className="mb-6 text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <h1 className="text-2xl font-semibold">Welcome to SipMate</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to place your order.</p>

          <Tabs defaultValue="signin" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="mt-4 space-y-4">
                <div><Label htmlFor="si-email">Email</Label><Input id="si-email" name="email" type="email" required /></div>
                <div><Label htmlFor="si-pw">Password</Label><Input id="si-pw" name="password" type="password" required /></div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="mt-4 space-y-4">
                <div><Label htmlFor="su-name">Full name</Label><Input id="su-name" name="full_name" required /></div>
                <div><Label htmlFor="su-email">Email</Label><Input id="su-email" name="email" type="email" required /></div>
                <div><Label htmlFor="su-pw">Password</Label><Input id="su-pw" name="password" type="password" required minLength={6} /></div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
