"use client";

import { FormEvent, useState } from "react";
import SlideOver from "@/components/ui/SlideOver";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { NewPortalUserInput, PortalUserRole } from "@/types";

type UserFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewPortalUserInput) => void;
};

const ROLES: PortalUserRole[] = ["MSP Admin", "MSP Operator"];

const emptyForm: NewPortalUserInput = {
  name: "",
  email: "",
  role: "MSP Operator",
};

export default function UserForm({ open, onClose, onSubmit }: UserFormProps) {
  const [form, setForm] = useState<NewPortalUserInput>(emptyForm);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <SlideOver
      title="Invite User"
      subtitle="Invite an MSP team member and assign their role."
      open={open}
      onClose={onClose}
      widthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <Button type="submit">Send Invite</Button>
        </div>
      </form>
    </SlideOver>
  );
}
