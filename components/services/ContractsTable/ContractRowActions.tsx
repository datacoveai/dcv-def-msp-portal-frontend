type ContractRowActionsProps = {
  onEdit: () => void;
  onRenew: () => void;
  onTerminate: () => void;
};

export default function ContractRowActions({
  onEdit,
  onRenew,
  onTerminate,
}: ContractRowActionsProps) {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer select-none rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100">
        More
      </summary>

      <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border bg-white py-1 shadow-lg">
        <button
          onClick={onEdit}
          className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          onClick={onRenew}
          className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
        >
          Renew
        </button>
        <button
          onClick={onTerminate}
          className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          Terminate
        </button>
      </div>
    </details>
  );
}
