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
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  MessageSquare,
  Sparkles,
  Mail,
  Building2,
  X,
  FileText,
  Globe,
  MoveUp,
  MoveDown,
  Compass,
  HelpCircle,
  History,
  RefreshCw,
} from "lucide-react";
import {
  SiteData,
  Lead,
  Project,
  SiteSettings,
  CapabilityItem,
  IndustryStory,
  ProcessStep,
  FaqItem,
  NavigationContent,
} from "@/lib/types";
import { ThemeToggle } from "@/components/theme-toggle";

type TabType =
  | "overview"
  | "settings"
  | "hero"
  | "navigation"
  | "capabilities"
  | "industries"
  | "projects"
  | "process"
  | "faq"
  | "contact"
  | "seo"
  | "leads"
  | "audit";

export default function AdminDashboardPage() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Global search & notifications
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Local form states for individual sections
  const [settingsForm, setSettingsForm] = useState<SiteSettings | null>(null);
  const [navigationForm, setNavigationForm] = useState<NavigationContent | null>(null);

  // Modals for CRUD
  const [editingCapability, setEditingCapability] = useState<CapabilityItem | null>(null);
  const [isNewCapability, setIsNewCapability] = useState(false);

  const [editingIndustry, setEditingIndustry] = useState<IndustryStory | null>(null);
  const [isNewIndustry, setIsNewIndustry] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingProcess, setEditingProcess] = useState<ProcessStep | null>(null);

  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isNewFaq, setIsNewFaq] = useState(false);

  // Leads state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
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
      if (!res.ok) throw new Error("Failed to load admin data");
      const json: SiteData = await res.json();
      setData(json);
      setSettingsForm(json.settings);
      setNavigationForm(json.navigation);
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
  const saveSection = async (section: string, payload: any, action: "update" | "publish" = "publish") => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, payload, action }),
      });
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save changes");
      }
      showToast("success", action === "publish" ? "Published to live website" : "Saved draft successfully");
      await fetchSiteData();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Reordering helpers
  const moveItem = async <T extends { id: string; order?: number }>(
    items: T[],
    id: string,
    direction: "up" | "down",
    section: string
  ) => {
    const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
    const index = sorted.findIndex((it) => it.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sorted.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const tempOrder = sorted[index].order || index + 1;
    sorted[index].order = sorted[targetIndex].order || targetIndex + 1;
    sorted[targetIndex].order = tempOrder;

    await saveSection(section, sorted, "publish");
  };

  // Capabilities CRUD
  const handleSaveCapability = async (cap: CapabilityItem) => {
    if (!data) return;
    let list = [...(data.capabilities || [])];
    const idx = list.findIndex((c) => c.id === cap.id);
    if (idx >= 0) {
      list[idx] = { ...cap, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...cap, order: list.length + 1, updatedAt: new Date().toISOString() });
    }
    await saveSection("capabilities", list, "publish");
    setEditingCapability(null);
  };

  const handleDeleteCapability = async (id: string) => {
    if (!data || !confirm("Are you sure you want to delete this capability?")) return;
    const list = data.capabilities.filter((c) => c.id !== id);
    await saveSection("capabilities", list, "publish");
  };

  // Industries CRUD
  const handleSaveIndustry = async (ind: IndustryStory) => {
    if (!data) return;
    let list = [...(data.industryStories || [])];
    const idx = list.findIndex((i) => i.id === ind.id);
    if (idx >= 0) {
      list[idx] = { ...ind, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...ind, order: list.length + 1, updatedAt: new Date().toISOString() });
    }
    await saveSection("industryStories", list, "publish");
    setEditingIndustry(null);
  };

  const handleDeleteIndustry = async (id: string) => {
    if (!data || !confirm("Are you sure you want to delete this industry workflow?")) return;
    const list = data.industryStories.filter((i) => i.id !== id);
    await saveSection("industryStories", list, "publish");
  };

  // Case Studies CRUD
  const handleSaveProject = async (proj: Project) => {
    if (!data) return;
    let list = [...(data.projects || [])];
    const idx = list.findIndex((p) => p.id === proj.id);
    if (idx >= 0) {
      list[idx] = { ...proj, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...proj, order: list.length + 1, updatedAt: new Date().toISOString() });
    }
    await saveSection("projects", list, "publish");
    setEditingProject(null);
  };

  const handleDeleteProject = async (id: string) => {
    if (!data || !confirm("Are you sure you want to delete this case study?")) return;
    const list = data.projects.filter((p) => p.id !== id);
    await saveSection("projects", list, "publish");
  };

  // Process CRUD
  const handleSaveProcess = async (proc: ProcessStep) => {
    if (!data) return;
    let list = [...(data.processSteps || [])];
    const idx = list.findIndex((p) => p.id === proc.id);
    if (idx >= 0) {
      list[idx] = { ...proc, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...proc, order: list.length + 1, updatedAt: new Date().toISOString() });
    }
    await saveSection("processSteps", list, "publish");
    setEditingProcess(null);
  };

  // FAQ CRUD
  const handleSaveFaq = async (faq: FaqItem) => {
    if (!data) return;
    let list = [...(data.faqs || [])];
    const idx = list.findIndex((f) => f.id === faq.id);
    if (idx >= 0) {
      list[idx] = { ...faq, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...faq, order: list.length + 1, updatedAt: new Date().toISOString() });
    }
    await saveSection("faqs", list, "publish");
    setEditingFaq(null);
  };

  const handleDeleteFaq = async (id: string) => {
    if (!data || !confirm("Are you sure you want to delete this FAQ item?")) return;
    const list = data.faqs.filter((f) => f.id !== id);
    await saveSection("faqs", list, "publish");
  };

  // Leads Handlers
  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      showToast("success", "Lead status updated");
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

  const handleExportCSV = () => {
    if (!data || !data.leads.length) return;
    const headers = ["ID", "Date", "Name", "Email", "Company", "Phone", "Industry", "Call Volume", "Status", "Requirements", "Notes"];
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
    link.download = `voiceops-leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
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

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#fafafc] dark:bg-[#030305] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-zinc-500">Loading VOICEOPS Control Center...</p>
        </div>
      </div>
    );
  }

  // Filter Leads
  const filteredLeads = (data.leads || []).filter((l) => {
    const matchesSearch =
      (l.name && l.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.phone && l.phone.includes(searchTerm)) ||
      (l.requirements && l.requirements.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedCapabilitiesCount = (data.capabilities || []).filter((c) => c.status === "published").length;
  const publishedIndustriesCount = (data.industryStories || []).filter((i) => i.status === "published").length;
  const publishedProjectsCount = (data.projects || []).filter((p) => p.status === "published" || p.active).length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#07090E] text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-xl ${
              toast.type === "success" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0B0E17]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-md shadow-blue-500/20">
            VO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-zinc-950 dark:text-white">VOICEOPS</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/50 dark:border-blue-800/40">
                Production CMS
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Website Content & Telephony Synchronization</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </Link>

          <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

          <ThemeToggle />

          <button
            onClick={handleLogout}
            title="Log out of Admin Portal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
            Content Management
          </div>

          {[
            { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
            { id: "settings", label: "Site Settings", icon: Settings },
            { id: "hero", label: "Hero & Opening", icon: Sparkles },
            { id: "navigation", label: "Navigation Content", icon: Compass },
            { id: "capabilities", label: "Capabilities (01-06)", icon: Layers, badge: `${publishedCapabilitiesCount}/6` },
            { id: "industries", label: "Industry World", icon: Building2, badge: `${publishedIndustriesCount}` },
            { id: "projects", label: "Case Studies (Work)", icon: Briefcase, badge: `${publishedProjectsCount}` },
            { id: "process", label: "Process & Methodology", icon: FileText },
            { id: "faq", label: "FAQ Management", icon: HelpCircle },
            { id: "contact", label: "Contact & Footer", icon: Mail },
            { id: "seo", label: "SEO & Brand Metadata", icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      isActive ? "bg-white/20 text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
            Operations & Leads
          </div>

          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between ${
              activeTab === "leads"
                ? "bg-blue-600 text-white font-semibold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 shrink-0" />
              <span>Inbound Leads</span>
            </div>
            {(data.leads || []).length > 0 && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  activeTab === "leads" ? "bg-white/20 text-white" : "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold"
                }`}
              >
                {(data.leads || []).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center gap-2.5 ${
              activeTab === "audit"
                ? "bg-blue-600 text-white font-semibold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <History className="w-4 h-4 shrink-0" />
            <span>Audit History</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white dark:bg-[#0C0F19] rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">CMS Dashboard Overview</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Live summary of content states, operational pipelines, and publication records.
                </p>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-white/[0.05]">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Capabilities</span>
                  <div className="text-2xl font-bold mt-1 text-zinc-950 dark:text-white">{publishedCapabilitiesCount}</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Published & Synced</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-white/[0.05]">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Industries</span>
                  <div className="text-2xl font-bold mt-1 text-zinc-950 dark:text-white">{publishedIndustriesCount}</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Active Verticals</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-white/[0.05]">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Case Studies</span>
                  <div className="text-2xl font-bold mt-1 text-zinc-950 dark:text-white">{publishedProjectsCount}</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Portfolio Stories</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-white/[0.05]">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase">Total Leads</span>
                  <div className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">{(data.leads || []).length}</div>
                  <span className="text-[10px] text-zinc-500 font-medium">Inbound Callers</span>
                </div>
              </div>

              {/* Status and Direct Actions */}
              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-sm text-zinc-950 dark:text-white">Public Website Engine: Synchronized</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Publishing changes updates the public live website in sub-second latency with zero manual code changes.
                  </p>
                </div>

                <button
                  onClick={() => saveSection("settings", data.settings, "publish")}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${saving ? "animate-spin" : ""}`} />
                  <span>Re-Sync Public Cache</span>
                </button>
              </div>

              {/* Recent Audit Log Feed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">Recent CMS Publication Activity</h3>
                  <button
                    onClick={() => setActiveTab("audit")}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    View All
                  </button>
                </div>

                <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200/80 dark:border-white/[0.08] rounded-xl overflow-hidden">
                  {(data.auditLogs || []).slice(0, 4).map((log) => (
                    <div key={log.id} className="p-3.5 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{log.entityType}</span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                            {log.action}
                          </span>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400">{log.details}</p>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SITE SETTINGS */}
          {activeTab === "settings" && settingsForm && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Site Settings & Telephony</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Global operational and brand configurations applied across all touchpoints.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Company Name</label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Business Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Business Phone</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Meeting / Calendar Booking URL</label>
                  <input
                    type="url"
                    value={settingsForm.meetingUrl || ""}
                    onChange={(e) => setSettingsForm({ ...settingsForm, meetingUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Voice Demo Agent ID</label>
                  <input
                    type="text"
                    value={settingsForm.voiceDemoAgentId || ""}
                    onChange={(e) => setSettingsForm({ ...settingsForm, voiceDemoAgentId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
                <button
                  onClick={() => saveSection("settings", settingsForm, "publish")}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {saving ? "Publishing..." : "Publish Settings"}
                </button>
              </div>

              {/* Password Section */}
              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">Admin Security Credentials</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Update administrator password used for CMS session authentication.</p>

                <form onSubmit={handleChangePassword} className="mt-4 max-w-md space-y-3">
                  {passwordError && <p className="text-xs text-rose-600 font-semibold">{passwordError}</p>}
                  {passwordSuccess && <p className="text-xs text-emerald-600 font-semibold">{passwordSuccess}</p>}

                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: HERO & OPENING */}
          {activeTab === "hero" && settingsForm && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Hero & Opening Chapter</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Manage high-impact editorial statements, headlines, and call-to-actions.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Eyebrow Label</label>
                    <span className="text-[10px] font-mono text-zinc-400">{settingsForm.heroEyebrow?.length || 0}/40</span>
                  </div>
                  <input
                    type="text"
                    value={settingsForm.heroEyebrow}
                    maxLength={40}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroEyebrow: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Primary Headline</label>
                    <span className="text-[10px] font-mono text-zinc-400">{settingsForm.heroHeadline?.length || 0}/80</span>
                  </div>
                  <input
                    type="text"
                    value={settingsForm.heroHeadline}
                    maxLength={80}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Supporting Subheadline</label>
                    <span className="text-[10px] font-mono text-zinc-400">{settingsForm.heroSubheadline?.length || 0}/200</span>
                  </div>
                  <textarea
                    rows={3}
                    value={settingsForm.heroSubheadline}
                    maxLength={200}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Primary CTA Text</label>
                    <input
                      type="text"
                      value={settingsForm.heroPrimaryCtaText || "Talk to VoiceOps"}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroPrimaryCtaText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={settingsForm.heroSecondaryCtaText || "Explore Architecture"}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSecondaryCtaText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => saveSection("settings", settingsForm, "publish")}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {saving ? "Publishing..." : "Publish Hero Content"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: NAVIGATION CONTENT */}
          {activeTab === "navigation" && navigationForm && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Navigation Labels & CTA</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Customize the labels displayed on the floating glass navigation bar. Enforced character limits prevent UI crowding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Live Demo Label</label>
                    <span className="text-[10px] font-mono text-zinc-400">{navigationForm.demoLabel?.length || 0}/16</span>
                  </div>
                  <input
                    type="text"
                    maxLength={16}
                    value={navigationForm.demoLabel}
                    onChange={(e) => setNavigationForm({ ...navigationForm, demoLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Capabilities Label</label>
                    <span className="text-[10px] font-mono text-zinc-400">{navigationForm.capabilitiesLabel?.length || 0}/16</span>
                  </div>
                  <input
                    type="text"
                    maxLength={16}
                    value={navigationForm.capabilitiesLabel}
                    onChange={(e) => setNavigationForm({ ...navigationForm, capabilitiesLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Industries Label</label>
                    <span className="text-[10px] font-mono text-zinc-400">{navigationForm.industriesLabel?.length || 0}/16</span>
                  </div>
                  <input
                    type="text"
                    maxLength={16}
                    value={navigationForm.industriesLabel}
                    onChange={(e) => setNavigationForm({ ...navigationForm, industriesLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Work / Case Studies Label</label>
                    <span className="text-[10px] font-mono text-zinc-400">{navigationForm.workLabel?.length || 0}/16</span>
                  </div>
                  <input
                    type="text"
                    maxLength={16}
                    value={navigationForm.workLabel}
                    onChange={(e) => setNavigationForm({ ...navigationForm, workLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Process Label</label>
                    <span className="text-[10px] font-mono text-zinc-400">{navigationForm.processLabel?.length || 0}/16</span>
                  </div>
                  <input
                    type="text"
                    maxLength={16}
                    value={navigationForm.processLabel}
                    onChange={(e) => setNavigationForm({ ...navigationForm, processLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Action Button CTA</label>
                    <span className="text-[10px] font-mono text-zinc-400">{navigationForm.ctaLabel?.length || 0}/20</span>
                  </div>
                  <input
                    type="text"
                    maxLength={20}
                    value={navigationForm.ctaLabel}
                    onChange={(e) => setNavigationForm({ ...navigationForm, ctaLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => saveSection("navigation", navigationForm, "publish")}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {saving ? "Publishing..." : "Publish Navigation Labels"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: CAPABILITIES (01-06 FLIP CARDS) */}
          {activeTab === "capabilities" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Capabilities Matrix (01-06 3D Flip Cards)</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Control front title/subtitle, back explanation, 4-step workflow chips, outcome, order, and publishing status.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCapability({
                      id: `cap-${Date.now()}`,
                      index: String((data.capabilities || []).length + 1).padStart(2, "0"),
                      title: "NEW CAPABILITY",
                      subtitle: "Brief description of capability.",
                      explanation: "Detailed description of capability without breaking cards.",
                      workflow: ["Ask", "Understand", "Answer", "Resolve"],
                      outcome: "Verified business outcome",
                      status: "published",
                      order: (data.capabilities || []).length + 1,
                    });
                    setIsNewCapability(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Capability</span>
                </button>
              </div>

              <div className="space-y-3">
                {[...(data.capabilities || [])]
                  .sort((a, b) => a.order - b.order)
                  .map((cap, idx, arr) => (
                    <div
                      key={cap.id}
                      className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 w-8">
                          {cap.index || String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs uppercase tracking-tight text-zinc-950 dark:text-white">
                              {cap.title}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                                cap.status === "published"
                                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-semibold"
                              }`}
                            >
                              {cap.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5 max-w-lg truncate">{cap.subtitle}</p>
                          <div className="flex items-center gap-1.5 mt-1.5 font-mono text-[10px] text-zinc-400">
                            {cap.workflow?.join(" → ")} | {cap.outcome}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => moveItem(data.capabilities, cap.id, "up", "capabilities")}
                          disabled={idx === 0}
                          title="Move Up"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveItem(data.capabilities, cap.id, "down", "capabilities")}
                          disabled={idx === arr.length - 1}
                          title="Move Down"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingCapability(cap);
                            setIsNewCapability(false);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCapability(cap.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Capability Edit Modal */}
              <AnimatePresence>
                {editingCapability && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-xl bg-white dark:bg-[#0E121E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                          {isNewCapability ? "Create New Capability Card" : `Edit Capability ${editingCapability.index}`}
                        </h3>
                        <button onClick={() => setEditingCapability(null)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Index Number</label>
                            <input
                              type="text"
                              value={editingCapability.index}
                              onChange={(e) => setEditingCapability({ ...editingCapability, index: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
                            <select
                              value={editingCapability.status}
                              onChange={(e) => setEditingCapability({ ...editingCapability, status: e.target.value as "published" | "draft" })}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                            >
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Card Front Title</label>
                            <span className="text-[10px] font-mono text-zinc-400">{editingCapability.title?.length || 0}/20</span>
                          </div>
                          <input
                            type="text"
                            maxLength={20}
                            value={editingCapability.title}
                            onChange={(e) => setEditingCapability({ ...editingCapability, title: e.target.value.toUpperCase() })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none font-bold tracking-tight uppercase"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Card Front Subtitle</label>
                            <span className="text-[10px] font-mono text-zinc-400">{editingCapability.subtitle?.length || 0}/60</span>
                          </div>
                          <input
                            type="text"
                            maxLength={60}
                            value={editingCapability.subtitle}
                            onChange={(e) => setEditingCapability({ ...editingCapability, subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Card Back Explanation</label>
                            <span className="text-[10px] font-mono text-zinc-400">{editingCapability.explanation?.length || 0}/140</span>
                          </div>
                          <textarea
                            rows={2}
                            maxLength={140}
                            value={editingCapability.explanation}
                            onChange={(e) => setEditingCapability({ ...editingCapability, explanation: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">4 Workflow Steps (Back Face Chips)</label>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            {[0, 1, 2, 3].map((stepIdx) => (
                              <input
                                key={stepIdx}
                                type="text"
                                maxLength={14}
                                placeholder={`Step ${stepIdx + 1}`}
                                value={editingCapability.workflow?.[stepIdx] || ""}
                                onChange={(e) => {
                                  const wf = [...(editingCapability.workflow || ["", "", "", ""])];
                                  wf[stepIdx] = e.target.value;
                                  setEditingCapability({ ...editingCapability, workflow: wf });
                                }}
                                className="px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none font-mono"
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Verified Outcome (Result Row)</label>
                            <span className="text-[10px] font-mono text-zinc-400">{editingCapability.outcome?.length || 0}/35</span>
                          </div>
                          <input
                            type="text"
                            maxLength={35}
                            value={editingCapability.outcome}
                            onChange={(e) => setEditingCapability({ ...editingCapability, outcome: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                        <button
                          onClick={() => setEditingCapability(null)}
                          className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveCapability(editingCapability)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                        >
                          Save & Publish
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 6: INDUSTRIES */}
          {activeTab === "industries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Industry Verticals & Workflows</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Manage horizontal industry tabs, decision pipelines, and operational metrics.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingIndustry({
                      id: `industry-${Date.now()}`,
                      name: "New Industry",
                      tagline: "High impact tagline for this vertical.",
                      summary: "Detailed summary of how VoiceOps automates this industry.",
                      steps: ["Enquiry", "Qualification", "Booking", "Follow-up"],
                      metric: "Sub-second cadence · Zero missed calls",
                      status: "published",
                      order: (data.industryStories || []).length + 1,
                    });
                    setIsNewIndustry(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Industry</span>
                </button>
              </div>

              <div className="space-y-3">
                {[...(data.industryStories || [])]
                  .sort((a, b) => a.order - b.order)
                  .map((ind, idx, arr) => (
                    <div
                      key={ind.id}
                      className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-zinc-950 dark:text-white">{ind.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                            {ind.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{ind.tagline}</p>
                        <p className="text-[11px] font-mono text-zinc-400 mt-1">{ind.steps?.join(" → ")} | {ind.metric}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => moveItem(data.industryStories, ind.id, "up", "industryStories")}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveItem(data.industryStories, ind.id, "down", "industryStories")}
                          disabled={idx === arr.length - 1}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingIndustry(ind);
                            setIsNewIndustry(false);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteIndustry(ind.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Industry Edit Modal */}
              <AnimatePresence>
                {editingIndustry && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-xl bg-white dark:bg-[#0E121E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                          {isNewIndustry ? "Add Industry Story" : `Edit ${editingIndustry.name}`}
                        </h3>
                        <button onClick={() => setEditingIndustry(null)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Vertical Name</label>
                            <input
                              type="text"
                              value={editingIndustry.name}
                              onChange={(e) => setEditingIndustry({ ...editingIndustry, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
                            <select
                              value={editingIndustry.status}
                              onChange={(e) => setEditingIndustry({ ...editingIndustry, status: e.target.value as "published" | "draft" })}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                            >
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tagline</label>
                          <input
                            type="text"
                            value={editingIndustry.tagline}
                            onChange={(e) => setEditingIndustry({ ...editingIndustry, tagline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Summary</label>
                          <textarea
                            rows={3}
                            value={editingIndustry.summary}
                            onChange={(e) => setEditingIndustry({ ...editingIndustry, summary: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Steps (Comma-separated)</label>
                          <input
                            type="text"
                            value={editingIndustry.steps?.join(", ") || ""}
                            onChange={(e) =>
                              setEditingIndustry({
                                ...editingIndustry,
                                steps: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Verified Metric</label>
                          <input
                            type="text"
                            value={editingIndustry.metric}
                            onChange={(e) => setEditingIndustry({ ...editingIndustry, metric: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                        <button
                          onClick={() => setEditingIndustry(null)}
                          className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveIndustry(editingIndustry)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                        >
                          Save & Publish
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 7: CASE STUDIES (WORK) */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Case Studies & Studio Work</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Manage client deployments (e.g. Noor Modern Doors), operational metrics, problems solved, and verified outcomes.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject({
                      id: `project-${Date.now()}`,
                      name: "New Client Project",
                      industry: "Industry Name",
                      tagline: "Tagline describing client automation.",
                      problem: "Description of the problem solved.",
                      whatLunoAutomated: "Detailed explanation of VoiceOps automation.",
                      handles: ["Capability 1", "Capability 2"],
                      result: "Verified quantitative result.",
                      active: true,
                      status: "published",
                      order: (data.projects || []).length + 1,
                    });
                    setIsNewProject(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Case Study</span>
                </button>
              </div>

              <div className="space-y-3">
                {[...(data.projects || [])]
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((proj, idx, arr) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-zinc-950 dark:text-white">{proj.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold">
                            {proj.industry}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{proj.tagline}</p>
                        <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">✓ {proj.result}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => moveItem(data.projects, proj.id, "up", "projects")}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveItem(data.projects, proj.id, "down", "projects")}
                          disabled={idx === arr.length - 1}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsNewProject(false);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Case Study Edit Modal */}
              <AnimatePresence>
                {editingProject && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-xl bg-white dark:bg-[#0E121E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                          {isNewProject ? "Add Case Study" : `Edit ${editingProject.name}`}
                        </h3>
                        <button onClick={() => setEditingProject(null)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Client / Project Name</label>
                            <input
                              type="text"
                              value={editingProject.name}
                              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Industry</label>
                            <input
                              type="text"
                              value={editingProject.industry}
                              onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tagline / Headline</label>
                          <input
                            type="text"
                            value={editingProject.tagline}
                            onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Problem Statement</label>
                          <textarea
                            rows={3}
                            value={editingProject.problem}
                            onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">What VoiceOps Automated</label>
                          <textarea
                            rows={3}
                            value={editingProject.whatLunoAutomated}
                            onChange={(e) => setEditingProject({ ...editingProject, whatLunoAutomated: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Handles (Comma-separated bullets)</label>
                          <input
                            type="text"
                            value={editingProject.handles?.join(", ") || ""}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                handles: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Verified Result</label>
                          <input
                            type="text"
                            value={editingProject.result}
                            onChange={(e) => setEditingProject({ ...editingProject, result: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                        <button
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveProject(editingProject)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                        >
                          Save & Publish
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 8: PROCESS & METHODOLOGY */}
          {activeTab === "process" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Process & Methodology (4 Stages)</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Manage the 4 linear stages of client onboarding from audit to live deployment.
                </p>
              </div>

              <div className="space-y-3">
                {[...(data.processSteps || [])]
                  .sort((a, b) => a.order - b.order)
                  .map((proc, idx, arr) => (
                    <div
                      key={proc.id}
                      className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 w-8">
                          {proc.step || String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className="font-bold text-xs text-zinc-950 dark:text-white">{proc.title}</span>
                          <p className="text-xs text-zinc-500 mt-0.5 max-w-xl">{proc.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => moveItem(data.processSteps, proc.id, "up", "processSteps")}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveItem(data.processSteps, proc.id, "down", "processSteps")}
                          disabled={idx === arr.length - 1}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProcess(proc);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Process Edit Modal */}
              <AnimatePresence>
                {editingProcess && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-lg bg-white dark:bg-[#0E121E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                          Edit Stage {editingProcess.step}: {editingProcess.title}
                        </h3>
                        <button onClick={() => setEditingProcess(null)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Stage Title</label>
                          <input
                            type="text"
                            value={editingProcess.title}
                            onChange={(e) => setEditingProcess({ ...editingProcess, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Stage Description</label>
                          <textarea
                            rows={3}
                            value={editingProcess.description}
                            onChange={(e) => setEditingProcess({ ...editingProcess, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                        <button
                          onClick={() => setEditingProcess(null)}
                          className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveProcess(editingProcess)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                        >
                          Save & Publish
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 9: FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Frequently Asked Questions</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Manage reference-style accordion questions and answers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingFaq({
                      id: `faq-${Date.now()}`,
                      q: "New question?",
                      a: "Clear and direct response to this customer question.",
                      status: "published",
                      order: (data.faqs || []).length + 1,
                    });
                    setIsNewFaq(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>

              <div className="space-y-3">
                {[...(data.faqs || [])]
                  .sort((a, b) => a.order - b.order)
                  .map((faq, idx, arr) => (
                    <div
                      key={faq.id}
                      className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-zinc-950 dark:text-white">{faq.q}</span>
                        <p className="text-xs text-zinc-500 line-clamp-2">{faq.a}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => moveItem(data.faqs, faq.id, "up", "faqs")}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveItem(data.faqs, faq.id, "down", "faqs")}
                          disabled={idx === arr.length - 1}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            setIsNewFaq(false);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* FAQ Edit Modal */}
              <AnimatePresence>
                {editingFaq && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-xl bg-white dark:bg-[#0E121E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                          {isNewFaq ? "Add FAQ Question" : "Edit FAQ Question"}
                        </h3>
                        <button onClick={() => setEditingFaq(null)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Question</label>
                          <input
                            type="text"
                            value={editingFaq.q}
                            onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Answer</label>
                          <textarea
                            rows={4}
                            value={editingFaq.a}
                            onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                        <button
                          onClick={() => setEditingFaq(null)}
                          className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveFaq(editingFaq)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                        >
                          Save & Publish
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 10: CONTACT & FOOTER */}
          {activeTab === "contact" && settingsForm && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Contact Surface & Footer Copy</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Centrally manage contact email, phone, and footer company thesis. Updating here syncs both the contact section and footer simultaneously.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Contact Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Contact Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Footer Company Description</label>
                    <span className="text-[10px] font-mono text-zinc-400">{settingsForm.footerDescription?.length || 0}/180</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={180}
                    value={settingsForm.footerDescription || ""}
                    onChange={(e) => setSettingsForm({ ...settingsForm, footerDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Copyright Year</label>
                    <input
                      type="text"
                      value={settingsForm.copyrightYear || "2026"}
                      onChange={(e) => setSettingsForm({ ...settingsForm, copyrightYear: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => saveSection("settings", settingsForm, "publish")}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {saving ? "Publishing..." : "Publish Contact & Footer"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 11: SEO & METADATA */}
          {activeTab === "seo" && settingsForm && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">SEO & Brand Metadata</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Safely control search title, meta description, and social graph cards.
                </p>
              </div>

              {/* Live Google SERP Snippet Preview */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  Google Search Live Snippet Preview
                </span>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-sans">
                  https://www.voiceops.in
                </div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer">
                  {settingsForm.seoTitle || "VOICEOPS — AI Voice Automation for Business Calls"}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-xl">
                  {settingsForm.seoDescription ||
                    "VOICEOPS builds AI voice agents that automate the first layer of business calls — enquiries, bookings, qualification, support and follow-ups."}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Homepage SEO Title</label>
                    <span className="text-[10px] font-mono text-zinc-400">{settingsForm.seoTitle?.length || 0}/70</span>
                  </div>
                  <input
                    type="text"
                    maxLength={70}
                    value={settingsForm.seoTitle || ""}
                    onChange={(e) => setSettingsForm({ ...settingsForm, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Homepage Meta Description</label>
                    <span className="text-[10px] font-mono text-zinc-400">{settingsForm.seoDescription?.length || 0}/160</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={160}
                    value={settingsForm.seoDescription || ""}
                    onChange={(e) => setSettingsForm({ ...settingsForm, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Open Graph Social Title</label>
                    <input
                      type="text"
                      value={settingsForm.ogTitle || ""}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ogTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Open Graph Image URL</label>
                    <input
                      type="text"
                      value={settingsForm.ogImage || ""}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ogImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => saveSection("settings", settingsForm, "publish")}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  {saving ? "Publishing..." : "Publish SEO Metadata"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 12: INBOUND LEADS */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Inbound Lead Records</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Verified business leads captured via voice demo, forms, and telephony qualification.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, company, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none shrink-0"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Leads Table */}
              <div className="border border-zinc-200/80 dark:border-white/[0.08] rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200/80 dark:border-white/[0.08] text-zinc-400 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Caller / Company</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Industry</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/60 dark:divide-white/[0.06]">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-zinc-400">
                          No leads matching this filter.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                          <td className="p-3">
                            <div className="font-bold text-zinc-900 dark:text-zinc-100">{lead.name || "Anonymous"}</div>
                            <div className="text-zinc-500 text-[11px]">{lead.company || "Direct Phone"}</div>
                          </td>

                          <td className="p-3 space-y-0.5">
                            {lead.email && <div className="text-zinc-700 dark:text-zinc-300">{lead.email}</div>}
                            {lead.phone && <div className="font-mono text-zinc-500 text-[11px]">{lead.phone}</div>}
                          </td>

                          <td className="p-3 text-zinc-600 dark:text-zinc-400">{lead.industry || "General"}</td>

                          <td className="p-3">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLead(lead.id, { status: e.target.value as any })}
                              className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="converted">Converted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>

                          <td className="p-3 font-mono text-[11px] text-zinc-400">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setActiveLeadNotesModal(lead)}
                                title="Notes & Transcript"
                                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                title="Delete Lead"
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
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

              {/* Lead Notes Modal */}
              <AnimatePresence>
                {activeLeadNotesModal && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full max-w-lg bg-white dark:bg-[#0E121E] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                        <div>
                          <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                            Lead Dossier: {activeLeadNotesModal.name || activeLeadNotesModal.company}
                          </h3>
                          <span className="text-[11px] font-mono text-zinc-400">
                            Captured: {new Date(activeLeadNotesModal.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <button onClick={() => setActiveLeadNotesModal(null)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Requirements / Conversation Notes</label>
                          <div className="mt-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                            {activeLeadNotesModal.requirements || "No caller requirements recorded."}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Internal Admin Notes</label>
                          <textarea
                            rows={3}
                            placeholder="Add notes about follow-up calls or status..."
                            defaultValue={activeLeadNotesModal.notes || ""}
                            id="lead-notes-input"
                            className="w-full mt-1 px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                        <button
                          onClick={() => setActiveLeadNotesModal(null)}
                          className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-medium"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => {
                            const input = document.getElementById("lead-notes-input") as HTMLTextAreaElement;
                            if (input) {
                              handleUpdateLead(activeLeadNotesModal.id, { notes: input.value });
                              setActiveLeadNotesModal(null);
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                        >
                          Save Notes
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 13: AUDIT HISTORY */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">CMS Publication & Audit History</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Server-side record of administrative mutations, edits, reordering, and publishing actions.
                </p>
              </div>

              <div className="border border-zinc-200/80 dark:border-white/[0.08] rounded-xl overflow-hidden divide-y divide-zinc-200/60 dark:divide-white/[0.06]">
                {(data.auditLogs || []).length === 0 ? (
                  <div className="p-8 text-center text-xs text-zinc-400">No audit log entries recorded.</div>
                ) : (
                  (data.auditLogs || []).map((log) => (
                    <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-950 dark:text-white">{log.entityType}</span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold uppercase ${
                              log.action === "publish"
                                ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                                : log.action === "delete"
                                ? "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                                : "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                            }`}
                          >
                            {log.action}
                          </span>
                          <span className="text-zinc-400">by {log.user}</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400">{log.details}</p>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-400 shrink-0">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
