import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Last updated: {lastUpdated}
        </p>

        {/* Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">
            Questions? Contact us at{" "}
            <a href="mailto:it@g-track.eu" className="text-blue-500 hover:underline">
              it@g-track.eu
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
