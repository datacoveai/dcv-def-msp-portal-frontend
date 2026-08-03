"use client";

import { FormEvent, useState } from "react";
import SlideOver from "@/components/ui/SlideOver";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { SERVICE_NAMES } from "@/services/contracts";
import type { Account, NewContractInput } from "@/types";

type ContractFormProps = {
  open: boolean;
  accounts: Account[];
  onClose: () => void;
  onSubmit: (input: NewContractInput) => void;
};

const CONTRACT_TYPES = ["Subscription", "Trial"];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyForm(accounts: Account[]): NewContractInput {
  return {
    accountId: accounts[0]?.id ?? "",
    serviceName: SERVICE_NAMES[0],
    contractType: CONTRACT_TYPES[0],
    contractName: "",
    packageSku: "",
    quantity: 10,
    registrationDate: today(),
    expiresOn: null,
  };
}

export default function ContractForm({
  open,
  accounts,
  onClose,
  onSubmit,
}: ContractFormProps) {
  const [form, setForm] = useState<NewContractInput>(() => emptyForm(accounts));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(form);
    setForm(emptyForm(accounts));
  }

  return (
    <SlideOver
      title="Add Contract"
      subtitle="Add or extend a seat contract for a client account."
      open={open}
      onClose={onClose}
      widthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          id="contract-account"
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

        <Select
          id="contract-service"
          label="Service"
          value={form.serviceName}
          onChange={(event) => setForm({ ...form, serviceName: event.target.value })}
        >
          {SERVICE_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>

        <Select
          id="contract-type"
          label="Contract Type"
          value={form.contractType}
          onChange={(event) => setForm({ ...form, contractType: event.target.value })}
        >
          {CONTRACT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>

        <Input
          id="contract-name"
          label="Contract Name"
          required
          value={form.contractName}
          onChange={(event) => setForm({ ...form, contractName: event.target.value })}
        />

        <Input
          id="contract-sku"
          label="Package / SKU"
          required
          value={form.packageSku}
          onChange={(event) => setForm({ ...form, packageSku: event.target.value })}
        />

        <Input
          id="contract-quantity"
          label="Quantity (seats)"
          type="number"
          min={1}
          required
          value={form.quantity}
          onChange={(event) =>
            setForm({ ...form, quantity: Number(event.target.value) })
          }
        />

        <Input
          id="contract-registration-date"
          label="Registration Date"
          type="date"
          required
          value={form.registrationDate}
          onChange={(event) =>
            setForm({ ...form, registrationDate: event.target.value })
          }
        />

        <Input
          id="contract-expires-on"
          label="Expires On"
          type="date"
          value={form.expiresOn ?? ""}
          onChange={(event) =>
            setForm({ ...form, expiresOn: event.target.value || null })
          }
        />

        <div className="mt-2 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={accounts.length === 0}>
            Add Contract
          </Button>
        </div>
      </form>
    </SlideOver>
  );
}
