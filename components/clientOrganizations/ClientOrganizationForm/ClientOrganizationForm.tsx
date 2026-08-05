"use client";

import { FormEvent, useState } from "react";
import SlideOver from "@/components/ui/SlideOver";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import type { AdministrationMode, NewClientOrganizationInput } from "@/types";

type ClientOrganizationFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewClientOrganizationInput) => void;
};

const emptyForm: NewClientOrganizationInput = {
  name: "",
  primaryContact: "",
  mainAdministratorEmail: "",
  seatsAllocated: 10,
  administrationMode: "MSP Managed",
  isTrial: false,
  trialEndDate: null,
};

export default function ClientOrganizationForm({
  open,
  onClose,
  onSubmit,
}: ClientOrganizationFormProps) {
  const [form, setForm] = useState<NewClientOrganizationInput>(emptyForm);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <SlideOver
      title="New Client Organization"
      subtitle="Onboard a client organization under your MSP."
      open={open}
      onClose={onClose}
      widthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="org-name"
          label="Organization Name"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />

        <Input
          id="org-primary-contact"
          label="Primary Contact"
          required
          value={form.primaryContact}
          onChange={(event) => setForm({ ...form, primaryContact: event.target.value })}
        />

        <Input
          id="org-admin-email"
          label="Email"
          type="email"
          required
          value={form.mainAdministratorEmail}
          onChange={(event) =>
            setForm({ ...form, mainAdministratorEmail: event.target.value })
          }
        />

        <Input
          id="org-seats-allocated"
          label="Seat Allocation"
          type="number"
          min={1}
          required
          value={form.seatsAllocated}
          onChange={(event) =>
            setForm({ ...form, seatsAllocated: Number(event.target.value) })
          }
        />

        <Select
          id="org-administration-mode"
          label="Administration Mode"
          value={form.administrationMode}
          onChange={(event) =>
            setForm({
              ...form,
              administrationMode: event.target.value as AdministrationMode,
            })
          }
        >
          <option value="MSP Managed">MSP Managed</option>
          <option value="Client Managed">Client Managed</option>
        </Select>

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
          Start as trial
        </label>

        {form.isTrial && (
          <Input
            id="org-trial-end-date"
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
          <Button type="submit">Create Client Organization</Button>
        </div>
      </form>
    </SlideOver>
  );
}
