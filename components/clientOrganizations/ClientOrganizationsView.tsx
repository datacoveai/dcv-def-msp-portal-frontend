"use client";

import { useEffect, useMemo, useState } from "react";
import ClientOrganizationSummaryTiles, {
  ClientOrganizationSummaryFilter,
} from "@/components/clientOrganizations/ClientOrganizationSummaryTiles/ClientOrganizationSummaryTiles";
import ClientOrganizationFilters from "@/components/clientOrganizations/ClientOrganizationFilters/ClientOrganizationFilters";
import ClientOrganizationTable from "@/components/clientOrganizations/ClientOrganizationTable/ClientOrganizationTable";
import ClientOrganizationDetailPanel from "@/components/clientOrganizations/ClientOrganizationDetailPanel/ClientOrganizationDetailPanel";
import ClientOrganizationForm from "@/components/clientOrganizations/ClientOrganizationForm/ClientOrganizationForm";
import Toast from "@/components/ui/Toast";
import { listClientOrganizations, listContracts, computeClientOrganizationSummary } from "@/services";
import type { AdministrationMode, ClientOrganization, NewClientOrganizationInput } from "@/types";

const contracts = listContracts();

function matchesSummaryFilter(
  organization: ClientOrganization,
  filter: ClientOrganizationSummaryFilter
): boolean {
  switch (filter) {
    case "all":
      return true;
    case "requiresActivation":
      return organization.services.some(
        (service) => service.status === "Require Activation"
      );
    case "aboutToExpire":
      return contracts.some(
        (contract) =>
          contract.organizationId === organization.id &&
          contract.contractStatus === "About to Expire"
      );
    case "expired":
      return contracts.some(
        (contract) =>
          contract.organizationId === organization.id &&
          contract.contractStatus === "Expired"
      );
    case "operationalIssues":
      return organization.operationalIssues > 0;
  }
}

export default function ClientOrganizationsView() {
  const [organizations, setOrganizations] = useState<ClientOrganization[]>(() =>
    listClientOrganizations()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [administrationModeFilter, setAdministrationModeFilter] = useState<
    AdministrationMode | "ALL"
  >("ALL");
  const [summaryFilter, setSummaryFilter] = useState<ClientOrganizationSummaryFilter>("all");
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const summary = useMemo(
    () => computeClientOrganizationSummary(organizations, contracts),
    [organizations]
  );

  const filteredOrganizations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return organizations.filter((organization) => {
      const matchesSearch =
        term === "" ||
        organization.name.toLowerCase().includes(term) ||
        organization.primaryContact.toLowerCase().includes(term);

      const matchesMode =
        administrationModeFilter === "ALL" ||
        organization.administrationMode === administrationModeFilter;

      return (
        matchesSearch &&
        matchesMode &&
        matchesSummaryFilter(organization, summaryFilter)
      );
    });
  }, [organizations, searchTerm, administrationModeFilter, summaryFilter]);

  const selectedOrganization =
    organizations.find((organization) => organization.id === selectedOrganizationId) ?? null;

  function updateOrganizationStatus(
    id: string,
    status: ClientOrganization["status"],
    message: string
  ) {
    setOrganizations((current) =>
      current.map((organization) =>
        organization.id === id ? { ...organization, status } : organization
      )
    );
    setToastMessage(message);
  }

  function handleCreateOrganization(input: NewClientOrganizationInput) {
    const newOrganization: ClientOrganization = {
      id: `acc-${organizations.length + 1}-${Date.now()}`,
      name: input.name,
      parentOrganizationId: "msp-1",
      parentOrganizationName: "TTEC Computers",
      status: input.isTrial ? "Trial" : "Pending",
      services: [],
      operationalIssues: 0,
      earliestContractExpiry: input.trialEndDate,
      createdAt: new Date().toISOString().slice(0, 10),
      mainAdministratorEmail: input.mainAdministratorEmail,
      primaryContact: input.primaryContact,
      administrationMode: input.administrationMode,
      seatsAllocated: input.seatsAllocated,
      seatsActive: 0,
    };

    setOrganizations((current) => [...current, newOrganization]);
    setFormOpen(false);
    setToastMessage(`${newOrganization.name} was created and an invite was sent.`);
  }

  return (
    <>
      <ClientOrganizationSummaryTiles
        summary={summary}
        activeFilter={summaryFilter}
        onFilterChange={setSummaryFilter}
      />

      <ClientOrganizationFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        administrationModeFilter={administrationModeFilter}
        onAdministrationModeFilterChange={setAdministrationModeFilter}
        onCreateOrganization={() => setFormOpen(true)}
      />

      <ClientOrganizationTable
        organizations={filteredOrganizations}
        onSelectOrganization={setSelectedOrganizationId}
        onSuspend={(id) => updateOrganizationStatus(id, "Suspended", "Client organization suspended.")}
        onArchive={(id) => updateOrganizationStatus(id, "Archived", "Client organization archived.")}
        onResendInvite={(id) => {
          const organization = organizations.find((item) => item.id === id);
          setToastMessage(
            organization
              ? `Invite resent to ${organization.mainAdministratorEmail}.`
              : "Invite resent."
          );
        }}
        onExport={(id) => {
          const organization = organizations.find((item) => item.id === id);
          setToastMessage(
            organization ? `Exporting data for ${organization.name}...` : "Export started."
          );
        }}
      />

      <ClientOrganizationDetailPanel
        organization={selectedOrganization}
        onClose={() => setSelectedOrganizationId(null)}
      />

      <ClientOrganizationForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateOrganization}
      />

      <Toast message={toastMessage} />
    </>
  );
}
