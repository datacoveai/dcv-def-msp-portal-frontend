import Link from "next/link";
import { navigation } from "@/lib/navigation";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0F3A5E] text-white">
      <div className="p-6 text-2xl font-bold">
        DataCove
      </div>

      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block p-3 rounded-lg hover:bg-[#14507F] transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}