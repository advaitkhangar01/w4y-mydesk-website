import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "neutral"
    | "blue"
    | "purple";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-w4y-soft text-w4y-dark border-w4y-border dark:bg-w4y-dark-surface dark:text-w4y-dark-text dark:border-w4y-dark-border",
    success:
      "bg-w4y-pastel-green text-[#0D652D] border-[#CEEAD6] dark:bg-[#0D652D]/20 dark:text-[#81C995] dark:border-[#0D652D]/40",
    warning:
      "bg-w4y-pastel-amber text-[#7C5800] border-[#FEEFC3] dark:bg-[#7C5800]/20 dark:text-[#FDD663] dark:border-[#7C5800]/40",
    danger:
      "bg-[#FCE8E6] text-[#A50E0E] border-[#FAD2CF] dark:bg-[#A50E0E]/20 dark:text-[#F28B82] dark:border-[#A50E0E]/40",
    neutral:
      "bg-[#F1F3F4] text-[#5F6368] border-[#DADCE0] dark:bg-[#202124] dark:text-[#BDC1C6] dark:border-[#3C4043]",
    blue:
      "bg-w4y-pastel-blue text-[#174EA6] border-[#D2E3FC] dark:bg-[#174EA6]/20 dark:text-[#8AB4F8] dark:border-[#174EA6]/40",
    purple:
      "bg-w4y-pastel-lavender text-[#6200EE] border-[#E8D9FC] dark:bg-[#6200EE]/20 dark:text-[#D7AEFB] dark:border-[#6200EE]/40",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium rounded-full border",
    md: "px-2.5 py-1 text-xs font-semibold rounded-full border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 leading-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();

  switch (normalized) {
    case "PAID":
    case "ACTIVE":
    case "HEALTHY":
      return (
        <Badge variant="success">
          <span className="w-1.5 h-1.5 rounded-full bg-w4y-success" />
          {normalized}
        </Badge>
      );
    case "PENDING":
    case "DEGRADED":
      return (
        <Badge variant="warning">
          <span className="w-1.5 h-1.5 rounded-full bg-w4y-warning" />
          {normalized}
        </Badge>
      );
    case "FAILED":
    case "REVOKED":
    case "SUSPENDED":
    case "OFFLINE":
      return (
        <Badge variant="danger">
          <span className="w-1.5 h-1.5 rounded-full bg-w4y-error" />
          {normalized}
        </Badge>
      );
    case "REFUNDED":
      return (
        <Badge variant="purple">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6200EE]" />
          REFUNDED
        </Badge>
      );
    case "UNKNOWN":
    default:
      return (
        <Badge variant="neutral">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5F6368]" />
          {normalized}
        </Badge>
      );
  }
}
