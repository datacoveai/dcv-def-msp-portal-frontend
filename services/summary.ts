import type { ClientOrganization, Contract } from "@/types";
import { getEffectiveContractStatus } from "@/utils/contractStatus";

export type ClientOrganizationSummary = {
  total: number;
  paying: number;
  trial: number;
  requiresActivation: number;
  aboutToExpire: number;
  expired: number;
  operationalIssues: number;
  totalAllocatedSeats: number;
  totalActiveSeats: number;
  overallUtilizationPercent: number;
};

export function computeClientOrganizationSummary(
  organizations: ClientOrganization[],
  contracts: Contract[]
): ClientOrganizationSummary {
  const organizationIdsRequiringActivation = new Set(
    organizations
      .filter((organization) =>
        organization.services.some((service) => service.status === "Require Activation")
      )
      .map((organization) => organization.id)
  );

  const organizationIdsAboutToExpire = new Set(
    contracts
      .filter((contract) => getEffectiveContractStatus(contract) === "About to Expire")
      .map((contract) => contract.organizationId)
  );

  const organizationIdsExpired = new Set(
    contracts
      .filter((contract) => getEffectiveContractStatus(contract) === "Expired")
      .map((contract) => contract.organizationId)
  );

  const totalAllocatedSeats = organizations.reduce(
    (sum, organization) => sum + organization.seatsAllocated,
    0
  );
  const totalActiveSeats = organizations.reduce(
    (sum, organization) => sum + organization.seatsActive,
    0
  );

  return {
    total: organizations.length,
    paying: organizations.filter((organization) => organization.status === "Paying").length,
    trial: organizations.filter((organization) => organization.status === "Trial").length,
    requiresActivation: organizationIdsRequiringActivation.size,
    aboutToExpire: organizationIdsAboutToExpire.size,
    expired: organizationIdsExpired.size,
    operationalIssues: organizations.filter(
      (organization) => organization.operationalIssues > 0
    ).length,
    totalAllocatedSeats,
    totalActiveSeats,
    overallUtilizationPercent:
      totalAllocatedSeats > 0 ? (totalActiveSeats / totalAllocatedSeats) * 100 : 0,
  };
}
