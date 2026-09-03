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
    heroPrimaryCtaText: "Talk to VoiceOps",
    heroSecondaryCtaText: "Explore Architecture",
    googleSheetsWebhookUrl: "",
    voiceDemoEnabled: true,
    voiceDemoTitle: "Talk to VoiceOps",
    voiceDemoDescription:
      "Experience how an AI voice system can handle the first layer of a real business conversation.",
    voiceDemoAgentId: "246585",
    adminPasswordHash: "admin123",
    // SEO & Metadata
    seoTitle: "VOICEOPS — AI Voice Automation for Business Calls",
    seoDescription:
      "VOICEOPS builds AI voice agents that automate the first layer of business calls — enquiries, bookings, qualification, support and follow-ups.",
    ogTitle: "VOICEOPS — AI Voice Automation for Business Calls",
    ogDescription:
      "Voice automation systems engineered for real business operations. Sub-second cadence, calendar sync, and CRM integration.",
    ogImage: "https://www.voiceops.in/og-image.png",
    footerDescription:
      "Voice automation for the first layer of business calls. Custom conversational systems engineered for real operational workflows.",
    copyrightYear: "2026",
  },
  navigation: {
    demoLabel: "Live Demo",
    capabilitiesLabel: "Capabilities",
    industriesLabel: "Industries",
    workLabel: "Work",
    processLabel: "Process",
    ctaLabel: "Talk to VoiceOps",
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
  capabilities: [
    {
      id: "cap-01",
      index: "01",
      title: "ENQUIRIES",
      subtitle: "Answer repetitive customer questions.",
      explanation:
        "Answers incoming customer questions about hours, services, pricing and locations using verified business data.",
      workflow: ["Ask", "Understand", "Answer", "Resolve"],
      outcome: "Verified business response",
      tiltClass: "lg:rotate-[-0.5deg]",
      status: "published",
      order: 1,
    },
    {
      id: "cap-02",
      index: "02",
      title: "BOOKINGS",
      subtitle: "Handle reservations and appointments.",
      explanation: "Handles booking requests and checks availability before confirming a slot.",
      workflow: ["Request", "Check", "Book", "Confirm"],
      outcome: "Booking completed",
      tiltClass: "lg:rotate-[0.5deg]",
      status: "published",
      order: 2,
    },
    {
      id: "cap-03",
      index: "03",
      title: "QUALIFICATION",
      subtitle: "Capture requirements and identify intent.",
      explanation: "Collects the important requirements needed to understand caller intent.",
      workflow: ["Ask", "Qualify", "Score", "Route"],
      outcome: "Qualified lead",
      tiltClass: "lg:rotate-[-0.5deg]",
      status: "published",
      order: 3,
    },
    {
      id: "cap-04",
      index: "04",
      title: "SALES",
      subtitle: "Support inbound sales conversations.",
      explanation: "Answers product questions, handles common objections and captures interest.",
      workflow: ["Listen", "Answer", "Qualify", "Route"],
      outcome: "Lead captured",
      tiltClass: "lg:rotate-[0.5deg]",
      status: "published",
      order: 4,
    },
    {
      id: "cap-05",
      index: "05",
      title: "SUPPORT",
      subtitle: "Resolve common customer issues.",
      explanation: "Handles routine support questions and provides accurate status information.",
      workflow: ["Identify", "Resolve", "Confirm", "Close"],
      outcome: "Issue resolved",
      tiltClass: "lg:rotate-[-0.5deg]",
      status: "published",
      order: 5,
    },
    {
      id: "cap-06",
      index: "06",
      title: "FOLLOW-UPS",
      subtitle: "Handle structured outbound follow-ups.",
      explanation: "Handles reminders, confirmations and structured follow-up conversations.",
      workflow: ["Call", "Confirm", "Update", "Complete"],
      outcome: "Follow-up completed",
      tiltClass: "lg:rotate-[0.5deg]",
      status: "published",
      order: 6,
    },
  ],
  industryStories: [
    {
      id: "real-estate",
      name: "Real Estate",
      tagline: "Turn every property call into a qualified private showing.",
      summary:
        "Captures inbound buyer inquiries, scores budget and financing timeline, checks broker calendars, and locks showing appointments directly into CRM.",
      steps: ["Property enquiry", "Requirement", "Qualification", "Viewing", "Follow-up"],
      metric: "100% weekend calls captured · 4x faster lead response",
      status: "published",
      order: 1,
    },
    {
      id: "restaurants",
      name: "Restaurants",
      tagline: "Capture dinner reservations during peak service hours.",
      summary:
        "Handles incoming table reservations, party sizes, high-chair needs, and dietary restrictions without pulling waitstaff away from dining guests.",
      steps: ["Reservation", "Availability", "Booking", "Confirmation"],
      metric: "Zero missed bookings during rush · 92% resolved autonomously",
      status: "published",
      order: 2,
    },
    {
      id: "healthcare",
      name: "Healthcare",
      tagline: "Coordinate patient appointments with complete discretion.",
      summary:
        "Coordinates patient visits across clinical practitioners, collects intake insurance details, and transfers urgent clinical emergencies instantly.",
      steps: ["Appointment", "Information", "Scheduling", "Confirmation"],
      metric: "78% routine call reduction · Zero double-booked slots",
      status: "published",
      order: 3,
    },
    {
      id: "hotels",
      name: "Hotels",
      tagline: "24/7 guest concierge, room inquiries, and late arrivals.",
      summary:
        "Provides real-time room availability, pet policies, amenities, and check-in guidance with seamless warm transfer to front desk staff.",
      steps: ["Reservation", "Availability", "Booking", "Guest follow-up"],
      metric: "Sub-90 second resolution · 24/7 continuous guest coverage",
      status: "published",
      order: 4,
    },
    {
      id: "services",
      name: "Services",
      tagline: "Instant job intake, emergency dispatch, and estimate booking.",
      summary:
        "Captures site address, equipment models, and urgency levels to dispatch emergency technicians and schedule estimate visits on technician calendars.",
      steps: ["Lead", "Qualification", "Scheduling", "Follow-up"],
      metric: "Zero lost emergency calls · Instant technician sync",
      status: "published",
      order: 5,
    },
  ],
  processSteps: [
    {
      id: "process-01",
      step: "01",
      title: "Understand",
      description:
        "We audit your inbound call recordings, common questions, and exception cases to map your team's exact conversational decision tree.",
      status: "published",
      order: 1,
    },
    {
      id: "process-02",
      step: "02",
      title: "Design",
      description:
        "We craft tailored conversational pathways, human-like cadences, and business boundaries in our dedicated testing environment.",
      status: "published",
      order: 2,
    },
    {
      id: "process-03",
      step: "03",
      title: "Build & Integrate",
      description:
        "We connect VoiceOps directly to your calendar software, CRM, and carrier numbers for real-time reads and writes.",
      status: "published",
      order: 3,
    },
    {
      id: "process-04",
      step: "04",
      title: "Launch & Supervise",
      description:
        "We deploy the first layer to live phone lines, audit early transcripts, and continuously calibrate response accuracy.",
      status: "published",
      order: 4,
    },
  ],
  faqs: [
    {
      id: "faq-01",
      q: "Do we need to change our existing business phone number?",
      a: "No. You keep your existing number with zero disruption. We set up simple conditional call forwarding or SIP trunking from your current carrier (Verizon, AT&T, Twilio, RingCentral, Vonage, Telnyx, etc.) so VoiceOps answers whenever your line rings.",
      status: "published",
      order: 1,
    },
    {
      id: "faq-02",
      q: "What happens when a caller needs a human specialist?",
      a: "VoiceOps handles escalation with complete poise. If a caller requests a team member, has an urgent concern, or presents an edge case, VoiceOps performs an instant warm transfer to your staff line, providing an audio or SMS summary so your team knows the context immediately.",
      status: "published",
      order: 2,
    },
    {
      id: "faq-03",
      q: "Can VoiceOps check real-time calendar availability and prevent double bookings?",
      a: "Yes. VoiceOps integrates directly with Google Calendar, Outlook 365, Calendly, Cal.com, OpenTable, or custom booking software. Before confirming any reservation or appointment, VoiceOps queries live availability in real time to lock the slot with zero conflict.",
      status: "published",
      order: 3,
    },
    {
      id: "faq-04",
      q: "How fast does VoiceOps respond during a live phone call?",
      a: "VoiceOps operates with sub-400ms conversational turn cadence. This delivers natural human-like cadence, dynamic turn-taking, intelligent interruption handling, and zero awkward pauses.",
      status: "published",
      order: 4,
    },
    {
      id: "faq-05",
      q: "How long does a custom deployment take from audit to live calls?",
      a: "Most custom studio deployments go live within 7 to 10 business days. This covers auditing past call recordings, designing decision trees, integrating calendars & CRMs, and performing live validation testing before public launch.",
      status: "published",
      order: 5,
    },
  ],
  auditLogs: [
    {
      id: "log-init",
      timestamp: new Date().toISOString(),
      user: "System Admin",
      action: "publish",
      entityType: "System",
      details: "Initial production baseline loaded and verified.",
    },
  ],
};
