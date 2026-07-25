import PageShell, { PageOpening } from "@/components/PageShell/pageShell";
import ContactCTA from "@/components/ContactCTA/contactCta";

// Ship — the projects/case studies, the primary destination in the loop.
// An index of shipped work, opened like a section of a manuscript.
export default function ShipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <PageOpening
        eyebrow="Ship — selected shipments"
        title="Systems I built, and what they cost."
        lede="Selected builds and shipped systems, documented as a ledger of engineering effort rather than a gallery. Each opens with the work itself and the lesson it taught."
      />

      {/* Hairline-separated case-study list — no cards, no grid of tiles. */}
      <div className="mt-16 divide-y divide-hairline border-y border-hairline">
        {children}
      </div>

      <ContactCTA line="Every shipment above came with a lesson I paid for. If you want the longer version of any of them, ask." />
    </PageShell>
  );
}
