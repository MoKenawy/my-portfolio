import type { ProjectCardProps } from "@/components/Project/projectCard";
import { asset } from "@/lib/media";

// One entry per project. Replace the samples; drop screenshots in /public/projects.
export const projects: ProjectCardProps[] = [
  {
    eyebrow: "Sample project",
    title: "Project One",
    problem: "The friction or risk that existed before this work.",
    insight: "The realisation that explained the problem.",
    solution: "What you built, trimmed to the mechanism.",
    evidence: "The artifact a stranger can go and check.",
    overview: "Longer detail for the reader who opens the modal.",
    tags: ["Web", "TypeScript"],
    tools: ["Next.js", "TypeScript", "Tailwind"],
    images: [
      {
        src: asset("/projects/sample-1.svg"),
        alt: "Placeholder screenshot of Project One.",
        caption: "fig. 1 — project one, the main screen.",
        width: 1200,
        height: 750,
      },
    ],
    links: [{ name: "Source", url: "https://github.com/your-handle/project-one" }],
    meta: ["Next.js · TypeScript", "2026"],
  },
  {
    title: "Project Two",
    problem: "A second problem, stated plainly.",
    insight: "What made it tractable.",
    solution: "How you solved it.",
    evidence: "How to verify it.",
    overview: "More detail here.",
    tools: ["Node.js", "PostgreSQL"],
    images: [
      {
        src: asset("/projects/sample-2.svg"),
        alt: "Placeholder screenshot of Project Two.",
        caption: "fig. 1 — project two.",
        width: 1200,
        height: 750,
      },
    ],
    meta: ["Node.js · PostgreSQL", "2025"],
  },
];
