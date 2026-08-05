import type { Contract } from "@/types";

export const SERVICE_NAMES = ["Browser - Classic", "Email Security", "Mobile Security"];

const contracts: Contract[] = [
  {
    id: "ctr-1-1",
    organizationId: "acc-1",
    serviceName: "Mobile Security",
    serviceStatus: "Active",
    contractType: "Subscription",
    contractName: "Standard Plan",
    contractStatus: "Active",
    packageSku: "DFN-MOBILE-25",
    quantity: 25,
    registrationDate: "2026-04-17",
    expiresOn: "2033-05-20",
    archived: false,
  },
  {
    id: "ctr-2-1",
    organizationId: "acc-2",
    serviceName: "Email Security",
    serviceStatus: "Active",
    contractType: "Subscription",
    contractName: "Standard Plan",
    contractStatus: "Active",
    packageSku: "DFN-EMAIL-500",
    quantity: 500,
    registrationDate: "2026-02-11",
    expiresOn: "2027-01-01",
    archived: false,
  },
  {
    id: "ctr-2-2",
    organizationId: "acc-2",
    serviceName: "Browser - Classic",
    serviceStatus: "Require Activation",
    contractType: "Subscription",
    contractName: "Add-on",
    contractStatus: "About to Expire",
    packageSku: "DFN-BROWSER-500",
    quantity: 500,
    registrationDate: "2025-08-25",
    expiresOn: "2026-08-25",
    archived: false,
  },
  {
    id: "ctr-3-1",
    organizationId: "acc-3",
    serviceName: "Mobile Security",
    serviceStatus: "Require Activation",
    contractType: "Trial",
    contractName: "Trial",
    contractStatus: "Pending",
    packageSku: "DFN-MOBILE-TRIAL",
    quantity: 50,
    registrationDate: "2026-07-15",
    expiresOn: "2026-09-01",
    archived: false,
  },
  {
    id: "ctr-4-1",
    organizationId: "acc-4",
    serviceName: "Email Security",
    serviceStatus: "Require Activation",
    contractType: "Subscription",
    contractName: "Standard Plan",
    contractStatus: "Expired",
    packageSku: "DFN-EMAIL-120",
    quantity: 120,
    registrationDate: "2025-07-10",
    expiresOn: "2026-07-10",
    archived: false,
  },
  {
    id: "ctr-5-1",
    organizationId: "acc-5",
    serviceName: "Browser - Classic",
    serviceStatus: "Require Activation",
    contractType: "Subscription",
    contractName: "Standard Plan",
    contractStatus: "Pending",
    packageSku: "DFN-BROWSER-80",
    quantity: 80,
    registrationDate: "2026-08-01",
    expiresOn: null,
    archived: false,
  },
];

export function listContracts(): Contract[] {
  return contracts;
}

export function listContractsByOrganization(organizationId: string): Contract[] {
  return contracts.filter((contract) => contract.organizationId === organizationId);
}
