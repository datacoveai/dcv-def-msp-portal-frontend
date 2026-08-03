import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import SettingsView from "@/components/settings/SettingsView";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        description="Manage your MSP profile and identity & access policies."
      />
      <SettingsView />
    </DashboardLayout>
  );
}
