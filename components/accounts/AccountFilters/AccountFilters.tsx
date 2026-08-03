import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { AccountType } from "@/types";

type AccountFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  typeFilter: AccountType | "ALL";
  onTypeFilterChange: (value: AccountType | "ALL") => void;
  onCreateAccount: () => void;
};

export default function AccountFilters({
  searchTerm,
  onSearchTermChange,
  typeFilter,
  onTypeFilterChange,
  onCreateAccount,
}: AccountFiltersProps) {
  return (
    <div className="mt-8 mb-2 flex flex-col md:flex-row gap-4 justify-between">
      <Input
        type="text"
        placeholder="Search by account name or main administrator..."
        className="w-full md:w-96"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
      />

      <div className="flex gap-3">
        <Select
          value={typeFilter}
          onChange={(event) =>
            onTypeFilterChange(event.target.value as AccountType | "ALL")
          }
        >
          <option value="ALL">All Types</option>
          <option value="MSSP">MSSP</option>
          <option value="CUSTOMER">Customer</option>
        </Select>

        <Button onClick={onCreateAccount}>+ New Account</Button>
      </div>
    </div>
  );
}
