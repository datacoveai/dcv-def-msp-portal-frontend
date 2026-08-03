export default function AuditCard() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Recent Audits
      </h2>

      <div className="mt-4 space-y-4">
        <div className="border-b pb-3">
          <p className="font-medium">Login Successful</p>
          <p className="text-sm text-gray-500">
            MSP Admin logged in.
          </p>
        </div>

        <div className="border-b pb-3">
          <p className="font-medium">User Role Updated</p>
          <p className="text-sm text-gray-500">
            Client Admin permissions changed.
          </p>
        </div>

        <div>
          <p className="font-medium">Contract Updated</p>
          <p className="text-sm text-gray-500">
            License count modified.
          </p>
        </div>
      </div>
    </div>
  );
}