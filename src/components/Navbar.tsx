import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import logo from "@/assets/sipmate-logo.jpeg";

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SipMate — Blend. Brew. Sip. Go." className="h-12 w-auto object-contain mix-blend-multiply dark:mix-blend-screen dark:invert" />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">Home</Link>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground">Shop</Link>
          {user ? (
            <>
              <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground">Orders</Link>
              <Button size="sm" variant="ghost" onClick={async () => { await signOut(); navigate({ to: "/" }); }}>
                Sign out
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
