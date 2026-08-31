export interface SiteSettings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  meetingUrl: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  googleSheetsWebhookUrl: string;
  voiceDemoEnabled?: boolean;
  voiceDemoTitle?: string;
  voiceDemoDescription?: string;
  voiceDemoAgentId?: string;
  adminPasswordHash?: string;
}

export interface SiteStats {
  companiesBuilt: number;
  voiceAgents: number;
  useCasesAutomated: number;
  callsHandled?: number;
  uptime: string;
  avgResponseLatency: string;
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  tagline: string;
  problem: string;
  whatLunoAutomated: string;
  handles?: string[];
  workflow?: string[];
  metrics?: string[];
  result: string;
  active: boolean;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  workflows: string[];
  isFeatured?: boolean;
  active?: boolean;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
  active: boolean;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry?: string;
  monthlyCallVolume?: string;
  requirements: string;
  status: "new" | "contacted" | "qualified" | "converted" | "closed" | "archived";
  notes?: string;
  createdAt: string;
  syncedToSheets?: boolean;
}

export interface SiteData {
  settings: SiteSettings;
  stats: SiteStats;
  projects: Project[];
  industries: IndustryItem[];
  useCases: UseCase[];
  leads: Lead[];
}
