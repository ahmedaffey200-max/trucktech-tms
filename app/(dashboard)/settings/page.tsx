"use client";
import React, { useState } from "react";
import { Building2, User, Bell, Shield, Palette, Globe, CreditCard, Key, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "company", label: "Company", icon: Building2 },
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "api", label: "API Keys", icon: Key },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Settings</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Manage your company and account settings</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <nav className="w-48 flex-shrink-0 space-y-0.5">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === id
                  ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {activeTab === "company" && (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and legal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Company Name", value: "MTN Cargo LLC", type: "text" },
                  { label: "DOT Number", value: "3456789", type: "text" },
                  { label: "MC Number", value: "MC-987654", type: "text" },
                  { label: "Address", value: "1234 Freight Ave, Minneapolis, MN 55401", type: "text" },
                  { label: "Phone", value: "+1 (612) 555-0100", type: "tel" },
                  { label: "Email", value: "dispatch@mtncargo.com", type: "email" },
                ].map(({ label, value, type }) => (
                  <div key={label} className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
                    <input
                      type={type}
                      defaultValue={value}
                      className="col-span-2 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div className="pt-2 flex justify-end">
                  <Button><Save className="h-3.5 w-3.5" />Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "branding" && (
            <Card>
              <CardHeader>
                <CardTitle>Company Branding</CardTitle>
                <CardDescription>Customize colors and logo for your tenant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Primary Color</label>
                  <div className="col-span-2 flex items-center gap-3">
                    <input type="color" defaultValue="#0A84FF" className="h-9 w-16 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer" />
                    <input defaultValue="#0A84FF" className="flex-1 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Accent Color</label>
                  <div className="col-span-2 flex items-center gap-3">
                    <input type="color" defaultValue="#FF6B00" className="h-9 w-16 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer" />
                    <input defaultValue="#FF6B00" className="flex-1 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm px-3 font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 pt-2">Company Logo</label>
                  <div className="col-span-2">
                    <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-white">MT</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">PNG, JPG up to 2MB</p>
                      <Button variant="outline" size="sm">Upload Logo</Button>
                    </div>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button><Save className="h-3.5 w-3.5" />Save Branding</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>Manage your plan and payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-300">Professional Plan</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">$299/month · Renews August 26, 2026</div>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {[
                      { label: "Drivers", used: 24, max: 50 },
                      { label: "Trucks", used: 29, max: 60 },
                      { label: "Users", used: 8, max: 20 },
                    ].map(({ label, used, max }) => (
                      <div key={label}>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">{label}: {used}/{max}</div>
                        <div className="h-1.5 bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(used/max)*100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline">Upgrade to Enterprise</Button>
              </CardContent>
            </Card>
          )}

          {(activeTab !== "company" && activeTab !== "branding" && activeTab !== "billing") && (
            <Card>
              <CardContent className="p-10 text-center">
                <div className="text-zinc-400 text-sm">Settings for {activeTab} coming soon</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
