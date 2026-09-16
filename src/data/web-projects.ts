export type ProjectCategory = "Websites" | "Mobile Apps" | "Designs";

export type WebProject = {
  slug: string;
  name: string;
  categories: ProjectCategory[];
  description: string;
  /** Omit for internal/private systems with no public screenshot to show. */
  image?: string;
  /** Shown on the placeholder card in place of a screenshot, e.g. why there's nothing to show. */
  privateNote?: string;
  stack: string[];
  isLive: boolean;
  /** Overrides the default LIVE/PRIVATE badge text and dot color when neither fits. */
  statusOverride?: { label: string; dotClassName: string };
  url?: string;
};

// Order here is the display order (featured first). Add your own projects here
// as you send over the screenshots, same shape, just a new entry with an
// image dropped into /public/projects/.
export const webProjects: WebProject[] = [
  {
    slug: "portfolio",
    name: "This Portfolio",
    categories: ["Websites", "Designs"],
    description:
      "This site: designed and built end-to-end, from the 3D hero visuals and interactive architecture diagram to the content, layout, and deployment pipeline.",
    image: "/projects/portfolio.webp",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    isLive: true,
    url: "https://www.aeman.com.au/",
  },
  {
    slug: "eon-health",
    name: "EON Health: Communication Management",
    categories: ["Websites"],
    description:
      "I built the Communication Management (CM) integration inside EON Engage, a trigger-based patient outreach system used by major US health systems. Not the marketing site itself, but the platform it belongs to.",
    image: "/projects/eon-health.webp",
    stack: ["Angular", "NestJS", "PostgreSQL", "AWS"],
    isLive: true,
    url: "https://www.eonhealth.com/",
  },
  {
    slug: "ai-math-tutor",
    name: "Attempt-Aware AI Math Tutor",
    categories: ["Websites"],
    description:
      "My AI/ML capstone: a full-stack tutoring platform with a two-layer answer-evaluation pipeline combining deterministic verification with LLM classification. Designed and built end-to-end.",
    image: "/projects/ai-math-tutor.webp",
    stack: ["Angular", "Python", "Claude API", "Gemini API", "SymPy"],
    isLive: false,
    statusOverride: { label: "IN PROGRESS", dotClassName: "bg-accent" },
  },
  {
    slug: "fawkes-games",
    name: "Fawkes Games",
    categories: ["Websites"],
    description:
      "A game studio platform where players discover and play original titles, the public site in front of the Fawkes Games platform I helped build.",
    image: "/projects/fawkes-games.webp",
    stack: ["React", "Node.js", "Tailwind CSS"],
    isLive: true,
    url: "https://fawkesgames.com/en/",
  },
  {
    slug: "pashma-khan",
    name: "Pashma Khan",
    categories: ["Websites"],
    description:
      "A fashion e-commerce storefront with product search, cart, and checkout for delivery or pickup, backed by an integrated payment gateway.",
    image: "/projects/pashma-khan.webp",
    stack: ["React", "E-commerce", "Payments"],
    isLive: true,
    url: "https://pashmakhan.com/",
  },
  {
    slug: "artductive",
    name: "Artductive",
    categories: ["Websites", "Designs"],
    description:
      "A dual-specialty creative studio site for game art and children's book illustration, two distinct brand worlds under one portfolio. Designed and built end-to-end.",
    image: "/projects/artductive.webp",
    stack: ["React", "Framer Motion"],
    isLive: true,
    url: "https://artductive.com/",
  },
  {
    slug: "sports-video-analyser",
    name: "Sports Video Analyser",
    categories: ["Websites"],
    description:
      "Built for an Australian sports client: analysts code match events against synced footage for Rugby League and Football, then export highlight reels as watermarked MP4 or XML/JSON. Running locally for now, with auth and public hosting planned next.",
    image: "/projects/sports-video-analyser.webp",
    stack: ["NestJS", "TypeORM", "Angular", "Angular Material", "ffmpeg", "SQLite"],
    isLive: false,
    statusOverride: { label: "LOCAL DEMO", dotClassName: "bg-accent" },
  },
  {
    slug: "franchise-management-system",
    name: "Franchise Management System",
    categories: ["Websites"],
    description:
      "A comprehensive franchise management CMS built for Zong (telecom) franchise staff: inventory, sales, commissions, and reporting across 5 franchise clients.",
    stack: ["PHP", "MySQL", "Power BI", "Azure Data Factory"],
    isLive: false,
    privateNote: "Internal system for franchise staff only, no public link.",
  },
  {
    slug: "chez-chef",
    name: "Chez Chef",
    categories: ["Websites"],
    description:
      "A recipe marketplace where users search for recipes, view full details, purchase them, and save favorites for later.",
    image: "/projects/chez-chef.webp",
    stack: ["React", "Redux", "SCSS"],
    isLive: true,
  },
  {
    slug: "isdp-lms",
    name: "ISDP: Learning Management System",
    categories: ["Websites"],
    description:
      "An LMS built for ISDP covering attendance, marks, exams, live video session streaming, course content, teacher and student data, and classroom management. Not the LMS itself, but the institute it was built for.",
    image: "/projects/isdp.webp",
    stack: [],
    isLive: true,
    url: "https://www.isdp.info/courses.php",
  },
  {
    slug: "agro-saas",
    name: "Agro Services SaaS Platform",
    categories: ["Websites"],
    description:
      "A multi-tenant SaaS platform for agricultural businesses: inventory, order tracking, customer management, and reporting, deployed as 6 customized copies across 3 clients.",
    stack: ["PHP", "MySQL", "Apache", "Linux"],
    isLive: false,
    privateNote: "Private client platform, no public link.",
  },
  {
    slug: "ekkabariwala",
    name: "eKabariwala",
    categories: ["Mobile Apps"],
    description:
      "UI/UX design for a peer-to-peer marketplace app: sell items, browse listings, manage appointments, cart, and purchase history, from login through checkout.",
    image: "/projects/ekkabariwala.webp",
    stack: ["Figma"],
    isLive: true,
    url: "https://www.figma.com/proto/tD07WDm8XHgHXIrVLPfjVy/App?node-id=150-5153&p=f&show-proto-sidebar=1",
  },
  {
    slug: "isdp-admin-portal",
    name: "ISDP: Admin Portal (Design)",
    categories: ["Designs"],
    description:
      "Admin portal design for ISDP's madrassa management system: coordinators, students/teachers, courses, and per-institution fee tracking across batches.",
    image: "/projects/isdp-admin.webp",
    stack: ["Figma"],
    isLive: true,
    url: "https://www.figma.com/proto/ie6RwKagS4NhAXGJSg3lkg/Ad-Login?node-id=78-804&p=f&t=GDJtdxPv2jqWIS9F-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=38%3A513",
  },
  {
    slug: "isdp-teacher-portal",
    name: "ISDP: Teacher Portal (Design)",
    categories: ["Designs"],
    description:
      "Teacher-side portal design for ISDP: assignments, marks, attendance, announcements, and course content, from login through daily classroom workflows.",
    image: "/projects/isdp-teacher.webp",
    stack: ["Figma"],
    isLive: true,
    url: "https://www.figma.com/proto/h1t4AtVCpNQpJW3WBgRkAA/Teacher-Portal?t=dVcpRaICnCwZRE6u-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=3-283&starting-point-node-id=2%3A45",
  },
  {
    slug: "isdp-coordinator-portal",
    name: "ISDP: Coordinator Portal (Design)",
    categories: ["Designs"],
    description:
      "Coordinator dashboard design for ISDP, the middle layer between admin and teachers, overseeing classes and day-to-day coordination across institutions.",
    image: "/projects/isdp-coordinator.webp",
    stack: ["Figma"],
    isLive: true,
    url: "https://www.figma.com/proto/G9gh52VSrVKNoAxkMTkBO8/Co-Dashboard?node-id=108-2220&p=f&t=WEDpWGbVg8D2VKef-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=108%3A2220",
  },
  {
    slug: "isdp-student-portal",
    name: "ISDP: Student Portal (Design)",
    categories: ["Designs"],
    description:
      "Student portal design for ISDP: course content, assignments, and marks from the student's side, completing the admin/coordinator/teacher/student set.",
    image: "/projects/isdp-student.webp",
    stack: ["Figma"],
    isLive: true,
    url: "https://www.figma.com/proto/SKQNGKnDv51WBQbnLgBEMS/Students-Portal?t=GDJtdxPv2jqWIS9F-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=1-238&starting-point-node-id=1%3A13",
  },
];
