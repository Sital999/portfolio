"use client";

import type { CareerTimelineData } from "@/types/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type InteractiveCareerTimelineProps = {
  data: CareerTimelineData;
};

export function InteractiveCareerTimeline({ data }: InteractiveCareerTimelineProps) {
  const [activeId, setActiveId] = useState(data.entries[0]?.id ?? "");

  const activeEntry = useMemo(
    () => data.entries.find((entry) => entry.id === activeId) ?? data.entries[0],
    [activeId, data.entries],
  );

  if (!activeEntry) {
    return null;
  }

  return (
    <section className="fade-rise mt-14 border border-[var(--border-strong)] bg-[var(--section-bg)] p-4 sm:p-6" id={data.sectionId}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">{data.eyebrow}</p>
          <h2 className="mt-2 text-balance text-2xl font-bold tracking-[-0.02em] sm:text-[2rem]">{data.title}</h2>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative space-y-3 border border-[var(--border-strong)] bg-[var(--surface-2)] p-3">
          <div className="absolute bottom-5 left-[22px] top-5 w-px bg-[var(--border-muted)]" />
          {data.entries.map((entry) => {
            const isActive = entry.id === activeEntry.id;
            return (
              <button
                className={`relative z-10 flex w-full items-start gap-3 rounded-sm border px-3 py-2 text-left transition ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border-strong)] bg-[var(--surface-1)] hover:border-[var(--accent)]/45"
                }`}
                key={entry.id}
                onClick={() => setActiveId(entry.id)}
                type="button"
              >
                <span
                  className={`mt-1 block h-3.5 w-3.5 rounded-full border ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--border-muted)] bg-[var(--surface-2)]"
                  }`}
                />
                <span className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-[0.16em] text-[var(--text-dim)]">{entry.dateRange}</span>
                  <span className="mt-1 block text-sm font-semibold tracking-[-0.01em] text-[var(--foreground)]">{entry.role}</span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] text-[var(--text-dim)]">{entry.organization}</span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            className="interactive-card rounded-sm border border-[var(--border-strong)] bg-[var(--surface-2)] p-4"
            exit={{ opacity: 0, y: 8 }}
            initial={{ opacity: 0, y: 8 }}
            key={activeEntry.id}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">{activeEntry.dateRange}</p>
            <h3 className="mt-2 text-[1.65rem] font-semibold leading-tight tracking-[-0.02em]">{activeEntry.role}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-dim)]">{activeEntry.organization}</p>

            <p className="mt-4 text-[13px] leading-7 text-[var(--text-muted)]">{activeEntry.milestone}</p>

            <ul className="mt-4 space-y-1 text-[12px] text-[var(--text-muted)]">
              {activeEntry.highlights.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeEntry.technologies.map((tech) => (
                <span
                  className="rounded-full border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-[var(--accent)]"
                  key={tech}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
