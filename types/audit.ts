export type AuditEvent = {
  id: string;
  actor: string;
  action: string;
  accountId: string;
  accountName: string;
  timestamp: string;
  details: string;
};
