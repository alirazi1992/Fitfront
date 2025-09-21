"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS: Array<{ label: string; href: string }> = [
  { label: "Dashboard", href: "/coaches" },
  { label: "Clients", href: "/coaches/clients" },
  { label: "Groups", href: "/coaches/groups" },
  { label: "Templates", href: "/coaches/templates" },
  { label: "Calendar", href: "/coaches/calendar" },
  { label: "Chats", href: "/coaches/chats" },
  { label: "Help", href: "/coaches/help" },
];

export function ControlRail() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col gap-10 rounded-[2.75rem] rounded-r-none bg-[#101010] px-6 py-10 md:w-64">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.5em] text-[#f3ff47]">Fit Space</p>
        <p className="text-xs text-slate-400">Performance OS</p>
      </div>
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map(({ label, href }) => {
          const isDashboard = href === "/coaches";
          const isActive = isDashboard
            ? pathname === "/coaches" || pathname === "/coaches/dashboard"
            : pathname.startsWith(href);
          const baseClasses = "group flex items-center justify-between rounded-2xl border px-4 py-3 transition";
          const activeClasses = "border-[var(--color-accent-blue)]/60 bg-[var(--color-accent-blue)]/10 text-white shadow-[0_20px_60px_-35px_rgba(89,215,255,0.9)]";
          const inactiveClasses = "border-white/5 bg-white/5 text-white/60 hover:border-white/15 hover:bg-white/10 hover:text-white";
          const itemClasses = [baseClasses, isActive ? activeClasses : inactiveClasses].join(" ");
          const statusClasses = "text-xs " + (isActive ? "text-white/80" : "text-white/40");
          return (
            <Link key={href} href={href} aria-current={isActive ? "page" : undefined} className={itemClasses}>
              <span>{label}</span>
              <span className={statusClasses}>{isActive ? "Active" : "Open"}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 text-xs text-slate-500">
        <p>Settings</p>
        <button className="text-[#59d7ff]">Log out</button>
      </div>
    </aside>
  );
}