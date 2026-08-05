export type AuditEvent = {
  id: string;
  actor: string;
  action: string;
  organizationId: string | null;
  organizationName: string | null;
  timestamp: string;
  details: string;
};
