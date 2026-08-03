type StatCardProps = {
  title: string;
  value: string;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border">
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold text-[#0F3A5E]">
        {value}
      </p>
    </div>
  );
}