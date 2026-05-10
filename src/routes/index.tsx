import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Battery, Droplets, Leaf, Coffee, Plane, ShieldCheck, Zap, Recycle } from "lucide-react";
import productImg from "@/assets/sipmate-2in1.jpeg";
import { PRODUCTS } from "@/lib/product";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "SipMate — Blend. Brew. Sip. Go." },
      { name: "description", content: "The 2-in-1 portable tea maker and juicer blender. Brew hot tea or blend fresh juice anywhere — USB-C rechargeable, travel-friendly." },
    ],
  }),
});

const pillars = [
  { icon: Leaf, title: "BLEND", desc: "Fresh juice, smoothies & shakes." },
  { icon: Coffee, title: "BREW", desc: "Hot tea, anytime, anywhere." },
  { icon: Droplets, title: "CHILL", desc: "Stays cold for refreshing sips." },
  { icon: Plane, title: "GO", desc: "Compact, travel-friendly design." },
];

const features = [
  { icon: Zap, title: "2-in-1 Power", desc: "Tea maker + juicer blender in one smart device." },
  { icon: Battery, title: "USB-C Rechargeable", desc: "2000mAh battery, brew & blend on the move." },
  { icon: ShieldCheck, title: "Safety First", desc: "Auto-shutoff sensor and safety lock built in." },
  { icon: Recycle, title: "BPA-Free Materials", desc: "Food-grade interior, easy to clean." },
];

function Home() {
  const product = PRODUCTS[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="absolute inset-0 -z-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,oklch(0.7_0.2_145/0.5),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24 md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" /> Blend. Brew. Sip. Go.
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              2-in-1 Portable<br />Tea Maker + Juicer.
            </h1>
            <p className="max-w-md text-base text-primary-foreground/85 sm:text-lg">
              Two functions. One smart design. Brew hot tea or blend fresh juice in seconds —
              USB-C rechargeable, travel-friendly, and built to go anywhere with you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild className="shadow-[var(--shadow-soft)]">
                <Link to="/shop">Order now — ${product.price}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <Link to="/shop">Learn more</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-primary opacity-20 blur-3xl" />
            <img
              src={productImg}
              alt="SipMate 2-in-1 portable tea maker and juicer blender"
              width={1280}
              height={853}
              className="relative mx-auto w-full max-w-xl rounded-[1.5rem] object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-primary">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Engineered for every sip.</h2>
          <p className="mt-3 text-muted-foreground">Premium materials, safety-first electronics, and a design that just works.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <h2 className="text-2xl font-semibold">Tech specs</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Battery", "2000 mAh"],
              ["Capacity", "350 ml"],
              ["Power", "100W tea · 150W juicer"],
              ["Charging", "Type-C USB"],
              ["Functions", "2-in-1 Tea + Juicer"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-10 text-primary-foreground shadow-[var(--shadow-soft)] md:p-16">
          <h2 className="text-3xl font-semibold md:text-4xl">Hot or cold, anywhere.</h2>
          <p className="mt-3 max-w-xl opacity-90">Free shipping on launch orders. 30-day satisfaction guarantee.</p>
          <Button size="lg" variant="secondary" asChild className="mt-6">
            <Link to="/shop">Order yours</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SipMate. Blend. Brew. Sip. Go.
      </footer>
    </div>
  );
}
