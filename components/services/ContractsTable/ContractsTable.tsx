import type { Contract } from "@/types";
import Badge from "@/components/ui/Badge";
import { contractStatusTone, serviceStatusTone } from "@/utils/statusTone";
import { formatDate } from "@/utils/format";

export type ContractRow = Contract & { accountName: string };

type ContractsTableProps = {
  rows: ContractRow[];
  onSelectAccount: (accountId: string) => void;
};

export default function ContractsTable({ rows, onSelectAccount }: ContractsTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Account Name</th>
              <th className="p-4 text-left font-medium">Service</th>
              <th className="p-4 text-left font-medium">Contract</th>
              <th className="p-4 text-left font-medium">Package / SKU</th>
              <th className="p-4 text-left font-medium">Qty</th>
              <th className="p-4 text-left font-medium">Registered</th>
              <th className="p-4 text-left font-medium">Expires</th>
              <th className="p-4 text-left font-medium">Service Status</th>
              <th className="p-4 text-left font-medium">Contract Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelectAccount(row.accountId)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 font-medium text-gray-900">{row.accountName}</td>
                <td className="p-4 text-gray-700">{row.serviceName}</td>
                <td className="p-4 text-gray-600">{row.contractName}</td>
                <td className="p-4 text-gray-600">{row.packageSku}</td>
                <td className="p-4 text-gray-600">{row.quantity}</td>
                <td className="p-4 text-gray-600">{formatDate(row.registrationDate)}</td>
                <td className="p-4 text-gray-600">{formatDate(row.expiresOn)}</td>
                <td className="p-4">
                  <Badge label={row.serviceStatus} tone={serviceStatusTone(row.serviceStatus)} />
                </td>
                <td className="p-4">
                  <Badge label={row.contractStatus} tone={contractStatusTone(row.contractStatus)} />
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-500">
                  No contracts match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
