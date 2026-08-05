"use client";

import { useEffect, useMemo, useState } from "react";
import ContractFilters from "@/components/services/ContractFilters/ContractFilters";
import ContractsTable, { ContractRow } from "@/components/services/ContractsTable/ContractsTable";
import ContractForm from "@/components/services/ContractForm/ContractForm";
import ClientOrganizationDetailPanel from "@/components/clientOrganizations/ClientOrganizationDetailPanel/ClientOrganizationDetailPanel";
import Toast from "@/components/ui/Toast";
import { listClientOrganizations, listContracts } from "@/services";
import type { Contract, ContractStatus, NewContractInput } from "@/types";

export default function ServicesContractsView() {
  const [organizations] = useState(() => listClientOrganizations());
  const [contracts, setContracts] = useState<Contract[]>(() => listContracts());
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "ALL">("ALL");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const organizationsById = useMemo(() => {
    const map = new Map(organizations.map((organization) => [organization.id, organization]));
    return map;
  }, [organizations]);

  const rows: ContractRow[] = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return contracts
      .filter((contract) => showArchived || !contract.archived)
      .filter(
        (contract) => serviceFilter === "ALL" || contract.serviceName === serviceFilter
      )
      .filter(
        (contract) => statusFilter === "ALL" || contract.contractStatus === statusFilter
      )
      .map((contract) => ({
        ...contract,
        organizationName:
          organizationsById.get(contract.organizationId)?.name ?? "Unknown Organization",
      }))
      .filter((row) => {
        if (term === "") return true;
        return (
          row.organizationName.toLowerCase().includes(term) ||
          row.contractName.toLowerCase().includes(term) ||
          row.packageSku.toLowerCase().includes(term)
        );
      });
  }, [contracts, organizationsById, searchTerm, serviceFilter, statusFilter, showArchived]);

  const selectedOrganization = organizationsById.get(selectedOrganizationId ?? "") ?? null;

  function handleAddContract(input: NewContractInput) {
    const newContract: Contract = {
      id: `ctr-${contracts.length + 1}-${Date.now()}`,
      organizationId: input.organizationId,
      serviceName: input.serviceName,
      serviceStatus: "Require Activation",
      contractType: input.contractType,
      contractName: input.contractName,
      contractStatus: "Pending",
      packageSku: input.packageSku,
      quantity: input.quantity,
      registrationDate: input.registrationDate,
      expiresOn: input.expiresOn,
      archived: false,
    };

    setContracts((current) => [...current, newContract]);
    setFormOpen(false);
    setToastMessage(
      `Contract added for ${organizationsById.get(input.organizationId)?.name ?? "organization"}.`
    );
  }

  function handleEditContractSubmit(contractId: string, input: NewContractInput) {
    setContracts((current) =>
      current.map((contract) =>
        contract.id === contractId
          ? {
              ...contract,
              organizationId: input.organizationId,
              serviceName: input.serviceName,
              contractType: input.contractType,
              contractName: input.contractName,
              packageSku: input.packageSku,
              quantity: input.quantity,
              registrationDate: input.registrationDate,
              expiresOn: input.expiresOn,
            }
          : contract
      )
    );
    setFormOpen(false);
    setEditingContract(null);
    setToastMessage("Contract updated.");
  }

  function handleOpenAddForm() {
    setEditingContract(null);
    setFormOpen(true);
  }

  function handleOpenEditForm(contractId: string) {
    const contract = contracts.find((item) => item.id === contractId);
    if (!contract) return;
    setEditingContract(contract);
    setFormOpen(true);
  }

  function handleRenewContract(contractId: string) {
    setContracts((current) =>
      current.map((contract) => {
        if (contract.id !== contractId) return contract;

        const base = contract.expiresOn ? new Date(contract.expiresOn) : new Date();
        base.setFullYear(base.getFullYear() + 1);

        return {
          ...contract,
          expiresOn: base.toISOString().slice(0, 10),
          contractStatus:
            contract.serviceStatus === "Require Activation" ? "Pending" : "Active",
        };
      })
    );

    const contract = contracts.find((item) => item.id === contractId);
    setToastMessage(
      `Contract renewed for ${organizationsById.get(contract?.organizationId ?? "")?.name ?? "organization"}.`
    );
  }

  function handleTerminateContract(contractId: string) {
    setContracts((current) =>
      current.map((contract) =>
        contract.id === contractId ? { ...contract, contractStatus: "Terminated" } : contract
      )
    );

    const contract = contracts.find((item) => item.id === contractId);
    setToastMessage(
      `Contract terminated for ${organizationsById.get(contract?.organizationId ?? "")?.name ?? "organization"}.`
    );
  }

  return (
    <>
      <ContractFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        showArchived={showArchived}
        onShowArchivedChange={setShowArchived}
        onAddContract={handleOpenAddForm}
      />

      <ContractsTable
        rows={rows}
        onSelectOrganization={setSelectedOrganizationId}
        onEditContract={handleOpenEditForm}
        onRenewContract={handleRenewContract}
        onTerminateContract={handleTerminateContract}
      />

      <ClientOrganizationDetailPanel
        organization={selectedOrganization}
        onClose={() => setSelectedOrganizationId(null)}
        defaultTab="services"
      />

      <ContractForm
        open={formOpen}
        organizations={organizations}
        initialContract={editingContract}
        onClose={() => {
          setFormOpen(false);
          setEditingContract(null);
        }}
        onSubmit={handleAddContract}
        onEditSubmit={handleEditContractSubmit}
      />

      <Toast message={toastMessage} />
    </>
  );
}
