"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PersonalizationPanel } from "@/components/ui/PersonalizationPanel";
import type { HeaderData } from "@/types/portfolio";
import { useEffect, useMemo, useState } from "react";

type HeaderProps = {
  data: HeaderData;
};

export function Header({ data }: HeaderProps) {
  const sectionIds = useMemo(
    () => data.navItems.map((item) => item.href.replace("#", "")).filter(Boolean),
    [data.navItems],
  );
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!sectionIds.length) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-1 sm:px-2">
        <a className="text-[11px] font-semibold tracking-[0.17em] text-[var(--accent)]" href="#">
          {data.brand}
        </a>
        <nav className="hidden items-center gap-5 text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)] lg:flex">
          {data.navItems.map((item) => (
            <a
              aria-current={activeSection === item.href.replace("#", "") ? "page" : undefined}
              className={`nav-link transition hover:text-[var(--accent)] ${
                activeSection === item.href.replace("#", "") ? "text-[var(--accent)]" : ""
              }`}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <PersonalizationPanel />
          <ThemeToggle />
          <a
            className="cta-sheen rounded-sm border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-1.5 text-[9px] font-semibold tracking-[0.2em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
            href={data.connectButton.href}
          >
            {data.connectButton.label}
          </a>
        </div>
      </div>
    </header>
  );
}
