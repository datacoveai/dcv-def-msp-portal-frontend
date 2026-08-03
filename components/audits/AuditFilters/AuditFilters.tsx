import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

type AuditFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  actors: string[];
  actorFilter: string | "ALL";
  onActorFilterChange: (value: string | "ALL") => void;
  actions: string[];
  actionFilter: string | "ALL";
  onActionFilterChange: (value: string | "ALL") => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
  onExportCsv: () => void;
};

export default function AuditFilters({
  searchTerm,
  onSearchTermChange,
  actors,
  actorFilter,
  onActorFilterChange,
  actions,
  actionFilter,
  onActionFilterChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onExportCsv,
}: AuditFiltersProps) {
  return (
    <div className="mt-8 mb-2 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
      <div className="flex flex-col md:flex-row flex-wrap gap-3">
        <Input
          type="text"
          placeholder="Search actor, action, account, or details..."
          className="w-full md:w-72"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />

        <Select
          value={actorFilter}
          onChange={(event) => onActorFilterChange(event.target.value)}
        >
          <option value="ALL">All Actors</option>
          {actors.map((actor) => (
            <option key={actor} value={actor}>
              {actor}
            </option>
          ))}
        </Select>

        <Select
          value={actionFilter}
          onChange={(event) => onActionFilterChange(event.target.value)}
        >
          <option value="ALL">All Actions</option>
          {actions.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </Select>

        <Input
          type="date"
          aria-label="From date"
          value={dateFrom}
          onChange={(event) => onDateFromChange(event.target.value)}
        />

        <Input
          type="date"
          aria-label="To date"
          value={dateTo}
          onChange={(event) => onDateToChange(event.target.value)}
        />
      </div>

      <Button onClick={onExportCsv}>Export CSV</Button>
    </div>
  );
}
