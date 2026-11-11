import type { Metadata } from "next";
import PageShell, { PageOpening } from "@/components/PageShell/pageShell";
import ProjectCard from "@/components/Project/projectCard";
import ContactCTA from "@/components/ContactCTA/contactCta";
import { projects } from "@/content/projects";
import { site } from "@/config/site";

export const metadata: Metadata = { title: `Projects — ${site.name}` };

export default function Projects() {
  return (
    <PageShell>
      <PageOpening
        eyebrow="Projects"
        title="Selected work"
        lede="A short introduction to the work below."
      />
      <div className="mt-10 divide-y divide-hairline border-y border-hairline">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
      <ContactCTA />
    </PageShell>
  );
}
