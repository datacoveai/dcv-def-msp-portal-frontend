"use client";

import { useEffect, useMemo, useState } from "react";
import UserFilters from "@/components/users/UserFilters/UserFilters";
import UsersTable from "@/components/users/UsersTable/UsersTable";
import UserForm from "@/components/users/UserForm/UserForm";
import Toast from "@/components/ui/Toast";
import { listMspUsers } from "@/services";
import type { NewPortalUserInput, PortalUser, PortalUserRole, PortalUserStatus } from "@/types";

export default function UsersView() {
  const [users, setUsers] = useState<PortalUser[]>(() => listMspUsers());
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<PortalUserRole | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<PortalUserStatus | "ALL">("ALL");
  const [formOpen, setFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        term === "" ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  function handleRoleChange(userId: string, role: PortalUserRole) {
    setUsers((current) =>
      current.map((user) => (user.id === userId ? { ...user, role } : user))
    );
  }

  function handleToggleSuspend(userId: string) {
    setUsers((current) =>
      current.map((user) => {
        if (user.id !== userId) return user;
        const nextStatus: PortalUserStatus =
          user.status === "Suspended" ? "Active" : "Suspended";
        return { ...user, status: nextStatus };
      })
    );

    const user = users.find((item) => item.id === userId);
    if (user) {
      const willReactivate = user.status === "Suspended";
      setToastMessage(`${user.name} ${willReactivate ? "reactivated" : "suspended"}.`);
    }
  }

  function handleResendInvite(userId: string) {
    const user = users.find((item) => item.id === userId);
    setToastMessage(user ? `Invite resent to ${user.email}.` : "Invite resent.");
  }

  function handleInviteUser(input: NewPortalUserInput) {
    const newUser: PortalUser = {
      id: `usr-${users.length + 1}-${Date.now()}`,
      name: input.name,
      email: input.email,
      role: input.role,
      organizationId: null,
      organizationName: null,
      twoFactorEnabled: false,
      status: "Invited",
      lastLogin: null,
      invitedAt: new Date().toISOString(),
    };

    setUsers((current) => [...current, newUser]);
    setFormOpen(false);
    setToastMessage(`Invite sent to ${newUser.email}.`);
  }

  return (
    <>
      <UserFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onInviteUser={() => setFormOpen(true)}
      />

      <UsersTable
        users={filteredUsers}
        onRoleChange={handleRoleChange}
        onToggleSuspend={handleToggleSuspend}
        onResendInvite={handleResendInvite}
      />

      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleInviteUser}
      />

      <Toast message={toastMessage} />
    </>
  );
}
