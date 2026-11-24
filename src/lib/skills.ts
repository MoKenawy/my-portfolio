import logos from "@iconify-json/logos/icons.json";
import simpleIcons from "@iconify-json/simple-icons/icons.json";
import { projects } from "@/lib/projects";
import type { SkillView, SkillIcon } from "@/components/Skills/topSkills";

// The home page's Top skills row, derived rather than declared: a skill lists
// the tool names it stands for, and the projects come from `lib/projects.ts`,
// the same index Ship renders from. Nothing here is a hand-kept count.
//
// Server-only. The two icon sets are several megabytes of JSON; this module
// reads the dozen marks it needs at build time and hands the component just
// their SVG bodies, so the sets never reach the client and the page never asks
// the Iconify API for anything (the side nav's icons do; these must not).
//
// Brand logos come from `logos:` in their own colours, which the row shows in
// greyscale until hovered. A mark that is near-black would vanish on the dark
// ground, so those come from `simple-icons:` as a single-colour shape in the
// text colour instead, taking their brand colour on hover where there is one.

interface Skill {
  slug: string;
  name: string;
  /** Names exactly as they appear in a project's `tools`. */
  tools: string[];
  icon: `logos:${string}` | `simple-icons:${string}`;
  /** For a single-colour mark only: the colour it takes when revealed. */
  brand?: string;
}

const skills: Skill[] = [
  { slug: "typescript", name: "TypeScript", tools: ["TypeScript"], icon: "logos:typescript-icon" },
  { slug: "nodejs", name: "Node.js", tools: ["Node.js"], icon: "logos:nodejs-icon" },
  { slug: "python", name: "Python", tools: ["Python"], icon: "logos:python" },
  { slug: "typeorm", name: "TypeORM", tools: ["TypeORM"], icon: "logos:typeorm" },
  {
    slug: "sql-server",
    name: "SQL Server",
    tools: ["Microsoft SQL Server"],
    icon: "simple-icons:microsoftsqlserver",
    brand: "#CC2927",
  },
  { slug: "react", name: "React", tools: ["React"], icon: "logos:react" },
  { slug: "postgresql", name: "PostgreSQL", tools: ["PostgreSQL"], icon: "logos:postgresql" },
  { slug: "redis", name: "Redis", tools: ["Redis", "BullMQ"], icon: "logos:redis" },
  { slug: "docker", name: "Docker", tools: ["Docker"], icon: "logos:docker-icon" },
  { slug: "langgraph", name: "LangGraph", tools: ["LangGraph"], icon: "simple-icons:langgraph" },
  { slug: "opencv", name: "OpenCV", tools: ["OpenCV"], icon: "logos:opencv" },
  {
    slug: "aws",
    name: "AWS",
    tools: ["AWS Amplify", "AWS ECS", "DynamoDB"],
    icon: "simple-icons:amazonwebservices",
    brand: "#FF9900",
  },
];

interface IconSet {
  width?: number;
  height?: number;
  icons: Record<string, { body: string; width?: number; height?: number }>;
}

const sets: Record<string, IconSet> = { logos, "simple-icons": simpleIcons };

function resolveIcon(ref: Skill["icon"]): SkillIcon {
  const [prefix, name] = ref.split(":");
  const set = sets[prefix];
  const icon = set?.icons[name];
  // Fail the build rather than ship an empty square.
  if (!icon) throw new Error(`Unknown icon: ${ref}`);
  return {
    body: icon.body,
    width: icon.width ?? set.width ?? 16,
    height: icon.height ?? set.height ?? 16,
  };
}

// Most-used first. The sort is stable, so skills with the same count keep the
// order they are listed in above.
export function topSkills(): SkillView[] {
  return skills
    .map(({ slug, name, tools, icon, brand }): SkillView => ({
      slug,
      name,
      icon: resolveIcon(icon),
      tone: icon.startsWith("logos:") ? "logo" : "mark",
      brand,
      projects: projects
        .filter((p) => p.tools.some((t) => tools.includes(t)))
        .map(({ id, title }) => ({ id, title })),
    }))
    .sort((a, b) => b.projects.length - a.projects.length);
}
