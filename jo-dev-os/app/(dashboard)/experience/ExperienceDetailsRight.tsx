"use client";

import { BriefcaseBusiness, Link2, MapPin, Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExperienceRecord } from "./ExperienceTimelineLeft";

const BAR_COLORS: Record<string, string> = {
  Delivery: "from-emerald-200 via-cyan-200 to-emerald-100",
  Backend: "from-lime-200 via-emerald-200 to-cyan-200",
  "API Perf": "from-yellow-100 via-lime-100 to-emerald-100",
  Security: "from-fuchsia-200 via-pink-200 to-indigo-200",
};

export default function ExperienceDetailsRight({ details }: { details?: ExperienceRecord }) {
  const reduceMotion = useReducedMotion();

  if (!details) {
    return (
      <aside className="rounded-[22px] border border-white/15 bg-black/30 p-4 text-sm text-white/65 backdrop-blur-xl sm:rounded-[26px] sm:p-6">
        Selectionne une experience pour afficher les details.
      </aside>
    );
  }

  const bars = [
    { label: "Delivery", value: details.highlights.delivery },
    { label: "Backend", value: details.highlights.backend },
    { label: "API Perf", value: details.highlights.apiPerf },
    { label: "Security", value: details.highlights.security },
  ];

  const projectStatusLabel = (status: ExperienceRecord["projects"][number]["status"]) =>
    status === "PROD" ? "Production" : "Developpement";

  return (
    <aside className="relative overflow-hidden rounded-[22px] border border-white/15 bg-black/35 backdrop-blur-xl sm:rounded-[26px] lg:sticky lg:top-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(127,212,255,0.16),transparent_36%)]" />

      <div className="relative min-w-0 px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-xl font-semibold text-white/90 sm:text-2xl">Active Experience</h2>
      </div>

      <div className="h-px bg-white/12" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={details.id}
          initial={reduceMotion ? false : { y: 16, scale: 0.972, rotateX: 3 }}
          animate={reduceMotion ? undefined : { y: 0, scale: 1, rotateX: 0 }}
          exit={reduceMotion ? undefined : { y: -10, scale: 0.986, rotateX: -2 }}
          transition={{
            y: { type: "spring", stiffness: 210, damping: 24 },
            scale: { duration: 0.24, ease: "easeOut" },
            rotateX: { duration: 0.22, ease: "easeOut" },
          }}
          className="relative space-y-4 px-4 py-4 transform-gpu will-change-transform sm:space-y-5 sm:px-6 sm:py-5"
          style={{ transformPerspective: 900 }}
        >
        <motion.div
          key={`active-glow-${details.id}`}
          initial={reduceMotion ? false : { scale: 0.98, opacity: 0 }}
          animate={reduceMotion ? undefined : { scale: [0.98, 1.01, 1], opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_18%_12%,rgba(127,212,255,0.22),transparent_45%)]"
        />
        <section className="rounded-2xl border border-white/12 bg-black/30 p-4">
          <div className="flex flex-col gap-2.5">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 sm:h-11 sm:w-11 sm:rounded-2xl">
                <BriefcaseBusiness size={19} className="text-cyan-200" />
              </div>
              <div className="min-w-0">
                <p className="break-words text-base font-semibold leading-tight text-white/90 sm:text-lg md:text-xl">{details.role}</p>
                <p className="text-xs text-white/70 sm:text-sm">{details.period}</p>
              </div>
            </div>
            <span className="inline-flex w-fit shrink-0 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[11px] text-cyan-100 sm:px-3 sm:text-xs">
              {details.badge}
            </span>
          </div>

          <div className="mt-3 border-t border-white/10 pt-3 text-xs text-white/67 sm:text-sm">
            <p className="flex items-center gap-1">
              <MapPin size={14} className="text-white/50" />
              {details.org} - {details.city}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-2">
            <MetricPill label="Delivery" value={`-${details.metrics.deliveryGainPercent}%`} tone="cyan" />
            <MetricPill label="Couts" value={`-${details.metrics.costReductionPercent}%`} tone="emerald" />
            <MetricPill label="Users" value={`${details.metrics.usersImpacted}+`} tone="indigo" />
            <MetricPill label="Projets" value={`${details.metrics.projectsCount}`} tone="amber" />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white/88 sm:text-xl">Technos cles</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {details.stack.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className={[
                  "rounded-xl border px-2.5 py-1 text-xs sm:px-3 sm:text-sm",
                  index === 0
                    ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
                    : "border-white/12 bg-black/30 text-white/80",
                ].join(" ")}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="h-px bg-white/12" />

        <section>
          <h3 className="text-lg font-semibold text-white/88 sm:text-xl">Highlights</h3>
          <div className="mt-3 space-y-2.5">
            {bars.map((bar) => (
              <div key={bar.label} className="grid grid-cols-[70px_1fr] items-center gap-2 sm:grid-cols-[80px_1fr] sm:gap-3">
                <p className="text-xs text-white/75 sm:text-sm">{bar.label}</p>
                <div className="h-[7px] overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    key={`${details.id}-${bar.label}`}
                    initial={reduceMotion ? false : { width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                    }
                    className={[
                      "h-full rounded-full bg-gradient-to-r",
                      BAR_COLORS[bar.label] ?? "from-cyan-200 to-indigo-200",
                    ].join(" ")}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-white/12" />

        <section>
          <h3 className="text-lg font-semibold text-white/88 sm:text-xl">Projets lies</h3>
          <div className="mt-3 space-y-2.5">
            {details.projects.map((project) => (
              <div
                key={project.id}
                className="flex min-w-0 items-center gap-2 rounded-xl border border-white/12 bg-black/28 px-3 py-2"
              >
                <Link2 size={14} className="text-cyan-200" />
                <p className="min-w-0 truncate text-xs text-white/88 sm:text-sm">{project.title}</p>
                <span
                  className={[
                    "ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px]",
                    project.status === "PROD"
                      ? "bg-emerald-300/12 text-emerald-200"
                      : "bg-cyan-300/14 text-cyan-200",
                  ].join(" ")}
                >
                  {projectStatusLabel(project.status)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <button className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-black/25 px-5 py-2.5 text-sm text-white/85 transition hover:bg-black/35 sm:w-auto">
          <Play size={14} className="text-cyan-200" />
          Voir projets
        </button>
      </motion.div>
      </AnimatePresence>
    </aside>
  );
}

function MetricPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "cyan" | "emerald" | "indigo" | "amber";
}) {
  const toneClass =
    tone === "cyan"
      ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
      : tone === "emerald"
        ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
        : tone === "indigo"
          ? "border-indigo-300/30 bg-indigo-300/10 text-indigo-100"
          : "border-amber-300/30 bg-amber-300/10 text-amber-100";

  return (
    <div className={["min-w-0 rounded-xl border px-2.5 py-2", toneClass].join(" ")}>
      <div className="text-[10px] uppercase tracking-wide text-white/65">{label}</div>
      <div className="truncate text-sm font-semibold">{value}</div>
    </div>
  );
}
