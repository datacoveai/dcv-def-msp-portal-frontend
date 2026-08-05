import type { ClientOrganization } from "@/types";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { administrationModeTone, organizationStatusTone, serviceStatusTone } from "@/utils/statusTone";
import { formatDate } from "@/utils/format";
import RowActionsMenu from "./RowActionsMenu";

type ClientOrganizationTableProps = {
  organizations: ClientOrganization[];
  onSelectOrganization: (id: string) => void;
  onSuspend: (id: string) => void;
  onArchive: (id: string) => void;
  onResendInvite: (id: string) => void;
  onExport: (id: string) => void;
};

export default function ClientOrganizationTable({
  organizations,
  onSelectOrganization,
  onSuspend,
  onArchive,
  onResendInvite,
  onExport,
}: ClientOrganizationTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Organization Name</th>
              <th className="p-4 text-left font-medium">Primary Contact</th>
              <th className="p-4 text-left font-medium">Administration Mode</th>
              <th className="p-4 text-left font-medium">Services</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-left font-medium">Operational Issues</th>
              <th className="p-4 text-left font-medium">Earliest Contract Expiry</th>
              <th className="p-4 text-left font-medium">Created</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {organizations.map((organization) => (
              <tr
                key={organization.id}
                onClick={() => onSelectOrganization(organization.id)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 font-medium text-gray-900">{organization.name}</td>
                <td className="p-4 text-gray-600">{organization.primaryContact}</td>
                <td className="p-4">
                  <Badge
                    label={organization.administrationMode}
                    tone={administrationModeTone(organization.administrationMode)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {organization.services.map((service) => (
                      <Badge
                        key={service.name}
                        label={service.name}
                        tone={serviceStatusTone(service.status)}
                      />
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    label={organization.status}
                    tone={organizationStatusTone(organization.status)}
                  />
                </td>
                <td className="p-4">
                  {organization.operationalIssues > 0 ? (
                    <span className="text-red-600 font-medium">
                      {organization.operationalIssues}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="p-4 text-gray-600">
                  {formatDate(organization.earliestContractExpiry)}
                </td>
                <td className="p-4 text-gray-600">{formatDate(organization.createdAt)}</td>
                <td className="p-4" onClick={(event) => event.stopPropagation()}>
                  <RowActionsMenu
                    onSuspend={() => onSuspend(organization.id)}
                    onArchive={() => onArchive(organization.id)}
                    onResendInvite={() => onResendInvite(organization.id)}
                    onExport={() => onExport(organization.id)}
                  />
                </td>
              </tr>
            ))}

            {organizations.length === 0 && (
              <EmptyState
                message="No client organizations match the current filters."
                colSpan={9}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
