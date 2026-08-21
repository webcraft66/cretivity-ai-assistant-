# CerevityAI Partnership Assistant

A production-ready AI chat assistant for **CerevityAI**, answering questions
about its AI & Robotics school partnership program (curriculum, pricing,
timelines, and how it differs from traditional vendors). Built with Next.js
14 (App Router), React, Tailwind CSS, and the **Google Gemini API** (via
Google AI Studio). Optimized for one-click deployment to **Vercel**.

![tech](https://img.shields.io/badge/Next.js-14-black) ![tech](https://img.shields.io/badge/React-18-blue) ![tech](https://img.shields.io/badge/TailwindCSS-3-38bdf8) ![tech](https://img.shields.io/badge/Gemini%20API-Google%20AI%20Studio-2F6FED)

---

## 🎨 Design

The UI matches CerevityAI's real identity from its partnership deck: a deep
navy background, a blue → cyan glow gradient, and a brain-and-circuit badge
mark used as the logo and chat avatar. Ambient drifting glow blobs sit
behind a glass chat panel; message bubbles use soft asymmetric corners.
Space Grotesk carries headings and UI labels; Inter carries body text.
Dark mode is the default (on-brand); light mode is available via toggle.

## ✨ Features

- **On-brand, navy/blue "tech partner" UI** — animated glow backdrop, glass chat panel, brain-circuit badge mark, light/dark toggle, fully responsive.
- **Typing indicator** — animated "CerevityAI is typing..." bubble while waiting on the AI.
- **Auto-scroll** to the newest message.
- **Suggested reply chips** — one-tap common questions ("What's included in the partnership?", "What does it cost?", "How is the curriculum structured?", "How is CerevityAI different from other vendors?").
- **Grounded AI persona** — the system prompt is pre-loaded with the actual program details, pricing, and structure from CerevityAI's partnership proposal, so the assistant answers from real facts instead of guessing. Defined in one file (`lib/systemPrompt.js`).
- **Secure backend proxy** — the Gemini API key is only ever used server-side, inside a Next.js API Route (`app/api/chat/route.js`). It is never sent to the browser.
- **Graceful error handling** — friendly messages for a missing/invalid API key, rate limiting, safety-filtered responses, and network/connectivity issues.

---

## 📁 Project Structure

```
cerevityai-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js       # Serverless API route → calls the Gemini API
│   ├── globals.css            # Tailwind entrypoint, glow backdrop, bubble shapes
│   ├── layout.js              # Root layout (fonts, metadata, <html>/<body>)
│   └── page.js                # Chat page (ambient glow blobs + <ChatWindow />)
├── components/
│   ├── BlobMark.js            # Brain-and-circuit badge — logo/avatar mark
│   ├── ChatWindow.js          # Main chat state/logic (messages, sending, scroll)
│   ├── ChatInput.js           # Floating message input pill + send button
│   ├── Header.js              # Branded header + theme toggle + "New chat"
│   ├── MessageBubble.js       # User / assistant message bubble + mini markdown
│   ├── SuggestedReplies.js    # Quick-reply pill chips
│   └── TypingIndicator.js     # "CerevityAI is typing..." animation
├── lib/
│   └── systemPrompt.js        # AI persona + program facts, pricing, suggested replies
├── public/                    # Static assets (add your logo/favicon here)
├── .env.example                # Documented environment variables
├── .gitignore
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🧰 Requirements

- **Node.js 20 LTS or later**
- A **Gemini API key** from **Google AI Studio** — get one free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## 🔑 Getting your Google AI Studio API key

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey) and sign in with your Google account.
2. Click **Create API key** (choose or create a Google Cloud project if prompted).
3. Copy the key — it will look something like `AIzaSy...`.
4. Keep it secret; treat it like a password.

---

## 🚀 Run Locally

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables.** Copy the example file:

   ```bash
   cp .env.example .env.local
   ```

   Then open `.env.local` and paste in your real key:

   ```bash
   GEMINI_API_KEY=AIzaSy-your-real-key-here
   # Optional overrides:
   # GEMINI_MODEL=gemini-2.5-flash
   # GEMINI_MAX_OUTPUT_TOKENS=1024
   ```

   > `.env.local` is already in `.gitignore` — it will never be committed.

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) — the chatbot is live.

5. **Build for production locally (optional sanity check):**

   ```bash
   npm run build
   npm run start
   ```

---

## ☁️ Deploy to Vercel

### Option A — Vercel Dashboard (recommended, no CLI needed)

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **import** that repository.
3. Vercel auto-detects **Next.js** — leave the default build settings:
   - Build Command: `next build`
   - Output: (auto)
   - Install Command: `npm install`
4. Before clicking **Deploy**, add your environment variable:
   - In the import screen, expand **Environment Variables**, or afterward go to
     **Project → Settings → Environment Variables**.
   - Add:
     | Key | Value | Environments |
     |---|---|---|
     | `GEMINI_API_KEY` | `AIzaSy...` (your real key) | Production, Preview, Development |
     | `GEMINI_MODEL` *(optional)* | `gemini-2.5-flash` | Production, Preview, Development |
     | `GEMINI_MAX_OUTPUT_TOKENS` *(optional)* | `1024` | Production, Preview, Development |
5. Click **Deploy**. Vercel will build and give you a live URL (e.g. `https://cerevityai-chatbot.vercel.app`).

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel                 # first deploy — follow the prompts
vercel env add GEMINI_API_KEY   # paste your key when prompted
vercel --prod           # deploy to production
```

### Updating environment variables later

Go to your project in the Vercel dashboard → **Settings → Environment Variables**
→ edit/add a value → **Save**. You'll need to **redeploy** (Deployments tab →
"..." menu → Redeploy) for the new value to take effect.

---

## 🔒 Security Notes

- The Gemini API key is read only inside `app/api/chat/route.js`, which runs
  **server-side** (Node.js serverless function). It is never bundled into
  client-side JavaScript or exposed in the browser.
- The API route validates and sanitizes incoming messages before forwarding
  them to Gemini, and caps how much conversation history is sent.
- Never commit `.env.local` or real API keys to version control — only
  `.env.example` (with placeholder values) should be committed.

---

## 🎨 Customizing the AI Persona & Program Facts

All persona/behavior configuration lives in **`lib/systemPrompt.js`**:

- `SYSTEM_PROMPT` — defines CerevityAI's role, the partnership program
  details (curriculum, what's included, pricing, structure), and topic
  boundaries. **This is currently seeded with the numbers from the
  partnership proposal deck (₹40,000/month, ₹4,80,000/year, 18–25 projects/
  year, etc.) — update these if the offer changes or you're reusing this for
  a different school/program.**
- `SUGGESTED_REPLIES` — the quick-reply chips shown in the UI.
- `WELCOME_MESSAGE` — the assistant's first message when a chat starts.

No other code changes are required to update pricing, scope, or tone.

### Switching Gemini models

By default this project uses `gemini-2.5-flash` (fast and cost-effective).
Override it with the `GEMINI_MODEL` env var — e.g. `gemini-2.5-pro` for
higher-quality but slower/costlier responses. No code changes needed.

---

## 🖌️ Design System

- **Palette:** deep navy `#070A14` / `#0F1626` (backgrounds), off-white `#F5F7FB` (light-mode canvas), CerevityAI blue `#2F6FED` and cyan `#22D3EE` (the brand gradient), emerald `#34D399` (online-status accent). Tailwind tokens are named `canvas`/`ink`/`coral`/`cobalt`/`lime` internally — see `tailwind.config.js` for the mapping to these brand colors.
- **Type:** Space Grotesk for headings/UI labels, Inter for body copy — loaded via `next/font/google`, no extra setup required.
- **Signature element:** `components/BlobMark.js` — a dark badge with a brain-and-circuit glyph in the blue→cyan gradient, echoing the logo from the partnership deck. Used as the header mark and the assistant's chat avatar.
- **Motion:** slow-drifting ambient glow blobs behind the glass chat panel (`app/globals.css` → `.pigment-blob`), respecting `prefers-reduced-motion`.
- **Bubbles:** asymmetric corner radii (`.bubble-assistant` / `.bubble-user` in `globals.css`) for a softer, less boxy chat feel.
- **Responsive:** the chat panel fills the viewport on mobile and centers as a bordered glass panel on larger screens.

---

## 🧪 Testing Error Handling

- **Missing API key:** remove/comment out `GEMINI_API_KEY` and send a message — you'll see a friendly "not configured yet" error bubble instead of a crash.
- **Invalid API key:** the API route detects Gemini's `API_KEY_INVALID` error and returns a clear 401 message.
- **Rate limiting / provider errors:** the API route maps Gemini error signals (invalid key, quota/rate limit, safety-blocked responses, 5xx) to friendly, distinct messages.
- **Network issues:** if `/api/chat` is unreachable (e.g. offline), the client catches the fetch failure and shows a "couldn't reach CerevityAI Partnerships" message.

---

## 📄 License

This starter project is provided as-is for you to customize and use for your
CerevityAI deployment.
