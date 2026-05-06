import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Battery, Droplets, Leaf, Sparkles, Plane, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/sipmate-hero.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "SipMate — Brew fresh tea, anywhere" },
      { name: "description", content: "The compact, USB-rechargeable tea maker that boils water and brews loose-leaf tea in minutes. Travel-friendly, easy to clean." },
    ],
  }),
});

const features = [
  { icon: Sparkles, title: "Compact", desc: "Fits in a backpack pocket." },
  { icon: Battery, title: "USB Rechargeable", desc: "Brew anywhere, no outlet needed." },
  { icon: Droplets, title: "Boils & Brews", desc: "From cold water to hot tea in minutes." },
  { icon: Leaf, title: "Loose-leaf Ready", desc: "Built-in stainless steel infuser." },
  { icon: Plane, title: "Travel-friendly", desc: "TSA-friendly form factor." },
  { icon: ShieldCheck, title: "Safe by design", desc: "Auto shutoff & safety sensor." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-warm)] opacity-70" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24 md:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> New from SipMate
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              Fresh tea,<br />wherever you wander.
            </h1>
            <p className="max-w-md text-base text-muted-foreground sm:text-lg">
              Meet the SipMate Portable Tea Maker — boil, brew, and sip from one sleek
              rechargeable device. Designed for desks, dorms, and long journeys.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild className="shadow-[var(--shadow-soft)]">
                <Link to="/shop">Order now — $79</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/shop">Learn more</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[image:var(--gradient-primary)] opacity-15 blur-3xl" />
            <img
              src={heroImg}
              alt="SipMate portable tea maker brewing amber tea"
              width={1280}
              height={1280}
              className="relative mx-auto w-full max-w-md rounded-[2rem] object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Engineered for the everyday brew.</h2>
          <p className="mt-3 text-muted-foreground">Premium materials, safety-first electronics, and a design that just works.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-10 text-primary-foreground shadow-[var(--shadow-soft)] md:p-16">
          <h2 className="text-3xl font-semibold md:text-4xl">Start brewing with SipMate today.</h2>
          <p className="mt-3 max-w-xl opacity-90">Free shipping on launch orders. 30-day satisfaction guarantee.</p>
          <Button size="lg" variant="secondary" asChild className="mt-6">
            <Link to="/shop">Order yours</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SipMate. Brewed with care.
      </footer>
    </div>
  );
}
