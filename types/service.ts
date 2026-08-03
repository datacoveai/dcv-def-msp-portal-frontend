import type { ContractStatus, ServiceStatus } from "./account";

export type Sku = {
  id: string;
  name: string;
  sellable: boolean;
  roadmap: boolean;
};

export type Contract = {
  id: string;
  accountId: string;
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
  accountId: string;
  serviceName: string;
  contractType: string;
  contractName: string;
  packageSku: string;
  quantity: number;
  registrationDate: string;
  expiresOn: string | null;
};
