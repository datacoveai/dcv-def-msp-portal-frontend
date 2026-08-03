import type { PortalUser, PortalUserRole } from "@/types";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";
import { formatDate } from "@/utils/format";
import UserRowActions from "./UserRowActions";

const ROLES: PortalUserRole[] = ["MSP Admin", "MSP Operator", "Client Org Admin"];

function statusTone(status: PortalUser["status"]) {
  if (status === "Active") return "green" as const;
  if (status === "Invited") return "amber" as const;
  return "red" as const;
}

type UsersTableProps = {
  users: PortalUser[];
  onSelectAccount: (accountId: string) => void;
  onRoleChange: (userId: string, role: PortalUserRole) => void;
  onToggleSuspend: (userId: string) => void;
  onResendInvite: (userId: string) => void;
};

export default function UsersTable({
  users,
  onSelectAccount,
  onRoleChange,
  onToggleSuspend,
  onResendInvite,
}: UsersTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Name</th>
              <th className="p-4 text-left font-medium">Email</th>
              <th className="p-4 text-left font-medium">Account</th>
              <th className="p-4 text-left font-medium">Role</th>
              <th className="p-4 text-left font-medium">2FA</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-left font-medium">Last Login</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <button
                    onClick={() => onSelectAccount(user.accountId)}
                    className="text-[#0F3A5E] hover:underline"
                  >
                    {user.accountName}
                  </button>
                </td>
                <td className="p-4">
                  <Select
                    value={user.role}
                    onChange={(event) =>
                      onRoleChange(user.id, event.target.value as PortalUserRole)
                    }
                    className="py-1.5"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="p-4">
                  <Badge
                    label={user.twoFactorEnabled ? "Enabled" : "Disabled"}
                    tone={user.twoFactorEnabled ? "green" : "gray"}
                  />
                </td>
                <td className="p-4">
                  <Badge label={user.status} tone={statusTone(user.status)} />
                </td>
                <td className="p-4 text-gray-600">{formatDate(user.lastLogin)}</td>
                <td className="p-4">
                  <UserRowActions
                    isSuspended={user.status === "Suspended"}
                    onResendInvite={() => onResendInvite(user.id)}
                    onToggleSuspend={() => onToggleSuspend(user.id)}
                  />
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No users match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
