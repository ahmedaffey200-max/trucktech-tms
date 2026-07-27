import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        primary: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        success: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        danger: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
        info: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
        outline: "border border-current bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            variant === "success" && "bg-green-500",
            variant === "warning" && "bg-amber-500",
            variant === "danger" && "bg-red-500",
            variant === "primary" && "bg-blue-500",
            variant === "info" && "bg-sky-500",
            (!variant || variant === "default") && "bg-zinc-500"
          )}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
