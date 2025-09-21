"use client";

import Link from "next/link";
import { ControlRail } from "./_components/control-rail";
import { Panel } from "../_components/panel";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoaches } from "@/lib/api";
import type { CoachSummary } from "@/lib/types";

const loadingRows = Array.from({ length: 5 });

const COMMAND_SIGNALS = [
  {
    title: "Load readiness",
    detail: "Neural freshness trending +6% week over week across the pro roster.",
  },
  {
    title: "Coach coverage",
    detail: "Additional support needed Thursday afternoon; auto-routes are staged for review.",
  },
  {
    title: "Revenue pulse",
    detail: "Earned today is up 27% after launching the hybrid strength cohort offer.",
  },
];





export default function CoachesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["coaches"],
    queryFn: getCoaches,
  });

  const coaches = useMemo(() => data ?? [], [data]);
  const rosterSize = coaches.length;
  const uniqueSpecializations = useMemo(() => {
    const set = new Set<string>();
    coaches.forEach((coach) => set.add(coach.specialization));
    return set.size;
  }, [coaches]);

  const statBlocks = useMemo(
    () => [
      {
        label: "Revenue",
        value: "$876.00",
        helper: "+17% vs last week",
        accent: "from-[rgba(89,215,255,0.25)] to-[rgba(89,215,255,0.05)]",
      },
      {
        label: "Service revenue",
        value: "$435.00",
        helper: "$355.00 sessions + $80.00 add-ons",
        accent: "from-[rgba(243,255,71,0.25)] to-[rgba(89,215,255,0.05)]",
      },
      {
        label: "Earned today",
        value: "$344.00",
        helper: "+27% day over day",
        accent: "from-[rgba(255,255,255,0.2)] to-[rgba(89,215,255,0.05)]",
      },
    ],
    [],
  );

  return (
    <div className="flex min-h-full flex-col gap-12 bg-[var(--color-surface)] px-6 py-10 text-sm text-[color:var(--color-text-secondary)] lg:px-12 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row">
        <ControlRail />
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[var(--color-shell)]/80 px-8 py-12 shadow-[0_40px_120px_-45px_rgba(12,15,24,0.8)] backdrop-blur-2xl lg:px-16 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-36 left-[18%] h-72 w-72 rounded-full bg-[var(--color-accent-blue)]/40 blur-[140px]" />
          <div className="absolute -bottom-40 right-[22%] h-80 w-80 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[150px]" />
          <div className="absolute inset-x-8 inset-y-8 rounded-[2.5rem] border border-white/10 opacity-30" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.9fr]">
          <div className="space-y-10">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Coaching network OS
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                {rosterSize.toString().padStart(2, "0")} active coaches
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                {uniqueSpecializations.toString().padStart(2, "0")} specialities
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                Coach operations, automated and in sync
              </h1>
              <p className="max-w-2xl text-base">
                Monitor performance, spin up programmes, and keep every coach aligned with live revenue signals. Bring your
                roster, we keep the operating rhythm adaptive.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryLink href="/coaches/new">Add a coach</PrimaryLink>
              <GhostLink href="/recommendations">Build a client roster</GhostLink>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-yellow)]" />
                Syncing payouts nightly
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {statBlocks.map((block) => (
                <MetricCard key={block.label} {...block} />
              ))}
            </div>
          </div>

          <aside className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.75rem] border border-white/10 bg-[var(--color-panel)]/40 p-7 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
              <div className="absolute -top-20 left-12 h-64 w-64 rounded-full bg-[var(--color-accent-blue)]/35 blur-[130px]" />
              <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[130px]" />
            </div>
            <div className="flex items-center justify-between text-[var(--color-text-primary)]">
              <p className="text-sm font-semibold uppercase tracking-[0.45em]">Command center</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Auto-calibrated</span>
            </div>
            <p className="text-sm text-white/70">
              Every roster touchpoint streams into one adaptive board so coaches stay in lockstep.
            </p>
            <div className="space-y-4 text-sm">
              {COMMAND_SIGNALS.map((signal) => (
                <div
                  key={signal.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4"
                >
                  <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent-blue)]">{signal.title}</span>
                  <p className="mt-2 text-sm text-white/80 transition-colors group-hover:text-white">{signal.detail}</p>
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
          </aside>
        </div>
      </section>
      </div>

      <div className="grid gap-10 xl:grid-cols-[1.25fr_0.85fr]">
        <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-7 py-8 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)]">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-8 top-6 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
            <div className="absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[140px]" />
          </div>
          <div className="flex flex-col gap-6 text-sm">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Schedule</p>
                <h2 className="text-xl font-semibold text-white">Roster alignment</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-yellow)]" />
                This week
              </span>
            </header>
            <div className="divide-y divide-white/10">
              {isLoading
                ? loadingRows.map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5"
                    >
                      <div className="h-11 w-11 rounded-2xl bg-white/5" />
                      <div className="space-y-2">
                        <div className="h-4 w-40 rounded-full bg-white/10" />
                        <div className="h-3 w-24 rounded-full bg-white/10" />
                      </div>
                      <div className="h-8 w-24 rounded-full bg-white/10" />
                    </div>
                  ))
                : coaches.map((coach) => (
                    <RosterRow key={coach.id} coach={coach} />
                  ))}
            </div>
          </div>
        </Panel>

        <Panel className="relative flex h-full flex-col gap-6 overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-7 py-8 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)]">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/3 top-0 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
            <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[140px]" />
          </div>
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-yellow)]">Client stream</p>
              <h3 className="text-lg font-semibold text-white">Live activity</h3>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">All teams</span>
          </header>
          <ActivityFeed />
          <div className="mt-auto grid gap-4 rounded-[1.8rem] border border-white/10 bg-black/30 px-6 py-6 text-xs text-white/70">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-blue)]">Completion</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">
                +6% vs yesterday
              </span>
            </div>
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-[var(--color-accent-blue)]/50 text-2xl font-semibold text-[var(--color-accent-blue)]">
              71%
            </div>
            <button className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20">
              View breakdown
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  accent,
}: {
  label: string;
  value: string;
  helper: string;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]">
      <div className={`absolute inset-0 scale-[0.98] rounded-[1.7rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50 bg-gradient-to-br ${accent}`} />
      <p className="text-[11px] uppercase tracking-[0.5em] text-[color:var(--color-text-secondary)]">{label}</p>
      <p className="relative mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="relative mt-2 text-xs text-[color:var(--color-text-secondary)]">{helper}</p>
    </div>
  );
}

