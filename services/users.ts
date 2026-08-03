import type { PortalUser } from "@/types";

const users: PortalUser[] = [
  {
    id: "usr-1",
    name: "Avery Brooks",
    email: "avery.brooks@ttec.com",
    role: "MSP Admin",
    accountId: "acc-msp",
    accountName: "TTEC Computers",
    twoFactorEnabled: true,
    status: "Active",
    lastLogin: "2026-08-02T14:32:00Z",
  },
  {
    id: "usr-2",
    name: "Jordan Lee",
    email: "jordan.lee@ttec.com",
    role: "MSP Operator",
    accountId: "acc-msp",
    accountName: "TTEC Computers",
    twoFactorEnabled: true,
    status: "Active",
    lastLogin: "2026-08-01T09:10:00Z",
  },
  {
    id: "usr-3",
    name: "Morgan Diaz",
    email: "office@kingstreetdentistry.com",
    role: "Client Org Admin",
    accountId: "acc-1",
    accountName: "King Street Dentistry",
    twoFactorEnabled: false,
    status: "Active",
    lastLogin: "2026-07-30T11:05:00Z",
  },
  {
    id: "usr-4",
    name: "Priya Nair",
    email: "it@abccorp.com",
    role: "Client Org Admin",
    accountId: "acc-2",
    accountName: "ABC Corporation",
    twoFactorEnabled: false,
    status: "Invited",
    lastLogin: null,
  },
];

export function listUsers(): PortalUser[] {
  return users;
}

export function listUsersByAccount(accountId: string): PortalUser[] {
  return users.filter((user) => user.accountId === accountId);
}
