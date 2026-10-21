import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import photo from "@/assets/rachit.jpg.asset.json";
import cert from "@/assets/cert.jpg.asset.json";
import { getGithub, GITHUB_USER } from "@/lib/github.functions";
import { Cursor, Magnetic, Parallax, Reveal, ScrollProgress, SmoothScroll, SplitText, TiltCard, haptic } from "@/components/fx";

const LINKEDIN = "https://www.linkedin.com/in/rachit-manaktala-569a45424";
const GITHUB = `https://github.com/${GITHUB_USER}`;
const EMAIL = "rachit.manaktala@gmail.com";

const githubQuery = queryOptions({ queryKey: ["github"], queryFn: () => getGithub(), staleTime: 60_000 });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rachit Manaktala — AI Student, Builder & Musician" },
      { name: "description", content: "Portfolio of Rachit Manaktala: B.Sc. Artificial Intelligence student at Symbiosis, full-stack builder and guitarist." },
      { property: "og:title", content: "Rachit Manaktala — Portfolio" },
      { property: "og:description", content: "AI student, builder, fundraiser and musician from Gurgaon." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(githubQuery),
  component: Index,
});

const skills = ["Python", "Java", "SQL", "MySQL", "Full-stack", "VS Code", "GitHub", "Google Colab", "PowerShell", "Prompt engineering", "LLMs", "Claude", "Codex", "Antigravity", "Google AI Studio", "Perplexity", "Lovable", "Midjourney", "Startup pitching", "Fundraising", "Shopify", "Ad automation"];

const experience = [
  { year: "Sep 2025", role: "Fundraising & Food Donation Organizer", org: "Psych Cura · Gurgaon", text: "Organised a fundraiser with live guitar, painting and Polaroid photography, promoted through Instagram posts and ads. Funds bought meals for people in need — 50–60 people involved." },
  { year: "Jun 2025", role: "Intern", org: "Fortis Healthcare · Gurgaon", text: "Exposure to psychology fieldwork across healthcare, marketing and AI." },
  { year: "Now", role: "Event Management & Outreach", org: "Rotaract Club (college division)", text: "Planning events and community outreach." },
  { year: "Now", role: "AI Literacy & Publications", org: "College AI Club", text: "Helping peers understand and write about AI." },
];

const achievements = [
  "Multiple interschool band competition wins as guitarist",
  "Awards in long jump and 400 m relay",
  "Smart India Hackathon · IIT Bombay Techfest · SIT Buildathon",
];

