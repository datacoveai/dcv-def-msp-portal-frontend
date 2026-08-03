type BadgeTone = "green" | "amber" | "red" | "teal" | "gray";

type BadgeProps = {
  label: string;
  tone: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  teal: "bg-teal-100 text-teal-800",
  gray: "bg-gray-100 text-gray-700",
};

export default function Badge({ label, tone }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
