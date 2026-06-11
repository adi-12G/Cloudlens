import Link from "next/link";
import {
  LayoutDashboard,
  Server,
  DollarSign,
  Bell,
  Settings,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Infrastructure", href: "/dashboard", icon: Server },
  { label: "Cost Analytics", href: "#", icon: DollarSign },
  { label: "Alerts", href: "#", icon: Bell },
  { label: "Settings", href: "#", icon: Settings },
];

export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r bg-background p-6">
      <h1 className="text-2xl font-bold mb-10">
        CloudLens
      </h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted transition"
            >
              <Icon className="h-5 w-5" />

              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