function Index() {
  const { data: gh } = useSuspenseQuery(githubQuery);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.15]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);
  const [open, setOpen] = useState(false);

  return (
    <div className="grain relative cursor-auto overflow-x-clip md:cursor-none">
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm">
          <a href="#top" className="font-black tracking-tight">RM.</a>
          <div className="flex gap-6 text-secondary">
            {["about", "work", "achievements", "contact"].map((s) => (
              <a key={s} href={`#${s}`} onClick={() => haptic(6)} className="capitalize transition-colors hover:text-primary">{s}</a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-screen flex-col justify-end px-6 pb-16 pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-x-0 top-24 mx-auto w-[min(70vw,380px)] overflow-hidden rounded-md">
            <motion.img
              src={photo.url}
              alt="Portrait of Rachit Manaktala"
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.3 }}
              animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              className="aspect-[4/5] w-full object-cover grayscale-[35%]"
            />
          </motion.div>
          <h1 className="text-display relative">
            <SplitText text="Rachit Manaktala" />
          </h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="relative mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-secondary">B.Sc. Artificial Intelligence student — technical development, entrepreneurship and community outreach. Gurgaon, India.</p>
            <div className="flex gap-3">
              <Magnetic><a className="btn-primary" href="#contact">Get in touch</a></Magnetic>
              <Magnetic><a className="btn-secondary" href="#work">See work</a></Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y py-6">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-headline text-secondary">
          {[...skills, ...skills].map((s, i) => <span key={i}>{s} <span className="text-border">✦</span></span>)}
        </div>
      </div>

      {/* About */}
      <section id="about" className="section-gap px-6">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal><p className="text-sm text-secondary">(01) About me</p></Reveal>
          <div className="space-y-16">
            <Reveal>
              <p className="text-headline">First-year AI student drawn to programming, full-stack development, AI-assisted tools and entrepreneurship — with a background in healthcare exposure, community fundraising, startup pitches and live music.</p>
            </Reveal>
            <Reveal>
              <h3 className="mb-6 text-sm text-secondary">Education</h3>
              <div className="divide-y border-y">
                <Row a="Symbiosis Institute of Artificial Intelligence" b="B.Sc. AI · 2026–2030" />
                <Row a="St. Xavier's High School" b="CBSE XII · 2026 · 87%" />
              </div>
            </Reveal>
            <Reveal>
              <h3 className="mb-6 text-sm text-secondary">Experience & leadership</h3>
              <div className="divide-y border-y">
                {experience.map((e) => (
                  <div key={e.role} data-hover className="group grid gap-2 py-6 transition-colors md:grid-cols-[100px_1fr]">
                    <span className="text-sm text-secondary">{e.year}</span>
                    <div>
                      <p className="text-lg font-bold transition-transform duration-500 group-hover:translate-x-2">{e.role}</p>
                      <p className="text-sm text-secondary">{e.org}</p>
                      <p className="mt-2 max-w-prose text-secondary">{e.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <h3 className="mb-6 text-sm text-secondary">Skills</h3>
              <div className="flex flex-wrap gap-2">{skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </Reveal>
            <Reveal>
              <h3 className="mb-6 text-sm text-secondary">Beyond code</h3>
              <div className="grid gap-6 text-secondary sm:grid-cols-2">
                <p><span className="font-bold text-primary">Music —</span> guitar, drums, tabla, percussion; live band performances.</p>
                <p><span className="font-bold text-primary">Sport —</span> Tuffman Marathon, long jump, 400 m relay, sprinting, cricket, powerlifting.</p>
                <p><span className="font-bold text-primary">Languages —</span> English & Hindi (fluent); Japanese & French (3 years each).</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work (live GitHub) */}
      <section id="work" className="section-gap border-t px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-sm text-secondary">(02) Work — live from GitHub</p>
              <h2 className="text-headline">Things I'm building</h2>
            </div>
            {gh.profile && <p className="text-sm text-secondary">{gh.profile.public_repos} public repos · {gh.profile.followers} followers</p>}
          </Reveal>
          {gh.repos.length === 0 ? (
            <p className="text-secondary">New projects will appear here as soon as they're pushed to <a className="text-primary underline" href={GITHUB}>GitHub</a>.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {gh.repos.map((r, i) => (
                <Reveal key={r.name} delay={(i % 3) * 0.08}>
                  <TiltCard className="h-full">
                    <a href={r.html_url} target="_blank" rel="noreferrer" onClick={() => haptic([8, 20, 8])} className="flex h-full flex-col justify-between gap-8 rounded-md border bg-card p-4 transition-colors hover:bg-surface">
                      <div>
                        <p className="font-bold">{r.name}</p>
                        <p className="mt-2 text-sm text-secondary">{r.description ?? "No description yet."}</p>
                      </div>
                      <div className="flex justify-between text-xs text-secondary">
                        <span>{r.language ?? "—"}</span>
                        <span>★ {r.stargazers_count} · {new Date(r.updated_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                      </div>
                    </a>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="section-gap border-t px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal><p className="mb-16 text-sm text-secondary">(03) Achievements & certificates</p></Reveal>
          <div className="grid items-center gap-16 md:grid-cols-2">
            <Parallax offset={50}>
              <button onClick={() => { haptic(12); setOpen(true); }} className="block w-full overflow-hidden rounded-md border" data-hover>
                <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.8 }} src={cert.url} alt="PsychCura volunteer certificate of completion of tenure" className="w-full" />
              </button>
              <p className="mt-4 text-sm text-secondary">Volunteering — Certificate of Completion of Tenure, PsychCura. Signed by founders Paakhi Gupta & Aarshi Sharma.</p>
            </Parallax>
            <div className="divide-y border-y">
              {achievements.map((a, i) => (
                <Reveal key={a} delay={i * 0.08}>
                  <div className="flex gap-6 py-6"><span className="text-sm text-secondary">0{i + 1}</span><p className="text-lg font-bold">{a}</p></div>
                </Reveal>
              ))}
              <Reveal>
                <div className="flex gap-6 py-6"><span className="text-sm text-secondary">04</span><p className="text-lg font-bold">Internship — Fortis Healthcare, Gurgaon (Jun 2025)</p></div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-gap border-t px-6">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal><p className="mb-8 text-sm text-secondary">(04) Contact</p></Reveal>
          <Reveal><a href={`mailto:${EMAIL}`} onClick={() => haptic([10, 40, 10])} className="text-display block break-all transition-colors hover:text-secondary">Let's talk.</a></Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Magnetic><a className="btn-primary" href={`mailto:${EMAIL}`}>Email</a></Magnetic>
              <Magnetic><a className="btn-secondary" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></Magnetic>
              <Magnetic><a className="btn-secondary" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-sm text-secondary">
        <div className="mx-auto flex max-w-6xl justify-between"><span>© 2026 Rachit Manaktala</span><span>Gurgaon, India</span></div>
      </footer>

      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-6">
          <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={cert.url} alt="PsychCura certificate enlarged" className="max-h-full max-w-full rounded-md" />
        </motion.div>
      )}
    </div>
  );
}

function Row({ a, b }: { a: string; b: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 py-5">
      <span className="font-bold">{a}</span>
      <span className="text-secondary">{b}</span>
    </div>
  );
}
