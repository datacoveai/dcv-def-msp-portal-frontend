export default function ActivityCard() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Recent Activity
      </h2>

      <div className="mt-4 space-y-4">
        <div className="border-b pb-3">
          <p className="font-medium">New Client Created</p>
          <p className="text-sm text-gray-500">
            ABC Corporation was added.
          </p>
        </div>

        <div className="border-b pb-3">
          <p className="font-medium">Seats Allocated</p>
          <p className="text-sm text-gray-500">
            50 seats assigned to XYZ Ltd.
          </p>
        </div>

        <div>
          <p className="font-medium">User Invited</p>
          <p className="text-sm text-gray-500">
            admin@company.com invited.
          </p>
        </div>
      </div>
    </div>
  );
}