import type { PortalUser, PortalUserRole } from "@/types";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";
import EmptyState from "@/components/ui/EmptyState";
import { formatDate } from "@/utils/format";
import { portalUserStatusTone } from "@/utils/statusTone";
import UserRowActions from "./UserRowActions";

const ROLES: PortalUserRole[] = ["MSP Admin", "MSP Operator"];

type UsersTableProps = {
  users: PortalUser[];
  onRoleChange: (userId: string, role: PortalUserRole) => void;
  onToggleSuspend: (userId: string) => void;
  onResendInvite: (userId: string) => void;
};

export default function UsersTable({
  users,
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
                  <Badge label={user.status} tone={portalUserStatusTone(user.status)} />
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
              <EmptyState message="No users match the current filters." colSpan={7} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
