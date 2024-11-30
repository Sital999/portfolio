"use client";

import { cn } from "@lib/utils";
import { themeAtom } from "@store/theme";
import { useAtom } from "jotai";
import React from "react";

const HomePageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [theme] = useAtom(themeAtom);
  return (
    <div
      className={cn(
        "px-4 sm:px-10 md:px-30 lg:px-72 py-4 md:py-10 h-full w-full flex flex-col gap-6 lg:gap-10",
        className,
        theme.darkMode ? "bg-stone-800 text-white" : ""
      )}
    >
      {children}
    </div>
  );
};

export default HomePageWrapper;
