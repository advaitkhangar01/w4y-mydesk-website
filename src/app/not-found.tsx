import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-w4y-soft dark:bg-w4y-dark-bg flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <span className="text-4xl font-extrabold text-w4y-blue">404</span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white">Page Not Found</h1>
        <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted">
          The requested page does not exist or has moved.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
