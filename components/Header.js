"use client";

import BlobMark from "./BlobMark";

export default function Header({ theme, onToggleTheme, onReset }) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-ink/10 dark:border-canvas/10 bg-canvas/80 dark:bg-canvas-dark/80 backdrop-blur-md px-4 sm:px-6 py-3.5 sticky top-0 z-10">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <BlobMark size={38} className="drop-shadow-[0_4px_14px_rgba(47,111,237,0.45)]" />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-[15px] sm:text-base font-semibold leading-tight tracking-tight truncate">
            CerevityAI{" "}
            <span className="font-body font-normal text-ink-soft dark:text-canvas/60">
              Partnerships
            </span>
          </h1>
          <p className="text-[11px] sm:text-xs text-ink-soft dark:text-canvas/50 flex items-center gap-1.5 font-body">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-dark" />
            </span>
            Online now
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onReset}
          className="hidden sm:inline-flex font-display text-xs font-medium px-3.5 py-1.5 rounded-full border border-ink/15 dark:border-canvas/20 text-ink/80 dark:text-canvas/80 hover:border-coral hover:text-coral dark:hover:text-coral-light dark:hover:border-coral-light transition-colors"
        >
          New chat
        </button>
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={onToggleTheme}
          className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-ink/15 dark:border-canvas/20 text-ink/70 dark:text-canvas/70 hover:border-coral hover:text-coral dark:hover:text-coral-light dark:hover:border-coral-light transition-colors"
        >
          {theme === "dark" ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}

function SunIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
      />
    </svg>
  );
}
