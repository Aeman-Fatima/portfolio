export const profile = {
  name: "Aeman Fatima",
  tagline: "Full-stack engineer stepping into the world of AI.",
  location: "Blair Athol, SA",
  email: "aeman098.fatima@gmail.com",
  github: "https://github.com/Aeman-Fatima",
  linkedin: "https://linkedin.com/in/aemanfatima",
  resumeUrl: "/resume.pdf",
  summary:
    "Full-stack engineer with 5+ years building production software across startup, contract and full-time environments, owning products end-to-end, from architecture through deployment, DevOps, and ongoing client support. I've built a multi-tenant SaaS platform for agricultural businesses, a telecom franchise management system, a gaming platform serving 400K+ users, and a healthcare communication platform used by major US health systems. I recently completed a Master of AI and Machine Learning, building a full-stack AI tutoring platform as my capstone that combines deterministic verification with LLM-based classification. I use AI tools like Claude Code to move fast, while keeping my own judgement on anything that decides whether the result is actually good.",
  aboutHeadline: "I build full-stack products end-to-end, from architecture to production.",
  aboutParagraphs: [
    "I'm a full-stack engineer with 5+ years building production software across startup, contract and full-time environments, spanning healthcare, SaaS, telecom and gaming. My work has ranged from multi-tenant business platforms and telecom systems to products serving more than 400,000 users and healthcare software used by major US health systems.",
    "I recently completed a Master of Artificial Intelligence and Machine Learning, where I built a full-stack AI tutoring platform combining deterministic verification with LLM-based classification. I use AI tools to accelerate development, while keeping engineering judgement, testing and product quality firmly in the loop.",
  ],
  aboutTags: ["Full-stack", "AI/ML", "Cloud"],
};

type SkillItem = { name: string; primary?: boolean };
type SkillGroup = { category: string; items: SkillItem[] };

// The full breadth of the stack. Primary (teal) marks the handful of
// technologies used deepest and most often; everything else is still real
// experience, just not the daily-driver layer.
export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "Angular", primary: true },
      { name: "React", primary: true },
      { name: "Next.js", primary: true },
      { name: "TypeScript", primary: true },
      { name: "JavaScript" },
      { name: "jQuery" },
      { name: "HTML & CSS", primary: true },
      { name: "Tailwind CSS", primary: true },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", primary: true },
      { name: "NestJS", primary: true },
      { name: "Express" },
      { name: "REST APIs", primary: true },
      { name: "Strapi", primary: true },
      { name: "Laravel" },
      { name: "PHP", primary: true },
      { name: "ASP.NET Core (.NET 10)", primary: true },
      { name: "EF Core", primary: true },
    ],
  },
  {
    category: "Cloud Platforms",
    items: [
      { name: "AWS", primary: true },
      { name: "Azure" },
      { name: "Docker", primary: true },
      { name: "CI/CD", primary: true },
      { name: "Linux" },
      { name: "Git", primary: true },
      { name: "Apache" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", primary: true },
      { name: "MySQL", primary: true },
      { name: "MongoDB" },
      { name: "DynamoDB" },
      { name: "Amazon RDS" },
      { name: "Azure SQL" },
      { name: "SQLite", primary: true },
      { name: "SuiteQL" },
      { name: "TypeORM", primary: true },
      { name: "Sequelize", primary: true },
    ],
  },
  {
    category: "AI & GenAI",
    items: [
      { name: "Python", primary: true },
      { name: "PyTorch", primary: true },
      { name: "TensorFlow/Keras", primary: true },
      { name: "Scikit-learn", primary: true },
      { name: "Hugging Face", primary: true },
      { name: "spaCy", primary: true },
      { name: "NLTK" },
      { name: "RAG", primary: true },
      { name: "LLM Application Development", primary: true },
      { name: "Claude API", primary: true },
      { name: "Gemini API", primary: true },
      { name: "Amazon Bedrock" },
      { name: "Prompt Engineering", primary: true },
      { name: "MCP (Model Context Protocol)" },
      { name: "LLM-to-SQL" },
    ],
  },
  {
    category: "APIs & Integrations",
    items: [
      { name: "NetSuite (SuiteTalk/SuiteQL)" },
      { name: "Shopify (REST/GraphQL)", primary: true },
      { name: "Stripe", primary: true },
      { name: "Webhooks", primary: true },
      { name: "Third-party integrations", primary: true },
    ],
  },
  {
    category: "WordPress & Shopify",
    items: [
      { name: "WordPress Ecosystem", primary: true },
      { name: "Custom Plugin Development", primary: true },
      { name: "WooCommerce Core", primary: true },
      { name: "Shopify Development", primary: true },
      { name: "Elementor Page Builder", primary: true },
      { name: "Liquid" },
      { name: "CMS Customisation", primary: true },
      { name: "Plugin Troubleshooting & Debugging", primary: true },
      { name: "Full-Lifecycle Web Development" },
    ],
  },
  {
    category: "E-commerce Architecture",
    items: [
      { name: "E-commerce Architecture", primary: true },
      { name: "Order Management Systems (OMS)", primary: true },
      { name: "Product Information Management (PIM)" },
      { name: "Shopping Cart & Checkout Optimization", primary: true },
      { name: "Payment Gateway Integration", primary: true },
      { name: "User Session Management", primary: true },
      { name: "E-commerce Security Best Practices", primary: true },
    ],
  },
  {
    category: "Security & Auth",
    items: [
      { name: "JWT", primary: true },
      { name: "OAuth2/OAuth1", primary: true },
      { name: "AWS Cognito" },
      { name: "Firebase" },
      { name: "BankID" },
      { name: "Secure data handling" },
      { name: "HIPAA-aware data handling", primary: true },
      { name: "Multi-Tenant Row-Level Security", primary: true },
    ],
  },
  {
    category: "Testing & Quality",
    items: [{ name: "Jest", primary: true }, { name: "Unit & integration testing", primary: true }],
  },
  {
    category: "Additional Experience",
    items: [
      { name: "C#" },
      { name: "SQL" },
      { name: "Azure Data Factory" },
      { name: "Custom Reporting Platforms" },
      { name: "Unity (Game Dev)" },
      { name: "Discord Bots" },
    ],
  },
];

