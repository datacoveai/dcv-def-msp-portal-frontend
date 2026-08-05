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
  organizationId: string | null;
  organizationName: string | null;
  twoFactorEnabled: boolean;
  status: PortalUserStatus;
  lastLogin: string | null;
  invitedAt: string | null;
};

export type NewPortalUserInput = {
  name: string;
  email: string;
  role: PortalUserRole;
};
