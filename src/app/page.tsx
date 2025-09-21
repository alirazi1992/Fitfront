import Link from "next/link";
import { Panel } from "./_components/panel";

const METRICS = [
  {
    label: "Active coaches",
    value: "42",
    helper: "Verified this week",
    valueClass: "text-[var(--color-accent-blue)]",
    glowClass: "bg-[linear-gradient(135deg,rgba(89,215,255,0.25),rgba(89,215,255,0.05))]",
  },
  {
    label: "Partner gyms",
    value: "68",
    helper: "Across 12 cities",
    valueClass: "text-[var(--color-accent-yellow)]",
    glowClass: "bg-[linear-gradient(135deg,rgba(243,255,71,0.3),rgba(89,215,255,0.05))]",
  },
  {
    label: "Average rating",
    value: "4.9",
    helper: "Based on client reviews",
    valueClass: "text-white",
    glowClass: "bg-[linear-gradient(135deg,rgba(255,255,255,0.25),rgba(89,215,255,0.05))]",
  },
];

const QUICK_ACTIONS = [
  {
    title: "Find a coach",
    description:
      "Tell us how you train, and the engine assembles a roster calibrated to your goals, budget, and travel radius.",
    href: "/recommendations",
  },
  {
    title: "Explore gyms",
    description:
      "Filter hubs by atmosphere, equipment, recovery labs, and peak hours so you only surface the spaces that fit.",
    href: "/gyms",
  },
  {
    title: "Coach workspace",
    description:
      "Spin up a shared control room where plans, comms, and highlights live in one continuously updating stream.",
    href: "/coaches",
  },
];

const TIMELINE = [
  {
    title: "Coach onboarding",
    detail:
      "Identity verified, specialties tagged, and inventory connected so athletes match with precision.",
  },
  {
    title: "Client discovery",
    detail:
      "Athletes chart intent, constraints, and recovery needs, and our graph delivers curated recommendations instantly.",
  },
  {
    title: "Feedback loop",
    detail:
      "Real-time adjustments flow across teams while analytics highlight load, readiness, and retention spikes.",
  },
];

