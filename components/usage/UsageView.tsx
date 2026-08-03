"use client";

import { useMemo, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import UsageFilters from "@/components/usage/UsageFilters/UsageFilters";
import UsageTable, { UsageRow } from "@/components/usage/UsageTable/UsageTable";
import AccountDetailPanel from "@/components/accounts/AccountDetailPanel/AccountDetailPanel";
import { listAccounts, getLatestTwoUsageRecords } from "@/services";

export default function UsageView() {
  const [accounts] = useState(() => listAccounts());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const rows: UsageRow[] = useMemo(() => {
    return accounts.map((account) => {
      const latestTwo = getLatestTwoUsageRecords(account.id);
      const [latest, previous] = latestTwo;

      const utilization =
        account.seatsAllocated > 0
          ? (account.seatsActive / account.seatsAllocated) * 100
          : 0;

      const trendPercent =
        latest && previous && previous.activeSeats > 0
          ? ((latest.activeSeats - previous.activeSeats) / previous.activeSeats) * 100
          : null;

      return {
        accountId: account.id,
        accountName: account.name,
        accountType: account.type,
        seatsAllocated: account.seatsAllocated,
        seatsActive: account.seatsActive,
        utilization,
        trendPercent,
        lastRecorded: latest?.date ?? null,
      };
    });
  }, [accounts]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term === "") return rows;
    return rows.filter((row) => row.accountName.toLowerCase().includes(term));
  }, [rows, searchTerm]);

  const totals = useMemo(() => {
    const totalAllocated = accounts.reduce((sum, account) => sum + account.seatsAllocated, 0);
    const totalActive = accounts.reduce((sum, account) => sum + account.seatsActive, 0);
    const overallUtilization = totalAllocated > 0 ? (totalActive / totalAllocated) * 100 : 0;

    return { totalAllocated, totalActive, overallUtilization };
  }, [accounts]);

  const selectedAccount =
    accounts.find((account) => account.id === selectedAccountId) ?? null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Seats Allocated" value={String(totals.totalAllocated)} />
        <StatCard title="Total Active Seats" value={String(totals.totalActive)} />
        <StatCard
          title="Overall Utilization"
          value={`${totals.overallUtilization.toFixed(0)}%`}
        />
      </div>

      <UsageFilters searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

      <UsageTable rows={filteredRows} onSelectAccount={setSelectedAccountId} />

      <AccountDetailPanel
        account={selectedAccount}
        onClose={() => setSelectedAccountId(null)}
        defaultTab="usage"
      />
    </>
  );
}
