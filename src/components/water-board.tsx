"use client";

import { FeedState } from "@/components/feed-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evaluateTankReserve } from "@/lib/decisions";
import { formatKes } from "@/lib/format";
import { plots, tank, tenant } from "@/lib/operations";

export function WaterBoard() {
  const decision = evaluateTankReserve(tank);
  const sampleCost = tank.flowTodayM3 * tank.sampleTariffKesPerM3;

  return (
    <FeedState>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Water</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {tenant.farm} water account for 12 Oct 2026. Yield per cubic metre appears after harvest is posted to the season.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Used today" value={`${tank.flowTodayM3} m³`} detail={`${tank.unauthorizedM3} m³ without a schedule`} />
        <Metric label="Header tank" value={`${tank.availableM3} m³`} detail={`${Math.round((tank.availableM3 / tank.capacityM3) * 100)}% of ${tank.capacityM3} m³`} />
        <Metric label="Sample pumping cost" value={formatKes(sampleCost)} detail={`${formatKes(tank.sampleTariffKesPerM3)} per m³, not a utility tariff`} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reserve check</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm">
          <p>{decision.reason}</p>
          <p className="text-muted-foreground">
            Reserve {tank.reserveM3} m³. Next avocado cycle {tank.plannedM3} m³. Pump runtime {tank.pumpHours} h.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Season outcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No harvest has been posted for these {plots.reduce((sum, plot) => sum + plot.hectares, 0).toFixed(2)} ha. Yield per cubic metre and margin stay empty until the ERP receives a harvest, grade, and price.
          </p>
        </CardContent>
      </Card>
    </FeedState>
  );
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
