// What each skill on the home page's Top skills row stands for: its slug (the
// `?skill=` value Ship reads), its name, and the tool names that count as it.
//
// Kept apart from `lib/skills.ts`, which adds the logos, because that module
// pulls in megabytes of icon JSON and must stay on the server. This one is a
// few lines, so Ship's client code can import it to mark the entries that
// match. Both pages match through `usesSkill`, so the count on the home page and
// the marks on Ship cannot disagree.

export interface SkillDef {
  slug: string;
  name: string;
  /** Names exactly as they appear in a project's `tools`. */
  tools: string[];
}

export const skillIndex: SkillDef[] = [
  { slug: "typescript", name: "TypeScript", tools: ["TypeScript"] },
  { slug: "nodejs", name: "Node.js", tools: ["Node.js"] },
  { slug: "python", name: "Python", tools: ["Python"] },
  { slug: "typeorm", name: "TypeORM", tools: ["TypeORM"] },
  { slug: "sql-server", name: "SQL Server", tools: ["Microsoft SQL Server"] },
  { slug: "react", name: "React", tools: ["React"] },
  { slug: "postgresql", name: "PostgreSQL", tools: ["PostgreSQL"] },
  { slug: "redis", name: "Redis", tools: ["Redis", "BullMQ"] },
  { slug: "docker", name: "Docker", tools: ["Docker"] },
  { slug: "langgraph", name: "LangGraph", tools: ["LangGraph"] },
  { slug: "opencv", name: "OpenCV", tools: ["OpenCV"] },
  { slug: "aws", name: "AWS", tools: ["AWS Amplify", "AWS ECS", "DynamoDB"] },
];

export function findSkill(slug: string | null | undefined): SkillDef | undefined {
  return slug ? skillIndex.find((s) => s.slug === slug) : undefined;
}

export function usesSkill(projectTools: string[], skill: SkillDef): boolean {
  return projectTools.some((t) => skill.tools.includes(t));
}

/** Where a project link from the skills row goes: the entry, with its skill marked. */
export function skillHref(slug: string, projectId?: string): string {
  return `/ship?skill=${encodeURIComponent(slug)}${projectId ? `#${projectId}` : ""}`;
}
