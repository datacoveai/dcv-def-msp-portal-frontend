import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import ClientOrganizationsView from "@/components/clientOrganizations/ClientOrganizationsView";

export default function ClientsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Client Organizations"
        description="Manage your client organizations."
      />
      <ClientOrganizationsView />
    </DashboardLayout>
  );
}
