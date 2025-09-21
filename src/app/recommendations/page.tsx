"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { z } from "zod";
import { recommendCoaches } from "@/lib/api";
import type { FitnessGoal, RecommendedCoachDto } from "@/lib/types";
import { ApiError } from "@/lib/http";

import { Panel } from "../_components/panel";

const FALLBACK_RECOMMENDATIONS: Array<RecommendedCoachDto & { goals: FitnessGoal[] }> = [
  {
    coachId: 1001,
    coachName: "Maya Chen",
    specialization: "Hybrid Strength & Mobility",
    distanceKm: 4.2,
    gymId: 301,
    gymName: "Pulse Lab Downtown",
    minPlanPrice: 180,
    avgRating: 4.9,
    reviewsCount: 128,
    matchingPlanTitles: ["Force Phase 2", "Hybrid Power"],
    goals: ["Strength", "BodyRecomposition", "Mobility", "FunctionalFitness", "SportsPerformance"],
  },
  {
    coachId: 1002,
    coachName: "Luis Ramirez",
    specialization: "Endurance & Conditioning",
    distanceKm: 7.5,
    gymId: 302,
    gymName: "Altitude Engine Studio",
    minPlanPrice: 150,
    avgRating: 4.7,
    reviewsCount: 96,
    matchingPlanTitles: ["Altitude Engine"],
    goals: ["Endurance", "FunctionalFitness", "MetabolicHealth", "Lifestyle"],
  },
  {
    coachId: 1003,
    coachName: "Zara Malik",
    specialization: "Mobility & Mind-Body",
    distanceKm: 3.1,
    gymId: 303,
    gymName: "Reset Recovery Loft",
    minPlanPrice: 120,
    avgRating: 5.0,
    reviewsCount: 142,
    matchingPlanTitles: ["Reset 72"],
    goals: ["Mobility", "Flexibility", "MindBody", "InjuryPrevention"],
  },
  {
    coachId: 1004,
    coachName: "Andre Walker",
    specialization: "Postnatal & Lifestyle Coaching",
    distanceKm: 5.8,
    gymId: 304,
    gymName: "Nurture Studio",
    minPlanPrice: 135,
    avgRating: 4.8,
    reviewsCount: 87,
    matchingPlanTitles: ["Corporate Resilience"],
    goals: ["Postnatal", "Lifestyle", "HealthyAging", "MetabolicHealth"],
  },
  {
    coachId: 1005,
    coachName: "Sienna Brooks",
    specialization: "Performance Rehab",
    distanceKm: 9.9,
    gymId: 305,
    gymName: "Rehab Pro Clinic",
    minPlanPrice: 165,
    avgRating: 4.95,
    reviewsCount: 74,
    matchingPlanTitles: ["Velocity Ramp"],
    goals: ["Rehab", "Strength", "InjuryPrevention", "SportsPerformance"],
  },
  {
    coachId: 1006,
    coachName: "Noah Patel",
    specialization: "Powerlifting & Max Strength",
    distanceKm: 6.4,
    gymId: 306,
    gymName: "Iron Peak Club",
    minPlanPrice: 190,
    avgRating: 4.85,
    reviewsCount: 63,
    matchingPlanTitles: ["Hybrid Power"],
    goals: ["Powerlifting", "Strength", "SportsPerformance"],
  },
  {
    coachId: 1007,
    coachName: "Elena Rossi",
    specialization: "Functional Fitness & Engine",
    distanceKm: 2.9,
    gymId: 307,
    gymName: "Forge Functional",
    minPlanPrice: 155,
    avgRating: 4.92,
    reviewsCount: 109,
    matchingPlanTitles: ["Altitude Engine", "Force Phase 2"],
    goals: ["FunctionalFitness", "Endurance", "GeneralFitness", "BodyRecomposition"],
  },
  {
    coachId: 1008,
    coachName: "Harper Singh",
    specialization: "Mind-Body & Longevity",
    distanceKm: 4.9,
    gymId: 308,
    gymName: "Calibrate Studio",
    minPlanPrice: 140,
    avgRating: 4.88,
    reviewsCount: 91,
    matchingPlanTitles: ["Reset 72", "Corporate Resilience"],
    goals: ["MindBody", "HealthyAging", "Lifestyle", "Flexibility"],
  },
];

