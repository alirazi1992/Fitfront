"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ControlRail } from "../../_components/control-rail";
import { Panel } from "../../../_components/panel";

type TemplateFormState = {
  title: string;
  focus: string;
  durationWeeks: string;
  intensity: string;
  equipment: string;
  price: string;
  summary: string;
  modules: string;
  notes: string;
};

const DEFAULT_FORM: TemplateFormState = {
  title: "",
  focus: "Strength",
  durationWeeks: "4",
  intensity: "Moderate",
  equipment: "Barbell, dumbbells, bands",
  price: "149",
  summary: "",
  modules: "Foundation strength\nVelocity work\nAccessory conditioning",
  notes: "",
};

export default function NewTemplatePage() {
  const [formState, setFormState] = useState<TemplateFormState>(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);

  const preview = useMemo(
    () => ({
      title: formState.title || "Template title",
      focus: formState.focus,
      duration: formState.durationWeeks ? `${formState.durationWeeks} weeks` : "Duration",
      intensity: formState.intensity,
      equipment: formState.equipment,
      price: formState.price ? `$${formState.price}` : "Price",
      summary:
        formState.summary ||
        "Outline the training pillars, ideal athlete profile, and expected outcomes for this block.",
      modules: formState.modules.split("\n").filter(Boolean),
    }),
    [formState],
  );

  const handleChange = (key: keyof TemplateFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    // TODO: replace with API integration.
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
                  Template builder
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                  Version control ready
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                  Spin up a new training experience in minutes
                </h1>
                <p className="max-w-2xl text-base">
                  Define structure, intensity, and delivery notes for coaches and clients. Every submission creates a draft
                  that can be assigned to rosters or published to the network library.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/coaches/templates/browse"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--color-accent-blue)] transition hover:border-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)]/10"
                >
                  Browse existing templates
                </Link>
                <Link
                  href="/coaches/help"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Publishing guidelines
                </Link>
              </div>
            </div>

            <aside className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
                <div className="absolute -top-12 left-1/3 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[130px]" />
              </div>
              <div className="flex items-center justify-between text-sm text-[var(--color-text-primary)]">
                <p className="font-semibold uppercase tracking-[0.45em]">Preview</p>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Draft</span>
              </div>
              <div className="space-y-3 rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]">
                <div>
                  <p className="text-lg font-semibold text-white">{preview.title}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">{preview.focus}</p>
                </div>
                <p className="text-xs text-white/60">Duration: {preview.duration}</p>
                <p className="text-xs text-white/60">Intensity: {preview.intensity}</p>
                <p className="text-xs text-white/60">Equipment: {preview.equipment}</p>
                <p className="text-xs text-white/60">Price: {preview.price}</p>
                <p className="text-xs text-white/60">{preview.summary}</p>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">Modules</p>
                  <ul className="space-y-1 text-xs text-white/65">
                    {preview.modules.length ? (
                      preview.modules.map((module) => <li key={module}>• {module}</li>)
                    ) : (
                      <li>Outline the block phases, deload, and accessory work.</li>
                    )}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-white/60">
                After submission you can invite reviewers, attach media, and schedule automated client rollouts.
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
        <form className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="title"
                label="Template title"
                value={formState.title}
                onChange={(value) => handleChange("title", value)}
                placeholder="Force Phase 3"
                required
              />
              <InputField
                id="focus"
                label="Primary focus"
                value={formState.focus}
                onChange={(value) => handleChange("focus", value)}
                placeholder="Strength & velocity"
                required
              />
              <InputField
                id="durationWeeks"
                label="Duration (weeks)"
                value={formState.durationWeeks}
                onChange={(value) => handleChange("durationWeeks", value)}
                placeholder="4"
                required
              />
              <InputField
                id="intensity"
                label="Intensity profile"
                value={formState.intensity}
                onChange={(value) => handleChange("intensity", value)}
                placeholder="Moderate to high"
                required
              />
              <InputField
                id="equipment"
                label="Equipment"
                value={formState.equipment}
                onChange={(value) => handleChange("equipment", value)}
                placeholder="Barbell, dumbbells, sled"
                required
              />
              <InputField
                id="price"
                label="Suggested price ($)"
                value={formState.price}
                onChange={(value) => handleChange("price", value)}
                placeholder="149"
              />
            </div>
            <TextAreaField
              id="summary"
              label="Programme summary"
              value={formState.summary}
              onChange={(value) => handleChange("summary", value)}
              placeholder="Describe the goal, training split, and outcomes coaches should expect."
              rows={4}
            />
            <TextAreaField
              id="modules"
              label="Block modules (one per line)"
              value={formState.modules}
              onChange={(value) => handleChange("modules", value)}
              rows={4}
            />
            <TextAreaField
              id="notes"
              label="Coach implementation notes"
              value={formState.notes}
              onChange={(value) => handleChange("notes", value)}
              placeholder="Optional: scaling guidance, recovery suggestions, or integrations to toggle."
              rows={3}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90"
            >
              {submitted ? "Template submitted" : "Save draft"}
            </button>
            {submitted ? (
              <p className="text-xs text-[var(--color-accent-blue)]">
                Draft saved. You can attach media, invite reviewers, and publish from the template dashboard.
              </p>
            ) : null}
          </div>

          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-yellow)]">Release checklist</p>
            <ul className="space-y-4 text-sm">
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Validation</p>
                <p className="mt-1 text-white/60">Pair with a reviewer coach to sign off on progressions and load.</p>
              </li>
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Media kit</p>
                <p className="mt-1 text-white/60">Add demo clips, cue sheets, or PDF guides to boost adoption.</p>
              </li>
              <li className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4">
                <p className="font-semibold text-white">Automation hooks</p>
                <p className="mt-1 text-white/60">Configure reminders, readiness checks, and progression triggers.</p>
              </li>
            </ul>
            <Link
              href="/coaches/templates/browse"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              Compare with library
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </form>
      </Panel>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-[0.35em]" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-[0.35em]" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
      />
    </div>
  );
}