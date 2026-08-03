import ActivityCard from "./ActivityCard";
import AuditCard from "./AuditCard";

export default function DashboardBottom() {
  return (
    <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
      <ActivityCard />
      <AuditCard />
    </div>
  );
}