function RosterRow({ coach }: { coach: CoachSummary }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-sm text-white/70">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xs font-semibold text-[var(--color-accent-yellow)]">
        {coach.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{coach.name}</p>
        <p className="text-xs text-white/60">{coach.specialization}</p>
      </div>
      <Link
        href={`/coaches/${coach.id}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
      >
        View schedule
        <span aria-hidden="true">-&gt;</span>
      </Link>
    </div>
  );
}

function ActivityFeed() {
  const feed = [
    {
      name: "Mark Smith",
      activity: "Pinned a 6-week hypertrophy block",
      time: "15m",
    },
    {
      name: "Sarah Perry",
      activity: "Shared 4 progress photos across Team Alpha",
      time: "1h",
    },
    {
      name: "Lukas Tapia",
      activity: "Uploaded day-recap video and session notes",
      time: "2h",
    },
  ];

  return (
    <div className="space-y-5 text-sm text-white/70">
      {feed.map(({ name, activity, time }) => (
        <div key={name} className="group relative flex items-start gap-4 rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent-blue)]/60 to-white/10 text-xs font-semibold text-white/80">
            {name[0]}
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="mt-1 text-xs text-white/60">{activity}</p>
          </div>
          <span className="text-[11px] text-white/50">{time}</span>
          <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.6rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
        </div>
      ))}
      <button className="mt-2 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20">
        View all activity
      </button>
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