const SIGNALS = [
  {
    title: "Load readiness",
    detail: "Neural freshness trending +6% week over week across the pro roster.",
  },
  {
    title: "Gym capacity",
    detail: "Peak-hour congestion dropped 18% after automated slot balancing.",
  },
  {
    title: "Client momentum",
    detail: "47 athletes hit a 5-day streak, so programmes auto-progressed overnight.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col gap-12 bg-[var(--color-surface)] px-6 py-10 text-sm text-[color:var(--color-text-secondary)] lg:px-12 lg:py-16">
      <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[var(--color-shell)]/80 px-8 py-12 shadow-[0_40px_120px_-45px_rgba(12,15,24,0.8)] backdrop-blur-2xl lg:px-16 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-accent-blue)]/45 blur-[140px]" />
          <div className="absolute -bottom-32 right-24 h-80 w-80 rounded-full bg-[var(--color-accent-yellow)]/40 blur-[150px]" />
          <div className="absolute inset-x-10 inset-y-8 rounded-[2.5rem] border border-white/10 opacity-30" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-10">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.6em] text-[var(--color-accent-blue)]">
              <span className="relative inline-flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-blue)]/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-yellow)]" />
              </span>
              Fitness network OS
            </p>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                Build resilient bodies with a realtime coaching OS
              </h1>
              <p className="max-w-xl text-base text-[color:var(--color-text-secondary)]">
                Orchestrate coaches, gyms, and athletes inside a single adaptive workspace. Plans evolve automatically,
                availability syncs across locations, and every session feeds the next upgrade.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryLink href="/recommendations">Start my build</PrimaryLink>
              <GhostLink href="/coaches">Launch coach hub</GhostLink>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-blue)]" />
                Live sync across devices
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {METRICS.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </div>

          <div className="relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
              <div className="absolute -top-12 left-1/3 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[120px]" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-yellow)]">Command center</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                Auto-calibrated
              </span>
            </div>
            <p className="text-lg font-semibold text-[var(--color-text-primary)]">
              Every roster touchpoint streams into one adaptive board.
            </p>
            <div className="space-y-4">
              {SIGNALS.map((signal) => (
                <div
                  key={signal.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4"
                >
                  <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent-blue)]">
                    {signal.title}
                  </span>
                  <p className="mt-2 text-sm text-[color:var(--color-text-primary)]/80 group-hover:text-[color:var(--color-text-primary)]">
                    {signal.detail}
                  </p>
                  <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.3rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-xs text-white/70">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="h-8 w-8 rounded-full border border-white/20 bg-[var(--color-accent-blue)]/40" />
                  <span className="h-8 w-8 rounded-full border border-white/20 bg-[var(--color-accent-yellow)]/40" />
                  <span className="h-8 w-8 rounded-full border border-white/20 bg-white/30" />
                </div>
                <p>Teams viewing live</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-white">12</span>
            </div>
          </div>
        </div>
      </section>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-[var(--color-accent-blue)]/30 blur-[110px]" />
          <div className="absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[120px]" />
        </div>
        <div className="mb-10 flex flex-col gap-3 text-[color:var(--color-text-secondary)] lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-yellow)]">Choose your lane</p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              Drop-in workflows that feel native to your team
            </h2>
            <p className="max-w-2xl text-sm">
              Automations kick in the moment you launch. Each card is a curated flow with tailored onboarding and real-time
              assist.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
            Updated weekly with new playbooks
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {QUICK_ACTIONS.map((action, index) => (
            <article
              key={action.title}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-7 transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 scale-[0.98] rounded-[1.7rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
              <span className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">0{index + 1}</span>
              <p className="text-lg font-semibold text-white">{action.title}</p>
              <p className="text-sm leading-6 text-[color:var(--color-text-secondary)]">{action.description}</p>
              <Link
                href={action.href}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-blue)] transition group-hover:gap-3"
              >
                Start now
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </Panel>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-0 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[140px]" />
        </div>
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Platform rhythm</p>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            A loop that keeps athletes and coaches in lockstep
          </h2>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            From onboarding to iteration, every stage emits live data for instant feedback. The result: faster cycles, less
            guesswork, and stronger retention.
          </p>
          <ul className="relative grid gap-5 border-l border-white/10 pl-6">
            {TIMELINE.map((item) => (
              <li key={item.title} className="relative rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-5">
                <span className="absolute -left-[25px] top-6 inline-flex h-3 w-3 rounded-full border border-white/20 bg-[var(--color-accent-blue)]" />
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-sm shadow-[0_30px_70px_-45px_rgba(12,15,24,0.9)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-yellow)]">Roadmap</p>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              Private alpha
            </span>
          </div>
          <div className="space-y-4 text-sm text-[color:var(--color-text-secondary)]">
            <RoadmapItem
              title="Coach CRM"
              description="Unified profiles, contracts, and billing connected to live performance data."
            />
            <RoadmapItem
              title="Client portal"
              description="Athletes get adaptive plans, feedback loops, and recovery nudges in one feed."
            />
            <RoadmapItem
              title="Insight studio"
              description="Story-driven dashboards spotlight retention, readiness, and revenue swings."
            />
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-6 py-5 text-xs text-white/70">
            <p className="font-semibold uppercase tracking-[0.35em] text-[var(--color-accent-blue)]">Beta signal</p>
            <p className="mt-3 text-sm text-[color:var(--color-text-primary)]/80">
              Request access to pilot the upcoming release and co-create advanced automations with our product team.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  valueClass,
  glowClass,
}: {
  label: string;
  value: string;
  helper: string;
  valueClass: string;
  glowClass: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]">
      <div className={`absolute inset-0 scale-[0.98] rounded-[1.7rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50 ${glowClass}`} />
      <p className="text-[11px] uppercase tracking-[0.5em] text-[color:var(--color-text-secondary)]">{label}</p>
      <p className={`relative mt-4 text-3xl font-semibold ${valueClass}`}>{value}</p>
      <p className="relative mt-2 text-xs text-[color:var(--color-text-secondary)]">{helper}</p>
    </div>
  );
}

function RoadmapItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-5 py-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">{description}</p>
    </div>
  );
}

function PrimaryLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90"
    >
      {children}
    </Link>
  );
}

function GhostLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--color-accent-blue)] transition hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10"
    >
      {children}
    </Link>
  );
}
