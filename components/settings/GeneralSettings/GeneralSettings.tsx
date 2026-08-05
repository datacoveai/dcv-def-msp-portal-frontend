import { FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type GeneralSettingsProps = {
  name: string;
  supportEmail: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSave: () => void;
};

export default function GeneralSettings({
  name,
  supportEmail,
  onNameChange,
  onEmailChange,
  onSave,
}: GeneralSettingsProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSave();
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">General</h2>
      <p className="mt-1 text-sm text-gray-500">
        Your company profile and main point of contact.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 max-w-md">
        <Input
          id="settings-company-name"
          label="Company Name"
          required
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />

        <Input
          id="settings-support-email"
          label="Support Email"
          type="email"
          required
          value={supportEmail}
          onChange={(event) => onEmailChange(event.target.value)}
        />

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
