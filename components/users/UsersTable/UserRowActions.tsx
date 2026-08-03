type UserRowActionsProps = {
  isSuspended: boolean;
  onResendInvite: () => void;
  onToggleSuspend: () => void;
};

export default function UserRowActions({
  isSuspended,
  onResendInvite,
  onToggleSuspend,
}: UserRowActionsProps) {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer select-none rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100">
        More
      </summary>

      <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border bg-white py-1 shadow-lg">
        <button
          onClick={onResendInvite}
          className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
        >
          Resend invite
        </button>
        <button
          onClick={onToggleSuspend}
          className={`block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
            isSuspended ? "text-gray-700" : "text-red-600 hover:bg-red-50"
          }`}
        >
          {isSuspended ? "Reactivate" : "Suspend"}
        </button>
      </div>
    </details>
  );
}
