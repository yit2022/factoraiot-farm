"use client";

import { Button } from "@/components/ui/button";
import { useOperations } from "@/components/operations-provider";

export function FeedState({ children }: { children: React.ReactNode }) {
  const { feed, retry } = useOperations();

  if (feed === "loading") {
    return (
      <div className="grid gap-3" aria-busy="true" aria-live="polite">
        <p className="text-sm text-muted-foreground">Loading the latest field readings…</p>
        <div className="h-28 animate-pulse rounded-xl bg-muted" />
        <div className="h-28 animate-pulse rounded-xl bg-muted" />
        <div className="h-28 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {feed === "error" ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4" role="alert">
          <p className="font-medium">The telemetry feed did not refresh.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The actions below are the last stored recommendations. Dependent irrigation advice stays withheld where a sensor is missing.
          </p>
          <Button className="mt-3" onClick={retry}>
            Retry feed
          </Button>
        </div>
      ) : null}
      {children}
    </div>
  );
}
