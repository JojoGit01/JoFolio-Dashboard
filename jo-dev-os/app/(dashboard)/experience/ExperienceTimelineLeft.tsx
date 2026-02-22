"use client";

import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export type ExperienceKind = "CDI" | "FREELANCE" | "STAGE" | "PERSO";
export type ExperienceViewMode = "timeline" | "cards";

export type ExperienceRecord = {
  id: string;
  role: string;
  period: string;
  timelineLabel: string;
  badge: string;
  kind: ExperienceKind;
  org: string;
  city: string;
  impacts: string[];
  stack: string[];
  highlights: {
    delivery: number;
    backend: number;
    apiPerf: number;
    security: number;
  };
  metrics: {
    deliveryGainPercent: number;
    automationGainPercent: number;
    reliabilityGainPercent: number;
    costReductionPercent: number;
    usersImpacted: number;
    projectsCount: number;
  };
  projects: { id: string; title: string; status: "PROD" | "DEV" }[];
  featured?: boolean;
};

const KIND_STYLE: Record<ExperienceKind, string> = {
  CDI: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  FREELANCE: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  STAGE: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  PERSO: "border-indigo-300/35 bg-indigo-300/10 text-indigo-100",
};

export default function ExperienceTimelineLeft({
  items,
  selectedId,
  onSelect,
  viewMode,
}: {
  items: ExperienceRecord[];
  selectedId: string;
  onSelect: (id: string) => void;
  viewMode: ExperienceViewMode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={viewMode === "timeline" ? "relative pl-9 sm:pl-14" : "relative"}>
      {viewMode === "timeline" && (
        <motion.div
          initial={reduceMotion ? false : { scaleY: 0.08 }}
          animate={reduceMotion ? undefined : { scaleY: 1 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          style={{ transformOrigin: "top center" }}
          className="pointer-events-none absolute left-[14px] top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-cyan-200/85 via-cyan-200/30 to-cyan-200/10 sm:left-[24px]"
        />
      )}

      <motion.div
        initial={false}
        animate="show"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.045,
            },
          },
        }}
        className={viewMode === "timeline" ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 gap-4 md:grid-cols-2"}
      >
        {items.map((item, index) => {
          const active = item.id === selectedId;
          const wide = viewMode === "timeline" ? "" : "md:col-span-1";
          const prevLabel = index > 0 ? items[index - 1].timelineLabel : null;
          const showDateSeparator = viewMode === "timeline" && item.timelineLabel !== prevLabel;

          return (
            <motion.div
              key={item.id}
              variants={{ show: { transition: { duration: 0.16 } } }}
              initial={{ y: 8, scale: 0.998 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={wide}
            >
              {showDateSeparator && (
                <div className="relative mb-2 pl-0 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100/95 sm:text-xs">
                      {item.timelineLabel}
                    </span>
                    <span className="h-px flex-1 rounded-full bg-gradient-to-r from-cyan-300/45 to-transparent" />
                  </div>
                </div>
              )}

              <button onClick={() => onSelect(item.id)} className="group relative w-full text-left">
                {viewMode === "timeline" && (
                  <>
                    <div
                      className="pointer-events-none absolute -left-[25px] top-[34px] h-[2px] w-[18px] rounded-full sm:-left-[40px] sm:top-[44px] sm:w-[34px]"
                      style={{
                        background: active
                          ? "linear-gradient(90deg, rgba(186,237,255,0.95), rgba(186,237,255,0.0))"
                          : "linear-gradient(90deg, rgba(186,237,255,0.45), rgba(186,237,255,0.0))",
                      }}
                    />
                    <div className="pointer-events-none absolute -left-[33px] top-[28px] h-4 w-4 rounded-full border border-cyan-100/35 bg-cyan-100/70 shadow-[0_0_15px_rgba(127,212,255,0.75)] sm:-left-[47px] sm:top-[35px] sm:h-5 sm:w-5" />
                  </>
                )}

                <motion.article
                  layout
                  initial={false}
                  animate={reduceMotion ? undefined : { y: active ? -2 : 0, scale: active ? 1.008 : 1 }}
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.004 }}
                  transition={{ type: "spring", stiffness: 260, damping: 23, mass: 0.9 }}
                  className="transform-gpu will-change-transform"
                >
                <div
                  className={[
                    "relative overflow-hidden rounded-[22px] border backdrop-blur-md transition-all duration-200",
                    "px-4 py-3.5 sm:px-6 sm:py-5",
                    active
                      ? "border-cyan-200/30 bg-black/35 shadow-[0_0_0_1px_rgba(170,230,255,0.16),0_16px_44px_rgba(4,10,18,0.75)]"
                      : "border-white/15 bg-black/30 hover:border-white/28 hover:bg-black/35",
                  ].join(" ")}
                >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight text-white/92 sm:text-xl md:text-2xl">{item.role}</h3>
                    <p className="mt-1 text-sm text-white/72">{item.period}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-white/62 sm:text-sm">
                      <MapPin size={14} className="text-white/55" />
                      {item.org} - {item.city}
                    </p>
                  </div>
                  <span
                    className={[
                      "inline-flex rounded-2xl border px-2.5 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm",
                      KIND_STYLE[item.kind],
                    ].join(" ")}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <ResultChip label={`-${item.metrics.deliveryGainPercent}% delivery`} tone="cyan" />
                  <ResultChip label={`-${item.metrics.costReductionPercent}% couts`} tone="emerald" />
                  <ResultChip label={`${item.metrics.usersImpacted}+ users`} tone="indigo" />
                </div>

                {item.impacts.length > 0 && (
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-base font-semibold text-white/88 sm:text-lg">Impacts</p>
                    <ul className="mt-2 space-y-1 text-sm text-white/73">
                      {item.impacts.map((impact) => (
                        <li key={impact} className="flex items-start gap-2">
                          <span className="mt-[8px] h-[6px] w-[6px] rounded-full bg-cyan-200/90" />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-xl border border-white/12 bg-black/35 px-2.5 py-1 text-[11px] text-white/78 sm:px-3 sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 h-[7px] w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-emerald-200 to-indigo-200"
                    style={{ width: `${Math.max(item.highlights.delivery, 30)}%` }}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_85%_15%,rgba(127,212,255,0.14),transparent_32%)]" />
                </div>
                </motion.article>
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function ResultChip({ label, tone }: { label: string; tone: "cyan" | "emerald" | "indigo" }) {
  const toneClass =
    tone === "cyan"
      ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
      : tone === "emerald"
        ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
        : "border-indigo-300/30 bg-indigo-300/10 text-indigo-100";

  return <span className={["rounded-xl border px-2.5 py-1 text-[11px]", toneClass].join(" ")}>{label}</span>;
}



