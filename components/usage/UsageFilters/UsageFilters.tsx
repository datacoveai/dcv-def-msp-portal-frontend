import Input from "@/components/ui/Input";

type UsageFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
};

export default function UsageFilters({
  searchTerm,
  onSearchTermChange,
}: UsageFiltersProps) {
  return (
    <div className="mt-8 mb-2 flex">
      <Input
        type="text"
        placeholder="Search by organization name..."
        className="w-full md:w-96"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
      />
    </div>
  );
}
