import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import ServicesContractsView from "@/components/services/ServicesContractsView";

export default function ServicesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Services & Contracts"
        description="View and manage service contracts across every account."
      />
      <ServicesContractsView />
    </DashboardLayout>
  );
}