type DiscoveryStep = {
  title: string;
  detail: string;
};

const DISCOVERY_STEPS: ReadonlyArray<DiscoveryStep> = [
  {
    title: "Lock in your focus",
    detail: "We map your goal selection to the coaching attributes and modalities that matter most.",
  },
  {
    title: "Blend live availability",
    detail: "Our network feed checks roster capacity, pricing bands, and distance to shortlist viable fits.",
  },
  {
    title: "Score compatibility",
    detail: "Each coach is ranked using speciality alignment, client results, and verified review velocity.",
  },
  {
    title: "Adapt with feedback",
    detail: "Filters and booking signals tune the recommendations so every subsequent scan gets sharper.",
  },
];

function selectFallbackRecommendations(goal: FitnessGoal | undefined, maxDistanceKm: number | undefined, take: number): RecommendedCoachDto[] {
  const withinDistance = maxDistanceKm
    ? FALLBACK_RECOMMENDATIONS.filter((coach) => coach.distanceKm <= maxDistanceKm)
    : FALLBACK_RECOMMENDATIONS;

  const goalMatches = goal
    ? withinDistance.filter((coach) => coach.goals.includes(goal))
    : withinDistance;

  const pool = goalMatches.length ? goalMatches : withinDistance.length ? withinDistance : FALLBACK_RECOMMENDATIONS;

  return pool.slice(0, take).map(({ goals, ...coach }) => {
    void goals;
    return coach;
  });
}
type GoalOption = {
  value: FitnessGoal;
  label: string;
  helper: string;
  category: string;
};

const GOAL_OPTIONS: ReadonlyArray<GoalOption> = [
  {
    value: "GeneralFitness",
    label: "General fitness",
    helper: "Build overall wellness, strength balance, and movement consistency.",
    category: "Foundations",
  },
  {
    value: "Lifestyle",
    label: "Lifestyle / energy",
    helper: "Improve day-to-day energy, sleep hygiene, and habit systems.",
    category: "Foundations",
  },
  {
    value: "MetabolicHealth",
    label: "Metabolic health",
    helper: "Dial in blood sugar control, heart health, and metabolic efficiency.",
    category: "Foundations",
  },
  {
    value: "HealthyAging",
    label: "Healthy aging",
    helper: "Train for longevity, bone density, and independence.",
    category: "Foundations",
  },
  {
    value: "WeightLoss",
    label: "Fat loss",
    helper: "Lower body fat while protecting lean mass.",
    category: "Body composition",
  },
  {
    value: "BodyRecomposition",
    label: "Body recomposition",
    helper: "Simultaneously gain muscle and lose fat with calibrated programming.",
    category: "Body composition",
  },
  {
    value: "MuscleGain",
    label: "Hypertrophy",
    helper: "Add lean mass with targeted volume and recovery blocks.",
    category: "Body composition",
  },
  {
    value: "Strength",
    label: "Strength & power",
    helper: "Build maximal strength with progressive overload and neural work.",
    category: "Strength & performance",
  },
  {
    value: "Powerlifting",
    label: "Powerlifting peaks",
    helper: "Prep for meets with peaking cycles and technical work.",
    category: "Strength & performance",
  },
  {
    value: "SportsPerformance",
    label: "Sport performance",
    helper: "Sharpen speed, agility, and game-day readiness for your sport.",
    category: "Strength & performance",
  },
  {
    value: "Endurance",
    label: "Endurance",
    helper: "Expand aerobic base and race-day stamina across modalities.",
    category: "Endurance & conditioning",
  },
  {
    value: "FunctionalFitness",
    label: "Functional fitness",
    helper: "Train for hybrid competitions and high-intensity functional workouts.",
    category: "Endurance & conditioning",
  },
  {
    value: "Flexibility",
    label: "Flexibility",
    helper: "Increase range of motion and joint freedom.",
    category: "Mobility & recovery",
  },
  {
    value: "Mobility",
    label: "Mobility therapy",
    helper: "Resolve restrictions with tissue work and movement protocols.",
    category: "Mobility & recovery",
  },
  {
    value: "InjuryPrevention",
    label: "Injury prevention",
    helper: "Bulletproof weak links and address movement asymmetries.",
    category: "Mobility & recovery",
  },
  {
    value: "Rehab",
    label: "Rehab / return to play",
    helper: "Progress safely back from injury or surgery.",
    category: "Mobility & recovery",
  },
  {
    value: "MindBody",
    label: "Mind-body / stress relief",
    helper: "Blend breathwork, low-intensity movement, and nervous-system resets.",
    category: "Lifestyle & mindset",
  },
  {
    value: "Postnatal",
    label: "Postnatal rebuild",
    helper: "Restore core, pelvic floor, and strength post birth.",
    category: "Lifestyle & mindset",
  },
];

