import fs from "fs";
import path from "path";
import { SiteData, Lead, Project, SiteSettings, SiteStats, IndustryItem, UseCase } from "./types";
import { defaultSiteData } from "./default-data";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "site_data.json");

// Ensure data directory and file exist
function ensureDataFile(): SiteData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultSiteData, null, 2), "utf-8");
      return defaultSiteData;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as SiteData;
    // merge any missing keys from default
    return {
      settings: { ...defaultSiteData.settings, ...parsed.settings },
      stats: { ...defaultSiteData.stats, ...parsed.stats },
      projects: parsed.projects || defaultSiteData.projects,
      industries: parsed.industries || defaultSiteData.industries,
      useCases: parsed.useCases || defaultSiteData.useCases,
      leads: parsed.leads || defaultSiteData.leads,
    };
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
    console.error("Error saving site_data.json:", error);
    return false;
  }
}

export async function getSiteData(): Promise<SiteData> {
  return ensureDataFile();
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = ensureDataFile();
  current.settings = { ...current.settings, ...settings };
  saveDataFile(current);
  return current.settings;
}

export async function updateAdminPassword(newPassword: string): Promise<boolean> {
  const current = ensureDataFile();
  current.settings.adminPasswordHash = newPassword;
  return saveDataFile(current);
}

export async function updateSiteStats(stats: Partial<SiteStats>): Promise<SiteStats> {
  const current = ensureDataFile();
  current.stats = { ...current.stats, ...stats };
  saveDataFile(current);
  return current.stats;
}

export async function getProjects(): Promise<Project[]> {
  const data = ensureDataFile();
  return data.projects;
}

export async function saveProjects(projects: Project[]): Promise<Project[]> {
  const current = ensureDataFile();
  current.projects = projects;
  saveDataFile(current);
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

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const current = ensureDataFile();
  const index = current.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  current.leads[index] = { ...current.leads[index], ...updates };
  saveDataFile(current);
  return current.leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  const current = ensureDataFile();
  const initialLength = current.leads.length;
  current.leads = current.leads.filter((l) => l.id !== id);
  if (current.leads.length !== initialLength) {
    saveDataFile(current);
    return true;
  }
  return false;
}
