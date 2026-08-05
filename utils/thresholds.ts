export const NEARING_CAPACITY_THRESHOLD_PERCENT = 90;
export const AT_CAPACITY_THRESHOLD_PERCENT = 100;

export function getCapacityWarning(
  utilizationPercent: number
): { label: string; tone: "amber" | "red" } | null {
  if (utilizationPercent >= AT_CAPACITY_THRESHOLD_PERCENT) {
    return { label: "At Capacity", tone: "red" };
  }
  if (utilizationPercent >= NEARING_CAPACITY_THRESHOLD_PERCENT) {
    return { label: "Nearing Capacity", tone: "amber" };
  }
  return null;
}
