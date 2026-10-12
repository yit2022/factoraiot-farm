"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOperations, type DecisionStatus } from "@/components/operations-provider";
import type { FarmAction, Severity } from "@/lib/operations";

const severityLabel: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  operational: "Device",
};

const deferReasons = [
  "Crew is on another block",
  "Will do it at the next water window",
  "Waiting for pump power",
];

const helpReasons = [
  "The field does not match the reading",
  "I cannot reach the plot",
  "Ask the agronomist before acting",
];

export function ActionCard({ action }: { action: FarmAction }) {
  const { decisions, record } = useOperations();
  const decision = decisions[action.id];
  const [mode, setMode] = useState<"defer" | "help" | null>(null);
  const reasons = mode === "defer" ? deferReasons : helpReasons;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={action.severity === "critical" ? "destructive" : "secondary"}>
            {severityLabel[action.severity]}
          </Badge>
          <Badge variant="outline">{action.ruleId}</Badge>
          {decision ? <Badge variant="outline">{labelFor(decision.status)}</Badge> : null}
        </div>
        <CardTitle className="text-base">{action.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{action.where}</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <dl className="grid gap-3 sm:grid-cols-2">
          <Fact label="What" value={action.what} />
          <Fact label="When" value={action.when} />
          <Fact label="Why" value={action.why} />
          <Fact label="How much" value={action.amount ?? "No volume until the reading is trusted"} />
        </dl>
        <div className="flex flex-wrap gap-2">
          {action.evidence.map((item) => (
            <span
              key={item.label}
              className="rounded-lg bg-muted px-2 py-1 text-xs"
            >
              <span className="text-muted-foreground">{item.label}: </span>
              {item.value}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {action.channel} · Work order {action.workOrder} · Confidence {action.confidence} · Rule {action.ruleVersion}
        </p>
        {action.messages.length > 0 ? (
          <Tabs defaultValue={action.messages[0]?.language}>
            <TabsList>
              {action.messages.map((message) => (
                <TabsTrigger key={message.language} value={message.language}>
                  {message.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {action.messages.map((message) => (
              <TabsContent key={message.language} value={message.language}>
                <p className="mt-3 rounded-lg border border-border bg-background p-3 text-sm leading-6">
                  {message.body}
                </p>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <p className="text-sm text-muted-foreground">
            This stays on a technician work order. It is not sent to the farmer.
          </p>
        )}
        {decision?.reason ? (
          <p className="text-sm">
            Recorded reason: {decision.reason}
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {action.plotId ? (
          <Button variant="outline" render={<Link href={`/plots/${action.plotId}`} />}>
            Open plot
          </Button>
        ) : null}
        <Button onClick={() => record(action.id, "started")}>Mark started</Button>
        <Button variant="secondary" onClick={() => record(action.id, "completed")}>
          Mark complete
        </Button>
        <Button variant="outline" onClick={() => setMode("defer")}>
          Defer
        </Button>
        <Button variant="outline" onClick={() => setMode("help")}>
          Need help
        </Button>
      </CardFooter>
      <Dialog open={mode !== null} onOpenChange={(open) => !open && setMode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "defer" ? "Defer this action" : "Ask for help"}
            </DialogTitle>
            <DialogDescription>
              {mode === "help"
                ? "Help escalates the action. It does not send a pesticide or fertilizer recommendation."
                : "The action stays open with the reason you choose."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            {reasons.map((reason) => (
              <Button
                key={reason}
                variant="outline"
                onClick={() => {
                  record(action.id, mode === "defer" ? "deferred" : "help", reason);
                  setMode(null);
                }}
              >
                {reason}
              </Button>
            ))}
          </div>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-6">{value}</dd>
    </div>
  );
}

function labelFor(status: DecisionStatus) {
  switch (status) {
    case "started":
      return "Started";
    case "deferred":
      return "Deferred";
    case "completed":
      return "Complete";
    case "help":
      return "Escalated";
    default:
      return "Open";
  }
}
