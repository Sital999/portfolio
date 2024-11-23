"use client";

import { cn } from "@lib/utils";
import { themeAtom } from "@store/theme";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const HomePageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <div
      className={cn(
        "px-72 py-10 h-full w-full flex flex-col gap-10",
        className,
        theme.darkMode ? "bg-stone-800 text-white" : ""
      )}
    >
      {children}
    </div>
  );
};

export default HomePageWrapper;
