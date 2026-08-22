import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../../../lib/systemPrompt";

// Run on Vercel's Node.js serverless runtime (required by the SDK).
export const runtime = "nodejs";
// Never cache chat responses.
export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_OUTPUT_TOKENS = Number(process.env.GEMINI_MAX_OUTPUT_TOKENS) || 1024;
const MAX_HISTORY_MESSAGES = 20; // simple guardrail to keep requests small

function jsonError(message, status, extra = {}) {
  return Response.json({ error: message, ...extra }, { status });
}

export async function POST(request) {
  // 1. Make sure the server is configured before doing anything else.
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return jsonError(
      "The chatbot is not configured yet. The server is missing a GEMINI_API_KEY environment variable.",
      500
    );
  }

  // 2. Parse and validate the incoming request body.
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request: expected a JSON body.", 400);
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError(
      "Invalid request: 'messages' must be a non-empty array.",
      400
    );
  }

  // 3. Sanitize/shape the conversation history for the Gemini API.
  //    Gemini uses "user" / "model" roles (not "assistant"), and each
  //    message is an array of "parts". Only keep the last N turns.
  const trimmed = messages.slice(-MAX_HISTORY_MESSAGES);
  const sanitized = trimmed
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.trim().slice(0, 8000) }],
    }));

  if (sanitized.length === 0) {
    return jsonError("Invalid request: no valid messages to send.", 400);
  }

  // 4. Call the Gemini API.
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: sanitized,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.7,
      },
    });

    const reply = response?.text?.trim();

    if (!reply) {
      // The model may have returned only a finishReason (e.g. blocked by
      // safety filters) with no text content.
      const finishReason = response?.candidates?.[0]?.finishReason;
      if (finishReason && finishReason !== "STOP") {
        return jsonError(
          "CerevityAI Partnership Assistant couldn't complete that response. Please try rephrasing your question.",
          422
        );
      }
      return jsonError(
        "CerevityAI Partnership Assistant didn't return a response. Please try again.",
        502
      );
    }

    return Response.json({ reply });
  } catch (err) {
    return handleGeminiError(err);
  }
}

function handleGeminiError(err) {
  const status = err?.status || err?.response?.status;
  const message = String(err?.message || "");

  if (status === 400 || /API key not valid|API_KEY_INVALID/i.test(message)) {
    return jsonError(
      "Authentication with the AI provider failed. Please check that GEMINI_API_KEY is set correctly.",
      401
    );
  }
  if (status === 403) {
    return jsonError(
      "The AI provider rejected this request. Please verify your GEMINI_API_KEY has access to the Gemini API.",
      403
    );
  }
  if (status === 429 || /RESOURCE_EXHAUSTED|rate limit/i.test(message)) {
    return jsonError(
      "CerevityAI Partnership Assistant is receiving a lot of requests right now. Please wait a moment and try again.",
      429
    );
  }
  if (status && status >= 500) {
    return jsonError(
      "The AI provider is temporarily unavailable. Please try again shortly.",
      502
    );
  }
  if (
    err?.name === "APIConnectionError" ||
    err?.code === "ENOTFOUND" ||
    /fetch failed|network/i.test(message)
  ) {
    return jsonError(
      "We couldn't reach the AI provider. Please check your network connection and try again.",
      503
    );
  }

  console.error("Unexpected /api/chat error:", err);
  return jsonError(
    "Something went wrong while contacting CerevityAI Partnership Assistant. Please try again.",
    500
  );
}
