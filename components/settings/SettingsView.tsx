"use client";

import { useEffect, useState } from "react";
import GeneralSettings from "@/components/settings/GeneralSettings/GeneralSettings";
import IdentitySettings from "@/components/settings/IdentitySettings/IdentitySettings";
import Toast from "@/components/ui/Toast";
import { getAccount, listUsers } from "@/services";

export default function SettingsView() {
  const [mspAccount] = useState(() => getAccount("acc-msp"));
  const [users] = useState(() => listUsers());
  const [name, setName] = useState(mspAccount?.name ?? "");
  const [mainAdministratorEmail, setMainAdministratorEmail] = useState(
    mspAccount?.mainAdministratorEmail ?? ""
  );
  const [enforceTwoFactor, setEnforceTwoFactor] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const totalUsers = users.length;
  const usersWithTwoFactor = users.filter((user) => user.twoFactorEnabled).length;

  function handleSaveGeneral() {
    setToastMessage("General settings saved.");
  }

  function handleToggleEnforceTwoFactor() {
    const next = !enforceTwoFactor;
    setEnforceTwoFactor(next);
    setToastMessage(`2FA enforcement ${next ? "enabled" : "disabled"} for all users.`);
  }

  return (
    <>
      <GeneralSettings
        name={name}
        mainAdministratorEmail={mainAdministratorEmail}
        onNameChange={setName}
        onEmailChange={setMainAdministratorEmail}
        onSave={handleSaveGeneral}
      />

      <IdentitySettings
        totalUsers={totalUsers}
        usersWithTwoFactor={usersWithTwoFactor}
        enforceTwoFactor={enforceTwoFactor}
        onToggleEnforceTwoFactor={handleToggleEnforceTwoFactor}
      />

      <Toast message={toastMessage} />
    </>
  );
}
