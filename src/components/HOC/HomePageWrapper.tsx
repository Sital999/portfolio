"use client";

import { cn } from "@lib/utils";
import React from "react";

const HomePageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("px-72 py-10", className)}>{children}</div>;
};

export default HomePageWrapper;
