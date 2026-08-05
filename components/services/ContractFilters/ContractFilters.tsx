import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { SERVICE_NAMES } from "@/services/contracts";
import type { ContractStatus } from "@/types";

const CONTRACT_STATUSES: ContractStatus[] = [
  "Active",
  "Pending",
  "Rejected",
  "About to Expire",
  "Expired",
  "Terminated",
];

type ContractFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  serviceFilter: string | "ALL";
  onServiceFilterChange: (value: string | "ALL") => void;
  statusFilter: ContractStatus | "ALL";
  onStatusFilterChange: (value: ContractStatus | "ALL") => void;
  showArchived: boolean;
  onShowArchivedChange: (value: boolean) => void;
  onAddContract: () => void;
};

export default function ContractFilters({
  searchTerm,
  onSearchTermChange,
  serviceFilter,
  onServiceFilterChange,
  statusFilter,
  onStatusFilterChange,
  showArchived,
  onShowArchivedChange,
  onAddContract,
}: ContractFiltersProps) {
  return (
    <div className="mt-8 mb-2 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          type="text"
          placeholder="Search by organization, contract, or SKU..."
          className="w-full md:w-80"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />

        <Select
          value={serviceFilter}
          onChange={(event) => onServiceFilterChange(event.target.value)}
        >
          <option value="ALL">All Services</option>
          {SERVICE_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>

        <Select
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as ContractStatus | "ALL")
          }
        >
          <option value="ALL">All Contract Statuses</option>
          {CONTRACT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>

        <label className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(event) => onShowArchivedChange(event.target.checked)}
          />
          Show archived contracts
        </label>
      </div>

      <Button onClick={onAddContract}>+ Add Contract</Button>
    </div>
  );
}
