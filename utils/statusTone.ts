import type {
  AdministrationMode,
  ClientOrganizationStatus,
  ContractStatus,
  PortalUserStatus,
  ServiceStatus,
} from "@/types";

type Tone = "green" | "amber" | "red" | "teal" | "gray";

export function organizationStatusTone(status: ClientOrganizationStatus): Tone {
  switch (status) {
    case "Paying":
      return "green";
    case "Trial":
      return "teal";
    case "Pending":
      return "amber";
    case "Suspended":
      return "red";
    case "Archived":
      return "gray";
  }
}

export function serviceStatusTone(status: ServiceStatus): Tone {
  return status === "Active" ? "green" : "amber";
}

export function contractStatusTone(status: ContractStatus): Tone {
  switch (status) {
    case "Active":
      return "green";
    case "Pending":
      return "amber";
    case "About to Expire":
      return "amber";
    case "Rejected":
      return "red";
    case "Expired":
      return "red";
    case "Terminated":
      return "red";
  }
}

export function administrationModeTone(mode: AdministrationMode): Tone {
  return mode === "MSP Managed" ? "gray" : "teal";
}

export function portalUserStatusTone(status: PortalUserStatus): Tone {
  switch (status) {
    case "Active":
      return "green";
    case "Invited":
      return "amber";
    case "Suspended":
      return "red";
  }
}
