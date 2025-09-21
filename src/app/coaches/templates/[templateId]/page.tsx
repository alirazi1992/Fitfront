import Link from "next/link";
import { notFound } from "next/navigation";
import { ControlRail } from "../../_components/control-rail";
import { Panel } from "../../../_components/panel";
import { getTemplateById } from "../data";

export default function TemplateDetailPage({ params }: { params: { templateId: string } }) {
  const template = getTemplateById(params.templateId);

  if (!template) {
    notFound();
    return null;
  }

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

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Template overview
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                Rating {template.rating.toFixed(1)} *
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                {template.coaches} coaches live
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                {template.title}
              </h1>
              <p className="max-w-2xl text-base text-white/80">{template.summary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">Focus: {template.focus}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">Duration: {template.duration}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">Suggested price: ${template.price}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/coaches/templates/new"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-blue)] px-5 py-3 text-xs font-semibold text-[#04131b] transition hover:opacity-90"
              >
                Duplicate and edit
                <span aria-hidden="true">-&gt;</span>
              </Link>
              <Link
                href="/coaches/clients"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Assign to roster
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-12 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[130px]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Block modules</h2>
            <ul className="space-y-3 text-sm text-white/70">
              {template.modules.map((module) => (
                <li key={module} className="rounded-[1.6rem] border border-white/10 bg-white/5 px-5 py-4">
                  {module}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70">
            <h3 className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent-yellow)]">Requirements</h3>
            <ul className="space-y-2 text-sm">
              {template.requirements.map((req) => (
                <li key={req}>â€¢ {req}</li>
              ))}
            </ul>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4 text-xs text-white/70">
              Pair the template with readiness tracking and automated check-ins to keep athletes aligned with the plan.
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}