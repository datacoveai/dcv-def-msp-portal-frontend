"use client";

import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const activeItem = navigation.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gray-800">
        {activeItem?.name ?? "Dashboard"}
      </h2>

      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-black">
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
