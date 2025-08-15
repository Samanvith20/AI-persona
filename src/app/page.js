// app/page.js
"use client"
import Image from "next/image";
import React,{ useState, useEffect} from "react";
import PersonaChatModal from "./_components/chatComponent";

export default function Home() {

  
const [openPerson, setOpenPerson] = useState(null);
function openChat(person) { setOpenPerson(person); }
function closeChat() { setOpenPerson(null); }
  // data: two-person array
  const PEOPLE = [
    {
      name: "Hitesh Choudhary",
      role: "Coding teacher & YouTuber",
      tagline: "retired from corporate and full time YouTuber, x founder of LCO (acquired), x CTO, Sr. Director at PW. 2 YT channels (1.01M & 721k), stepped into 43 countries",
      image: "https://avatars.githubusercontent.com/u/11613311?v=4",
      link: "https://hitesh.ai/",
      description:"hi`I am Hitesh choudhary ,Retired corporate and full time mentor.How can I help you today? "
    },
    { 
      
      name: "Piyush Garg",
      role: "Software engineer & educator",
      tagline: "Building Teachyst - Platform for educators and creators | YouTuber | Educator",
      image:
        "https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Favatar.png&w=640&q=75",
      link: "https://www.piyushgarg.dev/",
      description:"hi`I am Piyush Garg ,Software engineer and educator. How can I help you today? "
    },
  ];

  return (
    <div
      id="top"
      className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100"
    >

      {openPerson && (
  <PersonaChatModal person={openPerson} onClose={closeChat} />
)}

      {/* HERO */}
      <header className="relative overflow-hidden">
        {/* background layers */}
        <div aria-hidden className="absolute inset-0">
          {/* base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-600" />
          {/* spotlight */}
          <div className="absolute inset-0 [background-image:radial-gradient(1000px_600px_at_50%_-10%,rgba(255,255,255,.25),transparent)]" />
          {/* subtle grid with edge fade */}
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(64rem_32rem_at_center,black,transparent)]" />
          {/* soft bloom at bottom */}
          <div className="absolute -inset-x-10 -bottom-40 h-64 rounded-[50%] bg-white/20 blur-3xl" />
        </div>

        {/* content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[70vh] place-items-center py-24 sm:py-32 text-center">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/30 backdrop-blur">
                ✦ Dual-Persona AI for builders
              </p>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                Chat with{" "}
                <span className="underline decoration-white/70 underline-offset-8">
                  two brilliant software engineers
                </span>
              </h1>

              <p className="mt-6 text-lg leading-7 text-white/90">
                A dual-persona AI that pairs complementary senior engineers to
                tackle your toughest build questions. Pragmatic,
                production-ready answers—architecture, APIs, performance,
                DevOps, testing, and more.
              </p>

              <p className="mt-3 text-sm text-white/80">
                Two perspectives. One clear path forward.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#people"
                  className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5"
                >
                  Meet the personas
                </a>
                <a
                  href="#info"
                  className="rounded-lg bg-white/0 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/40 backdrop-blur transition hover:bg-white/10"
                >
                  How it works
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="people" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TWO PERSON CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-2">
          {PEOPLE.map((p) => (
            <article
              key={p.name}
               onClick={() => openChat(p)} 
              className="group rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800/60 dark:ring-slate-700"
            >
              <div className="flex items-start gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                 
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {p.role}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {p.tagline}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ring-1 ring-slate-300 transition hover:bg-slate-50 dark:ring-slate-600 dark:hover:bg-slate-800"
                >
                  <LinkIcon className="h-4 w-4" />
                  Profile
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* “GOOD INFO” SECTION */}
        <section
          id="info"
          aria-labelledby="info-title"
          className="py-16 sm:py-20"
        >
          <h2 id="info-title" className="text-2xl font-bold sm:text-3xl">
            How to use the Persona
          </h2>

          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <li className="group relative">
              {/* glow on hover */}
              <div
                aria-hidden
                className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/40 via-violet-500/40 to-cyan-500/40 opacity-0 blur transition duration-300 group-hover:opacity-100"
              />
              <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-start gap-3">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white ring-1 ring-black/5 shadow">
                    {/* UserGroup icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden
                    >
                      <path
                        d="M16 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm5 10c0-2.8-4-4-8-4s-8 1.2-8 4v1h16v-1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                      Step 1
                    </p>
                    <p className="mt-1 text-base font-semibold">
                      Pick a person
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Click one of the two engineer cards in{" "}
                  <a
                    href="#people"
                    className="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-600"
                  >
                    Meet the personas
                  </a>
                  . The chat opens in their unique style and expertise.
                </p>
              </div>
            </li>

            {/* Card 2 */}
            <li className="group relative">
              <div
                aria-hidden
                className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/40 via-violet-500/40 to-cyan-500/40 opacity-0 blur transition duration-300 group-hover:opacity-100"
              />
              <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-start gap-3">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white ring-1 ring-black/5 shadow">
                    {/* ChatBubble icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden
                    >
                      <path
                        d="M5 17l-1 4 4-1h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 9h8M8 13h5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                      Step 2
                    </p>
                    <p className="mt-1 text-base font-semibold">
                      Ask anything technical
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Describe your problem or goal. Example prompts:
                </p>

                {/* prompt chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                    Design a scalable auth flow
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                    Why is my Next.js route 500?
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                    Postgres vs Dynamo for events?
                  </span>
                </div>
              </div>
            </li>

            {/* Card 3 */}
            <li className="group relative">
              <div
                aria-hidden
                className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/40 via-violet-500/40 to-cyan-500/40 opacity-0 blur transition duration-300 group-hover:opacity-100"
              />
              <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-start gap-3">
                  <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-white ring-1 ring-black/5 shadow">
                    {/* Switch/Compare icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden
                    >
                      <path
                        d="M7 8h10M7 16h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 4l-2 4 2 4M15 12l2 4-2 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                      Step 3
                    </p>
                    <p className="mt-1 text-base font-semibold">
                      Compare perspectives (optional)
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Switch personas anytime or ask both to weigh in. You’ll get
                  two answers in their distinct voices—perfect for trade-off
                  decisions.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-1">
            <div className="rounded-xl bg-white p-6 dark:bg-slate-900">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                TL;DR: Choose a person, ask your question, and the AI replies in
                that engineer’s tone and approach. Switch or invite both for a
                quick “pair review.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="#people"
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-black/5 transition hover:opacity-90"
                >
                  Choose a persona
                </a>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ring-1 ring-slate-300 transition hover:bg-slate-50 dark:ring-slate-600 dark:hover:bg-slate-800"
                >
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* --- tiny inline icons (no extra deps) --- */
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path
        d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 0 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path
        d="M9 15l6-6M8 5h7a4 4 0 0 1 0 8h-1m-5 6H7a4 4 0 0 1 0-8h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function RocketIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path
        d="M14 4l6 6-5 5-3-3-5 5-3-3 5-5-3-3 6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
