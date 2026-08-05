import type { PortalUser } from "@/types";

const users: PortalUser[] = [
  {
    id: "usr-1",
    name: "Avery Brooks",
    email: "avery.brooks@ttec.com",
    role: "MSP Admin",
    organizationId: null,
    organizationName: null,
    twoFactorEnabled: true,
    status: "Active",
    lastLogin: "2026-08-02T14:32:00Z",
    invitedAt: null,
  },
  {
    id: "usr-2",
    name: "Jordan Lee",
    email: "jordan.lee@ttec.com",
    role: "MSP Operator",
    organizationId: null,
    organizationName: null,
    twoFactorEnabled: true,
    status: "Active",
    lastLogin: "2026-08-01T09:10:00Z",
    invitedAt: null,
  },
  {
    id: "usr-3",
    name: "Morgan Diaz",
    email: "office@kingstreetdentistry.com",
    role: "Client Org Admin",
    organizationId: "acc-1",
    organizationName: "King Street Dentistry",
    twoFactorEnabled: false,
    status: "Active",
    lastLogin: "2026-07-30T11:05:00Z",
    invitedAt: null,
  },
  {
    id: "usr-4",
    name: "Priya Nair",
    email: "it@abccorp.com",
    role: "Client Org Admin",
    organizationId: "acc-2",
    organizationName: "ABC Corporation",
    twoFactorEnabled: false,
    status: "Invited",
    lastLogin: null,
    invitedAt: "2026-07-28T13:20:00Z",
  },
  {
    id: "usr-5",
    name: "Jamie Chen",
    email: "jamie.chen@xyzltd.com",
    role: "Client Org Admin",
    organizationId: "acc-3",
    organizationName: "XYZ Ltd",
    twoFactorEnabled: false,
    status: "Invited",
    lastLogin: null,
    invitedAt: "2026-08-04T15:10:00Z",
  },
  {
    id: "usr-6",
    name: "Sam Okafor",
    email: "sam.okafor@ttec.com",
    role: "MSP Operator",
    organizationId: null,
    organizationName: null,
    twoFactorEnabled: false,
    status: "Invited",
    lastLogin: null,
    invitedAt: "2026-08-05T09:00:00Z",
  },
];

export function listUsers(): PortalUser[] {
  return users;
}

export function listMspUsers(): PortalUser[] {
  return users.filter((user) => user.organizationId === null);
}

export function listUsersByOrganization(organizationId: string): PortalUser[] {
  return users.filter((user) => user.organizationId === organizationId);
}

export function listAdministratorsByOrganization(organizationId: string): PortalUser[] {
  return users.filter(
    (user) => user.organizationId === organizationId && user.role === "Client Org Admin"
  );
}
