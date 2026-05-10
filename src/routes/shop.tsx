import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRODUCTS, getProduct } from "@/lib/product";
import { Minus, Plus, Check, Truck, Banknote, Landmark } from "lucide-react";

const shopSearchSchema = z.object({
  product: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  validateSearch: shopSearchSchema,
  head: () => ({ meta: [{ title: "Order SipMate — Portable Tea Maker & Cool Flask" }] }),
});

const orderSchema = z.object({
  full_name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  address_line1: z.string().trim().min(1).max(200),
  address_line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(100),
  postal_code: z.string().trim().min(1).max(20),
  country: z.string().trim().min(1).max(100),
});

function ShopPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const product = getProduct(search.product ?? "sipmate-tea");
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [defaults, setDefaults] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState<"cod" | "bank">("cod");

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setDefaults({
        full_name: data.full_name ?? "",
        phone: data.phone ?? "",
        address_line1: data.address_line1 ?? "",
        address_line2: data.address_line2 ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        postal_code: data.postal_code ?? "",
        country: data.country ?? "",
      });
    });
  }, [user]);

  const total = product.price * qty;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd) as Record<string, string>;
    const parsed = orderSchema.safeParse(raw);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setSubmitting(true);

    await supabase.from("profiles").upsert({ id: user.id, ...parsed.data });

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      product_id: product.id,
      quantity: qty,
      total_amount: total,
      ...parsed.data,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success(payment === "cod" ? "Order placed! Pay cash on delivery." : "Order placed! We'll share bank details shortly.");
    navigate({ to: "/orders" });
  };

  if (authLoading || !user) {
    return <div className="min-h-screen bg-background"><Navbar /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>

        {/* Product picker (shown when there are multiple products) */}
        {PRODUCTS.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <Link
                key={p.id}
                to="/shop"
                search={{ product: p.id }}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  p.id === product.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                {p.name}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Product */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-warm)] p-6 shadow-[var(--shadow-card)]">
              <img src={product.image} alt={product.name} width={1280} height={1280} className="mx-auto w-full max-w-sm rounded-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <p className="mt-2 text-muted-foreground">{product.tagline}</p>
              <div className="mt-4 text-3xl font-semibold text-primary">Rs {product.price}</div>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {product.features.map(b => (
                  <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{b}</li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Free delivery across Pakistan</div>
                  <div className="text-muted-foreground">Ships in 2–4 business days. No hidden fees.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order form */}
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div>
              <h2 className="text-xl font-semibold">Place your order</h2>
              <p className="text-sm text-muted-foreground">Shipping address & contact details</p>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center gap-2">
                <Button type="button" size="icon" variant="outline" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <Button type="button" size="icon" variant="outline" onClick={() => setQty(q => Math.min(10, q + 1))}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label htmlFor="full_name">Full name</Label><Input id="full_name" name="full_name" defaultValue={defaults.full_name} required /></div>
              <div className="sm:col-span-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" defaultValue={defaults.phone} required /></div>
              <div className="sm:col-span-2"><Label htmlFor="address_line1">Address line 1</Label><Input id="address_line1" name="address_line1" defaultValue={defaults.address_line1} required /></div>
              <div className="sm:col-span-2"><Label htmlFor="address_line2">Address line 2 (optional)</Label><Input id="address_line2" name="address_line2" defaultValue={defaults.address_line2} /></div>
              <div><Label htmlFor="city">City</Label><Input id="city" name="city" defaultValue={defaults.city} required /></div>
              <div><Label htmlFor="state">State / Region</Label><Input id="state" name="state" defaultValue={defaults.state} required /></div>
              <div><Label htmlFor="postal_code">Postal code</Label><Input id="postal_code" name="postal_code" defaultValue={defaults.postal_code} required /></div>
              <div><Label htmlFor="country">Country</Label><Input id="country" name="country" defaultValue={defaults.country} required /></div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-semibold">Rs {total}</span>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Payment method</h3>
                <p className="text-xs text-muted-foreground">Choose how you'd like to pay</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPayment("cod")}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                    payment === "cod"
                      ? "border-primary bg-primary/10 ring-2 ring-primary/40"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <Banknote className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Cash on Delivery</div>
                    <div className="text-xs text-muted-foreground">Pay in cash when your order arrives.</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPayment("bank")}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                    payment === "bank"
                      ? "border-primary bg-primary/10 ring-2 ring-primary/40"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <Landmark className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Bank Transfer</div>
                    <div className="text-xs text-muted-foreground">We'll share account details after order confirmation.</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className="font-medium text-primary">FREE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-2xl font-semibold">Rs {total}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Placing order…" : `Place order — Rs ${total}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
