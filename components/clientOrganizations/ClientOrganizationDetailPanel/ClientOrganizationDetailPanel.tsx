"use client";

import { useState } from "react";
import type { ClientOrganization } from "@/types";
import SlideOver from "@/components/ui/SlideOver";
import Tabs, { TabItem } from "@/components/ui/Tabs";
import Badge from "@/components/ui/Badge";
import TrendBadge from "@/components/ui/TrendBadge";
import EmptyState from "@/components/ui/EmptyState";
import {
  administrationModeTone,
  organizationStatusTone,
  contractStatusTone,
  serviceStatusTone,
  portalUserStatusTone,
} from "@/utils/statusTone";
import { getEffectiveContractStatus } from "@/utils/contractStatus";
import { getCapacityWarning } from "@/utils/thresholds";
import { formatDate } from "@/utils/format";
import {
  listContractsByOrganization,
  listUsageByOrganization,
  getLatestTwoUsageRecords,
  listAdministratorsByOrganization,
} from "@/services";

type ClientOrganizationDetailPanelProps = {
  organization: ClientOrganization | null;
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

export default function ClientOrganizationDetailPanel({
  organization,
  onClose,
  defaultTab = "general",
}: ClientOrganizationDetailPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [lastOrganizationId, setLastOrganizationId] = useState(organization?.id ?? null);

  if (organization && organization.id !== lastOrganizationId) {
    setLastOrganizationId(organization.id);
    setActiveTab(defaultTab);
  }

  return (
    <SlideOver
      title={organization?.name ?? ""}
      subtitle={
        organization ? `Parent: ${organization.parentOrganizationName ?? "—"}` : undefined
      }
      open={organization !== null}
      onClose={onClose}
      widthClassName="max-w-3xl"
    >
      {organization && (
        <div className="flex flex-col gap-4">
          <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

          {activeTab === "general" && <GeneralTab organization={organization} />}
          {activeTab === "services" && <ServicesTab organization={organization} />}
          {activeTab === "usage" && <UsageTab organization={organization} />}
          {activeTab === "administrators" && <AdministratorsTab organization={organization} />}
          {activeTab === "issues" && <IssuesTab organization={organization} />}
          {activeTab === "license" && <LicenseTab organization={organization} />}
        </div>
      )}
    </SlideOver>
  );
}

function GeneralTab({ organization }: { organization: ClientOrganization }) {
  const rows: [string, string][] = [
    ["Organization Name", organization.name],
    ["Parent Account", organization.parentOrganizationName ?? "—"],
    ["Main Administrator", organization.mainAdministratorEmail],
    ["Primary Contact", organization.primaryContact],
    ["Seats Allocated", String(organization.seatsAllocated)],
    ["Seats Active", String(organization.seatsActive)],
    ["Earliest Contract Expiry", formatDate(organization.earliestContractExpiry)],
    ["Account Created", formatDate(organization.createdAt)],
  ];

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Badge label={organization.status} tone={organizationStatusTone(organization.status)} />
        <Badge
          label={organization.administrationMode}
          tone={administrationModeTone(organization.administrationMode)}
        />
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

function ServicesTab({ organization }: { organization: ClientOrganization }) {
  const contracts = listContractsByOrganization(organization.id);

  return (
    <div>
      {contracts.length > 0 && (
        <p className="mb-3 text-sm text-gray-500">
          {organization.seatsAllocated} seats allocated to this organization, shared across{" "}
          {contracts.length} service contract{contracts.length > 1 ? "s" : ""} below.
        </p>
      )}
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
                    label={getEffectiveContractStatus(contract)}
                    tone={contractStatusTone(getEffectiveContractStatus(contract))}
                  />
                </td>
              </tr>
            ))}

            {contracts.length === 0 && (
              <EmptyState message="No contracts on this account yet." colSpan={7} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsageTab({ organization }: { organization: ClientOrganization }) {
  const usage = listUsageByOrganization(organization.id);
  const [latest, previous] = getLatestTwoUsageRecords(organization.id);
  const trendPercent =
    latest && previous && previous.activeSeats > 0
      ? ((latest.activeSeats - previous.activeSeats) / previous.activeSeats) * 100
      : null;

  const utilization =
    organization.seatsAllocated > 0
      ? (organization.seatsActive / organization.seatsAllocated) * 100
      : 0;
  const capacityWarning = getCapacityWarning(utilization);

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border p-3">
          <p className="text-xs text-gray-500">Seats Allocated</p>
          <p className="text-lg font-semibold text-gray-900">{organization.seatsAllocated}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs text-gray-500">Seats Active</p>
          <p className="text-lg font-semibold text-gray-900">{organization.seatsActive}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs text-gray-500">Available Seats</p>
          <p className="text-lg font-semibold text-gray-900">
            {organization.seatsAllocated - organization.seatsActive}
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs text-gray-500">Utilization</p>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900">{utilization.toFixed(0)}%</p>
            <TrendBadge trendPercent={trendPercent} />
          </div>
        </div>
      </div>

      {capacityWarning && (
        <div className="mb-4">
          <Badge label={capacityWarning.label} tone={capacityWarning.tone} />
        </div>
      )}

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
              <EmptyState message="No usage history recorded yet." colSpan={4} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdministratorsTab({ organization }: { organization: ClientOrganization }) {
  const users = listAdministratorsByOrganization(organization.id);

  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <Badge label={user.status} tone={portalUserStatusTone(user.status)} />
        </div>
      ))}

      {users.length === 0 && (
        <p className="text-sm text-gray-500">No administrators invited yet.</p>
      )}
    </div>
  );
}

function IssuesTab({ organization }: { organization: ClientOrganization }) {
  if (organization.operationalIssues === 0) {
    return (
      <p className="text-sm text-gray-500">
        No open operational issues have been reported for this organization.
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {organization.operationalIssues} operational issue
      {organization.operationalIssues > 1 ? "s" : ""} currently require attention on this
      organization. Contact the primary contact to coordinate resolution.
    </div>
  );
}

function LicenseTab({ organization }: { organization: ClientOrganization }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        License permission management for {organization.name} is not yet available.
      </p>

      {organization.services.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase text-gray-400">
            Current Service Licenses
          </p>
          <div className="flex flex-wrap gap-2">
            {organization.services.map((service) => (
              <Badge
                key={service.name}
                label={service.name}
                tone={serviceStatusTone(service.status)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
