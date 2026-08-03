import type { Account } from "@/types";
import Badge from "@/components/ui/Badge";
import { accountStatusTone, serviceStatusTone } from "@/utils/statusTone";
import { formatDate } from "@/utils/format";
import RowActionsMenu from "./RowActionsMenu";

type AccountTableProps = {
  accounts: Account[];
  onSelectAccount: (id: string) => void;
  onSuspend: (id: string) => void;
  onArchive: (id: string) => void;
  onResendInvite: (id: string) => void;
  onExport: (id: string) => void;
};

export default function AccountTable({
  accounts,
  onSelectAccount,
  onSuspend,
  onArchive,
  onResendInvite,
  onExport,
}: AccountTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Account Name</th>
              <th className="p-4 text-left font-medium">Account Type</th>
              <th className="p-4 text-left font-medium">Services</th>
              <th className="p-4 text-left font-medium">Account Status</th>
              <th className="p-4 text-left font-medium">Operational Issues</th>
              <th className="p-4 text-left font-medium">Earliest Contract Expiry</th>
              <th className="p-4 text-left font-medium">Parent Account</th>
              <th className="p-4 text-left font-medium">Account Created</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => (
              <tr
                key={account.id}
                onClick={() => onSelectAccount(account.id)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 font-medium text-gray-900">{account.name}</td>
                <td className="p-4 text-gray-600">{account.type}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {account.services.map((service) => (
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
                    label={account.status}
                    tone={accountStatusTone(account.status)}
                  />
                </td>
                <td className="p-4">
                  {account.operationalIssues > 0 ? (
                    <span className="text-red-600 font-medium">
                      {account.operationalIssues}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="p-4 text-gray-600">
                  {formatDate(account.earliestContractExpiry)}
                </td>
                <td className="p-4 text-gray-600">
                  {account.parentAccountName ?? "—"}
                </td>
                <td className="p-4 text-gray-600">
                  {formatDate(account.accountCreated)}
                </td>
                <td className="p-4" onClick={(event) => event.stopPropagation()}>
                  <RowActionsMenu
                    onSuspend={() => onSuspend(account.id)}
                    onArchive={() => onArchive(account.id)}
                    onResendInvite={() => onResendInvite(account.id)}
                    onExport={() => onExport(account.id)}
                  />
                </td>
              </tr>
            ))}

            {accounts.length === 0 && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-500">
                  No accounts match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
