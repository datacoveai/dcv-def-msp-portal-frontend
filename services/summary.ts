import type { Account, Contract } from "@/types";

export type AccountSummary = {
  total: number;
  paying: number;
  trial: number;
  requiresActivation: number;
  aboutToExpire: number;
  expired: number;
  operationalIssues: number;
};

export function computeAccountSummary(
  accounts: Account[],
  contracts: Contract[]
): AccountSummary {
  const accountIdsRequiringActivation = new Set(
    accounts
      .filter((account) =>
        account.services.some((service) => service.status === "Require Activation")
      )
      .map((account) => account.id)
  );

  const accountIdsAboutToExpire = new Set(
    contracts
      .filter((contract) => contract.contractStatus === "About to Expire")
      .map((contract) => contract.accountId)
  );

  const accountIdsExpired = new Set(
    contracts
      .filter((contract) => contract.contractStatus === "Expired")
      .map((contract) => contract.accountId)
  );

  return {
    total: accounts.length,
    paying: accounts.filter((account) => account.status === "Paying").length,
    trial: accounts.filter((account) => account.status === "Trial").length,
    requiresActivation: accountIdsRequiringActivation.size,
    aboutToExpire: accountIdsAboutToExpire.size,
    expired: accountIdsExpired.size,
    operationalIssues: accounts.filter((account) => account.operationalIssues > 0)
      .length,
  };
}
