import { SiteData } from "./types";

export const defaultSiteData: SiteData = {
  settings: {
    companyName: "VOICEOPS",
    tagline: "Voice automation for the first layer of business calls.",
    email: "conversations@voiceops.in",
    phone: "+1 (888) 586-6240",
    whatsapp: "+1 (888) 586-6240",
    meetingUrl: "https://cal.com/voiceops/discovery",
    heroEyebrow: "VOICE AUTOMATION FOR BUSINESS",
    heroHeadline: "AUTOMATE THE FIRST LAYER OF EVERY CALL.",
    heroSubheadline:
      "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
    googleSheetsWebhookUrl: "",
    voiceDemoEnabled: true,
    voiceDemoTitle: "Talk to VoiceOps",
    voiceDemoDescription:
      "Experience how an AI voice system can handle the first layer of a real business conversation.",
    voiceDemoAgentId: "246585",
    adminPasswordHash: "admin123",
  },
  stats: {
    companiesBuilt: 14,
    voiceAgents: 28,
    useCasesAutomated: 19,
    callsHandled: 120000,
    uptime: "99.98%",
    avgResponseLatency: "< 400ms",
  },
  projects: [
    {
      id: "lumina-dining-group",
      name: "Lumina Hospitality Group",
      industry: "Hospitality & Dining",
      tagline: "Multi-location table booking and dietary preference capture",
      problem:
        "High-volume peak hours resulted in 34% unanswered reservation calls and overwhelmed hostesses during dinner service.",
      whatLunoAutomated:
        "Designed a custom bilingual voice agent integrated directly with their table management system to handle all incoming booking, modification, and inquiry calls.",
      handles: [
        "Real-time table availability checking",
        "Party size & dietary requirement logging",
        "SMS booking confirmation & calendar sync",
        "VIP guest identification & priority routing",
      ],
      result:
        "92% of reservation calls resolved autonomously without hostess intervention; zero missed bookings during peak rush.",
      active: true,
    },
    {
      id: "apex-dental-partners",
      name: "Apex Specialist Clinics",
      industry: "Healthcare & Dental",
      tagline: "Patient scheduling, insurance pre-intake, and triage routing",
      problem:
        "Front desk staff spent over 4 hours daily answering routine scheduling inquiries and rescheduling requests instead of attending to in-clinic patients.",
      whatLunoAutomated:
        "Built a HIPAA-conscious conversational voice agent that verifies patient insurance tier, schedules appointments across 6 practitioners, and triages emergency cases.",
      handles: [
        "Specialist availability & appointment booking",
        "Insurance provider and policy number collection",
        "Pre-procedure preparation instructions",
        "Emergency triage transfer to on-call clinician",
      ],
      result:
        "Reduced front-desk phone load by 78%, while new patient intake appointments increased by 22%.",
      active: true,
    },
    {
      id: "vanguard-realty",
      name: "Vanguard Asset Properties",
      industry: "Real Estate & Leasing",
      tagline: "Instant inbound lead qualification and viewing schedule coordination",
      problem:
        "Prospective buyers and tenants called across varying hours. Delayed response times caused high drop-offs to competing listings.",
      whatLunoAutomated:
        "Deployed a 24/7 real estate voice agent that answers listing inquiries, qualifies buyer budget and timeline, and coordinates showing times directly onto agent calendars.",
      handles: [
        "Property specifications, pricing & HOA details",
        "Buyer/tenant timeline and budget qualification",
        "Instant private showing scheduling",
        "Automated CRM sync and broker notification",
      ],
      result:
        "Average lead response time dropped from 4.2 hours to 0 seconds; qualified viewing conversions increased by 40%.",
      active: true,
    },
    {
      id: "aero-boutique-hotel",
      name: "The Grand Aurelia Resort",
      industry: "Boutique Hospitality",
      tagline: "24/7 guest concierge, amenities booking, and room service routing",
      problem:
        "Night-shift staff was lean, causing long hold times for late check-in inquiries, valet requests, and guest concierge queries.",
      whatLunoAutomated:
        "Engineered an elegant voice concierge that handles room reservations, answers property policies, and routes specialized service tickets to housekeeping/valet.",
      handles: [
        "Room availability, rate quotes & direct booking",
        "Check-in/out policies, parking, and amenities info",
        "Spa reservation and dinner recommendation",
        "Seamless transfer to front desk manager when requested",
      ],
      result:
        "100% answer rate 24/7 with an average call duration under 90 seconds and instant guest satisfaction.",
      active: true,
    },
  ],
  industries: [
    {
      id: "real-estate",
      name: "Real Estate",
      tagline: "Inbound lead qualification, listing info & viewing scheduling",
      description:
        "Automate property enquiries, buyer requirement collection, lead qualification, budget/location questions, viewing requests, and structured follow-ups.",
      icon: "Home",
      workflows: [
        "Property specifications & pricing inquiries",
        "Buyer & tenant budget and timeline qualification",
        "Location & bedroom requirements collection",
        "Private showing and open house calendar booking",
        "Instant agent notification & CRM synchronization",
      ],
      isFeatured: true,
    },
    {
      id: "restaurant",
      name: "Restaurants",
      tagline: "Reservations, opening hours & dietary requirements",
      description:
        "Handle high-volume table reservations, party sizes, dietary restrictions, and opening hour inquiries without pulling floor staff from diners.",
      icon: "Utensils",
      workflows: [
        "Live table availability & reservation booking",
        "Dietary restriction & allergy logging",
        "Operating hours & parking directions",
        "Large party & private dining routing",
      ],
    },
    {
      id: "clinic",
      name: "Clinics",
      tagline: "Appointment scheduling, patient intake & triage routing",
      description:
        "Automate patient appointment booking, practitioner selection, insurance provider logging, and emergency triage routing with complete clinical compliance.",
      icon: "Stethoscope",
      workflows: [
        "Practitioner calendar appointment booking",
        "Insurance provider and policy number collection",
        "Pre-procedure preparation guidance",
        "Emergency escalation to on-call clinician",
      ],
    },
    {
      id: "hotel",
      name: "Hotels",
      tagline: "Guest reservations, room availability & concierge inquiries",
      description:
        "Provide 24/7 guest service for room rates, check-in logistics, amenities, pet policies, and seamless transfer to front desk staff.",
      icon: "Building2",
      workflows: [
        "Room availability & rate quotes",
        "Check-in / check-out policy assistance",
        "Spa and dining reservation booking",
        "Seamless transfer to front desk manager",
      ],
    },
    {
      id: "services",
      name: "Service Businesses",
      tagline: "Quote requests, job dispatch & structured intake",
      description:
        "Capture job details, emergency service requests, customer contact information, and dispatch technician visits automatically.",
      icon: "Briefcase",
      workflows: [
        "Job scope & service requirement capture",
        "Instant callback scheduling & dispatch",
        "Pricing tier & estimate consultations",
        "CRM & lead pipeline synchronization",
      ],
    },
  ],
  useCases: [
    {
      id: "enquiries",
      title: "Customer Enquiries",
      description:
        "Provide instant, accurate responses to frequent questions regarding pricing, location, policies, opening hours, and service specifications.",
      icon: "HelpCircle",
      active: true,
    },
    {
      id: "reservations",
      title: "Reservations & Bookings",
      description:
        "Check real-time calendar availability, resolve scheduling conflicts, reserve slots, and trigger instant SMS confirmations.",
      icon: "CalendarCheck",
      active: true,
    },
    {
      id: "qualification",
      title: "Lead Qualification",
      description:
        "Ask structured questions to determine caller budget, urgency, timeline, and project suitability before routing.",
      icon: "Filter",
      active: true,
    },
    {
      id: "sales",
      title: "Sales Conversations",
      description:
        "Engage inbound prospective buyers with product details, answer objection queries, and book high-intent consultation meetings.",
      icon: "TrendingUp",
      active: true,
    },
    {
      id: "support",
      title: "Customer Support",
      description:
        "Resolve tier-one customer service tickets, provide status lookups, and guide callers through structured troubleshooting.",
      icon: "Headphones",
      active: true,
    },
    {
      id: "followups",
      title: "Follow-Ups",
      description:
        "Conduct structured outbound calls for booking confirmations, appointment reminders, feedback collection, and customer re-engagement.",
      icon: "RefreshCw",
      active: true,
    },
    {
      id: "collection",
      title: "Information Collection",
      description:
        "Accurately capture customer contact details, form submissions, and structured project specifications on first contact.",
      icon: "UserCheck",
      active: true,
    },
    {
      id: "routing",
      title: "Call Routing",
      description:
        "Seamlessly transfer complex, VIP, or emergency conversations to the exact department or human specialist with complete context.",
      icon: "PhoneForwarded",
      active: true,
    },
  ],
  leads: [
    {
      id: "lead-demo-1",
      name: "Marcus Vance",
      company: "Vance Luxury Motors",
      email: "m.vance@vancemotors.com",
      phone: "+1 (415) 890-2134",
      industry: "Automotive & Dealerships",
      monthlyCallVolume: "1,000 - 5,000 calls",
      requirements:
        "We need a voice agent to qualify test drive bookings, service department scheduling, and trade-in valuation requests.",
      status: "new",
      notes: "Interested in bilingual voice agent.",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      syncedToSheets: true,
    },
    {
      id: "lead-demo-2",
      name: "Elena Rostova",
      company: "Cascade Dental Group",
      email: "elena@cascadedental.org",
      phone: "+1 (206) 430-8812",
      industry: "Healthcare & Dental",
      monthlyCallVolume: "500 - 1,000 calls",
      requirements:
        "Looking to automate routine cleaning bookings and emergency dental triage after 6 PM.",
      status: "contacted",
      notes: "Demo scheduled for Friday 2 PM.",
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
      syncedToSheets: true,
    },
  ],
};
