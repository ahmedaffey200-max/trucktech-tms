"use client";
import React from "react";
import { Truck, MapPin, Clock, ArrowRight, Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockLoads, mockDrivers } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";

const hours = Array.from({ length: 24 }, (_, i) => i);
const days = ["Sun Jul 20", "Mon Jul 21", "Tue Jul 22", "Wed Jul 23", "Thu Jul 24", "Fri Jul 25", "Sat Jul 26"];

export default function DispatchPage() {
  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Dispatch Board</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live · July 2026
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Week View</Button>
          <Button size="sm"><Radio className="h-3.5 w-3.5" />Assign Load</Button>
        </div>
      </div>

      {/* Driver availability */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Available Drivers", count: 8, color: "bg-green-500" },
          { label: "On Load", count: 12, color: "bg-blue-500" },
          { label: "Off Duty", count: 4, color: "bg-zinc-400" },
          { label: "Available Trucks", count: 11, color: "bg-violet-500" },
        ].map(({ label, count, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                <span className="text-lg font-bold text-white">{count}</span>
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline board */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Driver Timeline — Week of July 20</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div style={{ minWidth: "900px" }}>
            {/* Header */}
            <div className="grid border-b border-zinc-100 dark:border-zinc-800" style={{ gridTemplateColumns: "160px repeat(7, 1fr)" }}>
              <div className="p-3 text-xs font-semibold text-zinc-500 border-r border-zinc-100 dark:border-zinc-800">Driver</div>
              {days.map((d) => (
                <div key={d} className="p-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 text-center border-r border-zinc-100 dark:border-zinc-800 last:border-r-0">
                  {d}
                </div>
              ))}
            </div>
            {/* Rows */}
            {mockDrivers.filter((d) => d.status !== "inactive").map((driver, i) => (
              <div key={driver.id} className="grid border-b border-zinc-50 dark:border-zinc-800/50" style={{ gridTemplateColumns: "160px repeat(7, 1fr)" }}>
                <div className="p-3 border-r border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {driver.firstName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">{driver.firstName}</div>
                    <div className="text-[10px] text-zinc-400">Unit {driver.unitNo}</div>
                  </div>
                </div>
                {days.map((d, di) => {
                  const load = mockLoads.find((l) => l.driverId === driver.id);
                  const hasLoad = load && (di === 2 || di === 3 || di === 4);
                  return (
                    <div key={d} className="p-1.5 border-r border-zinc-50 dark:border-zinc-800/30 last:border-r-0 min-h-[52px]">
                      {hasLoad && (
                        <div className={`rounded-md px-2 py-1.5 h-full text-white text-[10px] font-medium cursor-pointer hover:opacity-90 transition-opacity ${
                          load.status === "in_transit" ? "bg-green-600" :
                          load.status === "assigned" ? "bg-blue-600" :
                          "bg-zinc-500"
                        }`}>
                          <div className="font-semibold truncate">{load.loadNumber}</div>
                          <div className="opacity-75 truncate">{load.pickupLocation.split(",")[0]}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active loads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockLoads.filter((l) => l.status === "in_transit" || l.status === "assigned").map((load) => {
          const driver = mockDrivers.find((d) => d.id === load.driverId);
          return (
            <Card key={load.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">{load.loadNumber}</div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500">
                      <MapPin className="h-3 w-3" />
                      {load.pickupLocation} <ArrowRight className="h-3 w-3" /> {load.deliveryLocation}
                    </div>
                  </div>
                  <Badge variant={load.status === "in_transit" ? "success" : "primary"} dot>
                    {load.status === "in_transit" ? "In Transit" : "Assigned"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-zinc-400">Driver</div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">{driver ? `${driver.firstName} ${driver.lastName}` : "Unassigned"}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">Rate</div>
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(load.rate)}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">ETA</div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">{formatDate(load.deliveryDate)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
