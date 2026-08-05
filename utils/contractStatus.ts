import type { Contract, ContractStatus } from "@/types";

export const ABOUT_TO_EXPIRE_WINDOW_DAYS = 30;

/**
 * Promotes an "Active" contract to "About to Expire" or "Expired" based on
 * expiresOn vs. today. Pending/Rejected/Terminated/Expired are deliberate,
 * author- or action-set states and are never overridden.
 */
export function getEffectiveContractStatus(
  contract: Contract,
  today: Date = new Date()
): ContractStatus {
  if (contract.contractStatus !== "Active" || !contract.expiresOn) {
    return contract.contractStatus;
  }

  const expiresOn = new Date(contract.expiresOn);
  const daysUntilExpiry = Math.floor(
    (expiresOn.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilExpiry < 0) {
    return "Expired";
  }

  if (daysUntilExpiry <= ABOUT_TO_EXPIRE_WINDOW_DAYS) {
    return "About to Expire";
  }

  return "Active";
}
