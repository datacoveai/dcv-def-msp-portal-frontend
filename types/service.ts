import type { ContractStatus, ServiceStatus } from "./clientOrganization";

export type Sku = {
  id: string;
  name: string;
  sellable: boolean;
  roadmap: boolean;
};

export type Contract = {
  id: string;
  organizationId: string;
  serviceName: string;
  serviceStatus: ServiceStatus;
  contractType: string;
  contractName: string;
  contractStatus: ContractStatus;
  packageSku: string;
  quantity: number;
  registrationDate: string;
  expiresOn: string | null;
  archived: boolean;
};

export type NewContractInput = {
  organizationId: string;
  serviceName: string;
  contractType: string;
  contractName: string;
  packageSku: string;
  quantity: number;
  registrationDate: string;
  expiresOn: string | null;
};
