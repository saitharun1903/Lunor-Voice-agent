"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BarChart3,
  Briefcase,
  Layers,
  Settings,
  LogOut,
  Download,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Save,
  Search,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  Mic,
  Eye,
  EyeOff,
  Check,
  Building2,
  Key,
  X,
  Clock,
  Filter,
  FileText,
  Lock,
} from "lucide-react";
import {
  SiteData,
  Lead,
  Project,
  IndustryItem,
  UseCase,
  SiteStats,
  SiteSettings,
} from "@/lib/types";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminDashboardPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "projects" | "industries" | "useCases" | "stats" | "settings"
  >("overview");

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals for CRUD
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingIndustry, setEditingIndustry] = useState<IndustryItem | null>(null);
  const [isNewIndustry, setIsNewIndustry] = useState(false);
  const [newWorkflowInput, setNewWorkflowInput] = useState("");

  const [editingUseCase, setEditingUseCase] = useState<UseCase | null>(null);
  const [isNewUseCase, setIsNewUseCase] = useState(false);

  const [activeLeadNotesModal, setActiveLeadNotesModal] = useState<Lead | null>(null);

  // Password Change State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const router = useRouter();

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSiteData = async () => {
    try {
      const authRes = await fetch("/api/admin/auth");
      const authData = await authRes.json();

      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/admin/data");
      if (!res.ok) {
        throw new Error("Failed to load admin data");
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  // Section Savers
  const saveSection = async (section: string, payload: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, payload }),
      });
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save changes");
      }
      showToast("success", "Changes saved successfully");
      await fetchSiteData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Lead Actions
  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      showToast("success", "Lead updated");
      await fetchSiteData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to update lead");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lead");
      showToast("success", "Lead deleted");
      await fetchSiteData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete lead");
    }
  };

  // Project Actions (CRUD)
  const handleSaveProject = async (project: Project) => {
    if (!data) return;
    let updated = [...data.projects];
    const index = updated.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      updated[index] = project;
    } else {
      updated.unshift(project);
    }
    await saveSection("projects", updated);
    setEditingProject(null);
    setIsNewProject(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (!data) return;
    if (!confirm("Are you sure you want to permanently delete this project?")) return;
    const updated = data.projects.filter((p) => p.id !== id);
    await saveSection("projects", updated);
  };

  const handleToggleProjectActive = async (id: string) => {
    if (!data) return;
    const updated = data.projects.map((p) => (p.id === id ? { ...p, active: !p.active } : p));
    await saveSection("projects", updated);
  };

  // Industry Actions (CRUD)
  const handleSaveIndustry = async (ind: IndustryItem) => {
    if (!data) return;
    let updated = [...data.industries];
    const index = updated.findIndex((i) => i.id === ind.id);
    if (index >= 0) {
      updated[index] = ind;
    } else {
      updated.push(ind);
    }
    await saveSection("industries", updated);
    setEditingIndustry(null);
    setIsNewIndustry(false);
  };

  const handleDeleteIndustry = async (id: string) => {
    if (!data) return;
    if (!confirm("Are you sure you want to delete this industry?")) return;
    const updated = data.industries.filter((i) => i.id !== id);
    await saveSection("industries", updated);
  };

  const handleToggleIndustryActive = async (id: string) => {
    if (!data) return;
    const updated = data.industries.map((i) => (i.id === id ? { ...i, active: !i.active } : i));
    await saveSection("industries", updated);
  };

  // Use Case Actions (CRUD)
  const handleSaveUseCase = async (uc: UseCase) => {
    if (!data) return;
    let updated = [...data.useCases];
    const index = updated.findIndex((u) => u.id === uc.id);
    if (index >= 0) {
      updated[index] = uc;
    } else {
      updated.push(uc);
    }
    await saveSection("useCases", updated);
    setEditingUseCase(null);
    setIsNewUseCase(false);
  };

  const handleDeleteUseCase = async (id: string) => {
    if (!data) return;
    if (!confirm("Are you sure you want to delete this capability?")) return;
    const updated = data.useCases.filter((u) => u.id !== id);
    await saveSection("useCases", updated);
  };

  const handleToggleUseCaseActive = async (id: string) => {
    if (!data) return;
    const updated = data.useCases.map((u) => (u.id === id ? { ...u, active: !u.active } : u));
    await saveSection("useCases", updated);
  };

  // Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!newPassword || newPassword.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "password", payload: { newPassword } }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update password");
      setPasswordSuccess("Admin password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      showToast("success", "Password updated");
    } catch (err: any) {
      setPasswordError(err.message || "Failed to update password");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!data || !data.leads.length) return;
    const headers = [
      "ID",
      "Date",
      "Name",
      "Email",
      "Company",
      "Phone",
      "Industry",
      "Call Volume",
      "Status",
      "Requirements",
      "Notes",
    ];
    const rows = data.leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleString(),
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.industry || "").replace(/"/g, '""')}"`,
      `"${(l.monthlyCallVolume || "").replace(/"/g, '""')}"`,
      l.status,
      `"${(l.requirements || "").replace(/"/g, '""')}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `luno-leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#fafafc] dark:bg-[#030305] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-zinc-500">Loading Studio Control Center...</p>
        </div>
      </div>
    );
  }

  // Filter Leads
  const filteredLeads = data.leads.filter((l) => {
    const matchesSearch =
      (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.phone && l.phone.includes(searchTerm)) ||
      (l.requirements && l.requirements.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#fafafc] dark:bg-[#030305] text-[#1d1d1f] dark:text-[#f5f5f7] pb-24 transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-emerald-500/90 text-white"
                : "bg-rose-500/90 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/20">
              L
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-zinc-950 dark:text-white">
                LUNO ADMIN
              </span>
              <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                Production Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-rose-600 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-t border-black/[0.04] dark:border-white/[0.04]">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "leads", label: `Leads (${data.leads.length})`, icon: Users },
            { id: "projects", label: `Projects (${data.projects.length})`, icon: Briefcase },
            { id: "industries", label: `Industries (${data.industries.length})`, icon: Building2 },
            { id: "useCases", label: `Capabilities (${data.useCases.length})`, icon: Layers },
            { id: "stats", label: "Stats & Metrics", icon: Sparkles },
            { id: "settings", label: "Settings & Security", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold">
                  Total Captured Leads
                </span>
                <p className="text-3xl font-extrabold text-zinc-950 dark:text-white mt-1 font-mono">
                  {data.leads.length}
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 block">
                  ● {data.leads.filter((l) => l.status === "new").length} New Uncontacted
                </span>
              </div>

              <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold">
                  Live Case Studies
                </span>
                <p className="text-3xl font-extrabold text-zinc-950 dark:text-white mt-1 font-mono">
                  {data.projects.filter((p) => p.active).length}
                </p>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 mt-2 block">
                  Across {data.industries.length} Industries
                </span>
              </div>

              <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold">
                  Voice Agent ID
                </span>
                <p className="text-2xl font-bold text-zinc-950 dark:text-white mt-1 font-mono truncate">
                  {data.settings.voiceDemoAgentId || "246585"}
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 block">
                  ● OmniDimension Connected
                </span>
              </div>

              <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
                <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold">
                  Platform Reliability
                </span>
                <p className="text-3xl font-extrabold text-zinc-950 dark:text-white mt-1 font-mono">
                  {data.stats.uptime || "99.98%"}
                </p>
                <span className="text-[11px] text-zinc-500 mt-2 block">
                  {data.stats.avgResponseLatency || "< 450ms"} Latency
                </span>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    Recent Inbound Inquiries
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Latest submissions from the website contact deck
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All ({data.leads.length}) →
                </button>
              </div>

              {data.leads.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-400">
                  No inbound leads captured yet. Submissions from the contact form will appear here.
                </div>
              ) : (
                <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
                  {data.leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900 dark:text-white">
                            {lead.name}
                          </span>
                          {lead.company && (
                            <span className="text-xs text-zinc-500 font-medium">
                              • {lead.company}
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              lead.status === "new"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : lead.status === "contacted"
                                ? "bg-blue-500/10 text-blue-600"
                                : "bg-zinc-500/10 text-zinc-500"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 line-clamp-1">
                          {lead.requirements}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        <button
                          onClick={() => {
                            setActiveLeadNotesModal(lead);
                          }}
                          className="px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] text-zinc-700 dark:text-zinc-300 font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Leads Management */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, company, email, notes..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-2xl text-xs bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="archived">Archived</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  disabled={data.leads.length === 0}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold glass-button-secondary disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.08] text-zinc-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Company & Industry</th>
                      <th className="py-3.5 px-4">Requirements</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-zinc-400">
                          No leads matching current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-4 px-4">
                            <p className="font-bold text-zinc-900 dark:text-white">{lead.name}</p>
                            <p className="text-zinc-500 text-[11px]">{lead.email}</p>
                            {lead.phone && (
                              <p className="text-zinc-400 text-[10px] font-mono">{lead.phone}</p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                              {lead.company || "N/A"}
                            </p>
                            <p className="text-zinc-500 text-[11px]">
                              {lead.industry || "General Inquiry"}
                            </p>
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            <p className="text-zinc-700 dark:text-zinc-300 line-clamp-2">
                              {lead.requirements}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateLead(lead.id, { status: e.target.value as any })
                              }
                              className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="converted">Converted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-zinc-400 font-mono text-[11px]">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setActiveLeadNotesModal(lead)}
                                title="View & edit notes"
                                className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-600 hover:bg-blue-500/10 transition-colors"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                title="Delete lead"
                                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Projects / Case Studies (FULL CRUD) */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Client Case Studies ({data.projects.length})
                </h3>
                <p className="text-xs text-zinc-500">
                  Manage real-world deployments shown in the portfolio section.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    id: "project-" + Date.now(),
                    name: "",
                    industry: "Real Estate & Leasing",
                    tagline: "",
                    problem: "",
                    whatLunoAutomated: "",
                    workflow: ["Step 1", "Step 2", "Step 3"],
                    result: "",
                    metrics: ["100% Inbound Answer Rate", "0s Wait Time"],
                    active: true,
                  });
                  setIsNewProject(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold glass-button-primary"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Case Study</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl p-6 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-4 relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                        {project.industry}
                      </span>
                      <button
                        onClick={() => handleToggleProjectActive(project.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          project.active
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-zinc-500/10 text-zinc-500"
                        }`}
                      >
                        {project.active ? "Active" : "Hidden"}
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-zinc-950 dark:text-white">
                      {project.name}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] text-[11px] text-zinc-500 space-y-1">
                      <p>
                        <strong>Result:</strong> {project.result || "Operational automation"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingProject({ ...project });
                        setIsNewProject(false);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Industries (FULL CRUD) */}
        {activeTab === "industries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Industry Sectors ({data.industries.length})
                </h3>
                <p className="text-xs text-zinc-500">
                  Manage industry showcase categories, taglines, and custom workflows.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingIndustry({
                    id: "ind-" + Date.now(),
                    name: "",
                    icon: "Briefcase",
                    tagline: "",
                    description: "",
                    workflows: ["Inbound inquiry intake", "Automated scheduling"],
                    active: true,
                  });
                  setIsNewIndustry(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold glass-button-primary"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Industry</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.industries.map((ind) => (
                <div
                  key={ind.id}
                  className="rounded-3xl p-6 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-950 dark:text-white">
                        {ind.name}
                      </span>
                      <button
                        onClick={() => handleToggleIndustryActive(ind.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ind.active
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-zinc-500/10 text-zinc-500"
                        }`}
                      >
                        {ind.active ? "Active" : "Hidden"}
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {ind.tagline}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{ind.description}</p>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-zinc-400">
                        Workflows ({ind.workflows?.length || 0}):
                      </span>
                      <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-0.5">
                        {ind.workflows?.map((wf, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-blue-500" />
                            <span>{wf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingIndustry({ ...ind });
                        setIsNewIndustry(false);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteIndustry(ind.id)}
                      className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Capabilities / Use Cases (FULL CRUD) */}
        {activeTab === "useCases" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Universal Capabilities ({data.useCases.length})
                </h3>
                <p className="text-xs text-zinc-500">
                  Manage the conversational automation capability list.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingUseCase({
                    id: "uc-" + Date.now(),
                    title: "",
                    description: "",
                    icon: "HelpCircle",
                    category: "Inbound",
                    active: true,
                  });
                  setIsNewUseCase(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold glass-button-primary"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Capability</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.useCases.map((uc, index) => (
                <div
                  key={uc.id}
                  className="rounded-3xl p-5 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        #{index + 1}
                      </span>
                      <button
                        onClick={() => handleToggleUseCaseActive(uc.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          uc.active
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-zinc-500/10 text-zinc-500"
                        }`}
                      >
                        {uc.active ? "Active" : "Hidden"}
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white">{uc.title}</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                      {uc.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingUseCase({ ...uc });
                        setIsNewUseCase(false);
                      }}
                      className="p-1.5 rounded-lg text-zinc-600 hover:text-blue-600 hover:bg-blue-500/10"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUseCase(uc.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Stats & Metrics */}
        {activeTab === "stats" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                  Verified Platform Metrics
                </h3>
                <p className="text-xs text-zinc-500">
                  Update the live proof statistics displayed on the public website.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Companies Built
                  </label>
                  <input
                    type="number"
                    value={data.stats.companiesBuilt}
                    onChange={(e) =>
                      setData({
                        ...data,
                        stats: { ...data.stats, companiesBuilt: parseInt(e.target.value) || 0 },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Voice Agents Active
                  </label>
                  <input
                    type="number"
                    value={data.stats.voiceAgents}
                    onChange={(e) =>
                      setData({
                        ...data,
                        stats: { ...data.stats, voiceAgents: parseInt(e.target.value) || 0 },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Use Cases Automated
                  </label>
                  <input
                    type="number"
                    value={data.stats.useCasesAutomated}
                    onChange={(e) =>
                      setData({
                        ...data,
                        stats: { ...data.stats, useCasesAutomated: parseInt(e.target.value) || 0 },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Platform Uptime
                  </label>
                  <input
                    type="text"
                    value={data.stats.uptime || "99.98%"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        stats: { ...data.stats, uptime: e.target.value },
                      })
                    }
                    placeholder="99.98%"
                    className="w-full px-4 py-2.5 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Average Response Latency
                  </label>
                  <input
                    type="text"
                    value={data.stats.avgResponseLatency || "< 450ms"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        stats: { ...data.stats, avgResponseLatency: e.target.value },
                      })
                    }
                    placeholder="< 450ms"
                    className="w-full px-4 py-2.5 rounded-2xl text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex justify-end">
                <button
                  onClick={() => saveSection("stats", data.stats)}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Metric Updates</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Settings & Security */}
        {activeTab === "settings" && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* 1. Voice Agent Configuration */}
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-5">
              <div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Voice Agent Configuration
                </h3>
                <p className="text-xs text-zinc-500">
                  Control the single public live demonstration agent.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    OmniDimension Agent ID
                  </label>
                  <input
                    type="text"
                    value={data.settings.voiceDemoAgentId || "246585"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, voiceDemoAgentId: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Voice Demo Title
                  </label>
                  <input
                    type="text"
                    value={data.settings.voiceDemoTitle || "Talk to Luno"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, voiceDemoTitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Voice Demo Active Status
                  </label>
                  <select
                    value={data.settings.voiceDemoEnabled ? "true" : "false"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: {
                          ...data.settings,
                          voiceDemoEnabled: e.target.value === "true",
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                  >
                    <option value="true">Enabled (Live)</option>
                    <option value="false">Disabled (Maintenance)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Webhooks & Touchpoints */}
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-5">
              <div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Lead Forwarding & Google Sheets
                </h3>
                <p className="text-xs text-zinc-500">
                  Forward all captured inquiries to external workflows.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Google Sheets / Zapier Webhook URL
                </label>
                <input
                  type="url"
                  value={data.settings.googleSheetsWebhookUrl || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      settings: { ...data.settings, googleSheetsWebhookUrl: e.target.value },
                    })
                  }
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-4 py-2.5 rounded-2xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={data.settings.email || "conversations@luno.ai"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Studio Phone
                  </label>
                  <input
                    type="text"
                    value={data.settings.phone || "+1 (888) 586-6240"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, phone: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={data.settings.whatsapp || "+1 (888) 586-6240"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, whatsapp: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => saveSection("settings", data.settings)}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save General Settings</span>
                </button>
              </div>
            </div>

            {/* 3. Secure Admin Password Change Form (NO PLAIN TEXT REVEALED) */}
            <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    Admin Security & Password
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Change your authorized master password. Passwords are never shown in plain text.
                  </p>
                </div>
              </div>

              {passwordError && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    New Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Update Admin Password</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: Edit / Add Project */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl backdrop-blur-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  {isNewProject ? "Add New Project" : "Edit Case Study"}
                </h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Project / Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                    placeholder="e.g. Apex Prime Realty"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={editingProject.industry}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, industry: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Active Status
                    </label>
                    <select
                      value={editingProject.active ? "true" : "false"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          active: e.target.value === "true",
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                    >
                      <option value="true">Active (Visible)</option>
                      <option value="false">Hidden</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Tagline / Summary
                  </label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, tagline: e.target.value })
                    }
                    placeholder="e.g. Inbound property enquiry intake & showing booking"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    The Problem
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.problem}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, problem: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1 resize-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    What Luno Automated
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.whatLunoAutomated}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, whatLunoAutomated: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1 resize-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Operational Result
                  </label>
                  <input
                    type="text"
                    value={editingProject.result || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, result: e.target.value })
                    }
                    placeholder="e.g. 100% after-hours calls captured with 0s wait time"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProject(editingProject)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Case Study</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Edit / Add Industry */}
      <AnimatePresence>
        {editingIndustry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingIndustry(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl backdrop-blur-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  {isNewIndustry ? "Add New Industry" : "Edit Industry"}
                </h3>
                <button
                  onClick={() => setEditingIndustry(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Industry Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingIndustry.name}
                    onChange={(e) =>
                      setEditingIndustry({ ...editingIndustry, name: e.target.value })
                    }
                    placeholder="e.g. Legal & Financial Services"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Tagline</label>
                  <input
                    type="text"
                    value={editingIndustry.tagline}
                    onChange={(e) =>
                      setEditingIndustry({ ...editingIndustry, tagline: e.target.value })
                    }
                    placeholder="e.g. Consultation booking & case intake"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingIndustry.description}
                    onChange={(e) =>
                      setEditingIndustry({ ...editingIndustry, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1 resize-none"
                  />
                </div>

                {/* Workflows List */}
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Workflows List
                  </label>
                  <div className="space-y-1.5 mt-1">
                    {editingIndustry.workflows?.map((wf, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={wf}
                          onChange={(e) => {
                            const copy = [...(editingIndustry.workflows || [])];
                            copy[idx] = e.target.value;
                            setEditingIndustry({ ...editingIndustry, workflows: copy });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const copy = (editingIndustry.workflows || []).filter(
                              (_, i) => i !== idx
                            );
                            setEditingIndustry({ ...editingIndustry, workflows: copy });
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newWorkflowInput}
                        onChange={(e) => setNewWorkflowInput(e.target.value)}
                        placeholder="Add new workflow item..."
                        className="flex-1 px-3 py-1.5 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newWorkflowInput.trim()) {
                            const copy = [...(editingIndustry.workflows || [])];
                            copy.push(newWorkflowInput.trim());
                            setEditingIndustry({ ...editingIndustry, workflows: copy });
                            setNewWorkflowInput("");
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingIndustry(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveIndustry(editingIndustry)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Industry</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Edit / Add Use Case */}
      <AnimatePresence>
        {editingUseCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingUseCase(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md rounded-3xl backdrop-blur-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                  {isNewUseCase ? "Add Capability" : "Edit Capability"}
                </h3>
                <button
                  onClick={() => setEditingUseCase(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Capability Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUseCase.title}
                    onChange={(e) =>
                      setEditingUseCase({ ...editingUseCase, title: e.target.value })
                    }
                    placeholder="e.g. Warranty Claim Registration"
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingUseCase.description}
                    onChange={(e) =>
                      setEditingUseCase({ ...editingUseCase, description: e.target.value })
                    }
                    placeholder="Explain what conversation and business logic this capability automates..."
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white mt-1 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUseCase(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveUseCase(editingUseCase)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Capability</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: Lead Details & Internal Notes */}
      <AnimatePresence>
        {activeLeadNotesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLeadNotesModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl backdrop-blur-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                    Lead Inquiry Details
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">ID: {activeLeadNotesModal.id}</p>
                </div>
                <button
                  onClick={() => setActiveLeadNotesModal(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03]">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">
                      Client Name
                    </span>
                    <p className="font-bold text-zinc-900 dark:text-white">
                      {activeLeadNotesModal.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">
                      Company
                    </span>
                    <p className="font-bold text-zinc-900 dark:text-white">
                      {activeLeadNotesModal.company || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">
                      Email
                    </span>
                    <p className="text-zinc-800 dark:text-zinc-200">{activeLeadNotesModal.email}</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">
                      Phone
                    </span>
                    <p className="text-zinc-800 dark:text-zinc-200">
                      {activeLeadNotesModal.phone || "None"}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-mono mb-1">
                    What Caller Wants to Automate
                  </span>
                  <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] text-zinc-800 dark:text-zinc-200 text-xs leading-relaxed">
                    {activeLeadNotesModal.requirements}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Internal Engineering Notes
                  </label>
                  <textarea
                    rows={3}
                    value={activeLeadNotesModal.notes || ""}
                    onChange={(e) =>
                      setActiveLeadNotesModal({
                        ...activeLeadNotesModal,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Add follow-up notes, call recordings link, or scoping updates..."
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white resize-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLeadNotesModal(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await handleUpdateLead(activeLeadNotesModal.id, {
                      notes: activeLeadNotesModal.notes,
                    });
                    setActiveLeadNotesModal(null);
                  }}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
