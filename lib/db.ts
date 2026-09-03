import fs from "fs";
import path from "path";
import {
  SiteData,
  Lead,
  Project,
  SiteSettings,
  SiteStats,
  IndustryItem,
  UseCase,
  CapabilityItem,
  IndustryStory,
  ProcessStep,
  FaqItem,
  NavigationContent,
  AuditLogEntry,
} from "./types";
import { defaultSiteData } from "./default-data";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site_data.json");
const TMP_FILE = path.join("/tmp", "site_data.json");

function getActiveDataFilePath(): string {
  if (process.platform !== "win32" && fs.existsSync(TMP_FILE)) {
    return TMP_FILE;
  }
  return DATA_FILE;
}

// Ensure data directory and file exist and merge all required models
function ensureDataFile(): SiteData {
  try {
    const activeFile = getActiveDataFilePath();
    let raw = "";

    if (fs.existsSync(activeFile)) {
      raw = fs.readFileSync(activeFile, "utf-8");
    } else if (fs.existsSync(DATA_FILE)) {
      raw = fs.readFileSync(DATA_FILE, "utf-8");
    } else {
      return defaultSiteData;
    }

    const parsed = JSON.parse(raw) as Partial<SiteData>;

    // Merge missing keys seamlessly from defaultSiteData
    const merged: SiteData = {
      settings: { ...defaultSiteData.settings, ...(parsed.settings || {}) },
      navigation: { ...defaultSiteData.navigation, ...(parsed.navigation || {}) },
      stats: { ...defaultSiteData.stats, ...(parsed.stats || {}) },
      projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : defaultSiteData.projects,
      industries: parsed.industries && parsed.industries.length > 0 ? parsed.industries : defaultSiteData.industries,
      useCases: parsed.useCases && parsed.useCases.length > 0 ? parsed.useCases : defaultSiteData.useCases,
      capabilities:
        parsed.capabilities && parsed.capabilities.length > 0 ? parsed.capabilities : defaultSiteData.capabilities,
      industryStories:
        parsed.industryStories && parsed.industryStories.length > 0
          ? parsed.industryStories
          : defaultSiteData.industryStories,
      processSteps:
        parsed.processSteps && parsed.processSteps.length > 0 ? parsed.processSteps : defaultSiteData.processSteps,
      faqs: parsed.faqs && parsed.faqs.length > 0 ? parsed.faqs : defaultSiteData.faqs,
      leads: parsed.leads || defaultSiteData.leads,
      auditLogs: parsed.auditLogs || defaultSiteData.auditLogs,
    };

    return merged;
  } catch (error) {
    console.error("Error reading site_data.json, falling back to default data:", error);
    return defaultSiteData;
  }
}

function saveDataFile(data: SiteData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    // If running in a read-only serverless environment like Vercel Lambda
    try {
      fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2), "utf-8");
      return true;
    } catch (tmpErr) {
      console.error("Error saving site_data.json to /tmp:", tmpErr);
      return false;
    }
  }
}

// Add an audit log entry to the persistent store
export function recordAuditLog(
  user: string,
  action: "create" | "update" | "delete" | "publish" | "unpublish" | "reorder",
  entityType: string,
  details: string,
  entityId?: string
) {
  try {
    const current = ensureDataFile();
    const entry: AuditLogEntry = {
      id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      user: user || "Admin",
      action,
      entityType,
      entityId,
      details,
    };
    current.auditLogs = [entry, ...(current.auditLogs || [])].slice(0, 100); // keep last 100 entries
    saveDataFile(current);
  } catch (e) {
    console.error("Failed to record audit log:", e);
  }
}

// Safe public getter: strips sensitive data, lead records, and returns ONLY published content
export async function getPublishedSiteData(): Promise<SiteData> {
  const data = ensureDataFile();
  const { adminPasswordHash: _omitted, ...safeSettings } = data.settings;

  return {
    settings: safeSettings,
    navigation: data.navigation || defaultSiteData.navigation,
    stats: data.stats,
    capabilities: (data.capabilities || defaultSiteData.capabilities)
      .filter((c) => c.status === "published")
      .sort((a, b) => a.order - b.order),
    industryStories: (data.industryStories || defaultSiteData.industryStories)
      .filter((s) => s.status === "published")
      .sort((a, b) => a.order - b.order),
    projects: (data.projects || defaultSiteData.projects)
      .filter((p) => p.status === "published" || p.active)
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
    processSteps: (data.processSteps || defaultSiteData.processSteps)
      .filter((s) => s.status === "published")
      .sort((a, b) => a.order - b.order),
    faqs: (data.faqs || defaultSiteData.faqs)
      .filter((f) => f.status === "published")
      .sort((a, b) => a.order - b.order),
    // Backward compatibility collections
    industries: (data.industries || defaultSiteData.industries).filter((i) => i.active !== false),
    useCases: (data.useCases || defaultSiteData.useCases).filter((u) => u.active !== false),
    // Strict isolation: ZERO lead or audit records sent to public clients
    leads: [],
    auditLogs: [],
  };
}

// Admin getter: full dataset including drafts, leads, and audit logs
export async function getSiteData(): Promise<SiteData> {
  return ensureDataFile();
}

