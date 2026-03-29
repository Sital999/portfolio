"use client";

import { useEffect, useState } from "react";

type FeedItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string | null;
};

type FeedResponse = {
  source: "rss" | "fallback";
  summary: string;
  items: FeedItem[];
};

function humanTime(value: string | null) {
  if (!value) {
    return "Unknown time";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function LiveTechFeed() {
  const [data, setData] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch("/api/sync/tech-news");
        if (!response.ok) {
          throw new Error("Failed");
        }
        const payload = (await response.json()) as FeedResponse;
        setData(payload);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  return (
    <section className="fade-rise mt-14 border border-[var(--border-strong)] bg-[var(--section-bg)] p-4 sm:p-6" id="live-feed">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-[-0.02em] sm:text-[2rem]">Tech News Feed</h2>
        <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)]">Live Headlines</p>
      </div>

      {loading ? <p className="text-[12px] text-[var(--text-dim)]">Loading latest tech stories...</p> : null}
      {!loading && !data ? <p className="text-[12px] text-[var(--text-dim)]">Could not load feed right now.</p> : null}

      {data ? (
        <>
          <p className="mb-4 rounded-sm border border-[var(--border-muted)] bg-[var(--surface-2)] px-3 py-2 text-[12px] text-[var(--text-muted)]">
            {data.summary}
          </p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {data.items.slice(0, 9).map((item) => (
              <a
                className="interactive-card block rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-4"
                href={item.url}
                key={item.id}
                rel="noreferrer"
                target="_blank"
              >
                <h3 className="text-sm font-semibold leading-6 tracking-[-0.01em] text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-3 text-[9px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
                  {item.source} • {humanTime(item.publishedAt)}
                </p>
              </a>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
