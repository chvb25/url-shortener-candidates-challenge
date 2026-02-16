import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-900">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span>Kabilio Shortener</span>
          </a>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Shortener
            </a>
            <a href="/stats" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Statistics
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Kabilio Inc. Built with React Router 7.
          </p>
          <div className="flex items-center gap-4">
             <span className="text-xs text-slate-400 font-mono">DDD • Prisma • SQLite</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
