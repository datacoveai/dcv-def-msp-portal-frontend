import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import UsersView from "@/components/users/UsersView";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Users"
        description="Manage your MSP team's portal access and role assignments."
      />
      <UsersView />
    </DashboardLayout>
  );
}
