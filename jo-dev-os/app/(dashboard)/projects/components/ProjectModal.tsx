"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Gauge,
  Github,
  Image as ImageIcon,
  Shield,
  Target,
  Users2,
  X,
} from "lucide-react";

import { DEFAULT_PROJECT_IMAGE } from "../constants";
import type { Project, TabKey } from "../types";
import { buildProjectDiffs, hasConfidential, isRealLink } from "../utils";
import {
  ActionBtn,
  MetaPill,
  ProjectGlyph,
  ScoreMetric,
  StatusBadge,
  TabButton,
  TagBadge,
} from "./ProjectPrimitives";

type ProjectModalProps = {
  project: Project;
  compareProject: Project | null;
  navDirection: 1 | -1;
  activeIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export function ProjectModal({
  project,
  compareProject,
  navDirection,
  activeIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: ProjectModalProps) {
  const [tabByProject, setTabByProject] = useState<Record<string, TabKey>>({});
  const tab = tabByProject[project.id] ?? "overview";
  const [showSwipeHint, setShowSwipeHint] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("jo_projects_swipe_hint_seen") !== "1";
  });
  const wheelLockRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelSignRef = useRef<1 | -1 | 0>(0);
  const swipeStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && canPrev) onPrev();
      if (e.key === "ArrowRight" && canNext) onNext();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext, canPrev, canNext]);

  useEffect(() => {
    if (showSwipeHint) {
      const timer = window.setTimeout(() => {
        setShowSwipeHint(false);
        window.localStorage.setItem("jo_projects_swipe_hint_seen", "1");
      }, 2600);
      return () => window.clearTimeout(timer);
    }
  }, [showSwipeHint]);

  const coverUrl = project.previewImage ?? project.cover ?? DEFAULT_PROJECT_IMAGE;
  const differences = compareProject ? buildProjectDiffs(project, compareProject) : [];

  const onWheelNavigate = (e: React.WheelEvent<HTMLDivElement>) => {
    const horizontalDelta = Math.abs(e.deltaX) > 0.5 ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (!horizontalDelta) return;

    const sign: 1 | -1 = horizontalDelta > 0 ? 1 : -1;
    if (wheelSignRef.current !== 0 && wheelSignRef.current !== sign) {
      wheelDeltaRef.current = horizontalDelta;
    } else {
      wheelDeltaRef.current += horizontalDelta;
    }
    wheelSignRef.current = sign;

    const threshold = 42;
    if (Math.abs(wheelDeltaRef.current) < threshold || wheelLockRef.current) return;

    e.preventDefault();
    if (wheelDeltaRef.current > 0 && canNext) onNext();
    if (wheelDeltaRef.current < 0 && canPrev) onPrev();

    wheelDeltaRef.current = 0;
    wheelSignRef.current = 0;
    wheelLockRef.current = true;
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 280);
  };

  const onPointerDownCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    swipeStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const onPointerUpCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;

    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const dt = Date.now() - start.time;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    const isHorizontalSwipe = absX > 70 && absX > absY * 1.25 && dt < 900;
    if (!isHorizontalSwipe) return;

    if (dx < 0 && canNext) onNext();
    if (dx > 0 && canPrev) onPrev();
  };

  return (
    <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="absolute left-1/2 top-1/2 w-[min(1100px,98vw)] max-h-[96dvh] -translate-x-1/2 -translate-y-1/2 md:w-[min(1100px,98vw)]"
      >
        <div className="relative flex max-h-[96dvh] flex-col overflow-hidden rounded-[20px] border border-[#16242A] bg-[#0B1220]/80 backdrop-blur-xl shadow-[0_34px_140px_rgba(0,0,0,0.80)] sm:rounded-[28px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-300/25 via-sky-300/70 to-cyan-300/25" />
          <div className="relative flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/25 sm:h-11 sm:w-11 sm:rounded-2xl">
                <ProjectGlyph project={project} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-[15px] font-semibold text-white/90 sm:text-[16px]">{project.name}</div>
                  <StatusBadge status={project.status} />
                  {(project.tags ?? []).map((t) => (
                    <TagBadge key={t} tag={t} />
                  ))}
                </div>
                <div className="line-clamp-1 text-[11px] text-white/55 sm:text-[12px]">{project.tagline}</div>
                <div className="mt-1 hidden items-center gap-2 text-[11px] text-cyan-200/85 sm:flex">
                  <span>
                    Project {activeIndex + 1}/{totalCount}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Navigation: clavier, swipe horizontal, ou Shift + molette</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                aria-label="Projet precedent"
                onClick={onPrev}
                disabled={!canPrev}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 disabled:opacity-35 sm:h-10 sm:w-10 sm:rounded-2xl"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                aria-label="Projet suivant"
                onClick={onNext}
                disabled={!canNext}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 disabled:opacity-35 sm:h-10 sm:w-10 sm:rounded-2xl"
              >
                <ChevronRight size={17} />
              </button>
              <button
                aria-label="Fermer modal projet"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 sm:h-10 sm:w-10 sm:rounded-2xl"
              >
                <X size={17} />
              </button>
            </div>
          </div>
          <div className="px-3 pb-2 sm:px-6 sm:pb-3">
            <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300"
                style={{ width: `${Math.max(8, ((activeIndex + 1) / Math.max(1, totalCount)) * 100)}%` }}
              />
            </div>
          </div>

          <div
            onWheel={onWheelNavigate}
            onPointerDownCapture={onPointerDownCapture}
            onPointerUpCapture={onPointerUpCapture}
            className="relative overflow-y-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 sm:py-6 touch-pan-y"
            style={{ maxHeight: "calc(96dvh - 74px)" }}
          >
            <AnimatePresence>
              {showSwipeHint && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="mb-2 inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[11px] text-cyan-100"
                >
                  Swipe horizontal pour changer de projet
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                custom={navDirection}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 72 : -72,
                    opacity: 0,
                    scale: 0.985,
                    rotate: dir > 0 ? -0.8 : 0.8,
                    filter: "blur(4px)",
                  }),
                  center: { x: 0, opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -72 : 72,
                    opacity: 0,
                    scale: 1.012,
                    rotate: dir > 0 ? 0.8 : -0.8,
                    filter: "blur(4px)",
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 220, damping: 24 },
                  opacity: { duration: 0.2, ease: "easeOut" },
                  scale: { duration: 0.24, ease: "easeOut" },
                  rotate: { duration: 0.22, ease: "easeOut" },
                  filter: { duration: 0.2, ease: "easeOut" },
                }}
                className="relative grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-12"
              >
                <motion.div
                  initial={{ x: navDirection > 0 ? 30 : -30, opacity: 0.94, scale: 0.992, filter: "blur(2px)" }}
                  animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ x: navDirection > 0 ? -30 : 30, opacity: 0.94, scale: 1.006, filter: "blur(2px)" }}
                  transition={{
                    x: { type: "spring", stiffness: 210, damping: 24 },
                    opacity: { duration: 0.24 },
                    scale: { duration: 0.26 },
                    filter: { duration: 0.22 },
                  }}
                  className="relative lg:col-span-5"
                >
                  <motion.div
                    key={`image-pulse-${project.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.22, 0] }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 z-10 rounded-[26px] bg-[radial-gradient(circle_at_45%_45%,rgba(123,224,255,0.35),transparent_62%)]"
                  />
                  <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                    <div className="flex items-center gap-2 p-3 text-xs text-white/55 sm:p-4">
                      {hasConfidential(project) ? (
                        <>
                          <Shield size={14} /> Apercu non affiche (confidentiel)
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} /> Preview
                        </>
                      )}
                    </div>
                    {hasConfidential(project) ? (
                      <div className="h-[210px] w-full bg-[radial-gradient(circle_at_50%_30%,rgba(127,212,255,0.12),transparent_60%)] sm:h-[320px]" />
                    ) : (
                      <div className="h-[210px] w-full bg-cover bg-center sm:h-[320px]" style={{ backgroundImage: `url('${coverUrl}')` }} />
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: navDirection > 0 ? 44 : -44, opacity: 0.9, scale: 0.992, filter: "blur(3px)" }}
                  animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ x: navDirection > 0 ? -44 : 44, opacity: 0.9, scale: 1.008, filter: "blur(3px)" }}
                  transition={{
                    x: { type: "spring", stiffness: 195, damping: 23 },
                    opacity: { duration: 0.26 },
                    scale: { duration: 0.28 },
                    filter: { duration: 0.24 },
                  }}
                  className="lg:col-span-7"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[20px] font-semibold text-white/90 sm:text-[22px]">{project.name}</div>
                    <div className="h-px flex-1 rounded-full bg-gradient-to-r from-cyan-300/75 via-sky-300/35 to-transparent" />
                  </div>
                  <div className="mt-2 text-[13px] leading-relaxed text-white/65 sm:text-sm">{project.description}</div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <MetaPill icon={<Clock3 size={13} />} label="Periode" value={project.period} />
                    <MetaPill icon={<Users2 size={13} />} label="Role" value={project.role} />
                    <MetaPill icon={<Target size={13} />} label="Scope" value={project.scope} />
                  </div>

                  <div className="relative mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="pointer-events-none absolute bottom-3 left-0 top-3 w-[2px] rounded-full bg-gradient-to-b from-cyan-300/85 via-sky-300/65 to-transparent" />
                    <div className="text-xs text-white/45">Contexte projet</div>
                    <p className="mt-1 text-sm leading-relaxed text-white/72">{project.context}</p>
                  </div>

                  <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="pointer-events-none absolute bottom-3 left-0 top-3 w-[2px] rounded-full bg-gradient-to-b from-violet-300/80 via-fuchsia-300/60 to-transparent" />
                    <div className="text-xs text-white/45">Project scorecard</div>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <ScoreMetric label="Complexite" value={project.scorecard.complexity} tone="cyan" />
                      <ScoreMetric label="Impact" value={project.scorecard.impact} tone="emerald" />
                      <ScoreMetric label="Maintenance" value={project.scorecard.maintenance} tone="amber" />
                      <ScoreMetric label="Maturite" value={project.scorecard.maturity} tone="violet" />
                    </div>
                  </div>

                  <div className="mt-5 -mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <TabButton active={tab === "overview"} onClick={() => setTabByProject((prev) => ({ ...prev, [project.id]: "overview" }))}>
                      Overview
                    </TabButton>
                    <TabButton active={tab === "tech"} onClick={() => setTabByProject((prev) => ({ ...prev, [project.id]: "tech" }))}>
                      Tech
                    </TabButton>
                    <TabButton active={tab === "business"} onClick={() => setTabByProject((prev) => ({ ...prev, [project.id]: "business" }))}>
                      Business
                    </TabButton>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {tab === "overview" && (
                      <motion.div key="ov" initial={{ y: 8, opacity: 0.9 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0.9 }} className="relative mt-5 pt-3">
                        <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                        <div className="font-semibold text-white/90">Highlights</div>
                        <ul className="mt-2 space-y-2 text-sm text-white/72">
                          {project.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2">
                              <span className="mt-[7px] h-[5px] w-[5px] rounded-full bg-cyan-200" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
                          {isRealLink(project.links.live) && (
                            <ActionBtn href={project.links.live!} icon={<ExternalLink size={16} />}>
                              Voir le site
                            </ActionBtn>
                          )}
                          {isRealLink(project.links.github) && (
                            <ActionBtn href={project.links.github!} icon={<Github size={16} />}>
                              GitHub
                            </ActionBtn>
                          )}
                        </div>
                      </motion.div>
                    )}
                    {tab === "tech" && (
                      <motion.div key="tech" initial={{ y: 8, opacity: 0.9 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0.9 }} className="relative mt-5 pt-3">
                        <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
                        <div className="text-xs text-white/45">Stack detaillee</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.stack.map((s) => (
                            <span key={s} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 text-sm font-semibold text-white/88">Contributions cles</div>
                        <ul className="mt-2 space-y-2 text-sm text-white/72">
                          {project.contributions.map((c) => (
                            <li key={c} className="flex items-start gap-2">
                              <span className="mt-[7px] h-[5px] w-[5px] rounded-full bg-emerald-200" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                    {tab === "business" && (
                      <motion.div key="biz" initial={{ y: 8, opacity: 0.9 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0.9 }} className="relative mt-5 pt-3">
                        <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
                        <div className="flex items-center gap-2 font-semibold text-white/90">
                          <Gauge size={14} className="text-[#9fd7ff]" /> Impact business
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {project.impacts.map((item) => (
                            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                              <div className="text-[11px] text-white/50">{item.label}</div>
                              <div className="mt-1 text-lg font-semibold text-cyan-200">{item.value}</div>
                              <div className="mt-1 text-[11px] text-white/55">{item.note}</div>
                            </div>
                          ))}
                        </div>

                        {differences.length > 0 && (
                          <div className="mt-5 rounded-2xl border border-cyan-300/25 bg-cyan-300/8 p-4">
                            <div className="text-sm font-semibold text-cyan-100">Differences cles</div>
                            <div className="mt-1 text-xs text-cyan-100/70">vs {compareProject?.name}</div>
                            <ul className="mt-2 space-y-1.5 text-sm text-white/78">
                              {differences.map((d) => (
                                <li key={d} className="flex items-start gap-2">
                                  <span className="mt-[7px] h-[5px] w-[5px] rounded-full bg-cyan-200" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-5 text-sm font-semibold text-white/88">Resultats obtenus</div>
                        <ul className="mt-2 space-y-2 text-sm text-white/72">
                          {project.outcomes.map((o) => (
                            <li key={o} className="flex items-start gap-2">
                              <span className="mt-[7px] h-[5px] w-[5px] rounded-full bg-amber-200" />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="relative mt-6 overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/6 p-4">
                          <div className="pointer-events-none absolute bottom-3 left-0 top-3 w-[2px] rounded-full bg-gradient-to-b from-cyan-300/85 via-sky-300/65 to-transparent" />
                          <div className="text-sm font-semibold text-white/90">Timeline du projet</div>
                          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4">
                            {project.timeline.map((step, idx) => (
                              <div key={step.phase} className="relative rounded-xl border border-white/10 bg-black/20 p-3">
                                {idx < project.timeline.length - 1 && (
                                  <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-[2px] w-4 -translate-y-1/2 bg-gradient-to-r from-cyan-300/70 to-transparent sm:block" />
                                )}
                                <div className="flex items-center gap-2">
                                  <span
                                    className={[
                                      "h-2.5 w-2.5 rounded-full",
                                      step.state === "done"
                                        ? "bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                                        : step.state === "current"
                                          ? "bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                          : "bg-white/35",
                                    ].join(" ")}
                                  />
                                  <span className="text-xs font-semibold text-white/85">{step.phase}</span>
                                </div>
                                <div className="mt-1 text-[11px] text-white/58">{step.note}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="sticky bottom-0 z-20 flex items-center gap-2 border-t border-white/10 bg-[#0B1220]/92 p-2 sm:hidden">
            <button
              onClick={onPrev}
              disabled={!canPrev}
              className="flex-1 rounded-xl border border-white/12 bg-black/30 px-3 py-2 text-sm text-white/85 disabled:opacity-40"
            >
              Precedent
            </button>
            <button
              onClick={onNext}
              disabled={!canNext}
              className="flex-1 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100 disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
