import Link from "next/link";
import { ControlRail } from "../_components/control-rail";
import { Panel } from "../../_components/panel";

const TEMPLATE_CATEGORIES = [
  {
    title: "Performance blocks",
    detail: "Strength, power, and accessory waves crafted by the coaching collective.",
  },
  {
    title: "Conditioning ladders",
    detail: "Run, ride, and mixed-modal sessions with auto-scaled heart-rate zones.",
  },
  {
    title: "Recovery protocols",
    detail: "Soft tissue care, breathwork, and sleep stacks backed by sports science.",
  },
];

const FAVORITES = [
  {
    name: "Force Phase 2",
    focus: "4-week velocity block",
    rating: "4.9",
  },
  {
    name: "Altitude Engine",
    focus: "Endurance + strength hybrid",
    rating: "4.8",
  },
  {
    name: "Reset 72",
    focus: "Recovery and mobility sprint",
    rating: "5.0",
  },
];

const HIGHLIGHTS = [
  {
    label: "Live templates",
    value: "128",
    helper: "Curated by Fit Space coaches",
  },
  {
    label: "Average rating",
    value: "4.87",
    helper: "Across active client usage",
  },
  {
    label: "Auto-sync",
    value: "24h",
    helper: "Update frequency for adjustments",
  },
];

export default function TemplatesPage() {
  return (
    <div className="flex min-h-full flex-col gap-12 bg-[var(--color-surface)] px-6 py-10 text-sm text-[color:var(--color-text-secondary)] lg:px-12 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row">
        <ControlRail />
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[var(--color-shell)]/80 px-8 py-12 shadow-[0_40px_120px_-45px_rgba(12,15,24,0.8)] backdrop-blur-2xl lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-36 left-1/4 h-72 w-72 rounded-full bg-[var(--color-accent-blue)]/40 blur-[140px]" />
          <div className="absolute -bottom-36 right-[18%] h-80 w-80 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[150px]" />
          <div className="absolute inset-x-10 inset-y-8 rounded-[2.5rem] border border-white/10 opacity-30" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Template studio
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                Updated 3 minutes ago
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                Deploy elite programs with version control and instant sync
              </h1>
              <p className="max-w-2xl text-base">
                The library learns from results across the network. Duplicate, remix, or ship templates in seconds while
                auto-messaging clients about upgrades.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/coaches/templates/new"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90"
              >
                Create template
              </Link>
              <Link
                href="/coaches/clients"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--color-accent-blue)] transition hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10"
              >
                Assign to roster
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-yellow)]" />
                Tracks revisions + notes
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]"
                >
                  <span className="text-[11px] uppercase tracking-[0.5em] text-white/60">{item.label}</span>
                  <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-xs text-white/60">{item.helper}</p>
                  <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.7rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
                </div>
              ))}
            </div>
          </div>
          <aside className="relative flex h-full flex-col gap-5 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
              <div className="absolute -top-12 left-1/4 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[130px]" />
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--color-text-primary)]">
              <p className="font-semibold uppercase tracking-[0.45em]">Most saved</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Network</span>
            </div>
            <div className="space-y-4 text-sm">
              {FAVORITES.map((template) => (
                <article
                  key={template.name}
                  className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">{template.name}</h3>
                    <span className="text-xs text-white/60">{template.rating} *</span>
                  </div>
                  <p className="mt-2 text-xs text-white/60">{template.focus}</p>
                  <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.6rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
                </article>
              ))}
            </div>
            <Link
              href="/coaches/templates/browse"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              Browse library
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </aside>
        </div>
      </section>
      </div>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-12 top-12 h-48 w-48 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[130px]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {TEMPLATE_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70"
            >
              <span className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Category</span>
              <p className="mt-3 text-base font-semibold text-white">{category.title}</p>
              <p className="mt-2 text-sm text-white/60">{category.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}