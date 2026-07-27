"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Truck,
  Package,
  Users,
  Fuel,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockChartData, dashboardMetrics, mockLoads, mockDrivers } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatPercent, formatDate } from "@/lib/utils";
import { LoadStatus } from "@/types";

const statusConfig: Record<LoadStatus, { label: string; color: string; variant: "success" | "warning" | "primary" | "danger" | "default" | "info" }> = {
  pending: { label: "Pending", color: "#A1A1AA", variant: "default" },
  assigned: { label: "Assigned", color: "#0A84FF", variant: "primary" },
  in_transit: { label: "In Transit", color: "#30D158", variant: "success" },
  delivered: { label: "Delivered", color: "#64D2FF", variant: "info" },
  invoiced: { label: "Invoiced", color: "#FFD60A", variant: "warning" },
  paid: { label: "Paid", color: "#30D158", variant: "success" },
  cancelled: { label: "Cancelled", color: "#FF453A", variant: "danger" },
};

const fleetData = [
  { name: "Active", value: 18, color: "#30D158" },
  { name: "On Load", value: 6, color: "#0A84FF" },
  { name: "Maintenance", value: 3, color: "#FFD60A" },
  { name: "Inactive", value: 2, color: "#FF453A" },
];

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  period: string;
  icon: React.ElementType;
  iconBg: string;
  prefix?: string;
}

function MetricCard({ label, value, change, period, icon: Icon, iconBg, prefix }: MetricCardProps) {
  const positive = change >= 0;
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {label}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              {prefix && (
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{prefix}</span>
              )}
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1">
              {positive ? (
                <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
              )}
              <span className={`text-xs font-medium ${positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-zinc-400">{period}</span>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 shadow-xl text-sm">
        <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-zinc-500 dark:text-zinc-400 capitalize">{entry.name}:</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Executive Dashboard</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {formatDate(new Date())} · MTN Cargo LLC
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-3.5 w-3.5" />
            This Month
          </Button>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            New Load
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(dashboardMetrics.revenue.value).replace("$", "")}
          prefix="$"
          change={dashboardMetrics.revenue.change}
          period={dashboardMetrics.revenue.period}
          icon={DollarSign}
          iconBg="bg-blue-600"
        />
        <MetricCard
          label="Net Profit"
          value={formatCurrency(dashboardMetrics.profit.value).replace("$", "")}
          prefix="$"
          change={dashboardMetrics.profit.change}
          period={dashboardMetrics.profit.period}
          icon={TrendingUp}
          iconBg="bg-green-600"
        />
        <MetricCard
          label="Total Expenses"
          value={formatCurrency(dashboardMetrics.expenses.value).replace("$", "")}
          prefix="$"
          change={-dashboardMetrics.expenses.change}
          period={dashboardMetrics.expenses.period}
          icon={TrendingDown}
          iconBg="bg-orange-500"
        />
        <MetricCard
          label="Active Loads"
          value={String(dashboardMetrics.activeLoads.value)}
          change={dashboardMetrics.activeLoads.change}
          period={dashboardMetrics.activeLoads.period}
          icon={Package}
          iconBg="bg-violet-600"
        />
        <MetricCard
          label="Active Drivers"
          value={String(dashboardMetrics.activeDrivers.value)}
          change={dashboardMetrics.activeDrivers.change}
          period={dashboardMetrics.activeDrivers.period}
          icon={Users}
          iconBg="bg-sky-600"
        />
        <MetricCard
          label="Fleet Utilization"
          value={`${dashboardMetrics.fleetUtilization.value}%`}
          change={dashboardMetrics.fleetUtilization.change}
          period={dashboardMetrics.fleetUtilization.period}
          icon={Truck}
          iconBg="bg-indigo-600"
        />
        <MetricCard
          label="Fuel Costs"
          value={formatCurrency(dashboardMetrics.fuelCosts.value).replace("$", "")}
          prefix="$"
          change={dashboardMetrics.fuelCosts.change}
          period={dashboardMetrics.fuelCosts.period}
          icon={Fuel}
          iconBg="bg-amber-500"
        />
        <MetricCard
          label="Pending Invoices"
          value={formatCurrency(dashboardMetrics.pendingInvoices.value).replace("$", "")}
          prefix="$"
          change={dashboardMetrics.pendingInvoices.change}
          period={dashboardMetrics.pendingInvoices.period}
          icon={AlertTriangle}
          iconBg="bg-red-500"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Revenue & Profit</CardTitle>
                <CardDescription>2026 financial overview</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-blue-500 rounded" />Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-orange-500 rounded" />Expenses
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-green-500 rounded" />Profit
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={mockChartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0A84FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#30D158" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#30D158" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#A1A1AA" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#A1A1AA" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#0A84FF" strokeWidth={2} fill="url(#revenue)" name="revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#FF6B00" strokeWidth={2} fill="none" strokeDasharray="4 4" name="expenses" />
                <Area type="monotone" dataKey="profit" stroke="#30D158" strokeWidth={2} fill="url(#profit)" name="profit" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fleet status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Fleet Status</CardTitle>
            <CardDescription>29 total units</CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-2">
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={fleetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    strokeWidth={0}
                    dataKey="value"
                  >
                    {fleetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5">
              {fleetData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 flex-1">{item.name}</span>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{item.value}</span>
                  <span className="text-xs text-zinc-400">{Math.round((item.value / 29) * 100)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Recent loads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Recent Loads</CardTitle>
                <CardDescription>Latest 5 loads</CardDescription>
              </div>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="text-left text-xs font-medium text-zinc-500 px-5 py-2.5">Load #</th>
                  <th className="text-left text-xs font-medium text-zinc-500 px-5 py-2.5 hidden sm:table-cell">Route</th>
                  <th className="text-left text-xs font-medium text-zinc-500 px-5 py-2.5">Rate</th>
                  <th className="text-left text-xs font-medium text-zinc-500 px-5 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockLoads.map((load) => {
                  const sc = statusConfig[load.status];
                  return (
                    <tr key={load.id} className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-5 py-3">
                        <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                          {load.loadNumber}
                        </span>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate max-w-[140px]">
                            {load.pickupLocation.split(",")[0]} → {load.deliveryLocation.split(",")[0]}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {formatCurrency(load.rate)}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={sc.variant} dot>
                          {sc.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top drivers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Driver Performance</CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </div>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-2">
            <div className="space-y-3">
              {mockDrivers
                .filter((d) => d.status !== "inactive")
                .sort((a, b) => b.totalRevenue - a.totalRevenue)
                .slice(0, 4)
                .map((driver, i) => (
                  <div key={driver.id} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {driver.firstName[0]}{driver.lastName[0]}
                      </div>
                      {i === 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                          <span className="text-[8px] font-bold text-amber-900">1</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {driver.firstName} {driver.lastName}
                      </div>
                      <div className="text-xs text-zinc-400">Unit #{driver.unitNo}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {formatCurrency(driver.totalRevenue / 12)}
                      </div>
                      <div className="text-xs text-zinc-400">/mo avg</div>
                    </div>
                    <div className="w-20 flex-shrink-0">
                      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{
                            width: `${Math.min(100, (driver.totalRevenue / mockDrivers[0].totalRevenue) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly expenses bar chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Monthly Expenses Breakdown</CardTitle>
              <CardDescription>Revenue vs Expenses trend · 2026</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockChartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#A1A1AA" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#A1A1AA" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#0A84FF" radius={[4, 4, 0, 0]} maxBarSize={32} name="revenue" />
              <Bar dataKey="expenses" fill="#FF6B00" radius={[4, 4, 0, 0]} maxBarSize={32} name="expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
