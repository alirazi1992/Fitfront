"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Panel } from "../_components/panel";
import { getGyms } from "@/lib/api";
import type { GymSummary } from "@/lib/types";

const HIGHLIGHTS = [
  {
    title: "Recovery labs",
    description: "Cold plunges, compression suites, and guided mobility flows built into premium hubs.",
  },
  {
    title: "Smart scheduling",
    description: "Load-balancing automations release peak-hour slots and sync with coach availability instantly.",
  },
  {
    title: "Spatial analytics",
    description: "Heatmaps surface under-used zones so you can reconfigure rigs, turf, and cardio decks on the fly.",
  },
];

const loadingCards = Array.from({ length: 6 });

export default function GymsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["gyms"],
    queryFn: getGyms,
  });

  const gyms = useMemo(() => data ?? [], [data]);
  const gymCount = gyms.length;
  const primaryLocales = useMemo(() => {
    const locales = new Set<string>();
    gyms.forEach((gym) => {
      const city = gym.location.split(",")[0]?.trim();
      if (city) locales.add(city);
    });
    return Array.from(locales).slice(0, 3);
  }, [gyms]);

  return (
    <div className="flex min-h-full flex-col gap-12 bg-[var(--color-surface)] px-6 py-10 text-sm text-[color:var(--color-text-secondary)] lg:px-12 lg:py-16">
      <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[var(--color-shell)]/80 px-8 py-12 shadow-[0_40px_120px_-45px_rgba(12,15,24,0.8)] backdrop-blur-2xl lg:px-16 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/5 h-72 w-72 rounded-full bg-[var(--color-accent-blue)]/40 blur-[140px]" />
          <div className="absolute -bottom-36 right-[18%] h-80 w-80 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[150px]" />
          <div className="absolute inset-x-10 inset-y-8 rounded-[2.5rem] border border-white/10 opacity-30" />
        </div>
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-10">
            <p className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Gym atlas
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                {gymCount.toString().padStart(2, "0")} active hubs
              </span>
              {primaryLocales.length ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                  {primaryLocales.join(" � ")}
                </span>
              ) : null}
            </p>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                Discover where your next block should unfold
              </h1>
              <p className="max-w-2xl text-base">
                Explore gyms engineered for hybrid coaching. Each space lists coach rosters, recovery options, and peak-hour
                dynamics so you can align training environments with programme cycles.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryLink href="/recommendations">Find a coach nearby</PrimaryLink>
              <GhostLink href="/gyms/apply">List your gym</GhostLink>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-yellow)]" />
                Updated nightly with new capacity data
              </span>
            </div>
          </div>

          <div className="relative flex h-full flex-col gap-5 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
              <div className="absolute -top-12 left-1/3 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[130px]" />
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--color-text-primary)]">
              <p className="font-semibold uppercase tracking-[0.45em]">On the radar</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">
                Insider feed
              </span>
            </div>
            <div className="space-y-4 text-sm">
              {HIGHLIGHTS.map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-5"
                >
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs text-white/60">{item.description}</p>
                  <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.6rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
                </article>
              ))}
            </div>
            <Link
              href="/gyms/roadmap"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              View expansion roadmap
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-7 py-8 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-8 top-8 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[140px]" />
        </div>
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Gym directory</p>
              <h2 className="text-xl font-semibold text-white">Curated spaces</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              {gymCount.toString().padStart(2, "0")} locations live
            </span>
          </header>
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {loadingCards.map((_, index) => (
                <div
                  key={index}
                  className="h-40 animate-pulse rounded-[1.8rem] border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : (
            <GymGrid gyms={gyms} />
          )}
        </div>
      </Panel>
    </div>
  );
}

function GymGrid({ gyms }: { gyms: GymSummary[] }) {
  if (!gyms.length) {
    return (
      <div className="rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 px-6 py-16 text-center text-sm text-white/60">
        No gyms are live yet. Check back soon as we expand coverage.
      </div>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {gyms.map((gym) => (
        <li
          key={gym.id}
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.85rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent-blue)]">Signature hub</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{gym.name}</h3>
            <p className="mt-2 text-xs text-white/60">{gym.location}</p>
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-white/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-yellow)]" />
              Accepting trial visits
            </span>
            <Link
              href={`/gyms/${gym.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20"
            >
              View hub
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
          <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.65rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
        </li>
      ))}
    </ul>
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

