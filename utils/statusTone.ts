import type { AccountStatus, ContractStatus, ServiceStatus } from "@/types";

type Tone = "green" | "amber" | "red" | "teal" | "gray";

export function accountStatusTone(status: AccountStatus): Tone {
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
  }
}