const GOAL_GROUPS = GOAL_OPTIONS.reduce<Record<string, GoalOption[]>>((acc, option) => {
  const group = option.category;
  if (!acc[group]) {
    acc[group] = [];
  }
  acc[group].push(option);
  return acc;
}, {});


const goalSchema = z
  .union([
    z.literal(""),
    z.enum(GOAL_OPTIONS.map((option) => option.value) as [string, ...string[]]),
    z.undefined(),
  ])
  .transform((value) => (value === "" || value === undefined ? undefined : (value as FitnessGoal)));

const optionalCurrency = z
  .union([z.literal(""), z.coerce.number().min(0, "Must be positive"), z.undefined()])
  .transform((value) => (value === "" || value === undefined ? undefined : value));

const coordinate = z
  .union([z.literal(""), z.coerce.number(), z.undefined()])
  .transform((value) => (value === "" || value === undefined ? undefined : value));

const discoverySchema = z
  .object({
    goal: goalSchema,
    budgetMin: optionalCurrency,
    budgetMax: optionalCurrency,
    maxDistanceKm: z.coerce.number().min(1).max(150).default(15),
    take: z.coerce.number().min(1).max(20).default(6),
    locationMode: z.enum(["auto", "manual"]).default("auto"),
    latitude: coordinate.refine(
      (value) => value === undefined || (value >= -90 && value <= 90),
      { message: "Latitude must be between -90 and 90" },
    ),
    longitude: coordinate.refine(
      (value) => value === undefined || (value >= -180 && value <= 180),
      { message: "Longitude must be between -180 and 180" },
    ),
  })
  .refine(
    (values) =>
      values.locationMode === "auto" ||
      (values.latitude !== undefined && values.longitude !== undefined),
    {
      message: "Provide latitude and longitude",
      path: ["latitude"],
    },
  )
  .refine(
    (values) =>
      values.budgetMin === undefined ||
      values.budgetMax === undefined ||
      values.budgetMin <= values.budgetMax,
    {
      message: "Budget min must be less than max",
      path: ["budgetMax"],
    },
  );

type DiscoveryFormValues = z.infer<typeof discoverySchema>;

type GeoStatus = "idle" | "loading" | "success" | "error";

