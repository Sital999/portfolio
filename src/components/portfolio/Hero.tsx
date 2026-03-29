import { QuoteOfDay } from "@/components/portfolio/QuoteOfDay";
import type { HeroData } from "@/types/portfolio";

type HeroProps = {
  data: HeroData;
};

export function Hero({ data }: HeroProps) {
  const highlightedLine = data.headingLines[1] ?? "";
  const lastLine = data.headingLines[2] ?? "";

  return (
    <section
      className="fade-rise relative overflow-hidden border-x border-[var(--border-strong)] px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-28"
      id={data.sectionId}
    >
      <div className="hero-orb absolute left-1/2 top-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[rgb(var(--accent-rgb)/0.1)] blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-9">
          <p className="inline-flex rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)]/80 px-4 py-1.5 text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">
            {data.eyebrow}
          </p>
          <div className="space-y-5">
            <h1 className="text-balance text-[2.55rem] font-bold leading-[0.95] tracking-[-0.02em] sm:text-[3.55rem] lg:text-[4.55rem]">
              {data.headingLines[0]}
              <br />
              <span className="text-[var(--accent-strong)]">{data.highlightWord}</span>
              {highlightedLine.replace(data.highlightWord, "")}
              <br />
              {lastLine}
            </h1>
            <p className="max-w-xl text-[13px] leading-7 text-[var(--text-muted)] sm:text-[14px]">{data.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {data.actions.map((action) => (
              <a
                className={
                  action.variant === "primary"
                    ? "cta-sheen rounded-sm border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-[10px] font-semibold tracking-[0.18em] text-[var(--accent-contrast)] transition hover:brightness-95"
                    : "cta-sheen rounded-sm border border-[var(--border-muted)] bg-[var(--surface-2)] px-6 py-3 text-[10px] font-semibold tracking-[0.18em] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-3)]"
                }
                href={action.href}
                key={action.id}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[360px]">
          <div className="interactive-card relative overflow-hidden rounded-md border border-[rgb(var(--accent-rgb)/0.34)] bg-[linear-gradient(145deg,var(--surface-2),var(--surface-3))] p-5">
            <div className="hero-ring" />
            <div className="hero-ring hero-ring-delay" />
            <div className="relative z-10 space-y-4">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-dim)]">{data.panel.title}</p>
              <div className="space-y-2 rounded-sm border border-[var(--border-muted)] bg-[var(--surface-2)]/70 p-3">
                {data.panel.facts.map((fact) => (
                  <div className="flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.14em]" key={fact.id}>
                    <span className="text-[var(--text-dim)]">{fact.label}</span>
                    <span className="text-[var(--accent)]">{fact.value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                <div className="hero-bar h-2.5 w-full rounded bg-[rgb(var(--accent-rgb)/0.22)]" />
                <div className="hero-bar hero-bar-delay-1 h-2.5 w-5/6 rounded bg-[rgb(var(--accent-rgb)/0.18)]" />
                <div className="hero-bar hero-bar-delay-2 h-2.5 w-2/3 rounded bg-[rgb(var(--accent-rgb)/0.14)]" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[9px] uppercase tracking-[0.14em]">
                {data.panel.focusTags.map((tag, index) => (
                  <span
                    className={`hero-chip rounded-full border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)] ${
                      index === 1
                        ? "hero-chip-delay-1"
                        : index === 2
                          ? "hero-chip-delay-2"
                          : index === 3
                            ? "hero-chip-delay-3"
                            : ""
                    }`}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <QuoteOfDay quotes={data.quotesOfDay} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
