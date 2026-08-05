import type { UsageRecord } from "@/types";

const usageRecords: UsageRecord[] = [
  { organizationId: "acc-1", date: "2026-03-01", activeSeats: 18, activations: 3, devicesPerSeat: 1.1 },
  { organizationId: "acc-1", date: "2026-04-01", activeSeats: 19, activations: 2, devicesPerSeat: 1.1 },
  { organizationId: "acc-1", date: "2026-05-01", activeSeats: 20, activations: 2, devicesPerSeat: 1.2 },
  { organizationId: "acc-1", date: "2026-06-01", activeSeats: 21, activations: 1, devicesPerSeat: 1.2 },
  { organizationId: "acc-1", date: "2026-07-01", activeSeats: 21, activations: 0, devicesPerSeat: 1.2 },
  { organizationId: "acc-1", date: "2026-08-01", activeSeats: 22, activations: 1, devicesPerSeat: 1.2 },

  { organizationId: "acc-2", date: "2026-03-01", activeSeats: 380, activations: 40, devicesPerSeat: 1.2 },
  { organizationId: "acc-2", date: "2026-04-01", activeSeats: 410, activations: 35, devicesPerSeat: 1.2 },
  { organizationId: "acc-2", date: "2026-05-01", activeSeats: 430, activations: 25, devicesPerSeat: 1.3 },
  { organizationId: "acc-2", date: "2026-06-01", activeSeats: 445, activations: 18, devicesPerSeat: 1.3 },
  { organizationId: "acc-2", date: "2026-07-01", activeSeats: 460, activations: 20, devicesPerSeat: 1.3 },
  { organizationId: "acc-2", date: "2026-08-01", activeSeats: 470, activations: 12, devicesPerSeat: 1.3 },

  { organizationId: "acc-3", date: "2026-07-01", activeSeats: 8, activations: 8, devicesPerSeat: 1.0 },
  { organizationId: "acc-3", date: "2026-08-01", activeSeats: 12, activations: 4, devicesPerSeat: 1.1 },

  { organizationId: "acc-4", date: "2026-03-01", activeSeats: 95, activations: 5, devicesPerSeat: 1.3 },
  { organizationId: "acc-4", date: "2026-04-01", activeSeats: 100, activations: 8, devicesPerSeat: 1.3 },
  { organizationId: "acc-4", date: "2026-05-01", activeSeats: 105, activations: 6, devicesPerSeat: 1.3 },
  { organizationId: "acc-4", date: "2026-06-01", activeSeats: 108, activations: 3, devicesPerSeat: 1.3 },
  { organizationId: "acc-4", date: "2026-07-01", activeSeats: 40, activations: 0, devicesPerSeat: 1.3 },
  { organizationId: "acc-4", date: "2026-08-01", activeSeats: 0, activations: 0, devicesPerSeat: 0 },

  // acc-5 (Northgate Financial) has no usage history yet — still Pending, created 2026-08-01.
];

export function listUsage(): UsageRecord[] {
  return usageRecords;
}

export function listUsageByOrganization(organizationId: string): UsageRecord[] {
  return usageRecords.filter((record) => record.organizationId === organizationId);
}

export function getLatestTwoUsageRecords(organizationId: string): UsageRecord[] {
  return usageRecords
    .filter((record) => record.organizationId === organizationId)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);
}
