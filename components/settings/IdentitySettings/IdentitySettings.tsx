type IdentitySettingsProps = {
  totalUsers: number;
  usersWithTwoFactor: number;
  enforceTwoFactor: boolean;
  onToggleEnforceTwoFactor: () => void;
};

export default function IdentitySettings({
  totalUsers,
  usersWithTwoFactor,
  enforceTwoFactor,
  onToggleEnforceTwoFactor,
}: IdentitySettingsProps) {
  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Identity &amp; Access</h2>
      <p className="mt-1 text-sm text-gray-500">
        Two-factor authentication policy for your portal users.
      </p>

      <p className="mt-6 text-sm text-gray-700">
        <span className="font-medium text-gray-900">
          {usersWithTwoFactor} of {totalUsers}
        </span>{" "}
        users have 2FA enabled.
      </p>

      <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={enforceTwoFactor}
          onChange={onToggleEnforceTwoFactor}
        />
        Require 2FA for all users
      </label>
    </div>
  );
}
