"use client";

import { FormEvent, useState } from "react";
import SlideOver from "@/components/ui/SlideOver";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { SERVICE_NAMES } from "@/services/contracts";
import type { ClientOrganization, Contract, NewContractInput } from "@/types";

type ContractFormProps = {
  open: boolean;
  organizations: ClientOrganization[];
  initialContract?: Contract | null;
  onClose: () => void;
  onSubmit: (input: NewContractInput) => void;
  onEditSubmit?: (contractId: string, input: NewContractInput) => void;
};

const CONTRACT_TYPES = ["Subscription", "Trial"];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyForm(organizations: ClientOrganization[]): NewContractInput {
  return {
    organizationId: organizations[0]?.id ?? "",
    serviceName: SERVICE_NAMES[0],
    contractType: CONTRACT_TYPES[0],
    contractName: "",
    packageSku: "",
    quantity: 10,
    registrationDate: today(),
    expiresOn: null,
  };
}

function contractToInput(contract: Contract): NewContractInput {
  return {
    organizationId: contract.organizationId,
    serviceName: contract.serviceName,
    contractType: contract.contractType,
    contractName: contract.contractName,
    packageSku: contract.packageSku,
    quantity: contract.quantity,
    registrationDate: contract.registrationDate,
    expiresOn: contract.expiresOn,
  };
}

export default function ContractForm({
  open,
  organizations,
  initialContract = null,
  onClose,
  onSubmit,
  onEditSubmit,
}: ContractFormProps) {
  const [form, setForm] = useState<NewContractInput>(() =>
    initialContract ? contractToInput(initialContract) : emptyForm(organizations)
  );
  const [lastContractId, setLastContractId] = useState(initialContract?.id ?? null);

  if ((initialContract?.id ?? null) !== lastContractId) {
    setLastContractId(initialContract?.id ?? null);
    setForm(initialContract ? contractToInput(initialContract) : emptyForm(organizations));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (initialContract && onEditSubmit) {
      onEditSubmit(initialContract.id, form);
    } else {
      onSubmit(form);
      setForm(emptyForm(organizations));
    }
  }

  return (
    <SlideOver
      title={initialContract ? "Edit Contract" : "Add Contract"}
      subtitle={
        initialContract
          ? "Update this contract's terms for the client organization."
          : "Add or extend a seat contract for a client organization."
      }
      open={open}
      onClose={onClose}
      widthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          id="contract-organization"
          label="Client Organization"
          required
          value={form.organizationId}
          onChange={(event) => setForm({ ...form, organizationId: event.target.value })}
        >
          {organizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
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
          <Button type="submit" disabled={organizations.length === 0}>
            {initialContract ? "Save Changes" : "Add Contract"}
          </Button>
        </div>
      </form>
    </SlideOver>
  );
}
