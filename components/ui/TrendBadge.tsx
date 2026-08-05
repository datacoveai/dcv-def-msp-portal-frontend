import Badge from "@/components/ui/Badge";

type TrendBadgeProps = {
  trendPercent: number | null;
};

export default function TrendBadge({ trendPercent }: TrendBadgeProps) {
  if (trendPercent === null || trendPercent === 0) {
    return <Badge label="–" tone="gray" />;
  }

  const isUp = trendPercent > 0;
  return (
    <Badge
      label={`${isUp ? "▲" : "▼"} ${Math.abs(trendPercent).toFixed(0)}%`}
      tone={isUp ? "green" : "red"}
    />
  );
}
