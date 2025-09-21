import Link from "next/link";
import { ControlRail } from "../_components/control-rail";
import { Panel } from "../../_components/panel";

const SCHEDULE_SIGNALS = [
  {
    title: "Load balance",
    detail: "Morning sessions are 82% full while late evenings still have 40 available slots.",
  },
  {
    title: "Coach coverage",
    detail: "Three coaches are double-booked Thursday; auto-routing suggested relief assignments.",
  },
  {
    title: "Facility sync",
    detail: "Recovery lab at Midtown is offline Friday—affected sessions already moved to uptown.",
  },
];

const ACTIONS = [
  {
    label: "Auto-hold",
    body: "Reserve buffers around key athletes so you can process feedback before the next block.",
  },
  {
    label: "Travel mode",
    body: "Shift remote clients to digital sessions with timezone-aware reminders in one click.",
  },
  {
    label: "Bulk edit",
    body: "Drag-select a cohort to update coach assignments, room locations, and equipment demands.",
  },
];

export default function CalendarPage() {
  return (
    <div className="flex min-h-full flex-col gap-12 bg-[var(--color-surface)] px-6 py-10 text-sm text-[color:var(--color-text-secondary)] lg:px-12 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row">
        <ControlRail />
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[var(--color-shell)]/80 px-8 py-12 shadow-[0_40px_120px_-45px_rgba(12,15,24,0.8)] backdrop-blur-2xl lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-36 left-1/3 h-72 w-72 rounded-full bg-[var(--color-accent-blue)]/40 blur-[140px]" />
          <div className="absolute -bottom-36 right-[18%] h-80 w-80 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[150px]" />
          <div className="absolute inset-x-10 inset-y-8 rounded-[2.5rem] border border-white/10 opacity-30" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Calendar intelligence
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                318 sessions this week
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                See the entire coaching network in one adaptive view
              </h1>
              <p className="max-w-2xl text-base">
                Studio, remote, and travel sessions align automatically. Drag, drop, and the system recalculates coach load,
                room capacity, and client notifications instantly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/coaches/chats"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90"
              >
                Notify clients
              </Link>
              <Link
                href="/coaches/groups"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--color-accent-blue)] transition hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10"
              >
                Manage cohorts
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-yellow)]" />
                Syncs with external calendars
              </span>
            </div>
          </div>
          <aside className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
              <div className="absolute -top-12 left-1/4 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[130px]" />
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--color-text-primary)]">
              <p className="font-semibold uppercase tracking-[0.45em]">Alerts</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Auto</span>
            </div>
            <div className="space-y-4 text-sm">
              {SCHEDULE_SIGNALS.map((signal) => (
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
              href="/reports/scheduling"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              View utilisation report
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </aside>
        </div>
      </section>
      </div>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[130px]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {ACTIONS.map((action) => (
            <div
              key={action.label}
              className="rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70"
            >
              <span className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">{action.label}</span>
              <p className="mt-3 text-sm text-white/60">{action.body}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}