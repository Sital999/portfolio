import type { ExpertiseData } from "@/types/portfolio";

type ExpertiseProps = {
  data: ExpertiseData;
};

export function Expertise({ data }: ExpertiseProps) {
  return (
    <section
      className="fade-rise delay-1 mt-16 grid gap-8 border border-[var(--border-strong)] bg-[var(--section-bg)] p-4 sm:p-6 lg:grid-cols-[1.04fr_1.3fr]"
      id={data.sectionId}
    >
      <article className="interactive-card relative overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-4">
        <div className="h-64 rounded-sm border border-[var(--border-strong)] bg-[radial-gradient(circle_at_top_right,_rgb(var(--accent-rgb)/0.2),_transparent_55%),linear-gradient(160deg,var(--surface-2),var(--surface-3))]" />
        <div className="absolute bottom-8 left-8 max-w-[210px] rounded-md border border-[var(--border-muted)] bg-[var(--surface-card)]/90 p-3 text-xs text-[var(--text-muted)]">
          <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">{data.panelEyebrow}</p>
          <p className="leading-relaxed">{data.panelBody}</p>
        </div>
      </article>
      <article className="interactive-card space-y-6 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)]/50 p-4 sm:p-6">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--accent)]">{data.titleEyebrow}</p>
        <h2 className="max-w-2xl text-[2rem] font-semibold leading-tight text-foreground sm:text-[2.25rem]">{data.title}</h2>
        <div className="grid gap-4 text-[13px] leading-7 text-[var(--text-muted)] sm:grid-cols-2">
          {data.columns.map((column) => (
            <p key={column}>{column}</p>
          ))}
        </div>
      </article>
    </section>
  );
}
