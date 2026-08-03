import StatCard from "./StatCard";

export default function StatCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard title="Total Clients" value="128" />
      <StatCard title="Active Users" value="2,456" />
      <StatCard title="Allocated Seats" value="3,000" />
      <StatCard title="Activated Seats" value="2,418" />
    </div>
  );
}