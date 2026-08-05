import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { listClientOrganizations, listContracts } from "@/services";
import { getEffectiveContractStatus } from "@/utils/contractStatus";
import { contractStatusTone } from "@/utils/statusTone";
import { formatDate } from "@/utils/format";

export default function ExpiringContractsCard() {
  const organizationsById = new Map(
    listClientOrganizations().map((organization) => [organization.id, organization])
  );

  const expiringContracts = listContracts()
    .filter((contract) => !contract.archived)
    .map((contract) => ({
      contract,
      effectiveStatus: getEffectiveContractStatus(contract),
    }))
    .filter(
      ({ effectiveStatus }) =>
        effectiveStatus === "About to Expire" || effectiveStatus === "Expired"
    )
    .sort((a, b) => (a.contract.expiresOn ?? "").localeCompare(b.contract.expiresOn ?? ""))
    .slice(0, 5);

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Expiring Contracts</h2>
        <Link href="/services" className="text-sm text-[#0F3A5E] hover:underline">
          View all in Services &amp; Contracts
        </Link>
      </div>

      <div className="mt-4 flex flex-col divide-y">
        {expiringContracts.map(({ contract, effectiveStatus }) => (
          <div key={contract.id} className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">
                {organizationsById.get(contract.organizationId)?.name ?? "Unknown Organization"}
              </p>
              <p className="text-sm text-gray-500">
                {contract.serviceName} · Expires {formatDate(contract.expiresOn)}
              </p>
            </div>
            <Badge label={effectiveStatus} tone={contractStatusTone(effectiveStatus)} />
          </div>
        ))}

        {expiringContracts.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-500">No contracts expiring soon.</p>
        )}
      </div>
    </div>
  );
}
