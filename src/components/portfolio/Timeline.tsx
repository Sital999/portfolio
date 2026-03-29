import type { TimelineData } from "@/types/portfolio";

type TimelineProps = {
  data: TimelineData;
};

export function Timeline({ data }: TimelineProps) {
  return (
    <section className="fade-rise mt-16 border border-[var(--border-strong)] bg-[var(--section-bg)] p-6 sm:p-10">
      <p className="mb-10 text-center text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">{data.eyebrow}</p>
      <div className="mx-auto max-w-4xl space-y-8">
        {data.entries.map((entry) => (
          <article className="interactive-card grid items-start gap-4 border-l border-[var(--border-muted)] pl-5 sm:grid-cols-[240px_1fr] sm:gap-8 sm:pl-8" key={entry.id}>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">{entry.dateRange}</p>
              <h3 className="mt-2 text-[1.65rem] font-semibold leading-tight">{entry.role}</h3>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-dim)]">{entry.company}</p>
            </div>
            <p className="text-[13px] leading-7 text-[var(--text-muted)]">{entry.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
