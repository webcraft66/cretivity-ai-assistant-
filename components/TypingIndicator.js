"use client";

import BlobMark from "./BlobMark";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 animate-fade-in-up">
      <BlobMark size={30} className="shrink-0 mb-0.5" />
      <div className="bubble-assistant bg-white dark:bg-canvas-darksoft border border-ink/8 dark:border-canvas/10 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-bounce-dot [animation-delay:-0.32s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-bounce-dot [animation-delay:-0.16s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-bounce-dot" />
          </span>
          <span className="text-xs text-ink-soft dark:text-canvas/50 font-body">
            CerevityAI is typing...
          </span>
        </div>
      </div>
    </div>
  );
}
