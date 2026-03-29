import type { FooterData } from "@/types/portfolio";

type FooterProps = {
  data: FooterData;
};

export function Footer({ data }: FooterProps) {
  return (
    <footer className="relative mt-10 flex flex-col gap-5 border-t border-[var(--border-strong)] px-2 py-6 text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)] sm:flex-row sm:items-center sm:justify-between">
      <div className="absolute -top-px left-0 h-px w-40 bg-gradient-to-r from-[var(--accent)]/70 to-transparent" />
      <p className="text-[var(--accent)]">{data.brand}</p>
      <div className="flex flex-wrap gap-4 sm:gap-5">
        {data.links.map((link) => (
          <a className="transition duration-300 hover:-translate-y-0.5 hover:text-[var(--accent)]" href={link.href} key={link.id}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
