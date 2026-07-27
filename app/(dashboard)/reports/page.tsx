"use client";
import React from "react";
import { BarChart3, Download, FileText, TrendingUp, DollarSign, Truck, Users, Fuel, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  { title: "Executive Summary", desc: "Revenue, profit, expenses overview", icon: TrendingUp, color: "bg-blue-600", category: "Financial" },
  { title: "Driver Performance", desc: "Miles, revenue, safety per driver", icon: Users, color: "bg-violet-600", category: "Operations" },
  { title: "Profit & Loss", desc: "Detailed P&L statement", icon: DollarSign, color: "bg-green-600", category: "Financial" },
  { title: "Fuel Report", desc: "Fuel costs, MPG, efficiency", icon: Fuel, color: "bg-orange-500", category: "Operations" },
  { title: "Fleet Utilization", desc: "Truck usage, idle time, downtime", icon: Truck, color: "bg-sky-600", category: "Operations" },
  { title: "IFTA Summary", desc: "Quarterly IFTA tax report", icon: FileText, color: "bg-amber-500", category: "Compliance" },
  { title: "Safety & Compliance", desc: "Violations, accidents, drug tests", icon: Shield, color: "bg-red-600", category: "Compliance" },
  { title: "Broker Analysis", desc: "Per-broker load & revenue breakdown", icon: BarChart3, color: "bg-indigo-600", category: "Financial" },
];

const categories = ["All", "Financial", "Operations", "Compliance"];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Reports</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Generate and export business intelligence reports</p>
        </div>
        <Button size="sm"><Download className="h-3.5 w-3.5" />Export All</Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button key={cat} className={`px-3 h-8 rounded-lg text-sm font-medium transition-colors ${cat === "All" ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reports.map((report) => (
          <Card key={report.title} className="hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${report.color} flex items-center justify-center`}>
                  <report.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  {report.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{report.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">{report.desc}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">View</Button>
                <Button variant="ghost" size="icon-sm"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