export const experience = [
  {
    role: "Full-Stack Developer (Freelance)",
    company: "EastDevs",
    location: "Remote",
    period: "Aug 2024 – Present",
    stack: ["TypeScript", "Angular", "Node.js", "TypeORM", "npm"],
    bullets: [
      "Continued freelance work with EastDevs alongside my Master's: feature work on Fawkes Games (400K+ users) and a client's video analytics platform.",
      "Upgraded the video analytics platform's TypeScript, Angular, Node.js, npm, and TypeORM to current versions, resolving breaking changes along the way.",
      "Now building user authentication and preparing the platform for production.",
    ],
  },
  {
    role: "Software Engineer",
    company: "EON Health",
    location: "Lahore, Pakistan",
    period: "Aug 2022 – Jul 2024",
    stack: ["Angular", "Node.js", "NestJS", "PostgreSQL", "AWS"],
    bullets: [
      "Built EON Engage's CM integration from scratch: an Angular/NestJS patient outreach system used by LifePoint, UCHealth, and other major US health systems.",
      "Built REST APIs and PostgreSQL schemas for real-time patient data, plus OAuth auth for the provider dashboard and fixes for recurring integration issues.",
      "Containerized backend services with Docker as part of the team's standard deployment process.",
      "Turned business requirements into shipped features end-to-end: code review, testing, docs, and CI/CD in a regulated healthcare environment.",
      "Migrated patient, provider, and clinical data from hospital systems into EON Health's schema without data loss.",
      "Ran in Agile Scrum: sprint planning, stand-ups, reviews, and retros.",
    ],
  },
  {
    role: "Full-Stack Developer (Contract)",
    company: "EastDevs",
    location: "Lahore, Pakistan",
    period: "Jul 2019 – Jul 2022",
    stack: ["PHP", "MySQL", "Node.js", "React", "JavaScript", "Apache", "Linux", "Docker"],
    bullets: [
      "Architected and built three production platforms from scratch: a multi-tenant agro SaaS product, a telecom franchise system, and a gaming platform serving 400K+ users.",
      "One of seven people steering a small startup: designed solutions before building them, end to end, without waiting to be told what's next.",
      "Worked directly with clients across healthcare, telecom, and e-commerce, shipping full-stack products and maintaining them long after launch.",
      "Owned infrastructure for every client deployment: server setup, hosting, SSL, and ongoing bug fixes and feature work.",
      "Upgraded TypeORM, Angular, npm, and Node.js across a client video analytics platform to keep it on secure, supported versions.",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  period?: string;
  stack: string[];
  isPublic: boolean;
  repoUrl?: string;
  summary: string;
  bullets: string[];
};

export const projects: Project[] = [
  {
    slug: "ai-math-tutor",
    name: "Attempt-Aware AI Math Tutor",
    period: "2025 – 2026",
    stack: ["Python", "Claude API", "Gemini API", "SentenceTransformers", "SymPy", "Angular 18", "PostgreSQL"],
    isPublic: true,
    summary:
      "A solo capstone research project: a full-stack AI tutoring platform with a two-layer answer-evaluation pipeline combining deterministic verification with LLM classification.",
    bullets: [
      "Designed a two-layer answer-evaluation pipeline combining deterministic verification (SymPy exact-answer checking, SentenceTransformer semantic similarity scoring) with LLM classification (Claude and Gemini) that labels each attempt correct, partially flawed, or incorrect.",
      "Designed a response router that selects a targeted hint, reframe, or praise strategy based on the classification, and implemented SM-2 spaced repetition to schedule each student's next appearance of a problem based on attempt history.",
      "Built the Angular 18 frontend end to end, chat UI, problem list, spaced-repetition dashboard, OCR photo upload for handwritten work, using Claude Code to accelerate implementation while owning all architecture and engineering decisions.",
    ],
  },
  {
    slug: "eon-engage",
    name: "EON Engage (CM)",
    period: "2022 – 2024",
    stack: ["Angular", "NestJS", "PostgreSQL", "AWS (EC2, SQS, S3)"],
    isPublic: false,
    summary:
      "A trigger-based patient outreach and care management system used by major US health systems, built from scratch at EON Health.",
    bullets: [
      "Owned the trigger engine end to end on AWS (EC2, SQS, S3): a cron-triggered system evaluating patient and exam data against configurable rules to decide when a letter is upcoming, overdue, or expired.",
      "Designed the engine's dynamic query builder, constructing SQL and equivalent JS conditions on the fly from configurable filters, plus a message handler routing incoming SQS events to decide what needed re-evaluation.",
      "Delivered letters through multiple channels: PDF generation, a third-party print vendor (Quadient), and direct delivery into the Epic EHR system via AWS Cognito-authenticated calls, with retry and resume logic for failed deliveries.",
      "Wrote Jest unit tests for the engine's core services, built audit logging for trigger and filter changes, and reviewed pull requests across parallel delivery phases.",
    ],
  },
  {
    slug: "fawkes-games",
    name: "Fawkes Games Platform",
    stack: ["Node.js", "React", "PostgreSQL", "Xsolla", "REST APIs", "Docker"],
    isPublic: false,
    summary:
      "A gaming platform serving 400K+ users, with unified authentication across multiple games and integrated payments.",
    bullets: [
      "Built and maintained a gaming platform serving 400K+ users, including user and admin portals with user search, character management, and loyalty rewards.",
      "Integrated multiple games into a unified ecosystem with shared authentication and progression, and designed the database architecture and query system to support high-throughput gaming data.",
      "Integrated Xsolla for payment processing (in-game purchases, subscriptions, virtual currency) and implemented cybersecurity measures to protect user accounts and payment data.",
      "Built an admin portal with advanced user search, character management, a ban system, and analytics, connected to the main website for a seamless cross-platform experience.",
    ],
  },
  {
    slug: "agro-saas",
    name: "Agro Services SaaS Platform",
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Apache", "Linux"],
    isPublic: false,
    summary:
      "A multi-tenant SaaS platform for agricultural businesses, deployed as 6 customized copies across 3 clients.",
    bullets: [
      "Architected and built a multi-tenant SaaS web application from scratch using native PHP and MySQL, designed for easy deployment, each client gets a customized copy on a shared codebase.",
      "Deployed and maintain 6 production copies across 3 clients, covering inventory management, order tracking, customer management, and reporting.",
      "Set up hosting servers, virtual hosts, and SSL certificates, and managed the full deployment lifecycle for each client instance, providing ongoing yearly updates, bug fixes, and feature additions.",
    ],
  },
  {
    slug: "franchise-management-system",
    name: "Franchise Management System (FMS)",
    period: "2021 – 2022",
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Apache", "Linux"],
    isPublic: false,
    summary:
      "A comprehensive franchise management system for the telecom sector, deployed across 5 franchise clients in Pakistan.",
    bullets: [
      "Built a comprehensive franchise management system for the telecom sector, covering inventory tracking, sales management, commission calculations, reporting, and user roles.",
      "Deployed and maintained 5 production copies across 5 franchise clients, each with a customized, client-specific configuration for rapid onboarding.",
      "Automated commission calculations and payouts using Stripe payment processing, and built Power BI reporting dashboards backed by Azure Data Factory pipelines.",
      "Used Power Query to migrate historical data from physical registers, provided as Excel files, into the franchise database, across all 5 franchise environments.",
    ],
  },
];

export const education = [
  {
    degree: "Master of Artificial Intelligence and Machine Learning",
    school: "Adelaide University, South Australia",
    period: "Sep 2024 – Aug 2026",
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    school: "COMSATS University, Islamabad, Pakistan",
    period: "Sep 2018 – Jul 2022",
  },
];
