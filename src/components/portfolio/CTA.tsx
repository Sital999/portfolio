import type { CtaData } from "@/types/portfolio";

type CTAProps = {
  data: CtaData;
};

export function CTA({ data }: CTAProps) {
  return (
    <section
      className="fade-rise delay-1 mt-16 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[image:var(--cta-gradient)] p-8 text-center sm:p-12"
      id="contact"
    >
      <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--accent)]">{data.eyebrow}</p>
      <h2 className="mx-auto mt-4 max-w-2xl text-[2.5rem] font-bold leading-[1.02] sm:text-[3rem]">{data.title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-7 text-[var(--text-muted)] sm:text-[14px]">{data.description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          className="cta-sheen rounded-sm border border-[var(--border-muted)] bg-[var(--surface-2)] px-5 py-3 text-[10px] tracking-[0.16em] text-[var(--text-muted)]"
          href={data.email.href}
        >
          {data.email.label}
        </a>
        <a
          className="cta-sheen rounded-sm border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-[10px] font-semibold tracking-[0.16em] text-[var(--accent-contrast)] transition hover:brightness-95"
          href={data.action.href}
        >
          {data.action.label}
        </a>
      </div>
    </section>
  );
}