export default function RecommendationsPage() {
  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [geoMessage, setGeoMessage] = useState<string>(
    "Use automatic location or enter coordinates.",
  );
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [hasRequested, setHasRequested] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const [isGoalDialogOpen, setGoalDialogOpen] = useState(false);

  const closeGoalDialog = useCallback(() => setGoalDialogOpen(false), [setGoalDialogOpen]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DiscoveryFormValues>({
    resolver: zodResolver(discoverySchema),
    defaultValues: {
      goal: undefined,
      budgetMin: undefined,
      budgetMax: undefined,
      maxDistanceKm: 15,
      take: 6,
      locationMode: "auto",
      latitude: undefined,
      longitude: undefined,
    },
  });

  useEffect(() => {
    register("goal");
  }, [register]);

  const locationMode = watch("locationMode");
  const selectedGoal = watch("goal");
  const maxDistance = watch("maxDistanceKm");
  const take = watch("take");

  const handleGoalSelect = useCallback((value: FitnessGoal) => {
    setValue("goal", value, { shouldValidate: true, shouldDirty: true });
    closeGoalDialog();
  }, [closeGoalDialog, setValue]);

  const handleClearGoal = useCallback(() => {
    setValue("goal", undefined, { shouldValidate: true, shouldDirty: true });
    closeGoalDialog();
  }, [closeGoalDialog, setValue]);

  const goalMeta = useMemo(() => {
    if (!selectedGoal) {
      return {
        label: "Any goal",
        helper: "Adjust goals anytime to reshape the match graph.",
      };
    }
    const match = GOAL_OPTIONS.find((option) => option.value === selectedGoal);
    return (
      match ?? {
        label: "Any goal",
        helper: "Adjust goals anytime to reshape the match graph.",
      }
    );
  }, [selectedGoal]);

  const locationBadge = useMemo(() => {
    switch (geoStatus) {
      case "loading":
        return {
          label: "Locating signal",
          border: "border-white/20",
          background: "bg-white/5",
          text: "text-white/70",
          dot: "bg-[var(--color-accent-blue)] animate-pulse",
        };
      case "success":
        return {
          label: "Location locked",
          border: "border-[var(--color-accent-blue)]/50",
          background: "bg-[var(--color-accent-blue)]/10",
          text: "text-white",
          dot: "bg-[var(--color-accent-yellow)]",
        };
      case "error":
        return {
          label: "Manual coords needed",
          border: "border-[#ff9a9a]/40",
          background: "bg-[#ff9a9a]/10",
          text: "text-[#ffbebe]",
          dot: "bg-[#ff9a9a]",
        };
      default:
        return {
          label: "Auto-detect ready",
          border: "border-white/20",
          background: "bg-white/5",
          text: "text-white/70",
          dot: "bg-[var(--color-accent-blue)]/80",
        };
    }
  }, [geoStatus]);

  useEffect(() => {
    if (locationMode !== "auto") return;
    if (!navigator.geolocation) {
      setGeoStatus("error");
      setGeoMessage("Geolocation not supported. Switch to manual entry.");
      return;
    }
    setGeoStatus("loading");
    setGeoMessage("Locating...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setGeoStatus("success");
        setGeoMessage(
          `Location set (lat ${position.coords.latitude.toFixed(2)}, lon ${position.coords.longitude.toFixed(2)})`,
        );
      },
      () => {
        setCoords(null);
        setGeoStatus("error");
        setGeoMessage("We could not access your location. Enter coordinates manually.");
      },
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }, [locationMode]);

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: async (values: DiscoveryFormValues) => {
      const location =
        values.locationMode === "manual"
          ? values.latitude !== undefined && values.longitude !== undefined
            ? { lat: values.latitude, lon: values.longitude }
            : null
          : coords;

      if (!location) {
        throw new ApiError(
          "Location not available. Allow automatic access or enter coordinates manually.",
        );
      }

      const payload = {
        goal: values.goal,
        budgetMin: values.budgetMin,
        budgetMax: values.budgetMax,
        latitude: location.lat,
        longitude: location.lon,
        maxDistanceKm: values.maxDistanceKm,
        take: values.take,
      };

      const take = values.take ?? 6;

      try {
        const results = await recommendCoaches(payload);
        if (results && results.length) {
          setUsedFallback(false);
          return results.slice(0, take);
        }
      } catch (requestError) {
        console.warn("Recommendations request failed; using local fallback.", requestError);
      }

      setUsedFallback(true);
      return selectFallbackRecommendations(values.goal, values.maxDistanceKm, take);
    },
  });

  const handleSearch = (values: DiscoveryFormValues) => {
    setHasRequested(true);
    mutate(values);
  };

  const resultSummary = useMemo(() => {
    if (!data || !data.length) return null;
    const avgRating = (
      data.reduce((total, coach) => total + coach.avgRating, 0) / data.length
    ).toFixed(1);
    const avgPrice = (
      data.reduce((total, coach) => total + coach.minPlanPrice, 0) / data.length
    ).toFixed(0);
    return { avgRating, avgPrice };
  }, [data]);

  return (
    <div className="flex min-h-full flex-col gap-12 bg-[var(--color-surface)] px-6 py-10 text-sm text-[color:var(--color-text-secondary)] lg:px-12 lg:py-16">
      <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[var(--color-shell)]/80 px-8 py-12 shadow-[0_40px_120px_-45px_rgba(12,15,24,0.8)] backdrop-blur-2xl lg:px-16 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[var(--color-accent-blue)]/40 blur-[140px]" />
          <div className="absolute -bottom-36 right-[18%] h-80 w-80 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[150px]" />
          <div className="absolute inset-x-10 inset-y-8 rounded-[2.5rem] border border-white/10 opacity-30" />
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.55em] text-[var(--color-accent-blue)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                Discovery studio
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full border ${locationBadge.border} px-4 py-2 ${locationBadge.background} ${locationBadge.text}`}
              >
                <span className={`inline-flex h-2 w-2 rounded-full ${locationBadge.dot}`} />
                {locationBadge.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70">
                {hasRequested ? "Results refreshed" : "Awaiting search"}
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                Match with coaches that sync to your training signal
              </h1>
              <p className="max-w-2xl text-base">
                Layer your goals, budget, and travel radius. Our ranking engine blends proximity, programme inventory, and
                verified feedback to surface the best fit in seconds.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryLink href="#discovery-form">Launch my scan</PrimaryLink>
              <GhostLink href="/coaches">Meet the roster</GhostLink>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-yellow)]" />
                Up to {take ?? 6} matches within {maxDistance ?? 15} km
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
                <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Focus</p>
                <p className="mt-2 text-sm text-white">{goalMeta.label}</p>
                <p className="mt-1 text-xs text-white/60">{goalMeta.helper}</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
                <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-yellow)]">Location signal</p>
                <p className="mt-2 text-sm text-white">{geoMessage}</p>
              </div>
            </div>
          </div>
          <aside className="relative flex h-full flex-col gap-5 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--color-panel)]/40 p-8 text-xs text-[color:var(--color-text-secondary)] shadow-[0_30px_80px_-40px_rgba(12,15,24,0.9)]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
              <div className="absolute -top-12 left-1/3 h-56 w-56 rounded-full bg-[var(--color-accent-blue)]/35 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[130px]" />
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--color-text-primary)]">
              <p className="font-semibold uppercase tracking-[0.45em]">How it filters</p>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-white/70">Realtime</span>
            </div>
            <div className="space-y-4 text-sm">
              {DISCOVERY_STEPS.map((step) => (
                <article
                  key={step.title}
                  className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 px-5 py-5"
                >
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs text-white/60">{step.detail}</p>
                  <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.6rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
                </article>
              ))}
            </div>
            <Link
              href="/recommendations/insights"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              View methodology
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </aside>
        </div>
      </section>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute -right-12 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/30 blur-[140px]" />
        </div>
        <form
          id="discovery-form"
          className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr]"
          onSubmit={handleSubmit(handleSearch)}
        >
          <section className="space-y-6">
            <fieldset className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6">
              <legend className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">
                Location source
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setValue("locationMode", "auto", { shouldValidate: false })}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    locationMode === "auto"
                      ? "bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] text-[#0f1012] shadow-[0_15px_40px_-25px_rgba(243,255,71,0.8)]"
                      : "border border-white/15 bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  Use my location
                </button>
                <button
                  type="button"
                  onClick={() => setValue("locationMode", "manual", { shouldValidate: false })}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    locationMode === "manual"
                      ? "bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] text-[#0f1012] shadow-[0_15px_40px_-25px_rgba(243,255,71,0.8)]"
                      : "border border-white/15 bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  Enter coordinates
                </button>
              </div>
              <p
                className={`mt-4 text-xs ${
                  geoStatus === "error"
                    ? "text-[#ff9a9a]"
                    : geoStatus === "success"
                    ? "text-[var(--color-accent-blue)]"
                    : "text-white/70"
                }`}
              >
                {geoMessage}
              </p>
              {locationMode === "manual" ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.35em]" htmlFor="latitude">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      {...register("latitude")}
                      id="latitude"
                      className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                      placeholder="24.7136"
                    />
                    {errors.latitude ? <FieldError message={errors.latitude.message} /> : null}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.35em]" htmlFor="longitude">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      {...register("longitude")}
                      id="longitude"
                      className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                      placeholder="46.6753"
                    />
                    {errors.longitude ? <FieldError message={errors.longitude.message} /> : null}
                  </div>
                </div>
              ) : null}
            </fieldset>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3 md:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p id="goal-label" className="text-xs uppercase tracking-[0.35em]">Goal</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGoalDialogOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-blue)]/20 to-[#59d7ff]/10 px-4 py-2 text-xs font-semibold text-white/80 transition hover:from-[var(--color-accent-blue)]/40 hover:to-[#59d7ff]/25"
                    >
                      {selectedGoal ? "Change goal" : "Choose goal"}
                    </button>
                    <button
                      type="button"
                      onClick={handleClearGoal}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/60 transition hover:border-white/30 hover:text-white/80 disabled:opacity-40"
                      disabled={!selectedGoal}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <p className="text-xs text-white/60">Choose a primary focus to personalise the ranking engine.</p>
                <div
                  role="group"
                  aria-labelledby="goal-label"
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5 text-sm text-white/70"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent-blue)]">{selectedGoal ? "Selected goal" : "No goal selected"}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{goalMeta.label}</p>
                  <p className="mt-1 text-xs text-white/60">{goalMeta.helper}</p>
                </div>
                {errors.goal ? <FieldError message={errors.goal.message} /> : null}
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="maxDistanceKm">
                  Max distance (km)
                </label>
                <input
                  type="number"
                  {...register("maxDistanceKm")}
                  id="maxDistanceKm"
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                />
                {errors.maxDistanceKm ? <FieldError message={errors.maxDistanceKm.message} /> : null}
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="budgetMin">
                  Budget min ($)
                </label>
                <input
                  type="number"
                  {...register("budgetMin")}
                  id="budgetMin"
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                />
                {errors.budgetMin ? <FieldError message={errors.budgetMin.message} /> : null}
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="budgetMax">
                  Budget max ($)
                </label>
                <input
                  type="number"
                  {...register("budgetMax")}
                  id="budgetMax"
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                />
                {errors.budgetMax ? <FieldError message={errors.budgetMax.message} /> : null}
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.35em]" htmlFor="take">
                  Results
                </label>
                <input
                  type="number"
                  {...register("take")}
                  id="take"
                  className="w-full rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[var(--color-accent-blue)] focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent-yellow)] to-[#f7ff75] px-6 py-3 text-sm font-semibold text-[#0f1012] shadow-[0_30px_90px_-40px_rgba(243,255,71,0.8)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Searching..." : "Show recommendations"}
            </button>
            {error ? <FieldError message={error.message} /> : null}
          </section>

          <aside className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-yellow)]">
              Quick tips
            </p>
            <ul className="space-y-3 text-sm leading-6">
              <li>Combine a primary goal with a budget band to narrow results.</li>
              <li>If you train while travelling, enter manual coordinates for the city you are visiting.</li>
              <li>Increase the results limit to explore more coaches or keep it tight for fast decisions.</li>
            </ul>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/30 px-5 py-4 text-xs text-white/70">
              We surface coaches with verified plans, strong reviews, and nearby gyms first.
            </div>
          </aside>
        </form>
        <GoalSelectorDialog
          open={isGoalDialogOpen}
          onClose={closeGoalDialog}
          selectedGoal={selectedGoal}
          onSelect={handleGoalSelect}
        />
      </Panel>

      <Panel className="relative overflow-hidden border-white/10 bg-[var(--color-shell)]/70 px-8 py-10 shadow-[0_30px_90px_-50px_rgba(12,15,24,0.9)] lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-52 w-52 rounded-full bg-[var(--color-accent-blue)]/30 blur-[120px]" />
          <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-[var(--color-accent-yellow)]/35 blur-[140px]" />
        </div>
        {isPending ? (
          <LoadingResults />
        ) : data && data.length ? (
          <div className="relative space-y-6">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Top matches</p>
                <h2 className="text-xl font-semibold text-white">Curated for your signal</h2>
                <p className="text-sm text-white/70">Based on your filters, location, and verified coach performance.</p>
              </div>
              {resultSummary ? (
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <Badge label={`Avg rating ${resultSummary.avgRating}`} />
                  <Badge label={`Plans from $${resultSummary.avgPrice}`} />
                </div>
              ) : null}
            </header>
            {usedFallback ? (
              <p className="rounded-[1.6rem] border border-[var(--color-accent-blue)]/40 bg-[var(--color-accent-blue)]/10 px-4 py-3 text-xs text-white/70">Showing sample matches while we reconnect to the live network feed.</p>
            ) : null}
            <ul className="grid gap-5 xl:grid-cols-2">
              {data.map((coach) => (
                <ResultCard key={`${coach.coachId}-${coach.gymId}`} coach={coach} />
              ))}
            </ul>
          </div>
        ) : hasRequested ? (
          <EmptyResults message="No coaches matched those filters. Try adjusting goal, distance, or budget." />
        ) : (
          <EmptyResults message="Run a search to view personalised recommendations." />
        )}
      </Panel>
    </div>
  );
}

type GoalSelectorDialogProps = {
  open: boolean;
  selectedGoal: FitnessGoal | undefined;
  onClose: () => void;
  onSelect: (value: FitnessGoal) => void;
};

function GoalSelectorDialog({ open, selectedGoal, onClose, onSelect }: GoalSelectorDialogProps) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="goal-dialog-title"
        className="relative z-10 w-full max-w-3xl rounded-[2.2rem] border border-white/15 bg-[var(--color-panel)]/95 p-8 text-sm text-white/70 shadow-[0_50px_140px_-60px_rgba(6,10,20,0.9)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-accent-blue)]">Goal selector</p>
            <h2 id="goal-dialog-title" className="text-2xl font-semibold text-white">Personalise your focus</h2>
            <p className="text-xs text-white/60">Pick the outcome you care about most to tune the recommendation engine.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lg font-semibold text-white/60 transition hover:border-white/30 hover:text-white"
            aria-label="Close goal selector"
          >
            &times;
          </button>
        </div>
        <div className="mt-6 max-h-[65vh] space-y-5 overflow-y-auto pr-2">
          {Object.entries(GOAL_GROUPS).map(([group, options]) => (
            <section key={group} className="space-y-3">
              <header className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.35em] text-white/40">
                <p>{group}</p>
              </header>
              <div className="grid gap-3 sm:grid-cols-2">
                {options.map((option) => {
                  const isActive = selectedGoal === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onSelect(option.value)}
                      className={`rounded-[1.6rem] border px-4 py-4 text-left transition ${isActive ? "border-[var(--color-accent-yellow)] bg-[var(--color-accent-yellow)]/15 text-white shadow-[0_30px_80px_-60px_rgba(243,255,71,0.7)]" : "border-white/10 bg-white/5 text-white/70 hover:border-[var(--color-accent-blue)]/40 hover:bg-[var(--color-accent-blue)]/10 hover:text-white"}`}
                      aria-pressed={isActive}
                    >
                      <span className="block text-sm font-semibold text-white">{option.label}</span>
                      <span className="mt-2 block text-xs text-white/60">{option.helper}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ coach }: { coach: RecommendedCoachDto }) {
  return (
    <li className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 px-6 py-6 text-sm text-white/70 shadow-[0_25px_60px_-40px_rgba(12,15,24,0.8)]">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-white">{coach.coachName}</p>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">{coach.specialization}</p>
          </div>
          <div className="text-right text-xs text-white/60">
            <p className="text-sm font-semibold text-[var(--color-accent-yellow)]">
              {coach.avgRating.toFixed(1)} / 5
            </p>
            <p>{coach.reviewsCount} reviews</p>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-4 text-xs">
          <p className="text-white/70">
            Training out of <span className="font-semibold text-white">{coach.gymName}</span> - {coach.distanceKm.toFixed(1)} km away - plans from
            <span className="font-semibold text-white"> ${coach.minPlanPrice.toFixed(0)}</span>
          </p>
          {coach.matchingPlanTitles?.length ? (
            <p className="mt-2 text-white/60">Matches: {coach.matchingPlanTitles.join(", ")}</p>
          ) : null}
        </div>
      </div>
      <Link
        href={`/coaches/${coach.coachId}`}
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[#59d7ff] px-5 py-2 text-sm font-semibold text-[#04131b] transition hover:opacity-90"
      >
        View coach profile
        <span aria-hidden="true">-&gt;</span>
      </Link>
      <span className="pointer-events-none absolute inset-0 scale-[0.98] rounded-[1.7rem] border border-white/10 opacity-0 transition-opacity group-hover:opacity-50" />
    </li>
  );
}

function EmptyResults({ message }: { message: string }) {
  return (
    <div className="rounded-[1.9rem] border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-sm text-white/70">
      {message}
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70">
      {label}
    </span>
  );
}

function LoadingResults() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-48 animate-pulse rounded-[1.9rem] border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-[#ff9a9a]">{message}</p>;
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











