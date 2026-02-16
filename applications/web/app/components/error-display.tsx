import * as React from "react";
import { Button } from "./button";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  status?: number;
}

export const ErrorDisplay = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again later.",
  onRetry,
  status,
}: ErrorDisplayProps) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-6">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        {status && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {status}
          </span>
        )}
      </div>
      
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500">{message}</p>
      </div>

      <div className="flex items-center gap-4 mt-2">
        {onRetry ? (
          <Button onClick={onRetry} variant="primary">
            Try Again
          </Button>
        ) : (
          <Button onClick={() => (window.location.href = "/")} variant="primary">
            Go to Home
          </Button>
        )}
        <Button onClick={() => window.history.back()} variant="outline">
          Go Back
        </Button>
      </div>
    </div>
  );
};
