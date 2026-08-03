"use client";

import { FormEvent, useState } from "react";
import SlideOver from "@/components/ui/SlideOver";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { AccountType, NewAccountInput } from "@/types";

type AccountFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewAccountInput) => void;
};

const emptyForm: NewAccountInput = {
  name: "",
  type: "CUSTOMER",
  mainAdministratorEmail: "",
  seatsAllocated: 10,
  isTrial: false,
  trialEndDate: null,
};

export default function AccountForm({ open, onClose, onSubmit }: AccountFormProps) {
  const [form, setForm] = useState<NewAccountInput>(emptyForm);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <SlideOver
      title="New Account"
      subtitle="Onboard a client organization under your MSP."
      open={open}
      onClose={onClose}
      widthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="account-name"
          label="Account Name"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />

        <Select
          id="account-type"
          label="Account Type"
          value={form.type}
          onChange={(event) =>
            setForm({ ...form, type: event.target.value as AccountType })
          }
        >
          <option value="CUSTOMER">Customer</option>
          <option value="MSSP">MSSP</option>
        </Select>

        <Input
          id="main-admin-email"
          label="Main Administrator Email"
          type="email"
          required
          value={form.mainAdministratorEmail}
          onChange={(event) =>
            setForm({ ...form, mainAdministratorEmail: event.target.value })
          }
        />

        <Input
          id="seats-allocated"
          label="Seats Allocated"
          type="number"
          min={1}
          required
          value={form.seatsAllocated}
          onChange={(event) =>
            setForm({ ...form, seatsAllocated: Number(event.target.value) })
          }
        />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.isTrial}
            onChange={(event) =>
              setForm({
                ...form,
                isTrial: event.target.checked,
                trialEndDate: event.target.checked ? form.trialEndDate : null,
              })
            }
          />
          Start as trial account
        </label>

        {form.isTrial && (
          <Input
            id="trial-end-date"
            label="Trial End Date"
            type="date"
            required
            value={form.trialEndDate ?? ""}
            onChange={(event) =>
              setForm({ ...form, trialEndDate: event.target.value })
            }
          />
        )}

        <div className="mt-2 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </SlideOver>
  );
}
