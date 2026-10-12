import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid max-w-lg gap-3">
      <h1 className="text-2xl font-semibold">That plot is not on this farm.</h1>
      <p className="text-sm text-muted-foreground">
        The sample tenant only includes the South Block plots in Nakuru County.
      </p>
      <Button className="w-fit" render={<Link href="/plots" />}>
        Back to plots
      </Button>
    </div>
  );
}
