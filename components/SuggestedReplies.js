"use client";

export default function SuggestedReplies({ suggestions, onSelect, disabled }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-1 pb-1 animate-fade-in-up">
      {suggestions.map((text) => (
        <button
          key={text}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(text)}
          className="font-display text-xs sm:text-[13px] font-medium px-3.5 py-2 rounded-full border border-ink/15 dark:border-canvas/20 bg-white/70 dark:bg-canvas-darksoft/70 text-ink/80 dark:text-canvas/85 hover:border-coral hover:text-coral-dark dark:hover:text-coral-light hover:bg-coral-50 dark:hover:bg-coral-dark/10 active:scale-[0.97] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
