import { notFound } from "next/navigation";
import { PlotDetail } from "@/components/plot-views";
import { getPlot, plots } from "@/lib/operations";

export function generateStaticParams() {
  return plots.map((plot) => ({ id: plot.id }));
}

export default async function PlotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getPlot(id)) notFound();
  return <PlotDetail plotId={id} />;
}
