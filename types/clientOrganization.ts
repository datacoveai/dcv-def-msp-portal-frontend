export type ClientOrganizationStatus =
  | "Paying"
  | "Trial"
  | "Suspended"
  | "Pending"
  | "Archived";

export type ServiceStatus = "Active" | "Require Activation";

export type ContractStatus =
  | "Active"
  | "Pending"
  | "Rejected"
  | "About to Expire"
  | "Expired"
  | "Terminated";

export type AdministrationMode = "MSP Managed" | "Client Managed";

export type OrganizationService = {
  name: string;
  status: ServiceStatus;
};

export type ClientOrganization = {
  id: string;
  name: string;
  parentOrganizationId: string | null;
  parentOrganizationName: string | null;
  status: ClientOrganizationStatus;
  services: OrganizationService[];
  operationalIssues: number;
  earliestContractExpiry: string | null;
  createdAt: string;
  mainAdministratorEmail: string;
  primaryContact: string;
  administrationMode: AdministrationMode;
  seatsAllocated: number;
  seatsActive: number;
};

export type NewClientOrganizationInput = {
  name: string;
  primaryContact: string;
  mainAdministratorEmail: string;
  seatsAllocated: number;
  administrationMode: AdministrationMode;
  isTrial: boolean;
  trialEndDate: string | null;
};
