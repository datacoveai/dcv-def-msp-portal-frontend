import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export default function Select({
  label,
  className = "",
  id,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`border rounded-lg bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F3A5E]/30 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
