"use client";

import type { WorksData } from "@/types/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, type KeyboardEventHandler } from "react";
import { createPortal } from "react-dom";

type SelectedWorksProps = {
  data: WorksData;
};

const featuredVariants = {
  center: { opacity: 1, x: 0, y: 0, scale: 1 },
  enter: (custom: number) => ({ opacity: 0, x: custom > 0 ? 22 : -22, y: 8, scale: 0.995 }),
  exit: (custom: number) => ({ opacity: 0, x: custom > 0 ? -22 : 22, y: -4, scale: 0.995 }),
};

export function SelectedWorks({ data }: SelectedWorksProps) {
  const filters = useMemo(() => ["All", ...Array.from(new Set(data.items.flatMap((item) => item.categories)))], [data.items]);
  const [activeFilter, setActiveFilter] = useState("All");
  const defaultWork = useMemo(
    () => data.items.find((item) => item.id === data.defaultWorkId) ?? data.items[0],
    [data.defaultWorkId, data.items],
  );
  const [activeWorkId, setActiveWorkId] = useState(defaultWork?.id ?? "");
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleItems = useMemo(
    () => (activeFilter === "All" ? data.items : data.items.filter((item) => item.categories.includes(activeFilter))),
    [activeFilter, data.items],
  );

  const selectFilter = (filter: string) => {
    setActiveFilter(filter);
    const nextVisible = filter === "All" ? data.items : data.items.filter((item) => item.categories.includes(filter));
    const nextDefault = nextVisible[0]?.id ?? "";
    setDirection(1);
    setActiveWorkId(nextDefault);
  };

  const surprisePick = () => {
    if (!visibleItems.length) {
      return;
    }

    if (visibleItems.length === 1) {
      setDirection(1);
      setActiveWorkId(visibleItems[0].id);
      return;
    }

    const current = activeIndex >= 0 ? activeIndex : 0;
    let nextIndex = current;

    while (nextIndex === current) {
      nextIndex = Math.floor(Math.random() * visibleItems.length);
    }

    setDirection(nextIndex >= current ? 1 : -1);
    setActiveWorkId(visibleItems[nextIndex].id);
  };

  const activeWork = useMemo(
    () => visibleItems.find((item) => item.id === activeWorkId) ?? visibleItems[0] ?? null,
    [activeWorkId, visibleItems],
  );

  const activeIndex = visibleItems.findIndex((item) => item.id === activeWorkId);

  const selectByIndex = useCallback(
    (nextIndex: number) => {
      if (!visibleItems.length) {
        return;
      }

      const clamped = (nextIndex + visibleItems.length) % visibleItems.length;
      const next = visibleItems[clamped];
      const current = activeIndex >= 0 ? activeIndex : 0;
      setDirection(clamped >= current ? 1 : -1);
      setActiveWorkId(next.id);
    },
    [activeIndex, visibleItems],
  );

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const handleSectionKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (!visibleItems.length) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectByIndex((activeIndex >= 0 ? activeIndex : 0) + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectByIndex((activeIndex >= 0 ? activeIndex : 0) - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      setDirection(-1);
      setActiveWorkId(visibleItems[0].id);
    }

    if (event.key === "End") {
      event.preventDefault();
      setDirection(1);
      setActiveWorkId(visibleItems[visibleItems.length - 1].id);
    }

    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      surprisePick();
    }
  };

  if (!activeWork) {
    return null;
  }

  return (
    <section
      aria-label="Selected works"
      className="fade-rise delay-3 mt-14 border border-[var(--border-strong)] bg-[var(--section-bg)] p-4 sm:p-6"
      id={data.sectionId}
      onKeyDown={handleSectionKeyDown}
      tabIndex={0}
    >
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-[2.1rem] font-bold leading-none">{data.sectionTitle}</h2>
        <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--text-dim)]">Select to Explore</p>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] transition ${
              activeFilter === filter
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--border-muted)] bg-[var(--surface-2)] text-[var(--text-dim)] hover:border-[var(--accent)]"
            }`}
            key={filter}
            onClick={() => selectFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
        <motion.button
          className="rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]"
          onClick={surprisePick}
          title="Pick a random project"
          type="button"
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          Surprise Me
        </motion.button>
      </div>
      <AnimatePresence custom={direction} mode="wait">
        <motion.article
          animate="center"
          className="interactive-card grid gap-5 rounded-md border border-[var(--border-strong)] bg-[linear-gradient(110deg,var(--feature-from),var(--feature-to))] p-5 lg:grid-cols-[1.05fr_1fr]"
          custom={direction}
          exit="exit"
          initial="enter"
          key={activeWork.id}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          variants={featuredVariants}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.2em]">
              {activeWork.badges.map((badge, index) => (
                <span
                  className={
                    index === 0
                      ? "rounded-full border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]"
                      : "rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-500"
                  }
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </div>
            <h3 className="text-[2rem] font-bold leading-tight">{activeWork.title}</h3>
            <p className="max-w-xl text-[13px] leading-6 text-[var(--text-muted)]">{activeWork.description}</p>
            <ul className="space-y-1 text-[11px] text-[var(--text-muted)]">
              {activeWork.bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                className="rounded-sm border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]"
                onClick={() => setIsModalOpen(true)}
                type="button"
              >
                View Project Details
              </button>
            </div>
          </div>
          <div className="rounded-md border border-[var(--border-muted)] bg-[var(--surface-2)]/70 p-4">
            <button
              aria-label={`Open project details for ${activeWork.title}`}
              className="chart-scan group relative h-full min-h-[220px] w-full overflow-hidden rounded-md border border-[var(--border-muted)] bg-[linear-gradient(145deg,var(--chart-from),var(--chart-to))] text-left shadow-[0_30px_80px_-45px_rgb(var(--accent-rgb)/0.55)]"
              onClick={() => setIsModalOpen(true)}
              type="button"
            >
              {activeWork.image.url ? (
                <Image
                  alt={activeWork.image.alt}
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  src={activeWork.image.url}
                />
              ) : (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.65], scaleX: [0.98, 1, 0.99] }}
                  className="m-4 mt-12 h-32 rounded bg-[var(--accent-soft)]"
                  transition={{ duration: 1.6, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
                />
              )}
              <span className="absolute bottom-3 left-3 rounded-full border border-[rgb(var(--accent-rgb)/0.45)] bg-[rgb(var(--accent-rgb)/0.18)] px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-[var(--foreground)]">
                Open Details
              </span>
            </button>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="stagger-grid mt-5 grid gap-4 md:grid-cols-2">
        {visibleItems.map((work) => (
          <motion.button
            animate={work.id === activeWork.id ? { scale: 1.01 } : { scale: 1 }}
            className={`interactive-card rounded-md border bg-[var(--surface-2)] p-5 text-left ${
              work.id === activeWork.id
                ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/40"
                : "border-[var(--border-strong)]"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            key={work.id}
            onClick={() => {
              const index = visibleItems.findIndex((item) => item.id === work.id);
              if (index !== -1) {
                selectByIndex(index);
              }
            }}
            type="button"
          >
            <h3 className="mb-2 text-xl font-semibold">{work.title}</h3>
            <p className="mb-5 text-[13px] leading-6 text-[var(--text-muted)]">{work.description}</p>
            <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--text-dim)]">{work.tags}</p>
          </motion.button>
        ))}
      </div>

      {typeof window !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isModalOpen ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-[999] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  role="presentation"
                >
                  <motion.article
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    aria-modal="true"
                    className="flex h-[min(500px,calc(100vh-2rem))] w-[min(960px,calc(100vw-2rem))] flex-col overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface-1)]"
                    exit={{ opacity: 0, y: 8, scale: 0.99 }}
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    onClick={(event) => event.stopPropagation()}
                    role="dialog"
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-[var(--border-strong)] px-4 py-3 sm:px-6">
                      <h3 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl">{activeWork.title}</h3>
                      <button
                        aria-label="Close modal"
                        className="rounded-sm border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]"
                        onClick={() => setIsModalOpen(false)}
                        type="button"
                      >
                        Close
                      </button>
                    </div>

                    <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
                      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
                        <div className="relative h-56 w-full overflow-hidden rounded-md border border-[var(--border-muted)] bg-[var(--surface-2)] sm:h-72 lg:h-[360px]">
                          <Image alt={activeWork.image.alt} className="object-contain object-center p-2" fill sizes="(max-width: 1024px) 100vw, 64vw" src={activeWork.image.url} />
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">Challenge</p>
                            <p className="mt-1 text-[13px] leading-6 text-[var(--text-muted)]">{activeWork.detail.challenge}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">Solution</p>
                            <p className="mt-1 text-[13px] leading-6 text-[var(--text-muted)]">{activeWork.detail.solution}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">Impact</p>
                            <p className="mt-1 text-[13px] leading-6 text-[var(--text-muted)]">{activeWork.detail.impact}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {activeWork.detail.links.map((link) => (
                              <a
                                className="rounded-sm border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]"
                                href={link.href}
                                key={`${activeWork.id}-${link.label}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
