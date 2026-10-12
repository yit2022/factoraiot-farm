"use client";

import { FeedState } from "@/components/feed-state";
import { useOperations } from "@/components/operations-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { evaluateDeviceSilence } from "@/lib/decisions";
import { devices, plots } from "@/lib/operations";

export function DeviceBoard() {
  const { failFeed, feed } = useOperations();
  const needsWork = devices.filter(
    (device) =>
      evaluateDeviceSilence(device).action === "inspect" ||
      device.calibration.startsWith("Blocked"),
  );

  return (
    <FeedState>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Candidate hardware for the Kenya pack. Nothing in this list is marked Communications Authority approved.
          </p>
        </div>
        <Button variant="outline" onClick={failFeed} disabled={feed === "error"}>
          Simulate feed outage
        </Button>
      </div>
      {needsWork.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>All devices are reporting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No silence or blocked calibration in the current sample.
            </p>
          </CardContent>
        </Card>
      ) : null}
      <div className="grid gap-3">
        {devices.map((device) => {
          const silence = evaluateDeviceSilence(device);
          const plot = plots.find((item) => item.id === device.plotId);
          return (
            <Card key={device.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">{device.name}</CardTitle>
                  <Badge variant={silence.action === "inspect" ? "destructive" : "outline"}>
                    {silence.action === "inspect" ? "Silent" : "Reporting"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {device.kind}
                  {plot ? ` · plot ${plot.code}` : " · shared"}
                </p>
              </CardHeader>
              <CardContent className="grid gap-1 text-sm text-muted-foreground">
                <p>{silence.reason}</p>
                <p>
                  Last report {device.minutesSinceReport} min ago · battery{" "}
                  {device.batteryV === null ? "unknown" : `${device.batteryV.toFixed(2)} V`} · firmware {device.firmware}
                </p>
                <p>{device.calibration}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </FeedState>
  );
}
