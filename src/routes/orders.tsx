import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
  head: () => ({ meta: [{ title: "My Orders — SipMate" }] }),
});

interface Order {
  id: string;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
  city: string;
  country: string;
}

function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("id,quantity,total_amount,status,created_at,city,country")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setOrders((data ?? []) as Order[]); setLoading(false); });
  }, [user]);

  if (authLoading || !user) return <div className="min-h-screen bg-background"><Navbar /></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold">My orders</h1>
        <p className="mt-1 text-muted-foreground">Track your SipMate orders.</p>

        <div className="mt-8 space-y-3">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
              <Button asChild className="mt-4"><Link to="/shop">Order SipMate</Link></Button>
            </div>
          ) : (
            orders.map(o => (
              <div key={o.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div>
                  <div className="font-medium">Order #{o.id.slice(0, 8)}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString()} • {o.quantity} × SipMate • {o.city}, {o.country}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">${Number(o.total_amount).toFixed(2)}</div>
                  <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">{o.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
