// The index of what is on Ship: each entry's anchor, its title, and the tools
// it was built with. Ship renders its cards from these fields and the home
// page's Top skills row reads the same ones, so the two cannot disagree about
// which project used what. Everything else about an entry stays on the Ship
// page itself.

export interface ProjectIndexEntry {
  /** Fragment target on /ship, so other pages can link straight to the entry. */
  id: string;
  title: string;
  tools: string[];
}

export const projects: ProjectIndexEntry[] = [
  {
    id: "hr",
    title: "HR subsystem",
    tools: [
      "Node.js",
      "Express",
      "TypeScript",
      "TypeORM",
      "Microsoft SQL Server",
      "React",
      "Docker",
    ],
  },
  {
    id: "payroll",
    title: "Payroll subsystem",
    tools: [
      "Node.js",
      "Express",
      "TypeScript",
      "TypeORM",
      "Microsoft SQL Server",
      "React",
      "Docker",
    ],
  },
  {
    id: "reporting",
    title: "Reporting & export subsystem",
    tools: [
      "Node.js",
      "Express",
      "TypeScript",
      "BullMQ",
      "Redis",
      "Gotenberg",
      "Server-Sent Events",
      "Microsoft SQL Server",
      "Docker",
    ],
  },
  {
    id: "auth",
    title: "Auth subsystem",
    tools: [
      "Node.js",
      "Express",
      "TypeScript",
      "JWT",
      "TypeORM",
      "Microsoft SQL Server",
      "React",
      "Docker",
    ],
  },
  {
    id: "agentic-pr-reviewer",
    title: "Agentic PR Reviewer",
    tools: [
      "Python",
      "LangGraph",
      "Langfuse",
      "Pydantic",
      "Typer",
      "Jinja2",
      "PyTest",
      "import-linter",
      "uv",
      "GitHub Actions",
      "Docker",
    ],
  },
  {
    id: "pdf2deck",
    title: "PDF2Deck Agent",
    tools: [
      "Python",
      "LangGraph",
      "LangChain",
      "Pydantic",
      "Gradio",
      "pypdf",
      "python-pptx",
      "Docker",
    ],
  },
  {
    id: "dms",
    title: "DMS — Diagram Management System",
    tools: [
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "React",
      "TypeScript",
      "Docker",
      "NGINX",
    ],
  },
  {
    id: "job-discovery",
    title: "Automated Job Discovery & Intelligence Pipeline",
    tools: [
      "Python",
      "FastAPI",
      "Jinja2",
      "Typer",
      "PostgreSQL",
      "Docker",
      "Ollama",
      "PyTest",
      "GitHub Actions",
    ],
  },
  {
    id: "drivewise",
    title: "DriveWise",
    tools: [
      "Python",
      "YOLO",
      "OpenCV",
      "TensorFlow",
      "Django",
      "Firebase",
      "Docker",
    ],
  },
  {
    id: "sympai",
    title: "SympAI — healthcare chatbot",
    tools: [
      "Next.js",
      "Python",
      "FastAPI",
      "AWS Amplify",
      "AWS ECS",
      "DynamoDB",
      "Docker",
    ],
  },
  {
    id: "currency",
    title: "Egyptian Currency Recognition",
    tools: [
      "OpenCV",
      "YOLO",
      "Roboflow",
      "DataGradients",
    ],
  },
];

export function project(id: string): ProjectIndexEntry {
  const entry = projects.find((p) => p.id === id);
  if (!entry) throw new Error(`Unknown project id: ${id}`);
  return entry;
}
