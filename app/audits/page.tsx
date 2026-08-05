import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import AuditsView from "@/components/audits/AuditsView";

export default function AuditsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Audits"
        description="Review privileged actions across your tenant."
      />
      <AuditsView />
    </DashboardLayout>
  );
}
