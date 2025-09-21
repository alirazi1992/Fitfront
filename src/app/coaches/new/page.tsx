"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ControlRail } from "../_components/control-rail";
import { Panel } from "../../_components/panel";

type CoachFormState = {
  name: string;
  specialization: string;
  experience: string;
  primaryGym: string;
  rate: string;
  bio: string;
  focusAreas: string;
  availability: string;
  achievements: string;
};

const DEFAULT_FORM: CoachFormState = {
  name: "",
  specialization: "",
  experience: "",
  primaryGym: "",
  rate: "",
  bio: "",
  focusAreas: "Strength, Conditioning",
  availability: "Weekdays 6am – 2pm",
  achievements: "",
};

export default function CreateCoachPage() {
  const [formState, setFormState] = useState<CoachFormState>(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);

  const preview = useMemo(
    () => ({
      name: formState.name || "Coach name",
      specialization: formState.specialization || "Primary discipline",
      experience: formState.experience || "Experience level",
      primaryGym: formState.primaryGym || "Preferred facility",
      rate: formState.rate || "Hourly rate",
      focusAreas: formState.focusAreas,
      availability: formState.availability,
      achievements: formState.achievements || "Share standout results, certifications, or athlete wins.",
    }),
    [formState],
  );

  const handleChange = (key: keyof CoachFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    // TODO: Wire up to backend endpoint once available.
    console.table(formState);
  };

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

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                  Coach intake
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                  Guided onboarding
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                  Bring a coach into the Fit Space network
                </h1>
                <p className="max-w-2xl text-base">
                  Capture essentials, align availability, and surface credentials in one pass. Once submitted, the coach
                  receives verification steps and can start publishing programmes immediately.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/coaches/clients"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90"
                >
                  View client roster
                </Link>
                <Link
                  href="/coaches/templates"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--color-accent-blue)] transition hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10"
                >
                  Prepare programme templates
                </Link>
              </div>
            </div>

            <aside className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
                <div className="absolute -top-12 left-1/3 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[130px]" />
              </div>
              <div className="flex items-center justify-between text-sm text-[var(--color-text-primary)]">
                <p className="font-semibold uppercase tracking-[0.45em]">Live preview</p>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Draft</span>
              </div>
              <div className="space-y-3 rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]">
                <div>
                  <p className="text-lg font-semibold text-white">{preview.name}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">{preview.specialization}</p>
                </div>
                <p className="text-xs text-white/60">{preview.experience}</p>
                <p className="text-xs text-white/60">Primary gym: {preview.primaryGym}</p>
                <p className="text-xs text-white/60">Rate: {preview.rate}</p>
                <p className="text-xs text-white/60">Focus areas: {preview.focusAreas}</p>
                <p className="text-xs text-white/60">Availability: {preview.availability}</p>
                <p className="text-xs text-white/60">{preview.achievements}</p>
              </div>
              <p className="text-xs text-white/60">
                Submit to trigger verification, payment onboarding, and to invite the coach into existing cohorts.
              </p>
            </aside>
          </div>
        </section>
      </div>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-12 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[140px]" />
        </div>
        <form className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="name">
                  Coach name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                  placeholder="Jordan Blake"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="specialization">
                  Specialisation
                </label>
                <input
                  id="specialization"
                  type="text"
                  required
                  value={formState.specialization}
                  onChange={(event) => handleChange("specialization", event.target.value)}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                  placeholder="Strength & mobility"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="experience">
                  Experience
                </label>
                <input
                  id="experience"
                  type="text"
                  value={formState.experience}
                  onChange={(event) => handleChange("experience", event.target.value)}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                  placeholder="8 years, ex collegiate coach"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="primaryGym">
                  Primary gym location
                </label>
                <input
                  id="primaryGym"
                  type="text"
                  value={formState.primaryGym}
                  onChange={(event) => handleChange("primaryGym", event.target.value)}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                  placeholder="Midtown Performance Lab"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="rate">
                  Rate (per session)
                </label>
                <input
                  id="rate"
                  type="text"
                  value={formState.rate}
                  onChange={(event) => handleChange("rate", event.target.value)}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                  placeholder="$95"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="availability">
                  Availability
                </label>
                <input
                  id="availability"
                  type="text"
                  value={formState.availability}
                  onChange={(event) => handleChange("availability", event.target.value)}
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                  placeholder="Weekdays 6am – 2pm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.35em]" htmlFor="bio">
                Coach bio
              </label>
              <textarea
                id="bio"
                rows={4}
                value={formState.bio}
                onChange={(event) => handleChange("bio", event.target.value)}
                className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                placeholder="Share coaching philosophy, athlete wins, and signature approaches."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.35em]" htmlFor="focusAreas">
                Focus areas
              </label>
              <input
                id="focusAreas"
                type="text"
                value={formState.focusAreas}
                onChange={(event) => handleChange("focusAreas", event.target.value)}
                className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                placeholder="Strength, conditioning, mobility"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.35em]" htmlFor="achievements">
                Key achievements
              </label>
              <textarea
                id="achievements"
                rows={3}
                value={formState.achievements}
                onChange={(event) => handleChange("achievements", event.target.value)}
                className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                placeholder="Championship teams, certifications, or notable transformations."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90 disabled:opacity-70"
            >
              {submitted ? "Submitted" : "Submit for review"}
            </button>
            {submitted ? (
              <p className="text-xs text-[var(--color-accent-blue)]">
                Submission captured. Verification instructions have been emailed to the coach.
              </p>
            ) : null}
          </div>

          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-yellow)]">Verification checklist</p>
            <ul className="space-y-4 text-sm">
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Identity & certifications</p>
                <p className="mt-1 text-white/60">Upload government ID plus recognised coaching or training credentials.</p>
              </li>
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Programme samples</p>
                <p className="mt-1 text-white/60">Share at least one four-week block or template to seed the marketplace.</p>
              </li>
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Intro media</p>
                <p className="mt-1 text-white/60">Optional: upload a short intro video or gallery to appear on the profile.</p>
              </li>
            </ul>
            <Link
              href="/coaches/help"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              View onboarding docs
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </form>
      </Panel>
    </div>
  );
}