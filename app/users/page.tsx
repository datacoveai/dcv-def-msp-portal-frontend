import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import UsersView from "@/components/users/UsersView";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Users"
        description="Manage portal users and role assignments across every account."
      />
      <UsersView />
    </DashboardLayout>
  );
}
