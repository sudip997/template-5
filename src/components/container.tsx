import type * as React from "react";
import { cn } from "@/lib/utils";

/** Shared page container: consistent max width and horizontal gutters. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}
