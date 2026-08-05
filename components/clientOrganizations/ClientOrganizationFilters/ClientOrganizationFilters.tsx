import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { AdministrationMode } from "@/types";

type ClientOrganizationFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  administrationModeFilter: AdministrationMode | "ALL";
  onAdministrationModeFilterChange: (value: AdministrationMode | "ALL") => void;
  onCreateOrganization: () => void;
};

export default function ClientOrganizationFilters({
  searchTerm,
  onSearchTermChange,
  administrationModeFilter,
  onAdministrationModeFilterChange,
  onCreateOrganization,
}: ClientOrganizationFiltersProps) {
  return (
    <div className="mt-8 mb-2 flex flex-col md:flex-row gap-4 justify-between">
      <Input
        type="text"
        placeholder="Search by organization name or primary contact..."
        className="w-full md:w-96"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
      />

      <div className="flex gap-3">
        <Select
          value={administrationModeFilter}
          onChange={(event) =>
            onAdministrationModeFilterChange(
              event.target.value as AdministrationMode | "ALL"
            )
          }
        >
          <option value="ALL">All Administration Modes</option>
          <option value="MSP Managed">MSP Managed</option>
          <option value="Client Managed">Client Managed</option>
        </Select>

        <Button onClick={onCreateOrganization}>+ New Client Organization</Button>
      </div>
    </div>
  );
}
