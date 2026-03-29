"use client";

import { useState } from "react";

type QuoteOfDayProps = {
  quotes: string[];
};

function getDayIndex(length: number) {
  if (!length) {
    return 0;
  }

  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / 86_400_000);
  return dayOfYear % length;
}

export function QuoteOfDay({ quotes }: QuoteOfDayProps) {
  const [index, setIndex] = useState(() => getDayIndex(quotes.length));

  if (!quotes.length) {
    return null;
  }

  return (
    <div className="rounded-sm border border-[var(--border-muted)] bg-[var(--surface-2)]/80 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--text-dim)]">Quote of the Day</p>
        <button
          className="rounded-sm border border-[var(--border-muted)] px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-[var(--text-dim)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          onClick={() => setIndex((value) => (value + 1) % quotes.length)}
          type="button"
        >
          Next
        </button>
      </div>
      <p className="text-[12px] leading-6 text-[var(--text-muted)]">{quotes[index]}</p>
    </div>
  );
}
