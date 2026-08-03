"use client";

import { FormEvent, useState } from "react";
import SlideOver from "@/components/ui/SlideOver";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { Account, NewPortalUserInput, PortalUserRole } from "@/types";

type UserFormProps = {
  open: boolean;
  accounts: Account[];
  onClose: () => void;
  onSubmit: (input: NewPortalUserInput) => void;
};

const ROLES: PortalUserRole[] = ["MSP Admin", "MSP Operator", "Client Org Admin"];

function emptyForm(accounts: Account[]): NewPortalUserInput {
  return {
    accountId: accounts[0]?.id ?? "",
    name: "",
    email: "",
    role: "Client Org Admin",
  };
}

export default function UserForm({ open, accounts, onClose, onSubmit }: UserFormProps) {
  const [form, setForm] = useState<NewPortalUserInput>(() => emptyForm(accounts));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(form);
    setForm(emptyForm(accounts));
  }

  return (
    <SlideOver
      title="Invite User"
      subtitle="Invite a portal user and assign their role."
      open={open}
      onClose={onClose}
      widthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          id="user-account"
          label="Account"
          required
          value={form.accountId}
          onChange={(event) => setForm({ ...form, accountId: event.target.value })}
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </Select>

        <Input
          id="user-name"
          label="Full Name"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />

        <Input
          id="user-email"
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />

        <Select
          id="user-role"
          label="Role"
          value={form.role}
          onChange={(event) =>
            setForm({ ...form, role: event.target.value as PortalUserRole })
          }
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>

        <div className="mt-2 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={accounts.length === 0}>
            Send Invite
          </Button>
        </div>
      </form>
    </SlideOver>
  );
}