export async function updateSiteSettings(
  settings: Partial<SiteSettings>,
  user = "Admin"
): Promise<SiteSettings> {
  const current = ensureDataFile();
  current.settings = { ...current.settings, ...settings };
  saveDataFile(current);
  recordAuditLog(user, "update", "SiteSettings", "Updated general site settings");
  return current.settings;
}

export async function updateNavigation(
  nav: NavigationContent,
  user = "Admin"
): Promise<NavigationContent> {
  const current = ensureDataFile();
  current.navigation = nav;
  saveDataFile(current);
  recordAuditLog(user, "update", "Navigation", "Updated navigation labels and configuration");
  return current.navigation;
}

export async function updateAdminPassword(newPassword: string): Promise<boolean> {
  const current = ensureDataFile();
  current.settings.adminPasswordHash = newPassword;
  const saved = saveDataFile(current);
  if (saved) {
    recordAuditLog("Admin", "update", "Security", "Admin password hash updated");
  }
  return saved;
}

export async function updateSiteStats(stats: Partial<SiteStats>, user = "Admin"): Promise<SiteStats> {
  const current = ensureDataFile();
  current.stats = { ...current.stats, ...stats };
  saveDataFile(current);
  recordAuditLog(user, "update", "SiteStats", "Updated operational statistics");
  return current.stats;
}

export async function saveCapabilities(
  capabilities: CapabilityItem[],
  user = "Admin",
  action: "update" | "publish" | "reorder" = "update"
): Promise<CapabilityItem[]> {
  const current = ensureDataFile();
  current.capabilities = capabilities;
  saveDataFile(current);
  recordAuditLog(user, action, "Capabilities", `Saved ${capabilities.length} capabilities (${action})`);
  return current.capabilities;
}

export async function saveIndustryStories(
  stories: IndustryStory[],
  user = "Admin",
  action: "update" | "publish" | "reorder" = "update"
): Promise<IndustryStory[]> {
  const current = ensureDataFile();
  current.industryStories = stories;
  saveDataFile(current);
  recordAuditLog(user, action, "Industries", `Saved ${stories.length} industry workflows (${action})`);
  return current.industryStories;
}

export async function saveProcessSteps(
  steps: ProcessStep[],
  user = "Admin",
  action: "update" | "publish" | "reorder" = "update"
): Promise<ProcessStep[]> {
  const current = ensureDataFile();
  current.processSteps = steps;
  saveDataFile(current);
  recordAuditLog(user, action, "Process", `Saved ${steps.length} process steps (${action})`);
  return current.processSteps;
}

export async function saveFaqs(
  faqs: FaqItem[],
  user = "Admin",
  action: "update" | "publish" | "reorder" = "update"
): Promise<FaqItem[]> {
  const current = ensureDataFile();
  current.faqs = faqs;
  saveDataFile(current);
  recordAuditLog(user, action, "FAQ", `Saved ${faqs.length} FAQ questions (${action})`);
  return current.faqs;
}

export async function getProjects(): Promise<Project[]> {
  const data = ensureDataFile();
  return data.projects;
}

export async function saveProjects(
  projects: Project[],
  user = "Admin",
  action: "update" | "publish" = "update"
): Promise<Project[]> {
  const current = ensureDataFile();
  current.projects = projects;
  saveDataFile(current);
  recordAuditLog(user, action, "CaseStudies", `Saved ${projects.length} case studies (${action})`);
  return current.projects;
}

export async function saveIndustries(industries: IndustryItem[]): Promise<IndustryItem[]> {
  const current = ensureDataFile();
  current.industries = industries;
  saveDataFile(current);
  return current.industries;
}

export async function saveUseCases(useCases: UseCase[]): Promise<UseCase[]> {
  const current = ensureDataFile();
  current.useCases = useCases;
  saveDataFile(current);
  return current.useCases;
}

export async function getLeads(): Promise<Lead[]> {
  const data = ensureDataFile();
  return data.leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addLead(
  leadInput: Omit<Lead, "id" | "createdAt" | "status">
): Promise<Lead> {
  const current = ensureDataFile();
  const newLead: Lead = {
    ...leadInput,
    id: "lead-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6),
    status: "new",
    createdAt: new Date().toISOString(),
    syncedToSheets: false,
  };
  current.leads.unshift(newLead);
  saveDataFile(current);
  return newLead;
}

export async function updateLead(
  id: string,
  updates: Partial<Lead>,
  user = "Admin"
): Promise<Lead | null> {
  const current = ensureDataFile();
  const index = current.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  current.leads[index] = { ...current.leads[index], ...updates };
  saveDataFile(current);
  recordAuditLog(user, "update", "Leads", `Updated status/notes for lead ${id}`, id);
  return current.leads[index];
}

export async function deleteLead(id: string, user = "Admin"): Promise<boolean> {
  const current = ensureDataFile();
  const initialLength = current.leads.length;
  current.leads = current.leads.filter((l) => l.id !== id);
  if (current.leads.length !== initialLength) {
    saveDataFile(current);
    recordAuditLog(user, "delete", "Leads", `Deleted lead ${id}`, id);
    return true;
  }
  return false;
}
