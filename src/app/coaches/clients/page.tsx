import Link from "next/link";
import { ControlRail } from "../_components/control-rail";
import { Panel } from "../../_components/panel";

const CLIENT_SIGNALS = [
  {
    title: "Retention pulse",
    detail: "91% of at-risk clients were flagged early thanks to readiness dips and missed check-ins.",
  },
  {
    title: "Program velocity",
    detail: "Auto-progressions moved 37 clients into new phases after streak milestones were met.",
  },
  {
    title: "Feedback heatmap",
    detail: "Nutrition notes spiked on travel weeks, prompting three tailored meal prep guides.",
  },
];

const ONBOARDING_STEPS = [
  {
    title: "Intake sync",
    description: "Collect goals, constraints, and health markers; AI pre-fills the client dossier within minutes.",
  },
  {
    title: "Program pairing",
    description: "Match each athlete with a coach signature stack or curated template blend based on priorities.",
  },
  {
    title: "Launch window",
    description: "Share plans, habits, and accountability cadences—clients confirm availability in one tap.",
  },
];

const SPOTLIGHTS = [
  {
    label: "Conversion",
    value: "64%",
    helper: "Warm leads converted this week",
  },
  {
    label: "Check-in score",
    value: "4.8",
    helper: "Average quality rating",
  },
  {
    label: "Recovery nudges",
    value: "126",
    helper: "Auto-scheduled breathwork + mobility",
  },
];

export default function ClientsPage() {
  return (
    <div className="flex min-h-full flex-col gap-12 bg-[var(--color-surface)] px-6 py-10 text-sm text-[color:var(--color-text-secondary)] lg:px-12 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row">
        <ControlRail />
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[var(--color-shell)]/80 px-8 py-12 shadow-[0_40px_120px_-45px_rgba(12,15,24,0.8)] backdrop-blur-2xl lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[var(--color-accent-blue)]/40 blur-[140px]" />
          <div className="absolute -bottom-36 right-[22%] h-80 w-80 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[150px]" />
          <div className="absolute inset-x-10 inset-y-8 rounded-[2.5rem] border border-white/10 opacity-30" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Client intelligence
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                1,284 active rosters
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                42 cohorts in motion
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                Keep every client on rhythm without manual spreadsheets
              </h1>
              <p className="max-w-2xl text-base">
                Centralise rosters, readiness, and feedback into a single adaptive stream. The platform nudges when someone
                drifts so coaches can respond with precision instead of paperwork.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/coaches/groups"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90"
              >
                Build a cohort
              </Link>
              <Link
                href="/coaches/templates"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--color-accent-blue)] transition hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10"
              >
                Open template library
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-yellow)]" />
                Live sync with coach assignments
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {SPOTLIGHTS.map((spotlight) => (
                <div
                  key={spotlight.label}
                  className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]"
                >
                  <span className="text-[11px] uppercase tracking-[0.5em] text-white/60">{spotlight.label}</span>
                  <p className="mt-4 text-3xl font-semibold text-white">{spotlight.value}</p>
                  <p className="mt-2 text-xs text-white/60">{spotlight.helper}</p>
                  <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.7rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
                </div>
              ))}
            </div>
          </div>
          <aside className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
              <div className="absolute -top-12 left-1/3 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[130px]" />
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--color-text-primary)]">
              <p className="font-semibold uppercase tracking-[0.45em]">Signal feed</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Realtime</span>
            </div>
            <div className="space-y-4 text-sm">
              {CLIENT_SIGNALS.map((signal) => (
                <article
                  key={signal.title}
                  className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-5"
                >
                  <h3 className="text-base font-semibold text-white">{signal.title}</h3>
                  <p className="mt-2 text-xs text-white/60">{signal.detail}</p>
                  <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.6rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
                </article>
              ))}
            </div>
            <Link
              href="/reports/clients"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              View full analytics
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </aside>
        </div>
      </section>
      </div>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-12 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[140px]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Lifecycle</p>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Guided onboarding</h2>
            </div>
            <ul className="relative grid gap-5 border-l border-white/10 pl-6">
              {ONBOARDING_STEPS.map((step) => (
                <li key={step.title} className="relative rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-5">
                  <span className="absolute -left-[25px] top-6 inline-flex h-3 w-3 rounded-full border border-white/20 bg-[var(--color-accent-blue)]" />
                  <p className="text-base font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-sm text-white/70">{step.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-yellow)]">Playbook</p>
            <h3 className="mt-3 text-lg font-semibold text-white">Automation assists</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Auto-schedule follow-ups</p>
                <p className="mt-1 text-white/60">Engage clients 48 hours before a planned deload or travel block.</p>
              </li>
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Dynamic habit loops</p>
                <p className="mt-1 text-white/60">Swap recovery drills or hydration nudges depending on readiness trends.</p>
              </li>
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Coach alerts</p>
                <p className="mt-1 text-white/60">Ping lead coaches when client sentiment drops below baseline.</p>
              </li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}