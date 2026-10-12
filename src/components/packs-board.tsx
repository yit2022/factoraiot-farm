"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countryPacks, type CountryPack } from "@/lib/packs";

export function PacksBoard() {
  const [code, setCode] = useState(countryPacks[0]?.code ?? "KE");
  const pack = countryPacks.find((item) => item.code === code) ?? countryPacks[0];

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Country packs</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          The operations console is global. Language, currency, geography, radio approval, and input rules live in the pack. Kenya is the only pack with a site.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {countryPacks.map((item) => (
          <Button
            key={item.code}
            variant={item.code === pack.code ? "default" : "outline"}
            onClick={() => setCode(item.code)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <PackDetail pack={pack} />
    </div>
  );
}

function PackDetail({ pack }: { pack: CountryPack }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{pack.name}</CardTitle>
          <Badge variant="outline">{pack.version}</Badge>
          <Badge variant={pack.status === "launch" ? "default" : "secondary"}>
            {pack.status === "launch" ? "Launch market" : "Not a market choice"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{pack.summary}</p>
      </CardHeader>
      <CardContent className="grid gap-4">
        {pack.siteCount === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-4">
            <p className="font-medium">No sites use this pack.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Opening a country still needs a payer, an installer, an agronomist, and a local regulatory review. Kenya farm records stay on the Kenya pack.
            </p>
          </div>
        ) : (
          <p className="text-sm">
            {pack.siteCount} site is using this pack: Lakeview Growers, Nakuru County.
          </p>
        )}
        <dl className="grid gap-3 sm:grid-cols-2">
          <Item label="Languages" value={pack.languages.map((language) => language.name).join(", ")} />
          <Item label="Currency" value={pack.currency} />
          <Item label="Time zone" value={pack.timezone} />
          <Item label="Geography" value={pack.adminLevels.join(" / ")} />
          <Item label="Radio" value={pack.radioProfile} />
          <Item label="Backhaul" value={pack.cellular} />
          <Item label="Residency" value={pack.residency} />
          <Item label="Seasons" value={pack.seasons} />
          <Item label="Input advice" value={pack.inputAuthority} />
        </dl>
        <div>
          <p className="text-sm font-medium">Hardware catalogue</p>
          {pack.hardware.length === 0 ? (
            <p className="mt-1 text-sm text-muted-foreground">
              No hardware is approved for this pack.
            </p>
          ) : (
            <ul className="mt-2 grid gap-2">
              {pack.hardware.map((item) => (
                <li key={item.model} className="rounded-lg bg-muted px-3 py-2 text-sm">
                  <span className="font-medium">{item.model}. </span>
                  {item.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-6">{value}</dd>
    </div>
  );
}
