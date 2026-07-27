"use client";
import React, { useState, useMemo } from "react";
import { Search, Plus, Download, Phone, Mail, Truck, MoreHorizontal, Eye, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockDrivers } from "@/lib/mock-data";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import type { DriverStatus } from "@/types";

const statusConfig: Record<DriverStatus, { label: string; variant: "success" | "warning" | "primary" | "danger" | "default" }> = {
  active: { label: "Active", variant: "success" },
  on_load: { label: "On Load", variant: "primary" },
  inactive: { label: "Inactive", variant: "default" },
  suspended: { label: "Suspended", variant: "danger" },
};

export default function DriversPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverStatus | "all">("all");
  const [view, setView] = useState<"table" | "grid">("table");

  const filtered = useMemo(() => {
    return mockDrivers.filter((d) => {
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch = !search || `${d.firstName} ${d.lastName}`.toLowerCase().includes(q) || d.unitNo.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Drivers</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{mockDrivers.length} total drivers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" />Export</Button>
          <Button size="sm"><Plus className="h-3.5 w-3.5" />Add Driver</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drivers..."
            className="pl-9 pr-4 h-9 w-56 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "active", "on_load", "inactive", "suspended"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 h-9 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === s
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
              {s !== "all" && (
                <span className="ml-1.5 text-xs opacity-75">
                  {mockDrivers.filter((d) => d.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                {["Driver", "Unit #", "OOP ID", "Status", "License Expiry", "Medical Expiry", "Total Miles", "Total Revenue", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((driver) => {
                const sc = statusConfig[driver.status];
                const licExpiring = new Date(driver.licenseExpiry) < new Date(Date.now() + 90 * 86400000);
                const medExpiring = new Date(driver.medicalExpiry) < new Date(Date.now() + 90 * 86400000);
                return (
                  <tr key={driver.id} className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {getInitials(`${driver.firstName} ${driver.lastName}`)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {driver.firstName} {driver.lastName}
                          </div>
                          <div className="text-xs text-zinc-400">{driver.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">{driver.unitNo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{driver.oopId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={sc.variant} dot>{sc.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {licExpiring && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
                        <span className={`text-xs ${licExpiring ? "text-amber-600 dark:text-amber-400 font-medium" : "text-zinc-600 dark:text-zinc-400"}`}>
                          {formatDate(driver.licenseExpiry)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {medExpiring && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
                        <span className={`text-xs ${medExpiring ? "text-amber-600 dark:text-amber-400 font-medium" : "text-zinc-600 dark:text-zinc-400"}`}>
                          {formatDate(driver.medicalExpiry)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                        {driver.totalMiles.toLocaleString()} mi
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(driver.totalRevenue)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon-sm"><Eye className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
