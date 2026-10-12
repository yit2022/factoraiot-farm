"use client";

import { useState } from "react";
import Link from "next/link";
import { ActionCard } from "@/components/action-card";
import { FeedState } from "@/components/feed-state";
import { isClosed, useOperations } from "@/components/operations-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatObserved } from "@/lib/format";
import { actions, plotStatus, plots, tank, tenant } from "@/lib/operations";
import { cn } from "cn";

type Filter = "open" | "progress" | "closed";

const rank = { critical: 0, high: 1, medium: 2, operational: 3 };

export function TodayBoard() {
  const { decisions } = useOperations();
  const [filter, setFilter] = useState<Filter>("open");
  const closedIds = Object.entries(decisions)
    .filter(([, decision]) => isClosed(decision.status))
    .map(([id]) => id);

  const visible = actions
    .filter((action) => {
      const status = decisions[action.id]?.status ?? "open";
      if (filter === "open") return status === "open" || status === "deferred";
      if (filter === "progress") return status === "started";
      return status === "completed" || status === "help";
    })
    .sort((a, b) => rank[a.severity] - rank[b.severity]);

  const openCount = actions.filter((action) => {
    const status = decisions[action.id]?.status ?? "open";
    return status === "open" || status === "deferred";
  }).length;

  return (
    <FeedState>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Today</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {tenant.note} Readings at {formatObserved(tenant.observedAt)}.
          </p>
        </div>
        <Badge variant="outline">{openCount} open</Badge>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            <FilterButton current={filter} value="open" onSelect={setFilter}>
              Open
            </FilterButton>
            <FilterButton current={filter} value="progress" onSelect={setFilter}>
              In progress
            </FilterButton>
            <FilterButton current={filter} value="closed" onSelect={setFilter}>
              Closed
            </FilterButton>
          </div>
          {visible.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {filter === "closed" ? "Nothing has been closed yet" : "No actions in this list"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {filter === "open"
                    ? "Open work is clear. Completed and escalated actions stay on Closed."
                    : "Mark an action started or complete and it will appear here."}
                </p>
              </CardContent>
            </Card>
          ) : (
            visible.map((action) => <ActionCard key={action.id} action={action} />)
          )}
        </div>
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Field conditions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <p>Naivasha sample station · 24°C · humidity 61%</p>
              <p>Expected rain before tomorrow: 0–2 mm</p>
              <p>Header tank: {tank.availableM3} m³ of {tank.capacityM3} m³</p>
              <p className="text-xs text-muted-foreground">
                Weather here is sample context, not a Kenya Meteorological Department feed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Block map</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {plots.map((plot) => {
                const status = plotStatus(plot.id, closedIds);
                return (
                  <Link
                    key={plot.id}
                    href={`/plots/${plot.id}`}
                    className={cn(
                      "rounded-lg border px-3 py-3 text-sm",
                      status === "critical" && "border-destructive/40 bg-destructive/10",
                      status === "high" && "border-amber-700/30 bg-amber-100",
                      status === "watch" && "border-border bg-muted",
                      status === "steady" && "border-emerald-800/20 bg-emerald-50",
                    )}
                  >
                    <span className="font-medium">{plot.code}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {plot.crop}
                    </span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </FeedState>
  );
}

function FilterButton({
  current,
  value,
  onSelect,
  children,
}: {
  current: Filter;
  value: Filter;
  onSelect: (value: Filter) => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={current === value ? "default" : "outline"}
      onClick={() => onSelect(value)}
    >
      {children}
    </Button>
  );
}
