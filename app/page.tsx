import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import StatCardGrid from "@/components/dashboard/StatCardGrid";
import LicenseSummary from "@/components/dashboard/LicenseSummary";
import DashboardBottom from "@/components/dashboard/DashboardBottom";

export default function Home() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome to the DataCove DefenceNet MSP Portal."
      />

     <StatCardGrid />
     <LicenseSummary />
     <DashboardBottom />
    </DashboardLayout>
    
  );
}