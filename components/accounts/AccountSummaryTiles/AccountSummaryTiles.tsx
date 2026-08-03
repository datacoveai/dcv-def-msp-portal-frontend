import type { AccountSummary } from "@/services";

export type AccountSummaryFilter =
  | "all"
  | "requiresActivation"
  | "aboutToExpire"
  | "expired"
  | "operationalIssues";

type Tile = {
  key: AccountSummaryFilter;
  label: string;
  value: number;
  accent: string;
};

type AccountSummaryTilesProps = {
  summary: AccountSummary;
  activeFilter: AccountSummaryFilter;
  onFilterChange: (filter: AccountSummaryFilter) => void;
};

export default function AccountSummaryTiles({
  summary,
  activeFilter,
  onFilterChange,
}: AccountSummaryTilesProps) {
  const tiles: Tile[] = [
    {
      key: "all",
      label: `Total accounts (${summary.paying} Paying / ${summary.trial} Trial)`,
      value: summary.total,
      accent: "text-[#0F3A5E]",
    },
    {
      key: "requiresActivation",
      label: "Accounts with services requiring activation",
      value: summary.requiresActivation,
      accent: "text-amber-600",
    },
    {
      key: "aboutToExpire",
      label: "Accounts with contracts about to expire",
      value: summary.aboutToExpire,
      accent: "text-amber-600",
    },
    {
      key: "expired",
      label: "Accounts with expired contracts",
      value: summary.expired,
      accent: "text-red-600",
    },
    {
      key: "operationalIssues",
      label: "Accounts with operational issues",
      value: summary.operationalIssues,
      accent: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {tiles.map((tile) => (
        <button
          key={tile.key}
          onClick={() => onFilterChange(tile.key)}
          className={`rounded-xl bg-white p-4 shadow-sm border text-left transition hover:shadow-md ${
            activeFilter === tile.key
              ? "border-[#0F3A5E] ring-2 ring-[#0F3A5E]/20"
              : ""
          }`}
        >
          <p className={`text-3xl font-bold ${tile.accent}`}>{tile.value}</p>
          <p className="mt-1 text-sm text-gray-500">{tile.label}</p>
        </button>
      ))}
    </div>
  );
}
