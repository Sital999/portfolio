import type { StackData } from "@/types/portfolio";

type StackGridProps = {
  data: StackData;
};

export function StackGrid({ data }: StackGridProps) {
  return (
    <section className="fade-rise delay-2 stagger-grid mt-5 grid gap-4 border border-[var(--border-strong)] p-4 sm:grid-cols-2 lg:grid-cols-4" id={data.sectionId}>
      <article className="interactive-card rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-4">
        <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">{data.languageCardTitle}</p>
        <ul className="space-y-2 text-sm text-[var(--text-muted)]">
          {data.languages.map((item) => (
            <li className="flex items-center justify-between" key={item.id}>
              <span>{item.label}</span>
              <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--accent)]">{item.status}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="interactive-card rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-4">
        <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">{data.frameworkCardTitle}</p>
        <ul className="space-y-2 text-sm text-[var(--text-muted)]">
          {data.frameworks.map((item) => (
            <li className="flex items-center justify-between" key={item.id}>
              <span>{item.label}</span>
              <span className="text-emerald-500">{item.status}</span>
            </li>
          ))}
        </ul>
      </article>

      {data.capabilityCards.map((card) => (
        <article className="interactive-card rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-4" key={card.id}>
          <p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">{card.title}</p>
          {card.items.map((item, index) => (
            <div className={index === 0 ? "" : "mt-5"} key={item.id}>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
            </div>
          ))}
        </article>
      ))}
    </section>
  );
}
