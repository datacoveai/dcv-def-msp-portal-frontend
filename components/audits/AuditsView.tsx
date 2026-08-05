"use client";

import { useEffect, useMemo, useState } from "react";
import AuditFilters from "@/components/audits/AuditFilters/AuditFilters";
import AuditsTable from "@/components/audits/AuditsTable/AuditsTable";
import Toast from "@/components/ui/Toast";
import { listAuditEvents } from "@/services";
import { downloadCsv } from "@/utils/csv";
import { formatDateTime } from "@/utils/format";

export default function AuditsView() {
  const [events] = useState(() => listAuditEvents());
  const [searchTerm, setSearchTerm] = useState("");
  const [actorFilter, setActorFilter] = useState<string | "ALL">("ALL");
  const [actionFilter, setActionFilter] = useState<string | "ALL">("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const actors = useMemo(
    () => Array.from(new Set(events.map((event) => event.actor))).sort(),
    [events]
  );

  const actions = useMemo(
    () => Array.from(new Set(events.map((event) => event.action))).sort(),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return events
      .filter((event) => {
        const matchesSearch =
          term === "" ||
          event.actor.toLowerCase().includes(term) ||
          event.action.toLowerCase().includes(term) ||
          (event.organizationName?.toLowerCase().includes(term) ?? false) ||
          event.details.toLowerCase().includes(term);

        const matchesActor = actorFilter === "ALL" || event.actor === actorFilter;
        const matchesAction = actionFilter === "ALL" || event.action === actionFilter;

        const eventDate = event.timestamp.slice(0, 10);
        const matchesFrom = dateFrom === "" || eventDate >= dateFrom;
        const matchesTo = dateTo === "" || eventDate <= dateTo;

        return (
          matchesSearch && matchesActor && matchesAction && matchesFrom && matchesTo
        );
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [events, searchTerm, actorFilter, actionFilter, dateFrom, dateTo]);

  function handleExportCsv() {
    const columns = ["Timestamp", "Actor", "Action", "Client Organization", "Details"];
    const rows = filteredEvents.map((event) => [
      formatDateTime(event.timestamp),
      event.actor,
      event.action,
      event.organizationName ?? "",
      event.details,
    ]);

    downloadCsv("audit-log.csv", columns, rows);
    setToastMessage(`Exported ${filteredEvents.length} audit events.`);
  }

  return (
    <>
      <AuditFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        actors={actors}
        actorFilter={actorFilter}
        onActorFilterChange={setActorFilter}
        actions={actions}
        actionFilter={actionFilter}
        onActionFilterChange={setActionFilter}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        onExportCsv={handleExportCsv}
      />

      <AuditsTable events={filteredEvents} onSelectOrganization={setSearchTerm} />

      <Toast message={toastMessage} />
    </>
  );
}
