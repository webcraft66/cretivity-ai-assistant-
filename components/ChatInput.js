"use client";

import { useRef } from "react";

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 128) + "px";
    }
  };

  return (
    <div className="border-t border-ink/10 dark:border-canvas/10 bg-canvas/90 dark:bg-canvas-dark/90 backdrop-blur-md px-3 sm:px-6 py-3.5">
      <div className="flex items-end gap-2 max-w-3xl mx-auto rounded-[26px] border border-ink/12 dark:border-canvas/15 bg-white dark:bg-canvas-darksoft shadow-sm focus-within:border-coral/60 focus-within:ring-4 focus-within:ring-coral/10 transition p-1.5 pl-4">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask about the CerevityAI partnership..."
          className="flex-1 resize-none bg-transparent py-2 text-[14.5px] font-body text-ink dark:text-canvas placeholder:text-ink-faint dark:placeholder:text-canvas/35 focus:outline-none disabled:opacity-60 max-h-32"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="h-10 w-10 shrink-0 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-sm shadow-coral/30 hover:brightness-110 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </div>
      <p className="text-center text-[11px] text-ink-faint dark:text-canvas/35 mt-2 font-body">
        CerevityAI Partnership Assistant can make mistakes. For contract or billing specifics, contact partnerships@cerevityai.example.
      </p>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.4 20.6l17.6-8.6-17.6-8.6-.2 6.6L15 12 3.2 14z" />
    </svg>
  );
}
