"use client";

import { useMemo, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import UsageFilters from "@/components/usage/UsageFilters/UsageFilters";
import UsageTable, { UsageRow } from "@/components/usage/UsageTable/UsageTable";
import ClientOrganizationDetailPanel from "@/components/clientOrganizations/ClientOrganizationDetailPanel/ClientOrganizationDetailPanel";
import { listClientOrganizations, getLatestTwoUsageRecords } from "@/services";

export default function UsageView() {
  const [organizations] = useState(() => listClientOrganizations());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);

  const rows: UsageRow[] = useMemo(() => {
    return organizations.map((organization) => {
      const latestTwo = getLatestTwoUsageRecords(organization.id);
      const [latest, previous] = latestTwo;

      const utilization =
        organization.seatsAllocated > 0
          ? (organization.seatsActive / organization.seatsAllocated) * 100
          : 0;

      const trendPercent =
        latest && previous && previous.activeSeats > 0
          ? ((latest.activeSeats - previous.activeSeats) / previous.activeSeats) * 100
          : null;

      return {
        organizationId: organization.id,
        organizationName: organization.name,
        seatsAllocated: organization.seatsAllocated,
        seatsActive: organization.seatsActive,
        utilization,
        trendPercent,
        lastRecorded: latest?.date ?? null,
      };
    });
  }, [organizations]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term === "") return rows;
    return rows.filter((row) => row.organizationName.toLowerCase().includes(term));
  }, [rows, searchTerm]);

  const totals = useMemo(() => {
    const totalAllocated = organizations.reduce(
      (sum, organization) => sum + organization.seatsAllocated,
      0
    );
    const totalActive = organizations.reduce(
      (sum, organization) => sum + organization.seatsActive,
      0
    );
    const overallUtilization = totalAllocated > 0 ? (totalActive / totalAllocated) * 100 : 0;

    return { totalAllocated, totalActive, overallUtilization };
  }, [organizations]);

  const selectedOrganization =
    organizations.find((organization) => organization.id === selectedOrganizationId) ?? null;

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

      <UsageTable rows={filteredRows} onSelectOrganization={setSelectedOrganizationId} />

      <ClientOrganizationDetailPanel
        organization={selectedOrganization}
        onClose={() => setSelectedOrganizationId(null)}
        defaultTab="usage"
      />
    </>
  );
}
