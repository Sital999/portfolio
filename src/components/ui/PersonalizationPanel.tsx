"use client";

import { useEffect, useRef, useState } from "react";

type MotionPreset = "calm" | "balanced" | "dynamic";
type AccentPreset = "cyan" | "emerald" | "amber";
type A11yMode = "off" | "on";
type SpotlightIntensity = "low" | "medium" | "high";

const MOTION_KEY = "motionPreset";
const ACCENT_KEY = "accentPreset";
const A11Y_KEY = "a11yMode";
const SPOTLIGHT_KEY = "spotlightIntensity";

function sanitizeMotion(value: string | null): MotionPreset {
  if (value === "calm" || value === "balanced" || value === "dynamic") {
    return value;
  }
  return "balanced";
}

function sanitizeAccent(value: string | null): AccentPreset {
  if (value === "emerald" || value === "amber" || value === "cyan") {
    return value;
  }
  return "cyan";
}

function sanitizeA11y(value: string | null): A11yMode {
  return value === "on" ? "on" : "off";
}

function sanitizeSpotlight(value: string | null): SpotlightIntensity {
  if (value === "low" || value === "high" || value === "medium") {
    return value;
  }
  return "medium";
}

function getInitialMotion(): MotionPreset {
  if (typeof window === "undefined") {
    return "balanced";
  }
  return sanitizeMotion(window.localStorage.getItem(MOTION_KEY));
}

function getInitialAccent(): AccentPreset {
  if (typeof window === "undefined") {
    return "cyan";
  }
  return sanitizeAccent(window.localStorage.getItem(ACCENT_KEY));
}

function getInitialA11y(): A11yMode {
  if (typeof window === "undefined") {
    return "off";
  }
  return sanitizeA11y(window.localStorage.getItem(A11Y_KEY));
}

function getInitialSpotlight(): SpotlightIntensity {
  if (typeof window === "undefined") {
    return "medium";
  }
  return sanitizeSpotlight(window.localStorage.getItem(SPOTLIGHT_KEY));
}

function applyMotionPreset(preset: MotionPreset) {
  const body = document.body;
  body.classList.remove("motion-calm", "motion-balanced", "motion-dynamic");
  body.classList.add(`motion-${preset}`);
}

export function PersonalizationPanel() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [motionPreset, setMotionPreset] = useState<MotionPreset>(() => getInitialMotion());
  const [accentPreset, setAccentPreset] = useState<AccentPreset>(() => getInitialAccent());
  const [a11yMode, setA11yMode] = useState<A11yMode>(() => getInitialA11y());
  const [spotlightIntensity, setSpotlightIntensity] = useState<SpotlightIntensity>(() => getInitialSpotlight());

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      if (panelRef.current && !panelRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    applyMotionPreset(motionPreset);
    window.localStorage.setItem(MOTION_KEY, motionPreset);
  }, [motionPreset]);

  useEffect(() => {
    document.documentElement.dataset.accent = accentPreset;
    window.localStorage.setItem(ACCENT_KEY, accentPreset);
  }, [accentPreset]);

  useEffect(() => {
    document.documentElement.dataset.a11y = a11yMode;
    window.localStorage.setItem(A11Y_KEY, a11yMode);
  }, [a11yMode]);

  useEffect(() => {
    document.documentElement.dataset.spotlight = spotlightIntensity;
    window.localStorage.setItem(SPOTLIGHT_KEY, spotlightIntensity);
  }, [spotlightIntensity]);

  const onMotionChange = (preset: MotionPreset) => {
    setMotionPreset(preset);
  };

  const onAccentChange = (accent: AccentPreset) => {
    setAccentPreset(accent);
  };

  const onA11yToggle = () => {
    const next = a11yMode === "off" ? "on" : "off";
    setA11yMode(next);
    document.documentElement.dataset.a11y = next;
    window.localStorage.setItem(A11Y_KEY, next);
  };

  const onSpotlightChange = (intensity: SpotlightIntensity) => {
    setSpotlightIntensity(intensity);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        aria-expanded={open}
        aria-label="Open personalization controls"
        className="grid size-8 place-items-center rounded-sm border border-[var(--border-strong)] bg-[var(--surface-2)] text-[9px] font-semibold tracking-[0.14em] text-[var(--accent)] transition hover:border-[var(--accent)]"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        CTRL
      </button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 w-64 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] p-3 shadow-[0_24px_56px_-36px_rgb(var(--accent-rgb)/0.45)]">
          <div className="space-y-4 text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)]">
            <div>
              <p className="mb-2 text-[var(--accent)]">Motion</p>
              <div className="grid grid-cols-3 gap-1">
                {(["calm", "balanced", "dynamic"] as MotionPreset[]).map((preset) => (
                  <button
                    className={`rounded-sm border px-2 py-1 ${
                      motionPreset === preset
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--border-strong)] text-[var(--text-dim)]"
                    }`}
                    key={preset}
                    onClick={() => onMotionChange(preset)}
                    type="button"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[var(--accent)]">Accent</p>
              <div className="grid grid-cols-3 gap-1">
                {(["cyan", "emerald", "amber"] as AccentPreset[]).map((accent) => (
                  <button
                    className={`rounded-sm border px-2 py-1 ${
                      accentPreset === accent
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--border-strong)] text-[var(--text-dim)]"
                    }`}
                    key={accent}
                    onClick={() => onAccentChange(accent)}
                    type="button"
                  >
                    {accent}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[var(--accent)]">Spotlight</p>
              <div className="grid grid-cols-3 gap-1">
                {(["low", "medium", "high"] as SpotlightIntensity[]).map((intensity) => (
                  <button
                    className={`rounded-sm border px-2 py-1 ${
                      spotlightIntensity === intensity
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--border-strong)] text-[var(--text-dim)]"
                    }`}
                    key={intensity}
                    onClick={() => onSpotlightChange(intensity)}
                    type="button"
                  >
                    {intensity}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border-strong)] pt-3">
              <p className="text-[var(--accent)]">A11Y+</p>
              <button
                className={`rounded-sm border px-2 py-1 ${
                  a11yMode === "on"
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border-strong)] text-[var(--text-dim)]"
                }`}
                onClick={onA11yToggle}
                type="button"
              >
                {a11yMode === "on" ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
