import ChatWindow from "../components/ChatWindow";

export default function Page() {
  return (
    <main className="app-shell h-screen w-full flex flex-col">
      {/* Ambient floating pigment blobs — the page's atmosphere */}
      <div
        className="pigment-blob w-[420px] h-[420px] bg-coral/30 -top-24 -left-24 animate-blob-float"
        aria-hidden="true"
      />
      <div
        className="pigment-blob w-[380px] h-[380px] bg-cobalt/25 top-1/3 -right-32 animate-blob-float-slow"
        aria-hidden="true"
      />
      <div
        className="pigment-blob w-[300px] h-[300px] bg-lime/20 bottom-0 left-1/4 animate-blob-float"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-3xl h-full flex flex-col sm:my-0 sm:border-x border-ink/10 dark:border-canvas/10 bg-canvas/70 dark:bg-canvas-dark/60 backdrop-blur-xl shadow-2xl shadow-ink/5">
        <ChatWindow />
      </div>
    </main>
  );
}
