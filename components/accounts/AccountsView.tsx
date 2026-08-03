"use client";

import { useEffect, useMemo, useState } from "react";
import AccountSummaryTiles, {
  AccountSummaryFilter,
} from "@/components/accounts/AccountSummaryTiles/AccountSummaryTiles";
import AccountFilters from "@/components/accounts/AccountFilters/AccountFilters";
import AccountTable from "@/components/accounts/AccountTable/AccountTable";
import AccountDetailPanel from "@/components/accounts/AccountDetailPanel/AccountDetailPanel";
import AccountForm from "@/components/accounts/AccountForm/AccountForm";
import Toast from "@/components/ui/Toast";
import { listAccounts, listContracts, computeAccountSummary } from "@/services";
import type { Account, AccountType, NewAccountInput } from "@/types";

const contracts = listContracts();

function matchesSummaryFilter(
  account: Account,
  filter: AccountSummaryFilter
): boolean {
  switch (filter) {
    case "all":
      return true;
    case "requiresActivation":
      return account.services.some(
        (service) => service.status === "Require Activation"
      );
    case "aboutToExpire":
      return contracts.some(
        (contract) =>
          contract.accountId === account.id &&
          contract.contractStatus === "About to Expire"
      );
    case "expired":
      return contracts.some(
        (contract) =>
          contract.accountId === account.id &&
          contract.contractStatus === "Expired"
      );
    case "operationalIssues":
      return account.operationalIssues > 0;
  }
}

export default function AccountsView() {
  const [accounts, setAccounts] = useState<Account[]>(() => listAccounts());
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<AccountType | "ALL">("ALL");
  const [summaryFilter, setSummaryFilter] = useState<AccountSummaryFilter>("all");
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const summary = useMemo(
    () => computeAccountSummary(accounts, contracts),
    [accounts]
  );

  const filteredAccounts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return accounts.filter((account) => {
      const matchesSearch =
        term === "" ||
        account.name.toLowerCase().includes(term) ||
        account.mainAdministratorEmail.toLowerCase().includes(term);

      const matchesType = typeFilter === "ALL" || account.type === typeFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesSummaryFilter(account, summaryFilter)
      );
    });
  }, [accounts, searchTerm, typeFilter, summaryFilter]);

  const selectedAccount =
    accounts.find((account) => account.id === selectedAccountId) ?? null;

  function updateAccountStatus(id: string, status: Account["status"], message: string) {
    setAccounts((current) =>
      current.map((account) =>
        account.id === id ? { ...account, status } : account
      )
    );
    setToastMessage(message);
  }

  function handleCreateAccount(input: NewAccountInput) {
    const newAccount: Account = {
      id: `acc-${accounts.length + 1}-${Date.now()}`,
      name: input.name,
      type: input.type,
      parentAccountId: "acc-msp",
      parentAccountName: "TTEC Computers",
      status: input.isTrial ? "Trial" : "Pending",
      services: [],
      operationalIssues: 0,
      earliestContractExpiry: input.trialEndDate,
      accountCreated: new Date().toISOString().slice(0, 10),
      mainAdministratorEmail: input.mainAdministratorEmail,
      seatsAllocated: input.seatsAllocated,
      seatsActive: 0,
    };

    setAccounts((current) => [...current, newAccount]);
    setFormOpen(false);
    setToastMessage(`${newAccount.name} was created and an invite was sent.`);
  }

  return (
    <>
      <AccountSummaryTiles
        summary={summary}
        activeFilter={summaryFilter}
        onFilterChange={setSummaryFilter}
      />

      <AccountFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onCreateAccount={() => setFormOpen(true)}
      />

      <AccountTable
        accounts={filteredAccounts}
        onSelectAccount={setSelectedAccountId}
        onSuspend={(id) => updateAccountStatus(id, "Suspended", "Account suspended.")}
        onArchive={(id) => updateAccountStatus(id, "Archived", "Account archived.")}
        onResendInvite={(id) => {
          const account = accounts.find((item) => item.id === id);
          setToastMessage(
            account
              ? `Invite resent to ${account.mainAdministratorEmail}.`
              : "Invite resent."
          );
        }}
        onExport={(id) => {
          const account = accounts.find((item) => item.id === id);
          setToastMessage(
            account ? `Exporting data for ${account.name}...` : "Export started."
          );
        }}
      />

      <AccountDetailPanel
        account={selectedAccount}
        onClose={() => setSelectedAccountId(null)}
      />

      <AccountForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateAccount}
      />

      <Toast message={toastMessage} />
    </>
  );
}
