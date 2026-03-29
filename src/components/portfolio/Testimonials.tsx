import type { TestimonialsData } from "@/types/portfolio";

type TestimonialsProps = {
  data: TestimonialsData;
};

export function Testimonials({ data }: TestimonialsProps) {
  return (
    <section
      className="fade-rise border-x border-b border-[var(--border-strong)] bg-[var(--section-bg)] px-4 py-14 sm:px-6 lg:px-8"
      id={data.sectionId}
    >
      <div className="flex flex-col gap-3">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">{data.eyebrow}</p>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{data.title}</h2>
      </div>

      <div className="stagger-grid mt-8 grid gap-4 lg:grid-cols-3">
        {data.items.map((item) => (
          <article key={item.id} className="interactive-card rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-[rgb(var(--accent-rgb)/0.34)] bg-transparent text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)]">
                {item.avatarLabel}
              </div>
              <div aria-label={`${item.rating} out of 5`} className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isActive = index < item.rating;
                  return (
                    <span
                      aria-hidden="true"
                      className={isActive ? "h-2 w-2 rounded-full bg-[rgb(var(--accent-rgb)/0.95)]" : "h-2 w-2 rounded-full bg-[var(--border-muted)]"}
                      key={`${item.id}-star-${index}`}
                    />
                  );
                })}
              </div>
            </div>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              <span aria-hidden="true">&ldquo;</span>
              {item.quote}
              <span aria-hidden="true">&rdquo;</span>
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">{item.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)]">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
