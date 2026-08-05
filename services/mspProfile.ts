import type { MspProfile } from "@/types";

const mspProfile: MspProfile = {
  id: "msp-1",
  name: "TTEC Computers",
  supportEmail: "admin@ttec.com",
};

export function getMspProfile(): MspProfile {
  return mspProfile;
}
