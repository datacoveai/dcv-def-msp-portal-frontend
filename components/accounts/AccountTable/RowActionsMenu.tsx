type RowActionsMenuProps = {
  onSuspend: () => void;
  onArchive: () => void;
  onResendInvite: () => void;
  onExport: () => void;
};

export default function RowActionsMenu({
  onSuspend,
  onArchive,
  onResendInvite,
  onExport,
}: RowActionsMenuProps) {
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
          onClick={onExport}
          className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
        >
          Export
        </button>
        <button
          onClick={onSuspend}
          className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
        >
          Suspend
        </button>
        <button
          onClick={onArchive}
          className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          Archive
        </button>
      </div>
    </details>
  );
}
