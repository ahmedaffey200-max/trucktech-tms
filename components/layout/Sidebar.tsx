"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Zap,
  MapPin,
  Fuel,
  Wrench,
  Shield,
  UserCheck,
  Building2,
  CreditCard,
  Receipt,
  TrendingUp,
  Bell,
  HelpCircle,
  LogOut,
  Boxes,
  ClipboardList,
  Route,
  Radio,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Dispatch",
    href: "/dispatch",
    icon: Radio,
    badge: "Live",
    badgeColor: "bg-green-500",
  },
  {
    label: "Loads",
    href: "/loads",
    icon: Package,
    badge: 18,
  },
  {
    label: "Drivers",
    href: "/drivers",
    icon: UserCheck,
  },
  {
    label: "Units & Fleet",
    icon: Truck,
    children: [
      { label: "Trucks", href: "/units/trucks", icon: Truck },
      { label: "Trailers", href: "/units/trailers", icon: Boxes },
      { label: "Maintenance", href: "/units/maintenance", icon: Wrench },
    ],
  },
  {
    label: "Accounting",
    icon: DollarSign,
    children: [
      { label: "Overview", href: "/accounting", icon: TrendingUp },
      { label: "Invoices", href: "/accounting/invoices", icon: FileText },
      { label: "Settlements", href: "/accounting/settlements", icon: Receipt },
      { label: "OOP Deductions", href: "/accounting/deductions", icon: ClipboardList },
      { label: "Fuel", href: "/accounting/fuel", icon: Fuel },
      { label: "IFTA", href: "/accounting/ifta", icon: Route },
    ],
  },
  {
    label: "Broker & Factoring",
    icon: Building2,
    children: [
      { label: "Brokers", href: "/brokers", icon: Building2 },
      { label: "Factoring", href: "/factoring", icon: CreditCard },
    ],
  },
  {
    label: "Compliance",
    icon: Shield,
    children: [
      { label: "ELD", href: "/compliance/eld", icon: Zap },
      { label: "Permits", href: "/compliance/permits", icon: FileText },
      { label: "Insurance", href: "/compliance/insurance", icon: Shield },
      { label: "Accidents", href: "/compliance/accidents", icon: MapPin },
    ],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarItemProps {
  item: NavItem;
  collapsed: boolean;
  depth?: number;
}

function SidebarItem({ item, collapsed, depth = 0 }: SidebarItemProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (item.children) {
      return item.children.some((c) => c.href && pathname.startsWith(c.href));
    }
    return false;
  });

  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(item.href + "/")
    : false;

  if (item.children) {
    const isChildActive = item.children.some(
      (c) => c.href && (pathname === c.href || pathname.startsWith(c.href + "/"))
    );

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
            "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
            "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800",
            isChildActive && "text-zinc-900 dark:text-zinc-100",
            collapsed && "justify-center"
          )}
          title={collapsed ? item.label : undefined}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {open ? (
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              )}
            </>
          )}
        </button>

        {open && !collapsed && (
          <div className="ml-3 mt-1 border-l border-zinc-200 dark:border-zinc-700 pl-3 space-y-0.5">
            {item.children.map((child) => (
              <SidebarItem key={child.label} item={child} collapsed={false} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all relative",
        "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
        "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800",
        isActive && [
          "bg-blue-50 text-blue-700 font-medium",
          "dark:bg-blue-950/50 dark:text-blue-400",
          "hover:bg-blue-50 dark:hover:bg-blue-950/50",
        ],
        collapsed && "justify-center"
      )}
      title={collapsed ? item.label : undefined}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-600 rounded-r-full" />
      )}
      <item.icon className="h-4 w-4 flex-shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge !== undefined && (
            <span
              className={cn(
                "text-xs font-medium px-1.5 py-0.5 rounded-full",
                typeof item.badge === "string"
                  ? `${item.badgeColor ?? "bg-green-500"} text-white text-[10px]`
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
}

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-full border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-14 px-4 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Truck className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                TruckTech
              </div>
              <div className="text-[10px] text-zinc-400 leading-none mt-0.5">TMS Platform</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {!collapsed && (
          <div className="px-2 mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Main
            </p>
          </div>
        )}

        {navItems.slice(0, 5).map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} />
        ))}

        {!collapsed && (
          <div className="px-2 mt-4 mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Finance
            </p>
          </div>
        )}
        {collapsed && <div className="border-t border-zinc-100 dark:border-zinc-800 my-2" />}

        {navItems.slice(5, 8).map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} />
        ))}

        {!collapsed && (
          <div className="px-2 mt-4 mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Admin
            </p>
          </div>
        )}
        {collapsed && <div className="border-t border-zinc-100 dark:border-zinc-800 my-2" />}

        {navItems.slice(8).map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-2 space-y-0.5 flex-shrink-0">
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
            "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100",
            "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Help & Support" : undefined}
        >
          <HelpCircle className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span className="flex-1 text-left">Help & Support</span>}
        </button>

        {/* User profile */}
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg",
            collapsed && "justify-center"
          )}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">AU</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                Admin User
              </div>
              <div className="text-[10px] text-zinc-400 truncate">admin@trucktech.io</div>
            </div>
          )}
          {!collapsed && (
            <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => onCollapse(!collapsed)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all",
            "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100",
            "dark:hover:text-zinc-200 dark:hover:bg-zinc-800",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronDown className="h-4 w-4 rotate-90" />
              <span>Collapse sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
