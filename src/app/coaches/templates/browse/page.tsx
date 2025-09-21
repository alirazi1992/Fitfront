"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TEMPLATE_DATA } from "../data";
import { ControlRail } from "../../_components/control-rail";
import { Panel } from "../../../_components/panel";

const FILTER_TAGS = ["Strength", "Endurance", "Mobility", "Hybrid", "Recovery", "Speed"] as const;

type SortKey = "rating" | "coaches" | "price";

export default function BrowseTemplatesPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [duplicateMessage, setDuplicateMessage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return TEMPLATE_DATA.filter((template) => {
      const matchesQuery = template.title.toLowerCase().includes(query.toLowerCase());
      const matchesTag = activeTag ? template.focus.toLowerCase().includes(activeTag.toLowerCase()) : true;
      return matchesQuery && matchesTag;
    }).sort((a, b) => {
      if (sortKey === "price") {
        return a.price - b.price;
      }
      if (sortKey === "coaches") {
        return b.coaches - a.coaches;
      }
      return b.rating - a.rating;
    });
  }, [query, activeTag, sortKey]);

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

          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Template library
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                280+ curated programmes
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                Find the right template to deploy today
              </h1>
              <p className="max-w-2xl text-base">
                Filter by focus, see adoption numbers, and duplicate a template into your workspace with a single click.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr_auto]">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search templates"
                  className="w-full min-w-[220px] rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0 lg:flex-1"
                />
                <div className="flex flex-wrap gap-2">
                  {FILTER_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag((prev) => (prev === tag ? null : tag))}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        activeTag === tag
                          ? "border-[var(--color-accent-blue)]/60 bg-[var(--color-accent-blue)]/10 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-xs text-white">
                <span className="uppercase tracking-[0.35em] text-white/60">Sort</span>
                <SortButton label="Rating" active={sortKey === "rating"} onClick={() => setSortKey("rating")} />
                <SortButton label="Adoption" active={sortKey === "coaches"} onClick={() => setSortKey("coaches")} />
                <SortButton label="Price" active={sortKey === "price"} onClick={() => setSortKey("price")} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[130px]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-10 text-center text-sm text-white/70">
              No templates match those filters yet. Try clearing a tag or searching a different focus.
            </p>
          ) : null}
          {filtered.map((template) => (
            <article
              key={template.id}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{template.title}</h2>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">{template.focus}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                  {template.rating.toFixed(1)} *
                </span>
              </div>
              <p className="text-xs text-white/60">Duration: {template.duration}</p>
              <p className="text-xs text-white/60">Coaches running: {template.coaches}</p>
              <p className="text-xs text-white/60">Suggested price: ${template.price}</p>
              <div className="mt-auto flex items-center gap-3">
                <Link
                  href={`/coaches/templates/${template.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-blue)] px-4 py-2 text-xs font-semibold text-[#04131b] transition hover:opacity-90"
                >
                  View details
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setDuplicateMessage(`"${template.title}" duplicated into your workspace.`)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  Duplicate to workspace
                </button>
              </div>
              <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.7rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
            </article>
          ))}
        </div>
        {duplicateMessage ? (
          <div className="mt-6 rounded-[1.5rem] border border-[var(--color-accent-blue)]/40 bg-[var(--color-accent-blue)]/10 px-6 py-4 text-xs text-white/80">
            {duplicateMessage}
          </div>
        ) : null}
      </Panel>
    </div>
  );
}

type SortButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function SortButton({ label, active, onClick }: SortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 font-semibold transition ${
        active ? "bg-[var(--color-accent-blue)]/20 text-white" : "text-white/60"
      }`}
    >
      {label}
    </button>
  );
}