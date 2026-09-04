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
  heroPrimaryCtaText?: string;
  heroSecondaryCtaText?: string;
  googleSheetsWebhookUrl: string;
  voiceDemoEnabled?: boolean;
  voiceDemoTitle?: string;
  voiceDemoDescription?: string;
  voiceDemoAgentId?: string;
  adminPasswordHash?: string;
  // SEO & Metadata
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  // Footer & Legal
  footerDescription?: string;
  copyrightYear?: string;
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
  whatVoiceOpsAutomated?: string;
  handles?: string[];
  workflow?: string[];
  metrics?: string[];
  result: string;
  active: boolean;
  status?: "published" | "draft";
  order?: number;
  updatedAt?: string;
  demoAvailable?: boolean;
  demoIndustryId?: string;
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

// ==========================================
// PRODUCTION CMS STRUCTURED CONTENT MODELS
// ==========================================

export interface CapabilityItem {
  id: string;
  index: string; // "01", "02", ...
  title: string;
  subtitle: string;
  explanation: string;
  workflow: string[]; // 4 compact steps
  outcome: string;
  tiltClass?: string;
  status: "published" | "draft";
  order: number;
  updatedAt?: string;
}

export interface IndustryStory {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  steps: string[];
  metric: string;
  status: "published" | "draft";
  order: number;
  updatedAt?: string;
}

export interface ProcessStep {
  id: string;
  step: string; // "01", "02", ...
  title: string;
  description: string;
  status: "published" | "draft";
  order: number;
  updatedAt?: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  status: "published" | "draft";
  order: number;
  updatedAt?: string;
}

export interface NavigationContent {
  demoLabel: string;
  capabilitiesLabel: string;
  industriesLabel: string;
  workLabel: string;
  processLabel: string;
  ctaLabel: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: "create" | "update" | "delete" | "publish" | "unpublish" | "reorder";
  entityType: string;
  entityId?: string;
  details: string;
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
  capabilities: CapabilityItem[];
  industryStories: IndustryStory[];
  processSteps: ProcessStep[];
  faqs: FaqItem[];
  navigation: NavigationContent;
  leads: Lead[];
  auditLogs: AuditLogEntry[];
}
