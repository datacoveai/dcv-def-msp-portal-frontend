import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import AccountsView from "@/components/accounts/AccountsView";

export default function AccountsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Accounts"
        description="Manage MSPs and Customer Organizations."
      />
      <AccountsView />
    </DashboardLayout>
  );
}