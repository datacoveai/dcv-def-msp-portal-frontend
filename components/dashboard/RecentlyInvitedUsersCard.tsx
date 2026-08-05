import { listUsers } from "@/services";
import { formatDate } from "@/utils/format";

export default function RecentlyInvitedUsersCard() {
  const recentlyInvited = listUsers()
    .filter((user) => user.status === "Invited" && user.invitedAt)
    .sort((a, b) => (b.invitedAt ?? "").localeCompare(a.invitedAt ?? ""))
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Recently Invited Users</h2>

      <div className="mt-4 space-y-4">
        {recentlyInvited.map((user) => (
          <div key={user.id} className="border-b pb-3 last:border-b-0 last:pb-0">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">
              {user.email} · {user.organizationName ?? "MSP Staff"} · Invited{" "}
              {formatDate(user.invitedAt)}
            </p>
          </div>
        ))}

        {recentlyInvited.length === 0 && (
          <p className="text-sm text-gray-500">No recent invitations.</p>
        )}
      </div>
    </div>
  );
}
