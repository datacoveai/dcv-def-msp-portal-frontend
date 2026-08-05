"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0F3A5E] text-white">
      <div className="p-6 text-2xl font-bold">
        DataCove
      </div>

      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block p-3 rounded-lg transition ${
                    isActive ? "bg-[#14507F] font-medium" : "hover:bg-[#14507F]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
