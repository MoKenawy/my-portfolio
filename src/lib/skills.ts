import logos from "@iconify-json/logos/icons.json";
import simpleIcons from "@iconify-json/simple-icons/icons.json";
import { projects } from "@/lib/projects";
import { skillIndex, usesSkill } from "@/lib/skillIndex";
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

type IconRef = `logos:${string}` | `simple-icons:${string}`;

interface SkillMark {
  icon: IconRef;
  /** For a single-colour mark only: the colour it takes when revealed. */
  brand?: string;
}

// Which skills exist, and what each one matches, is `lib/skillIndex.ts`; this
// adds only how each one is drawn. Keyed by slug.
const marks: Record<string, SkillMark> = {
  typescript: { icon: "logos:typescript-icon" },
  nodejs: { icon: "logos:nodejs-icon" },
  python: { icon: "logos:python" },
  typeorm: { icon: "logos:typeorm" },
  "sql-server": { icon: "simple-icons:microsoftsqlserver", brand: "#CC2927" },
  react: { icon: "logos:react" },
  postgresql: { icon: "logos:postgresql" },
  redis: { icon: "logos:redis" },
  docker: { icon: "logos:docker-icon" },
  langgraph: { icon: "simple-icons:langgraph" },
  opencv: { icon: "logos:opencv" },
  aws: { icon: "simple-icons:amazonwebservices", brand: "#FF9900" },
};

interface IconSet {
  width?: number;
  height?: number;
  icons: Record<string, { body: string; width?: number; height?: number }>;
}

const sets: Record<string, IconSet> = { logos, "simple-icons": simpleIcons };

function resolveIcon(ref: IconRef): SkillIcon {
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
// order they are listed in `skillIndex`.
export function topSkills(): SkillView[] {
  return skillIndex
    .map((skill): SkillView => {
      const mark = marks[skill.slug];
      // Fail the build rather than ship a skill with no mark.
      if (!mark) throw new Error(`No icon for skill: ${skill.slug}`);
      return {
        slug: skill.slug,
        name: skill.name,
        icon: resolveIcon(mark.icon),
        tone: mark.icon.startsWith("logos:") ? "logo" : "mark",
        brand: mark.brand,
        projects: projects
          .filter((p) => usesSkill(p.tools, skill))
          .map(({ id, title }) => ({ id, title })),
      };
    })
    .sort((a, b) => b.projects.length - a.projects.length);
}
