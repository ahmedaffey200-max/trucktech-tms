"use client";
import React, { useState, useMemo } from "react";
import {
  Search, Plus, Filter, Download, Package, MapPin, Truck,
  Clock, CheckCircle2, XCircle, AlertCircle, MoreHorizontal, ArrowRight, Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockLoads } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { LoadStatus } from "@/types";

const statusConfig: Record<LoadStatus, { label: string; variant: "success" | "warning" | "primary" | "danger" | "default" | "info" }> = {
  pending: { label: "Pending", variant: "default" },
  assigned: { label: "Assigned", variant: "primary" },
  in_transit: { label: "In Transit", variant: "success" },
  delivered: { label: "Delivered", variant: "info" },
  invoiced: { label: "Invoiced", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  cancelled: { label: "Cancelled", variant: "danger" },
};

const statusCounts = {
  all: mockLoads.length,
  in_transit: mockLoads.filter((l) => l.status === "in_transit").length,
  assigned: mockLoads.filter((l) => l.status === "assigned").length,
  delivered: mockLoads.filter((l) => l.status === "delivered").length,
  invoiced: mockLoads.filter((l) => l.status === "invoiced").length,
  paid: mockLoads.filter((l) => l.status === "paid").length,
};

export default function LoadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LoadStatus | "all">("all");

  const filtered = useMemo(() => {
    return mockLoads.filter((l) => {
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const matchesSearch =
        !search ||
        l.loadNumber.toLowerCase().includes(search.toLowerCase()) ||
        l.pickupLocation.toLowerCase().includes(search.toLowerCase()) ||
        l.deliveryLocation.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Load Management</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{mockLoads.length} total loads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" />Export</Button>
          <Button size="sm"><Plus className="h-3.5 w-3.5" />New Load</Button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {(["all", "in_transit", "assigned", "delivered", "invoiced", "paid"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              statusFilter === status
                ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-zinc-500 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {status === "all" ? "All" : statusConfig[status].label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              statusFilter === status
                ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            }`}>
              {statusCounts[status as keyof typeof statusCounts] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search loads..."
          className="pl-9 pr-4 h-9 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100"
        />
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                {["Load #", "Status", "Driver", "Route", "Date", "Miles", "Rate", "Profit", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((load) => {
                const sc = statusConfig[load.status];
                return (
                  <tr key={load.id} className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">{load.loadNumber}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={sc.variant} dot>{sc.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                          <Truck className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300">Unit #{load.truckId?.replace("truck-", "")}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                        <MapPin className="h-3 w-3 flex-shrink-0 text-zinc-400" />
                        <span className="truncate max-w-[200px]">
                          {load.pickupLocation} <ArrowRight className="inline h-3 w-3 mx-0.5" /> {load.deliveryLocation}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        <div>{formatDate(load.pickupDate)}</div>
                        <div className="text-zinc-400">{formatDate(load.deliveryDate)}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{load.miles.toLocaleString()} mi</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(load.rate)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                        {load.profit ? formatCurrency(load.profit) : "—"}
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
