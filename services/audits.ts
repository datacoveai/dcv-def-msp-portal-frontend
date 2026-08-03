import type { AuditEvent } from "@/types";

const auditEvents: AuditEvent[] = [
  {
    id: "audit-1",
    actor: "Avery Brooks",
    action: "Login Successful",
    accountId: "acc-msp",
    accountName: "TTEC Computers",
    timestamp: "2026-08-02T14:32:00Z",
    details: "MSP Admin logged in.",
  },
  {
    id: "audit-2",
    actor: "Avery Brooks",
    action: "User Role Updated",
    accountId: "acc-1",
    accountName: "King Street Dentistry",
    timestamp: "2026-08-01T16:47:00Z",
    details: "Client Admin permissions changed.",
  },
  {
    id: "audit-3",
    actor: "Jordan Lee",
    action: "Contract Updated",
    accountId: "acc-2",
    accountName: "ABC Corporation",
    timestamp: "2026-07-30T10:02:00Z",
    details: "License count modified from 450 to 500.",
  },
  {
    id: "audit-4",
    actor: "Avery Brooks",
    action: "Account Suspended",
    accountId: "acc-4",
    accountName: "Riverside Law Group",
    timestamp: "2026-07-11T08:15:00Z",
    details: "Suspended due to non-payment.",
  },
  {
    id: "audit-5",
    actor: "Jordan Lee",
    action: "New Client Created",
    accountId: "acc-5",
    accountName: "Northgate Financial",
    timestamp: "2026-08-01T09:41:00Z",
    details: "Northgate Financial was added.",
  },
];

export function listAuditEvents(): AuditEvent[] {
  return auditEvents;
}

export function listAuditEventsByAccount(accountId: string): AuditEvent[] {
  return auditEvents.filter((event) => event.accountId === accountId);
}
