"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rules } from "@/lib/operations";

export function RulesBoard() {
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Rules</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Global templates hold the safety logic. Kenya crop profiles hold the local thresholds. A profile approved for Central Rift horticulture is not valid for another zone or country.
        </p>
      </div>
      <div className="grid gap-3">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base">{rule.name}</CardTitle>
                <Badge variant="outline">{rule.id}</Badge>
                <Badge variant="secondary">{rule.scope}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Version {rule.version} · {rule.status}
              </p>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <p>
                <span className="text-muted-foreground">Trigger: </span>
                {rule.trigger}
              </p>
              <p>
                <span className="text-muted-foreground">Action: </span>
                {rule.action}
              </p>
              <p>
                <span className="text-muted-foreground">Parameter: </span>
                {rule.parameter}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
