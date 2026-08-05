import type { AuditEvent } from "@/types";

const auditEvents: AuditEvent[] = [
  {
    id: "audit-1",
    actor: "Avery Brooks",
    action: "Login Successful",
    organizationId: null,
    organizationName: null,
    timestamp: "2026-08-02T14:32:00Z",
    details: "MSP Admin logged in.",
  },
  {
    id: "audit-2",
    actor: "Avery Brooks",
    action: "User Role Updated",
    organizationId: "acc-1",
    organizationName: "King Street Dentistry",
    timestamp: "2026-08-01T16:47:00Z",
    details: "Client Admin permissions changed.",
  },
  {
    id: "audit-3",
    actor: "Jordan Lee",
    action: "Contract Updated",
    organizationId: "acc-2",
    organizationName: "ABC Corporation",
    timestamp: "2026-07-30T10:02:00Z",
    details: "License count modified from 450 to 500.",
  },
  {
    id: "audit-4",
    actor: "Avery Brooks",
    action: "Client Organization Suspended",
    organizationId: "acc-4",
    organizationName: "Riverside Law Group",
    timestamp: "2026-07-11T08:15:00Z",
    details: "Suspended due to non-payment.",
  },
  {
    id: "audit-5",
    actor: "Jordan Lee",
    action: "New Client Organization Created",
    organizationId: "acc-5",
    organizationName: "Northgate Financial",
    timestamp: "2026-08-01T09:41:00Z",
    details: "Northgate Financial was added.",
  },
  {
    id: "audit-6",
    actor: "Jordan Lee",
    action: "User Invited",
    organizationId: "acc-2",
    organizationName: "ABC Corporation",
    timestamp: "2026-07-28T13:20:00Z",
    details: "Priya Nair invited as Client Org Admin.",
  },
  {
    id: "audit-7",
    actor: "Avery Brooks",
    action: "User Invited",
    organizationId: "acc-3",
    organizationName: "XYZ Ltd",
    timestamp: "2026-08-04T15:10:00Z",
    details: "Jamie Chen invited as Client Org Admin.",
  },
  {
    id: "audit-8",
    actor: "Avery Brooks",
    action: "User Invited",
    organizationId: null,
    organizationName: null,
    timestamp: "2026-08-05T09:00:00Z",
    details: "Sam Okafor invited as MSP Operator.",
  },
  {
    id: "audit-9",
    actor: "Jordan Lee",
    action: "Seats Increased",
    organizationId: "acc-1",
    organizationName: "King Street Dentistry",
    timestamp: "2026-04-20T10:00:00Z",
    details: "Seat allocation increased from 20 to 25.",
  },
  {
    id: "audit-10",
    actor: "Avery Brooks",
    action: "Administration Mode Changed",
    organizationId: "acc-3",
    organizationName: "XYZ Ltd",
    timestamp: "2026-07-20T14:00:00Z",
    details: "Administration mode changed from Client Managed to MSP Managed.",
  },
  {
    id: "audit-11",
    actor: "Jordan Lee",
    action: "Contract Renewed",
    organizationId: "acc-2",
    organizationName: "ABC Corporation",
    timestamp: "2026-01-05T09:30:00Z",
    details: "Email Security contract renewed through 2027-01-01.",
  },
  {
    id: "audit-12",
    actor: "Avery Brooks",
    action: "Report Exported",
    organizationId: null,
    organizationName: null,
    timestamp: "2026-08-03T10:15:00Z",
    details: "Audit log exported to CSV.",
  },
  {
    id: "audit-13",
    actor: "Morgan Diaz",
    action: "Login Successful",
    organizationId: "acc-1",
    organizationName: "King Street Dentistry",
    timestamp: "2026-07-29T08:40:00Z",
    details: "Client Org Admin logged in.",
  },
];

export function listAuditEvents(): AuditEvent[] {
  return auditEvents;
}

export function listAuditEventsByOrganization(organizationId: string): AuditEvent[] {
  return auditEvents.filter((event) => event.organizationId === organizationId);
}
