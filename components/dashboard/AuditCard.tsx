import Link from "next/link";
import { listAuditEvents } from "@/services";
import { formatDateTime } from "@/utils/format";

export default function AuditCard() {
  const recentEvents = [...listAuditEvents()]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Audit Activity</h2>
        <Link href="/audits" className="text-sm text-[#0F3A5E] hover:underline">
          View all in Audits
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {recentEvents.map((event) => (
          <div key={event.id} className="border-b pb-3 last:border-b-0 last:pb-0">
            <p className="font-medium">{event.action}</p>
            <p className="text-sm text-gray-500">
              {event.actor} · {event.organizationName ?? "MSP"} · {formatDateTime(event.timestamp)}
            </p>
          </div>
        ))}

        {recentEvents.length === 0 && (
          <p className="text-sm text-gray-500">No recent audit activity.</p>
        )}
      </div>
    </div>
  );
}
