"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Header from "./Header";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedReplies from "./SuggestedReplies";
import ChatInput from "./ChatInput";
import { SUGGESTED_REPLIES, WELCOME_MESSAGE } from "../lib/systemPrompt";

function formatTime(date) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "";
  }
}

function makeWelcomeMessage() {
  return [
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: formatTime(new Date()),
    },
  ];
}

export default function ChatWindow() {
  const [messages, setMessages] = useState(makeWelcomeMessage);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [theme, setTheme] = useState("dark");
  const scrollRef = useRef(null);

  // CerevityAI's identity is dark-navy-first; only switch to light if the
  // visitor's OS explicitly prefers light (otherwise stay on-brand dark).
  useEffect(() => {
    const prefersLight =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: light)").matches;
    if (prefersLight) setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Auto-scroll to latest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isSending]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const userMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: formatTime(new Date()),
      };

      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setInput("");
      setIsSending(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({
              role,
              content,
            })),
          }),
        });

        let data;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (!res.ok) {
          const errText =
            data?.error ||
            "Something went wrong while contacting CerevityAI Partnership Assistant. Please try again.";
          setMessages((prev) => [
            ...prev,
            {
              id: `e-${Date.now()}`,
              role: "assistant",
              content: errText,
              isError: true,
              timestamp: formatTime(new Date()),
            },
          ]);
          return;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: data.reply,
            timestamp: formatTime(new Date()),
          },
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: "assistant",
            content:
              "We couldn't reach CerevityAI Partnerships right now. Please check your connection and try again.",
            isError: true,
            timestamp: formatTime(new Date()),
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [messages, isSending]
  );

  const handleReset = () => {
    setMessages(makeWelcomeMessage());
    setInput("");
  };

  const showSuggestions =
    !isSending && messages.filter((m) => m.role === "user").length === 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onReset={handleReset}
      />

      <div
        ref={scrollRef}
        className="chat-scroll flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-5"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              role={m.role}
              content={m.content}
              isError={m.isError}
              timestamp={m.timestamp}
            />
          ))}

          {isSending && <TypingIndicator />}

          {showSuggestions && (
            <SuggestedReplies
              suggestions={SUGGESTED_REPLIES}
              onSelect={(text) => sendMessage(text)}
              disabled={isSending}
            />
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <SuggestedRepliesInline
          show={!showSuggestions && !isSending}
          onSelect={(text) => sendMessage(text)}
        />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => sendMessage(input)}
        disabled={isSending}
      />
    </div>
  );
}

// Small persistent row of quick chips above the input once the conversation
// has started, so users always have easy access to common questions.
function SuggestedRepliesInline({ show, onSelect }) {
  if (!show) return null;
  return (
    <div className="px-3 sm:px-6">
      <SuggestedReplies suggestions={SUGGESTED_REPLIES} onSelect={onSelect} />
    </div>
  );
}
