import type { ProfilesData } from "@/types/portfolio";

type ProfilesProps = {
  data: ProfilesData;
};

export function Profiles({ data }: ProfilesProps) {
  return (
    <section className="fade-rise mt-14 border border-[var(--border-strong)] bg-[var(--section-bg)] p-6 sm:p-8" id={data.sectionId}>
      <div className="mb-6 space-y-2">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--accent)]">Community Presence</p>
        <h2 className="text-3xl font-bold sm:text-4xl">{data.sectionTitle}</h2>
        <p className="max-w-3xl text-[13px] leading-7 text-[var(--text-muted)]">{data.sectionDescription}</p>
      </div>
      <div className="stagger-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {data.links.map((link) => (
          <a
            className="interactive-card rounded-sm border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-dim)] transition hover:text-[var(--accent)]"
            href={link.href}
            key={link.id}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
