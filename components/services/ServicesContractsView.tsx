"use client";

import { useEffect, useMemo, useState } from "react";
import ContractFilters from "@/components/services/ContractFilters/ContractFilters";
import ContractsTable, { ContractRow } from "@/components/services/ContractsTable/ContractsTable";
import ContractForm from "@/components/services/ContractForm/ContractForm";
import AccountDetailPanel from "@/components/accounts/AccountDetailPanel/AccountDetailPanel";
import Toast from "@/components/ui/Toast";
import { listAccounts, listContracts } from "@/services";
import type { Contract, ContractStatus, NewContractInput } from "@/types";

export default function ServicesContractsView() {
  const [accounts] = useState(() => listAccounts());
  const [contracts, setContracts] = useState<Contract[]>(() => listContracts());
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "ALL">("ALL");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const accountsById = useMemo(() => {
    const map = new Map(accounts.map((account) => [account.id, account]));
    return map;
  }, [accounts]);

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
        accountName: accountsById.get(contract.accountId)?.name ?? "Unknown Account",
      }))
      .filter((row) => {
        if (term === "") return true;
        return (
          row.accountName.toLowerCase().includes(term) ||
          row.contractName.toLowerCase().includes(term) ||
          row.packageSku.toLowerCase().includes(term)
        );
      });
  }, [contracts, accountsById, searchTerm, serviceFilter, statusFilter, showArchived]);

  const selectedAccount = accountsById.get(selectedAccountId ?? "") ?? null;

  function handleAddContract(input: NewContractInput) {
    const newContract: Contract = {
      id: `ctr-${contracts.length + 1}-${Date.now()}`,
      accountId: input.accountId,
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
      `Contract added for ${accountsById.get(input.accountId)?.name ?? "account"}.`
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
        onAddContract={() => setFormOpen(true)}
      />

      <ContractsTable rows={rows} onSelectAccount={setSelectedAccountId} />

      <AccountDetailPanel
        account={selectedAccount}
        onClose={() => setSelectedAccountId(null)}
        defaultTab="services"
      />

      <ContractForm
        open={formOpen}
        accounts={accounts}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddContract}
      />

      <Toast message={toastMessage} />
    </>
  );
}
