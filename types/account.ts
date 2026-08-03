export type AccountType = "MSSP" | "CUSTOMER";

export type AccountStatus =
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
  | "Expired";

export type AccountService = {
  name: string;
  status: ServiceStatus;
};

export type Account = {
  id: string;
  name: string;
  type: AccountType;
  parentAccountId: string | null;
  parentAccountName: string | null;
  status: AccountStatus;
  services: AccountService[];
  operationalIssues: number;
  earliestContractExpiry: string | null;
  accountCreated: string;
  mainAdministratorEmail: string;
  seatsAllocated: number;
  seatsActive: number;
};

export type NewAccountInput = {
  name: string;
  type: AccountType;
  mainAdministratorEmail: string;
  seatsAllocated: number;
  isTrial: boolean;
  trialEndDate: string | null;
};
