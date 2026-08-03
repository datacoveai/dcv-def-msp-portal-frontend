export type PortalUserRole =
  | "MSP Admin"
  | "MSP Operator"
  | "Client Org Admin";

export type PortalUserStatus = "Active" | "Invited" | "Suspended";

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  role: PortalUserRole;
  accountId: string;
  accountName: string;
  twoFactorEnabled: boolean;
  status: PortalUserStatus;
  lastLogin: string | null;
};

export type NewPortalUserInput = {
  accountId: string;
  name: string;
  email: string;
  role: PortalUserRole;
};
