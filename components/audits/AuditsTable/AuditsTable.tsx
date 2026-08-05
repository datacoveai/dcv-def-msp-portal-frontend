import type { AuditEvent } from "@/types";
import EmptyState from "@/components/ui/EmptyState";
import { formatDateTime } from "@/utils/format";

type AuditsTableProps = {
  events: AuditEvent[];
  onSelectOrganization: (organizationName: string) => void;
};

export default function AuditsTable({ events, onSelectOrganization }: AuditsTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Timestamp</th>
              <th className="p-4 text-left font-medium">Actor</th>
              <th className="p-4 text-left font-medium">Action</th>
              <th className="p-4 text-left font-medium">Client Organization</th>
              <th className="p-4 text-left font-medium">Details</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-gray-600 whitespace-nowrap">
                  {formatDateTime(event.timestamp)}
                </td>
                <td className="p-4 text-gray-900 font-medium">{event.actor}</td>
                <td className="p-4 text-gray-700">{event.action}</td>
                <td className="p-4">
                  {event.organizationName ? (
                    <button
                      onClick={() => onSelectOrganization(event.organizationName as string)}
                      className="text-[#0F3A5E] hover:underline"
                    >
                      {event.organizationName}
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="p-4 text-gray-600">{event.details}</td>
              </tr>
            ))}

            {events.length === 0 && (
              <EmptyState message="No audit events match the current filters." colSpan={5} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
