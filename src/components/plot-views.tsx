"use client";

import Link from "next/link";
import { ActionCard } from "@/components/action-card";
import { FeedState } from "@/components/feed-state";
import { isClosed, useOperations } from "@/components/operations-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evaluateRootZone } from "@/lib/decisions";
import { formatMoisture } from "@/lib/format";
import {
  actions,
  devices,
  getPlot,
  plots,
  plotStatus,
  tenant,
} from "@/lib/operations";

export function PlotList() {
  const { decisions } = useOperations();
  const closedIds = Object.entries(decisions)
    .filter(([, decision]) => isClosed(decision.status))
    .map(([id]) => id);

  return (
    <FeedState>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Plots</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tenant.farm}, {tenant.county} County, {tenant.ward} Ward. Thresholds come from the Kenya Central Rift profile.
        </p>
      </div>
      <div className="grid gap-3">
        {plots.map((plot) => {
          const status = plotStatus(plot.id, closedIds);
          return (
            <Link key={plot.id} href={`/plots/${plot.id}`}>
              <Card className="transition hover:bg-secondary/40">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle>
                      {plot.code} · {plot.crop}
                    </CardTitle>
                    <Badge variant={status === "critical" ? "destructive" : "outline"}>
                      {status === "steady" ? "Inside target" : status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plot.variety} · {plot.stage} · {plot.hectares} ha · {plot.irrigation}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </FeedState>
  );
}

export function PlotDetail({ plotId }: { plotId: string }) {
  const plot = getPlot(plotId);
  if (!plot) return null;

  const reading = plot.moisture.find((item) => item.depthCm === plot.rootDepthCm);
  const decision = evaluateRootZone({
    moistureM3: reading?.m3 ?? 0,
    lowerM3: plot.lowerM3,
    upperM3: plot.upperM3,
    rainExpectedMm: plot.rainExpectedMm,
    quality: reading ? plot.quality : "missing",
  });
  const plotActions = actions.filter((action) => action.plotId === plot.id);
  const plotDevices = devices.filter((device) => device.plotId === plot.id);

  return (
    <FeedState>
      <div>
        <p className="text-sm text-muted-foreground">
          {plot.county} County · {plot.ward} Ward · {plot.zone}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Plot {plot.code} · {plot.crop}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {plot.variety}, {plot.stage.toLowerCase()}, {plot.hectares} ha, {plot.irrigation}. {plot.soil}.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Root zone</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {plot.quality === "missing" ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm" role="status">
                No current moisture profile. Irrigation advice is withheld until the probe reports and the reading passes quality checks.
              </p>
            ) : (
              plot.moisture.map((point) => (
                <div key={point.depthCm}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{point.depthCm} cm</span>
                    <span>{formatMoisture(point.m3)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${Math.min(point.m3 / 0.5, 1) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
            <p className="text-sm">{decision.reason}</p>
            <p className="text-xs text-muted-foreground">
              Target at {plot.rootDepthCm} cm: {plot.lowerM3.toFixed(2)}–{plot.upperM3.toFixed(2)} m³/m³. {plot.calibration}.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Devices on this plot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {plotDevices.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No device is assigned to this plot. The mainline meter and gateway are shared.
              </p>
            ) : (
              plotDevices.map((device) => (
                <div key={device.id} className="text-sm">
                  <p className="font-medium">{device.name}</p>
                  <p className="text-muted-foreground">
                    {device.kind} · last report {device.minutesSinceReport} min ago · {device.calibration}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      {plotActions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No open recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This plot is inside its target band. It stays on the normal irrigation schedule.
            </p>
          </CardContent>
        </Card>
      ) : (
        plotActions.map((action) => <ActionCard key={action.id} action={action} />)
      )}
    </FeedState>
  );
}
