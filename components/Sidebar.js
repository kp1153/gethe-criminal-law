"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/dashboard", label: "🏠 डैशबोर्ड" },
  { href: "/muqadme", label: "⚖️ मुकदमे" },
  { href: "/muvakkil", label: "👤 मुवक्किल" },
  { href: "/fees", label: "💰 फीस" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <div className="text-red-400 font-bold text-sm uppercase tracking-wider">
          Criminal Law Chamber
        </div>
        <div className="text-white font-bold text-lg mt-1">
          Adv. Ajay Kumar Gethe
        </div>
        <div className="text-gray-400 text-xs mt-1">मुकदमा प्रबंधन</div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? "bg-red-700 text-white font-medium"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
        © 2026 — web-developer-kp.com
      </div>
    </aside>
  );
}
