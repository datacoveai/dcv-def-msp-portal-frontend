import Badge from "@/components/ui/Badge";
import TrendBadge from "@/components/ui/TrendBadge";
import EmptyState from "@/components/ui/EmptyState";
import { formatDate } from "@/utils/format";
import { getCapacityWarning } from "@/utils/thresholds";

export type UsageRow = {
  organizationId: string;
  organizationName: string;
  seatsAllocated: number;
  seatsActive: number;
  utilization: number;
  trendPercent: number | null;
  lastRecorded: string | null;
};

type UsageTableProps = {
  rows: UsageRow[];
  onSelectOrganization: (organizationId: string) => void;
};

export default function UsageTable({ rows, onSelectOrganization }: UsageTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Organization Name</th>
              <th className="p-4 text-left font-medium">Seats Allocated</th>
              <th className="p-4 text-left font-medium">Seats Active</th>
              <th className="p-4 text-left font-medium">Available Seats</th>
              <th className="p-4 text-left font-medium">Utilization</th>
              <th className="p-4 text-left font-medium">Trend</th>
              <th className="p-4 text-left font-medium">Last Recorded</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const capacityWarning = getCapacityWarning(row.utilization);

              return (
                <tr
                  key={row.organizationId}
                  onClick={() => onSelectOrganization(row.organizationId)}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900">{row.organizationName}</td>
                  <td className="p-4 text-gray-600">{row.seatsAllocated}</td>
                  <td className="p-4 text-gray-600">{row.seatsActive}</td>
                  <td className="p-4 text-gray-600">
                    {row.seatsAllocated - row.seatsActive}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{row.utilization.toFixed(0)}%</span>
                      {capacityWarning && (
                        <Badge label={capacityWarning.label} tone={capacityWarning.tone} />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <TrendBadge trendPercent={row.trendPercent} />
                  </td>
                  <td className="p-4 text-gray-600">{formatDate(row.lastRecorded)}</td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <EmptyState message="No client organizations match the current search." colSpan={7} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
