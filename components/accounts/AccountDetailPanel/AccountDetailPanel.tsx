"use client";

import { useState } from "react";
import type { Account } from "@/types";
import SlideOver from "@/components/ui/SlideOver";
import Tabs, { TabItem } from "@/components/ui/Tabs";
import Badge from "@/components/ui/Badge";
import { accountStatusTone, contractStatusTone, serviceStatusTone } from "@/utils/statusTone";
import { formatDate } from "@/utils/format";
import { listContractsByAccount, listUsageByAccount, listUsersByAccount } from "@/services";

type AccountDetailPanelProps = {
  account: Account | null;
  onClose: () => void;
  defaultTab?: string;
};

const TABS: TabItem[] = [
  { id: "general", label: "General" },
  { id: "services", label: "Services & Contracts" },
  { id: "usage", label: "Usage" },
  { id: "administrators", label: "Administrators" },
  { id: "issues", label: "Issues" },
  { id: "license", label: "Manage License Permission" },
];

export default function AccountDetailPanel({
  account,
  onClose,
  defaultTab = "general",
}: AccountDetailPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [lastAccountId, setLastAccountId] = useState(account?.id ?? null);

  if (account && account.id !== lastAccountId) {
    setLastAccountId(account.id);
    setActiveTab(defaultTab);
  }

  return (
    <SlideOver
      title={account?.name ?? ""}
      subtitle={account ? `${account.type} · Parent: ${account.parentAccountName ?? "—"}` : undefined}
      open={account !== null}
      onClose={onClose}
      widthClassName="max-w-3xl"
    >
      {account && (
        <div className="flex flex-col gap-4">
          <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

          {activeTab === "general" && <GeneralTab account={account} />}
          {activeTab === "services" && <ServicesTab account={account} />}
          {activeTab === "usage" && <UsageTab account={account} />}
          {activeTab === "administrators" && <AdministratorsTab account={account} />}
          {activeTab === "issues" && <IssuesTab account={account} />}
          {activeTab === "license" && <LicenseTab account={account} />}
        </div>
      )}
    </SlideOver>
  );
}

function GeneralTab({ account }: { account: Account }) {
  const rows: [string, string][] = [
    ["Account Name", account.name],
    ["Account Type", account.type],
    ["Parent Account", account.parentAccountName ?? "—"],
    ["Main Administrator", account.mainAdministratorEmail],
    ["Seats Allocated", String(account.seatsAllocated)],
    ["Seats Active", String(account.seatsActive)],
    ["Account Created", formatDate(account.accountCreated)],
  ];

  return (
    <div>
      <div className="mb-4">
        <Badge label={account.status} tone={accountStatusTone(account.status)} />
      </div>
      <dl className="divide-y">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between py-2 text-sm">
            <dt className="text-gray-500">{label}</dt>
            <dd className="font-medium text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ServicesTab({ account }: { account: Account }) {
  const contracts = listContractsByAccount(account.id);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left font-medium">Service</th>
            <th className="p-3 text-left font-medium">Contract</th>
            <th className="p-3 text-left font-medium">SKU</th>
            <th className="p-3 text-left font-medium">Qty</th>
            <th className="p-3 text-left font-medium">Registered</th>
            <th className="p-3 text-left font-medium">Expires</th>
            <th className="p-3 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id} className="border-t">
              <td className="p-3">
                <Badge
                  label={contract.serviceName}
                  tone={serviceStatusTone(contract.serviceStatus)}
                />
              </td>
              <td className="p-3 text-gray-700">{contract.contractName}</td>
              <td className="p-3 text-gray-600">{contract.packageSku}</td>
              <td className="p-3 text-gray-600">{contract.quantity}</td>
              <td className="p-3 text-gray-600">{formatDate(contract.registrationDate)}</td>
              <td className="p-3 text-gray-600">{formatDate(contract.expiresOn)}</td>
              <td className="p-3">
                <Badge
                  label={contract.contractStatus}
                  tone={contractStatusTone(contract.contractStatus)}
                />
              </td>
            </tr>
          ))}

          {contracts.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-gray-500">
                No contracts on this account yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function UsageTab({ account }: { account: Account }) {
  const usage = listUsageByAccount(account.id);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left font-medium">Month</th>
            <th className="p-3 text-left font-medium">Active Seats</th>
            <th className="p-3 text-left font-medium">Activations</th>
            <th className="p-3 text-left font-medium">Devices / Seat</th>
          </tr>
        </thead>
        <tbody>
          {usage.map((record) => (
            <tr key={record.date} className="border-t">
              <td className="p-3 text-gray-700">{formatDate(record.date)}</td>
              <td className="p-3 text-gray-900 font-medium">{record.activeSeats}</td>
              <td className="p-3 text-gray-600">{record.activations}</td>
              <td className="p-3 text-gray-600">{record.devicesPerSeat.toFixed(1)}</td>
            </tr>
          ))}

          {usage.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No usage history recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function AdministratorsTab({ account }: { account: Account }) {
  const users = listUsersByAccount(account.id);

  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <Badge
            label={user.status}
            tone={user.status === "Active" ? "green" : user.status === "Invited" ? "amber" : "red"}
          />
        </div>
      ))}

      {users.length === 0 && (
        <p className="text-sm text-gray-500">No administrators invited yet.</p>
      )}
    </div>
  );
}

function IssuesTab({ account }: { account: Account }) {
  if (account.operationalIssues === 0) {
    return <p className="text-sm text-gray-500">No open operational issues.</p>;
  }

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {account.operationalIssues} operational issue
      {account.operationalIssues > 1 ? "s" : ""} require attention on this account.
    </div>
  );
}

function LicenseTab({ account }: { account: Account }) {
  return (
    <p className="text-sm text-gray-500">
      License permission management for {account.name} is not yet available.
    </p>
  );
}
