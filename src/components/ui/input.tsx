import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "w-full h-10 px-3.5 text-sm rounded-input border bg-white text-w4y-dark transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-w4y-blue focus:border-transparent dark:bg-w4y-dark-surface dark:text-w4y-dark-text dark:placeholder:text-gray-500",
            error
              ? "border-w4y-error focus:ring-w4y-error"
              : "border-w4y-border dark:border-w4y-dark-border",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-w4y-error mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
