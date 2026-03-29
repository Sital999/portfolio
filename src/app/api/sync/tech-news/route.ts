import { NextResponse } from "next/server";

type TechNewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string | null;
};

type SourceConfig = {
  label: string;
  url: string;
};

const SOURCES: SourceConfig[] = [
  { label: "Hacker News", url: "https://hnrss.org/frontpage" },
  { label: "Ars Technica", url: "https://feeds.arstechnica.com/arstechnica/index" },
];

function cleanText(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function parseItems(xml: string, source: string) {
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 8);

  return itemMatches
    .map((match, index) => {
      const block = match[1];
      const title = cleanText(block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
      const url = cleanText(block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "");
      const publishedAt = cleanText(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "") || null;

      if (!title || !url) {
        return null;
      }

      return {
        id: `${source.toLowerCase().replace(/\s+/g, "-")}-${index}-${url}`,
        title,
        url,
        source,
        publishedAt,
      } as TechNewsItem;
    })
    .filter((item): item is TechNewsItem => Boolean(item));
}

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function fallbackItems(): TechNewsItem[] {
  const now = new Date().toISOString();
  return [
    {
      id: "fallback-1",
      title: "Tech feed temporarily unavailable. Check back soon for fresh headlines.",
      url: "https://news.ycombinator.com/",
      source: "Feed Fallback",
      publishedAt: now,
    },
  ];
}

export async function GET() {
  try {
    const responses = await Promise.all(
      SOURCES.map(async (source) => {
        try {
          const response = await fetch(source.url, {
            headers: {
              Accept: "application/rss+xml, application/xml, text/xml",
            },
            next: { revalidate: 1800 },
          });

          if (!response.ok) {
            return [] as TechNewsItem[];
          }

          const xml = await response.text();
          return parseItems(xml, source.label);
        } catch {
          return [] as TechNewsItem[];
        }
      }),
    );

    const merged = responses
      .flat()
      .map((item) => ({ ...item, publishedAt: formatDate(item.publishedAt) }))
      .sort((a, b) => {
        const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 9);

    const items = merged.length ? merged : fallbackItems();

    return NextResponse.json({
      source: merged.length ? "rss" : "fallback",
      summary: "Latest tech headlines aggregated from trusted public feeds.",
      items,
    });
  } catch {
    return NextResponse.json({
      source: "fallback",
      summary: "Latest tech feed is temporarily unavailable.",
      items: fallbackItems(),
    });
  }
}
