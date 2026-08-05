import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { PortalUserRole, PortalUserStatus } from "@/types";

const ROLES: PortalUserRole[] = ["MSP Admin", "MSP Operator"];
const STATUSES: PortalUserStatus[] = ["Active", "Invited", "Suspended"];

type UserFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  roleFilter: PortalUserRole | "ALL";
  onRoleFilterChange: (value: PortalUserRole | "ALL") => void;
  statusFilter: PortalUserStatus | "ALL";
  onStatusFilterChange: (value: PortalUserStatus | "ALL") => void;
  onInviteUser: () => void;
};

export default function UserFilters({
  searchTerm,
  onSearchTermChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  onInviteUser,
}: UserFiltersProps) {
  return (
    <div className="mt-8 mb-2 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          type="text"
          placeholder="Search by name or email..."
          className="w-full md:w-80"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />

        <Select
          value={roleFilter}
          onChange={(event) =>
            onRoleFilterChange(event.target.value as PortalUserRole | "ALL")
          }
        >
          <option value="ALL">All Roles</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>

        <Select
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as PortalUserStatus | "ALL")
          }
        >
          <option value="ALL">All Statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </div>

      <Button onClick={onInviteUser}>+ Invite User</Button>
    </div>
  );
}
