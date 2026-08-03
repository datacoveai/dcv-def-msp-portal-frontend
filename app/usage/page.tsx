import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import UsageView from "@/components/usage/UsageView";

export default function UsagePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Usage"
        description="Seat consumption and utilization across every account."
      />
      <UsageView />
    </DashboardLayout>
  );
}
