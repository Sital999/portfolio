import type { HighlightsData } from "@/types/portfolio";

type HighlightsProps = {
  data: HighlightsData;
};

export function Highlights({ data }: HighlightsProps) {
  return (
    <section
      className="fade-rise border-x border-b border-[var(--border-strong)] bg-[var(--section-bg)] px-4 py-14 sm:px-6 lg:px-8"
      id={data.sectionId}
    >
      <div className="flex flex-col gap-3">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">{data.eyebrow}</p>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{data.title}</h2>
      </div>

      <div className="stagger-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item) => (
          <article key={item.id} className="interactive-card rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{item.description}</p>
            <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]">{item.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
