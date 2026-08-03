import type { AccountType } from "@/types";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/utils/format";

export type UsageRow = {
  accountId: string;
  accountName: string;
  accountType: AccountType;
  seatsAllocated: number;
  seatsActive: number;
  utilization: number;
  trendPercent: number | null;
  lastRecorded: string | null;
};

type UsageTableProps = {
  rows: UsageRow[];
  onSelectAccount: (accountId: string) => void;
};

function TrendBadge({ trendPercent }: { trendPercent: number | null }) {
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

export default function UsageTable({ rows, onSelectAccount }: UsageTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Account Name</th>
              <th className="p-4 text-left font-medium">Type</th>
              <th className="p-4 text-left font-medium">Seats Allocated</th>
              <th className="p-4 text-left font-medium">Seats Active</th>
              <th className="p-4 text-left font-medium">Utilization</th>
              <th className="p-4 text-left font-medium">Trend</th>
              <th className="p-4 text-left font-medium">Last Recorded</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.accountId}
                onClick={() => onSelectAccount(row.accountId)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 font-medium text-gray-900">{row.accountName}</td>
                <td className="p-4 text-gray-600">{row.accountType}</td>
                <td className="p-4 text-gray-600">{row.seatsAllocated}</td>
                <td className="p-4 text-gray-600">{row.seatsActive}</td>
                <td className="p-4 text-gray-600">{row.utilization.toFixed(0)}%</td>
                <td className="p-4">
                  <TrendBadge trendPercent={row.trendPercent} />
                </td>
                <td className="p-4 text-gray-600">{formatDate(row.lastRecorded)}</td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No accounts match the current search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
