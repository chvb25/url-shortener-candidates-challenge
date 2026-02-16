import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { Toaster } from "sonner";
import { ErrorDisplay } from "./components/error-display";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster closeButton richColors position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Oops!";
  let message = "An unexpected error occurred.";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    title = error.status === 404 ? "Page Not Found" : "Server Error";
    message =
      error.status === 404
        ? "The page you are looking for doesn't exist or has been moved."
        : error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full p-4">
        <ErrorDisplay
          title={title}
          message={message}
          status={status}
        />
        {import.meta.env.DEV && error instanceof Error && error.stack && (
          <div className="mt-8 p-4 bg-slate-900 rounded-lg overflow-auto max-h-64">
            <pre className="text-xs text-slate-300 font-mono">
              <code>{error.stack}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
