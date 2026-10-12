"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { tenant } from "@/lib/operations";
import { cn } from "cn";

const links = [
  { href: "/", label: "Today" },
  { href: "/plots", label: "Plots" },
  { href: "/water", label: "Water" },
  { href: "/devices", label: "Devices" },
  { href: "/rules", label: "Rules" },
  { href: "/packs", label: "Country packs" },
];

function NavLinks({ closeOnNavigate = false }: { closeOnNavigate?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        const className = cn(
          "rounded-lg px-3 py-2 text-sm font-medium",
          active
            ? "bg-primary text-primary-foreground"
            : "text-foreground/80 hover:bg-secondary",
        );
        if (closeOnNavigate) {
          return (
            <SheetClose
              key={link.href}
              render={<Link href={link.href} className={className} />}
            >
              {link.label}
            </SheetClose>
          );
        }
        return (
          <Link key={link.href} href={link.href} className={className}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-background text-foreground">
      <div className="mx-auto grid min-h-full max-w-7xl md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-border px-4 py-6 md:block">
          <Brand />
          <div className="mt-8">
            <Suspense fallback={<NavFallback />}>
              <NavLinks />
            </Suspense>
          </div>
        </aside>
        <div className="min-w-0">
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-8">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger
                  render={<Button variant="outline" size="icon" className="md:hidden" />}
                >
                  <Menu />
                  <span className="sr-only">Open navigation</span>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Precision farming</SheetTitle>
                  </SheetHeader>
                  <div className="px-4">
                    <Suspense fallback={<NavFallback />}>
                      <NavLinks closeOnNavigate />
                    </Suspense>
                  </div>
                </SheetContent>
              </Sheet>
              <div>
                <p className="text-sm font-semibold">Precision farming</p>
                <p className="text-xs text-muted-foreground">
                  {tenant.name} · {tenant.county} {tenant.ward} · Pack {tenant.pack}
                </p>
              </div>
            </div>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Advisory only
            </p>
          </header>
          <div className="px-4 py-5 md:px-8 md:py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

function NavFallback() {
  return (
    <div className="grid gap-2" aria-hidden="true">
      {links.map((link) => (
        <div key={link.href} className="h-9 rounded-lg bg-secondary" />
      ))}
    </div>
  );
}

function Brand() {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
        Factora
      </p>
      <p className="mt-1 text-lg font-semibold">Precision farming</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Global product. Kenya is the launch pack.
      </p>
    </div>
  );
}
