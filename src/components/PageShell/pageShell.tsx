import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

// Standard chrome for every route: masthead, a centered content column, and the
// documentation footer. Pages supply only their own content.
export default function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">{children}</main>
      <Footer />
    </>
  );
}

// A consistent page opening — mono eyebrow, serif title, flourish, optional lede
// (design.md §4). Reused across the loop pages so they read as one manuscript.
export function PageOpening({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="pt-20 sm:pt-28">
      <p className="mono mb-5">{eyebrow}</p>
      <h1 className="max-w-[16ch] font-serif text-5xl leading-[1.05] sm:text-6xl">
        {title}
      </h1>
      <hr className="flourish mt-8" />
      {lede && (
        <p className="prose-measure mt-6 font-serif text-lg text-paper">
          {lede}
        </p>
      )}
    </section>
  );
}
