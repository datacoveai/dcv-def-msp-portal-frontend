import type { Contract } from "@/types";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { contractStatusTone, serviceStatusTone } from "@/utils/statusTone";
import { getEffectiveContractStatus } from "@/utils/contractStatus";
import { formatDate } from "@/utils/format";
import ContractRowActions from "./ContractRowActions";

export type ContractRow = Contract & { organizationName: string };

type ContractsTableProps = {
  rows: ContractRow[];
  onSelectOrganization: (organizationId: string) => void;
  onEditContract: (contractId: string) => void;
  onRenewContract: (contractId: string) => void;
  onTerminateContract: (contractId: string) => void;
};

export default function ContractsTable({
  rows,
  onSelectOrganization,
  onEditContract,
  onRenewContract,
  onTerminateContract,
}: ContractsTableProps) {
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left font-medium">Organization Name</th>
              <th className="p-4 text-left font-medium">Service</th>
              <th className="p-4 text-left font-medium">Contract</th>
              <th className="p-4 text-left font-medium">Package / SKU</th>
              <th className="p-4 text-left font-medium">Qty</th>
              <th className="p-4 text-left font-medium">Registered</th>
              <th className="p-4 text-left font-medium">Expires</th>
              <th className="p-4 text-left font-medium">Service Status</th>
              <th className="p-4 text-left font-medium">Contract Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelectOrganization(row.organizationId)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 font-medium text-gray-900">{row.organizationName}</td>
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
                  <Badge
                    label={getEffectiveContractStatus(row)}
                    tone={contractStatusTone(getEffectiveContractStatus(row))}
                  />
                </td>
                <td className="p-4" onClick={(event) => event.stopPropagation()}>
                  <ContractRowActions
                    onEdit={() => onEditContract(row.id)}
                    onRenew={() => onRenewContract(row.id)}
                    onTerminate={() => onTerminateContract(row.id)}
                  />
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <EmptyState message="No contracts match the current filters." colSpan={10} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
