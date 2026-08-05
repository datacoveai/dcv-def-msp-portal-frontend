import StatCard from "./StatCard";
import { computeClientOrganizationSummary, listClientOrganizations, listContracts } from "@/services";

export default function StatCardGrid() {
  const summary = computeClientOrganizationSummary(listClientOrganizations(), listContracts());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard title="Total Client Organizations" value={String(summary.total)} />
      <StatCard title="Total Allocated Seats" value={String(summary.totalAllocatedSeats)} />
      <StatCard title="Total Activated Seats" value={String(summary.totalActiveSeats)} />
      <StatCard
        title="License Utilization"
        value={`${summary.overallUtilizationPercent.toFixed(0)}%`}
      />
    </div>
  );
}
