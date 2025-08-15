import { useEffect, useRef, useState } from "react";

export default function PersonaChatModal({ person, onClose }) {
  const [messages, setMessages] = useState(() => [
    { id: uid(), side: "left", text: person.description }, // intro on LEFT
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMessages([{ id: uid(), side: "left", text: person.description }]);
  }, [person]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  async function onSend(e) {
    e.preventDefault();
    const q = input.trim();
    if (!q || loading) return;

    // 1) show USER message on the RIGHT (WhatsApp style)
    setMessages((m) => [...m, { id: uid(), side: "right", text: q }]);
    setInput("");
    setLoading(true);
    let urlHitting
    // console.log("person",person);
    //{name: 'Piyush Garg
    if(person.name.toLowerCase().includes("piyush"))
    {
      urlHitting = "/api/piyush";
    }else{
      urlHitting = "/api/hitesh";
    }

    try {
      const res = await fetch(urlHitting, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: person.id || person.name,
          prompt: q,
        }),
      });
    //   console.log("res", res.json);

      let reply = "Something went wrong. Please try again.";
      if (res.ok) {
        const data = await res.json();
        reply = data?.reply || reply;
      }

      // 2) show AI reply on the LEFT
      setMessages((m) => [...m, { id: uid(), side: "left", text: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { id: uid(), side: "left", text: "Network error. Check backend." }]);
    } finally {
      setLoading(false);
    }
  }

  function clickBackdrop(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={clickBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="persona-chat-title"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        {/* header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img src={person.image} alt={person.name} className="h-9 w-9 rounded-full ring-2 ring-white shadow" />
            <div>
              <p id="persona-chat-title" className="text-sm font-semibold">{person.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{person.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            aria-label="Close chat"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div ref={scrollRef} className="h-[60vh] overflow-y-auto bg-white p-4 dark:bg-slate-900">
          <div className="space-y-3">
            {messages.map((m) => (
              <Bubble key={m.id} side={m.side} avatar={m.side === "left" ? person.image : null}>
                {m.text}
              </Bubble>
            ))}

            {/* typing indicator on the LEFT (AI) */}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-sm text-slate-800 shadow dark:bg-slate-800 dark:text-slate-100">
                  <span className="inline-flex items-center gap-2">
                    <Dots /> Thinking…
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* footer / input */}
        <form onSubmit={onSend} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${person.name.split(" ")[0]}’s AI…`}
            className="flex-1 rounded-lg border border-slate-300 bg-white/90 px-3 py-2 text-sm ring-1 ring-inset ring-white/0 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900/60"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition hover:opacity-90 disabled:opacity-60"
          >
            <SendIcon className="h-4 w-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

/* --- small UI helpers --- */
function Bubble({ side = "left", avatar, children }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-end gap-2 ${isRight ? "flex-row-reverse" : ""}`}>
        {/* show avatar only for LEFT (AI / persona) */}
        {!isRight && avatar && (
          <img src={avatar} alt="" className="h-7 w-7 rounded-full ring-2 ring-white shadow" />
        )}
        <div
          className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
            isRight
              ? "rounded-tr-sm bg-indigo-600/90 text-white" // USER (right)
              : "rounded-tl-sm bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100" // AI (left)
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
function Dots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current/60 [animation-delay:-.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current/60" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current/60 [animation-delay:.2s]" />
    </span>
  );
}
function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M22 2l-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
