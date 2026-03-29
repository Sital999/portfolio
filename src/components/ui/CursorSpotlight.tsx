"use client";

import { useMemo, useRef } from "react";

type CursorSpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

function mergeClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function CursorSpotlight({ children, className }: CursorSpotlightProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const supportsPointer = useMemo(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!supportsPointer || !containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    containerRef.current.style.setProperty("--spot-x", `${x}px`);
    containerRef.current.style.setProperty("--spot-y", `${y}px`);
    containerRef.current.style.setProperty("--spot-opacity", "1");
  };

  const onPointerLeave = () => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.style.setProperty("--spot-opacity", "0");
  };

  return (
    <div
      className={mergeClassNames("cursor-spotlight-zone", className)}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
