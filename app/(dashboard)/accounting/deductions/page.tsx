"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  Printer,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  FileText,
  X,
  ArrowUpDown,
  CalendarDays,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockDeductions } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { OopDeduction } from "@/types";

type SortKey = keyof OopDeduction;

const columns = [
  { key: "id", label: "#", width: "w-12" },
  { key: "driverFirstName", label: "Driver", width: "w-40" },
  { key: "unitNo", label: "Unit #", width: "w-20" },
  { key: "oopId", label: "OOP ID", width: "w-20" },
  { key: "date", label: "Date", width: "w-28" },
  { key: "insuranceFee", label: "Insurance", width: "w-24", isCurrency: true },
  { key: "iftaFee", label: "IFTA", width: "w-20", isCurrency: true },
  { key: "cashAdvanceFee", label: "Cash Adv.", width: "w-24", isCurrency: true },
  { key: "fuelFee", label: "Fuel Fee", width: "w-24", isCurrency: true },
  { key: "trailerFee", label: "Trailer", width: "w-20", isCurrency: true },
  { key: "repairFee", label: "Repair", width: "w-20", isCurrency: true },
  { key: "parkingFee", label: "Parking", width: "w-20", isCurrency: true },
  { key: "fee2290", label: "2290", width: "w-16", isCurrency: true },
  { key: "eldFee", label: "ELD", width: "w-16", isCurrency: true },
  { key: "tollFee", label: "Toll", width: "w-16", isCurrency: true },
  { key: "irpFee", label: "IRP", width: "w-16", isCurrency: true },
  { key: "ucrFee", label: "UCR", width: "w-16", isCurrency: true },
  { key: "total", label: "Total", width: "w-24", isCurrency: true },
  { key: "approved", label: "Status", width: "w-24" },
];

function AddDeductionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Add New Deduction</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Enter OOP deduction details</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          {[
            { label: "Driver", type: "select", options: ["ABDIRAHMAN IBRAHIM", "OSMAN MOHAMED", "FRONT FREIGHT", "KHEYRE TRUCKING INC"] },
            { label: "Date", type: "date" },
            { label: "Unit #", type: "text", placeholder: "e.g. 0316" },
            { label: "OOP ID", type: "text", placeholder: "e.g. 1000" },
            { label: "Insurance Fee", type: "number", placeholder: "0.00" },
            { label: "IFTA Fee", type: "number", placeholder: "0.00" },
            { label: "Cash Advance", type: "number", placeholder: "0.00" },
            { label: "Fuel Fee", type: "number", placeholder: "0.00" },
            { label: "Trailer Fee", type: "number", placeholder: "0.00" },
            { label: "Repair Fee", type: "number", placeholder: "0.00" },
            { label: "Parking Fee", type: "number", placeholder: "0.00" },
            { label: "2290 Fee", type: "number", placeholder: "0.00" },
            { label: "ELD Fee", type: "number", placeholder: "0.00" },
            { label: "Toll Fee", type: "number", placeholder: "0.00" },
          ].map(({ label, type, placeholder, options }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">{label}</label>
              {type === "select" ? (
                <select className="w-full h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select driver...</option>
                  {options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Notes</label>
            <textarea
              rows={2}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Optional notes..."
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>
            <Plus className="h-3.5 w-3.5" />
            Add Deduction
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DeductionsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterDriver, setFilterDriver] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    let rows = [...mockDeductions];
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.driverFirstName.toLowerCase().includes(q) ||
          r.driverLastName.toLowerCase().includes(q) ||
          r.unitNo.toLowerCase().includes(q) ||
          r.oopId.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q)
      );
    }
    if (filterDriver) {
      rows = rows.filter((r) => `${r.driverFirstName} ${r.driverLastName}` === filterDriver);
    }
    if (filterStatus) {
      rows = rows.filter((r) => (filterStatus === "approved" ? r.approved : !r.approved));
    }
    if (dateFrom) rows = rows.filter((r) => r.date >= dateFrom);
    if (dateTo) rows = rows.filter((r) => r.date <= dateTo);

    rows.sort((a, b) => {
      const va = a[sortKey as keyof OopDeduction];
      const vb = b[sortKey as keyof OopDeduction];
      const cmp = String(va) < String(vb) ? -1 : String(va) > String(vb) ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, sortKey, sortDir, filterDriver, filterStatus, dateFrom, dateTo]);

  const totals = useMemo(() => ({
    insuranceFee: filtered.reduce((s, r) => s + r.insuranceFee, 0),
    iftaFee: filtered.reduce((s, r) => s + r.iftaFee, 0),
    cashAdvanceFee: filtered.reduce((s, r) => s + r.cashAdvanceFee, 0),
    fuelFee: filtered.reduce((s, r) => s + r.fuelFee, 0),
    trailerFee: filtered.reduce((s, r) => s + r.trailerFee, 0),
    repairFee: filtered.reduce((s, r) => s + r.repairFee, 0),
    parkingFee: filtered.reduce((s, r) => s + r.parkingFee, 0),
    fee2290: filtered.reduce((s, r) => s + r.fee2290, 0),
    eldFee: filtered.reduce((s, r) => s + r.eldFee, 0),
    tollFee: filtered.reduce((s, r) => s + r.tollFee, 0),
    irpFee: filtered.reduce((s, r) => s + r.irpFee, 0),
    ucrFee: filtered.reduce((s, r) => s + r.ucrFee, 0),
    total: filtered.reduce((s, r) => s + r.total, 0),
  }), [filtered]);

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selected);
      filtered.forEach((r) => next.delete(r.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      filtered.forEach((r) => next.add(r.id));
      setSelected(next);
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const drivers = [...new Set(mockDeductions.map((d) => `${d.driverFirstName} ${d.driverLastName}`))];

  return (
    <div className="h-full flex flex-col">
      <AddDeductionModal open={showModal} onClose={() => setShowModal(false)} />

      {/* Page Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">OOP Deductions</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {filtered.length} records · Grand Total:{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(totals.total)}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">{selected.size} selected</span>
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            )}
            <Button variant="outline" size="sm">
              <Printer className="h-3.5 w-3.5" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" onClick={() => setShowModal(true)}>
              <Plus className="h-3.5 w-3.5" />
              Add Deduction
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search driver, unit, OOP ID..."
              className="pl-9 pr-3 h-8 w-56 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Driver filter */}
          <select
            value={filterDriver}
            onChange={(e) => setFilterDriver(e.target.value)}
            className="h-8 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Drivers</option>
            {drivers.map((d) => <option key={d}>{d}</option>)}
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-8 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Approval</option>
          </select>

          {/* Date range */}
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-xs text-zinc-500">From</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-8 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-zinc-500">To</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-8 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {(search || filterDriver || filterStatus || dateFrom || dateTo) && (
            <button
              onClick={() => { setSearch(""); setFilterDriver(""); setFilterStatus(""); setDateFrom(""); setDateTo(""); }}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="px-6 py-3 grid grid-cols-4 gap-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 flex-shrink-0">
        {[
          { label: "Total Fuel", value: totals.fuelFee, color: "text-orange-600 dark:text-orange-400" },
          { label: "Total Insurance", value: totals.insuranceFee, color: "text-blue-600 dark:text-blue-400" },
          { label: "Total Repairs", value: totals.repairFee, color: "text-red-600 dark:text-red-400" },
          { label: "Grand Total", value: totals.total, color: "text-zinc-900 dark:text-zinc-100" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 px-4 py-3">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
            <div className={`text-lg font-bold mt-0.5 ${color}`}>{formatCurrency(value)}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: "1600px" }}>
          <thead className="sticky top-0 z-10">
            <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
              <th className="w-10 px-3 py-2.5 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="w-8 px-2 py-2.5 text-center text-xs font-semibold text-zinc-500">#</th>
              {[
                { key: "driverFirstName" as SortKey, label: "Driver", cls: "text-left" },
                { key: "unitNo" as SortKey, label: "Unit #", cls: "text-left" },
                { key: "oopId" as SortKey, label: "OOP ID", cls: "text-left" },
                { key: "date" as SortKey, label: "Date", cls: "text-left" },
                { key: "insuranceFee" as SortKey, label: "Insurance", cls: "text-right" },
                { key: "iftaFee" as SortKey, label: "IFTA", cls: "text-right" },
                { key: "cashAdvanceFee" as SortKey, label: "Cash Adv.", cls: "text-right" },
                { key: "fuelFee" as SortKey, label: "Fuel Fee", cls: "text-right" },
                { key: "trailerFee" as SortKey, label: "Trailer", cls: "text-right" },
                { key: "repairFee" as SortKey, label: "Repair", cls: "text-right" },
                { key: "parkingFee" as SortKey, label: "Parking", cls: "text-right" },
                { key: "fee2290" as SortKey, label: "2290", cls: "text-right" },
                { key: "eldFee" as SortKey, label: "ELD", cls: "text-right" },
                { key: "tollFee" as SortKey, label: "Toll", cls: "text-right" },
                { key: "irpFee" as SortKey, label: "IRP", cls: "text-right" },
                { key: "ucrFee" as SortKey, label: "UCR", cls: "text-right" },
                { key: "total" as SortKey, label: "Total", cls: "text-right" },
                { key: "approved" as SortKey, label: "Status", cls: "text-center" },
              ].map(({ key, label, cls }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 whitespace-nowrap select-none ${cls}`}
                >
                  <span className="flex items-center gap-1 ${cls === 'text-right' ? 'justify-end' : cls === 'text-center' ? 'justify-center' : ''}">
                    {label}
                    {sortKey === key ? (
                      sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-30" />
                    )}
                  </span>
                </th>
              ))}
              <th className="w-10 px-3 py-2.5" />
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, idx) => {
              const isSelected = selected.has(row.id);
              const displayId = row.id.replace("ded-", "");
              return (
                <tr
                  key={row.id}
                  className={`border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-default group ${isSelected ? "bg-blue-50 dark:bg-blue-950/20" : ""}`}
                >
                  <td className="w-10 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="w-8 px-2 py-2.5 text-center">
                    <span className="text-xs text-zinc-400 font-mono">{idx + 1}</span>
                  </td>

                  {/* Driver icon + name */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-white">
                          {row.driverFirstName[0]}{row.driverLastName[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          {row.driverFirstName}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate">{row.driverLastName}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">{row.unitNo}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">{row.oopId}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{formatDate(row.date)}</span>
                  </td>

                  {/* Currency cells */}
                  {[
                    row.insuranceFee, row.iftaFee, row.cashAdvanceFee, row.fuelFee,
                    row.trailerFee, row.repairFee, row.parkingFee, row.fee2290,
                    row.eldFee, row.tollFee, row.irpFee, row.ucrFee,
                  ].map((val, i) => (
                    <td key={i} className="px-3 py-2.5 text-right">
                      <span className={`text-xs font-mono ${val > 0 ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-300 dark:text-zinc-600"}`}>
                        {val > 0 ? formatCurrency(val) : "—"}
                      </span>
                    </td>
                  ))}

                  {/* Total */}
                  <td className="px-3 py-2.5 text-right">
                    <span className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(row.total)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2.5 text-center">
                    {row.approved ? (
                      <Badge variant="success" dot>Approved</Badge>
                    ) : (
                      <Badge variant="warning" dot>Pending</Badge>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                        <FileText className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 text-zinc-400 hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Totals row */}
          <tfoot className="sticky bottom-0 z-10">
            <tr className="bg-zinc-900 dark:bg-zinc-950 border-t-2 border-zinc-300 dark:border-zinc-600">
              <td colSpan={6} className="px-3 py-3">
                <span className="text-xs font-bold text-white uppercase tracking-wide">
                  Totals ({filtered.length} rows)
                </span>
              </td>
              {[
                totals.insuranceFee, totals.iftaFee, totals.cashAdvanceFee, totals.fuelFee,
                totals.trailerFee, totals.repairFee, totals.parkingFee, totals.fee2290,
                totals.eldFee, totals.tollFee, totals.irpFee, totals.ucrFee,
              ].map((val, i) => (
                <td key={i} className="px-3 py-3 text-right">
                  <span className={`text-xs font-bold font-mono ${val > 0 ? "text-white" : "text-zinc-600"}`}>
                    {val > 0 ? formatCurrency(val) : "—"}
                  </span>
                </td>
              ))}
              <td className="px-3 py-3 text-right">
                <span className="text-sm font-bold font-mono text-blue-400">
                  {formatCurrency(totals.total)}
                </span>
              </td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <FileText className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No deductions found</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
