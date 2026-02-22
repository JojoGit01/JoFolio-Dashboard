"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Sparkles,
  Search,
  Folder,
  ArrowRight,
  Shield,
  CheckCircle2,
  Clock3,
  Radio,
  Star,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Users2,
  Target,
  Gauge,
  Image as ImageIcon,
} from "lucide-react";
import { PORTFOLIO_DATA, type ExperienceProject, type ProjectRecord } from "@/app/data/portfolioData";

type ProjectStatus = "WIP" | "DONE";
type ProjectTag = "LIVE" | "CURRENT" | "CONFIDENTIAL";
type TabKey = "overview" | "tech" | "business";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  tags?: ProjectTag[];
  stack: string[];
  highlights: string[];
  links: { github?: string; live?: string; caseStudy?: string };
  cover?: string;
  cardImage?: string;
  previewImage?: string;
  iconImage?: string;
  icon?: "twitter" | "weighty" | "portfolio" | "folder";
  period: string;
  role: string;
  context: string;
  scope: string;
  contributions: string[];
  outcomes: string[];
  impacts: Array<{ label: string; value: string; note: string }>;
  scorecard: {
    complexity: number;
    impact: number;
    maintenance: number;
    maturity: number;
  };
  timeline: Array<{
    phase: "Conception" | "Build" | "Release" | "Iterations";
    state: "done" | "current" | "next";
    note: string;
  }>;
};

const DEFAULT_PROJECT_IMAGE = "/images/interets/interet_manger.png";

export default function ProjectsPage() {
  const reduceMotion = useReducedMotion();
  const projects = useMemo<Project[]>(() => buildProjectsFromData(), []);
  const [isLoading, setIsLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | ProjectStatus>("ALL");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [navDirection, setNavDirection] = useState<1 | -1>(1);
  const [compareFromId, setCompareFromId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const okQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q);
      const okStatus = status === "ALL" ? true : p.status === status;
      return okQuery && okStatus;
    });
  }, [projects, query, status]);

  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [projects, activeId]);
  const activeIndex = useMemo(
    () => (activeProject ? projects.findIndex((p) => p.id === activeProject.id) : -1),
    [projects, activeProject]
  );
  const compareProject = useMemo(() => projects.find((p) => p.id === compareFromId) ?? null, [projects, compareFromId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 320);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.section
      initial={reduceMotion ? false : { y: 10, opacity: 0.98 }}
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="relative mt-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 backdrop-blur-md md:w-auto">
          <Search size={18} className="text-white/55" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet..."
            className="w-full min-w-0 bg-transparent text-sm text-white/80 placeholder:text-white/35 outline-none md:w-[260px]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip active={status === "ALL"} onClick={() => setStatus("ALL")} icon={<Sparkles size={14} />}>Tous</Chip>
          <Chip active={status === "WIP"} onClick={() => setStatus("WIP")} icon={<Clock3 size={14} />}>Developpement</Chip>
          <Chip active={status === "DONE"} onClick={() => setStatus("DONE")} icon={<CheckCircle2 size={14} />}>Production</Chip>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} className="overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-2 sm:p-4">
              <div className="h-[76px] animate-pulse rounded-xl bg-white/10 sm:h-[140px]" />
              <div className="mt-3 h-4 animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/10" />
            </div>
          ))
        ) : (
          <AnimatePresence initial={false}>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.99 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <ProjectCard
                  project={p}
                  onOpen={() => {
                    setCompareFromId(null);
                    setNavDirection(1);
                    setActiveId(p.id);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm text-white/60">
          Aucun projet ne correspond a ta recherche.
        </div>
      )}

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            compareProject={compareProject}
            navDirection={navDirection}
            activeIndex={activeIndex}
            totalCount={projects.length}
            onClose={() => setActiveId(null)}
            canPrev={activeIndex > 0}
            canNext={activeIndex >= 0 && activeIndex < projects.length - 1}
            onPrev={() => {
              if (activeIndex > 0 && activeProject) {
                setCompareFromId(activeProject.id);
                setNavDirection(-1);
                setActiveId(projects[activeIndex - 1].id);
              }
            }}
            onNext={() => {
              if (activeIndex >= 0 && activeIndex < projects.length - 1 && activeProject) {
                setCompareFromId(activeProject.id);
                setNavDirection(1);
                setActiveId(projects[activeIndex + 1].id);
              }
            }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-40, 40], [6, -6]);
  const ry = useTransform(mx, [-40, 40], [-8, 8]);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
  };

  const coverUrl = project.cardImage ?? project.cover ?? DEFAULT_PROJECT_IMAGE;

  return (
    <button
      aria-label={`Ouvrir le projet ${project.name}`}
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
    >
      <div className="relative">
        <div className="pointer-events-none absolute -inset-[1px] rounded-[22px] bg-[linear-gradient(180deg,rgba(127,212,255,0.22),rgba(127,212,255,0.06))] opacity-80" />
        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0B1220]/35 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
        >
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#7fd4ff]/30 to-transparent" />
          <div className="relative h-[76px] w-full sm:h-[140px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${coverUrl}')` }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.62))]" />
            <div className="absolute left-2 top-2 flex items-center gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/25 sm:h-11 sm:w-11 sm:rounded-2xl">
                <ProjectGlyph project={project} />
              </div>
            </div>
            <div className="absolute left-2 bottom-2 hidden flex-wrap gap-1.5 sm:left-4 sm:bottom-4 sm:flex sm:gap-2">
              {(project.tags ?? []).map((t) => <TagBadge key={t} tag={t} />)}
            </div>
          </div>
          <div className="p-2 sm:p-5">
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <div className="line-clamp-2 text-[11px] font-semibold leading-tight text-white/90 sm:truncate sm:text-[15px] sm:leading-normal">
                  {project.name}
                </div>
                <div className="mt-1 hidden line-clamp-2 text-[12px] text-white/55 sm:block">{project.tagline}</div>
              </div>
              <div className="flex items-center gap-2">
                <MiniStatusBadge status={project.status} />
                <ArrowRight className="mt-1 hidden text-white/35 transition group-hover:text-white/65 sm:block" size={18} />
              </div>
            </div>
            <div className="mt-2 hidden items-center gap-2 rounded-xl border border-white/12 bg-black/20 px-3 py-2 text-xs text-white/75 transition group-hover:border-[#7fd4ff]/35 group-hover:bg-[#7fd4ff]/10 group-hover:text-white/90 sm:mt-4 sm:inline-flex sm:py-1.5">
              <FolderOpen size={14} className="text-[#7fd4ff]" /> Ouvrir dossier
            </div>
          </div>
        </motion.div>
      </div>
    </button>
  );
}

function ProjectModal({
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
}: {
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
}) {
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
                  {(project.tags ?? []).map((t) => <TagBadge key={t} tag={t} />)}
                </div>
                <div className="line-clamp-1 text-[11px] text-white/55 sm:text-[12px]">{project.tagline}</div>
                <div className="mt-1 hidden items-center gap-2 text-[11px] text-cyan-200/85 sm:flex">
                  <span>Project {activeIndex + 1}/{totalCount}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Navigation: clavier, swipe horizontal, ou Shift + molette</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button aria-label="Projet precedent" onClick={onPrev} disabled={!canPrev} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 disabled:opacity-35 sm:h-10 sm:w-10 sm:rounded-2xl"><ChevronLeft size={17} /></button>
              <button aria-label="Projet suivant" onClick={onNext} disabled={!canNext} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 disabled:opacity-35 sm:h-10 sm:w-10 sm:rounded-2xl"><ChevronRight size={17} /></button>
              <button aria-label="Fermer modal projet" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 sm:h-10 sm:w-10 sm:rounded-2xl"><X size={17} /></button>
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
                      {hasConfidential(project) ? <><Shield size={14} /> Apercu non affiche (confidentiel)</> : <><ImageIcon size={14} /> Preview</>}
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
                    <div className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-cyan-300/85 via-sky-300/65 to-transparent" />
                    <div className="text-xs text-white/45">Contexte projet</div>
                    <p className="mt-1 text-sm leading-relaxed text-white/72">{project.context}</p>
                  </div>

                  <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-violet-300/80 via-fuchsia-300/60 to-transparent" />
                    <div className="text-xs text-white/45">Project scorecard</div>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <ScoreMetric label="Complexite" value={project.scorecard.complexity} tone="cyan" />
                      <ScoreMetric label="Impact" value={project.scorecard.impact} tone="emerald" />
                      <ScoreMetric label="Maintenance" value={project.scorecard.maintenance} tone="amber" />
                      <ScoreMetric label="Maturite" value={project.scorecard.maturity} tone="violet" />
                    </div>
                  </div>

                  <div className="mt-5 -mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <TabButton
                      active={tab === "overview"}
                      onClick={() => setTabByProject((prev) => ({ ...prev, [project.id]: "overview" }))}
                    >
                      Overview
                    </TabButton>
                    <TabButton
                      active={tab === "tech"}
                      onClick={() => setTabByProject((prev) => ({ ...prev, [project.id]: "tech" }))}
                    >
                      Tech
                    </TabButton>
                    <TabButton
                      active={tab === "business"}
                      onClick={() => setTabByProject((prev) => ({ ...prev, [project.id]: "business" }))}
                    >
                      Business
                    </TabButton>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {tab === "overview" && (
                      <motion.div
                        key="ov"
                        initial={{ y: 8, opacity: 0.9 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0.9 }}
                        className="relative mt-5 pt-3"
                      >
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
                      <motion.div
                        key="tech"
                        initial={{ y: 8, opacity: 0.9 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0.9 }}
                        className="relative mt-5 pt-3"
                      >
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
                      <motion.div
                        key="biz"
                        initial={{ y: 8, opacity: 0.9 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0.9 }}
                        className="relative mt-5 pt-3"
                      >
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
                          <div className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-cyan-300/85 via-sky-300/65 to-transparent" />
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

function isRealLink(v?: string) {
  if (!v) return false;
  const t = v.trim();
  return !(t === "" || t === "#");
}

function hasConfidential(project: Project) {
  return (project.tags ?? []).includes("CONFIDENTIAL");
}

function buildProjectDiffs(current: Project, previous: Project) {
  const lines: string[] = [];
  if (current.status !== previous.status) {
    lines.push(`Statut: ${statusLabel(previous.status)} -> ${statusLabel(current.status)}`);
  }
  const added = current.stack.filter((s) => !previous.stack.includes(s));
  if (added.length) lines.push(`Nouvelles technos: ${added.slice(0, 3).join(", ")}`);
  current.impacts.forEach((imp) => {
    const old = previous.impacts.find((o) => o.label === imp.label);
    if (old && old.value !== imp.value && lines.length < 3) lines.push(`${imp.label}: ${old.value} -> ${imp.value}`);
  });
  if (lines.length === 0) lines.push("Progression continue sans rupture majeure.");
  return lines.slice(0, 3);
}

function ProjectGlyph({ project }: { project: Project }) {
  if (project.iconImage) {
    return (
      <span
        className="block h-5 w-5 rounded-[4px] bg-contain bg-center bg-no-repeat sm:h-7 sm:w-7"
        style={{ backgroundImage: `url('${project.iconImage}')` }}
      />
    );
  }

  switch (project.icon) {
    case "twitter":
      return <span className="font-bold text-[#7fd4ff]">TW</span>;
    case "weighty":
      return <span className="font-bold text-[#7fd4ff]">W</span>;
    case "portfolio":
      return <span className="font-bold text-[#7fd4ff]">Jo</span>;
    case "folder":
      return <Folder size={18} className="text-[#7fd4ff]" />;
    default:
      return <ImageIcon size={18} className="text-[#7fd4ff]" />;
  }
}

function Chip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
        active ? "border-[#7fd4ff]/35 bg-[#7fd4ff]/15 text-white/85" : "border-white/10 bg-black/10 text-white/60 hover:bg-black/20",
      ].join(" ")}
    >
      {icon}
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={[
        "rounded-full border px-2 py-0.5 text-[11px]",
        status === "DONE" ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/80" : "border-amber-300/25 bg-amber-300/10 text-amber-100/80",
      ].join(" ")}
    >
      {statusLabel(status)}
    </span>
  );
}

function MiniStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={[
        "rounded-full border px-1.5 py-0.5 text-[9px] sm:px-2 sm:text-[10px]",
        status === "DONE" ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/75" : "border-amber-300/25 bg-amber-300/10 text-amber-100/75",
      ].join(" ")}
    >
      {statusMiniLabel(status)}
    </span>
  );
}

function statusLabel(status: ProjectStatus) {
  return status === "DONE" ? "Production" : "Developpement";
}

function statusMiniLabel(status: ProjectStatus) {
  return status === "DONE" ? "PROD" : "DEV";
}

function TagBadge({ tag }: { tag: ProjectTag }) {
  const map: Record<ProjectTag, { label: string; cls: string; icon: React.ReactNode }> = {
    LIVE: { label: "PROD", cls: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/80", icon: <Radio size={12} className="text-emerald-200" /> },
    CURRENT: { label: "EN COURS", cls: "border-[#7fd4ff]/30 bg-[#7fd4ff]/12 text-white/85", icon: <Star size={12} className="text-[#7fd4ff]" /> },
    CONFIDENTIAL: { label: "CONFIDENTIEL", cls: "border-white/15 bg-white/[0.06] text-white/70", icon: <Shield size={12} className="text-white/60" /> },
  };
  const v = map[tag];
  return <span className={["inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px]", v.cls].join(" ")}>{v.icon}{v.label}</span>;
}

function ActionBtn({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white/80 transition hover:bg-black/30 sm:flex-1"
    >
      {icon}
      {children}
    </a>
  );
}

function MetaPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
      <div className="flex items-center gap-2 text-[11px] text-white/50"><span className="text-[#9fd7ff]">{icon}</span>{label}</div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

function ScoreMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "cyan" | "emerald" | "amber" | "violet";
}) {
  const toneClass =
    tone === "cyan"
      ? "bg-cyan-300"
      : tone === "emerald"
        ? "bg-emerald-300"
        : tone === "amber"
          ? "bg-amber-300"
          : "bg-violet-300";

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-2.5 py-2 sm:px-3 sm:py-2.5">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/88">{value}/5</div>
      <div className="mt-1.5 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={`${label}-${i}`}
            className={[
              "h-[4px] w-full rounded-full",
              i < value ? toneClass : "bg-white/15",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  const key = String(children).toLowerCase();
  const color =
    key === "overview"
      ? "from-cyan-300/65 via-sky-300/45 to-transparent"
      : key === "tech"
        ? "from-emerald-300/65 via-lime-300/45 to-transparent"
        : "from-amber-300/65 via-orange-300/45 to-transparent";

  return (
    <button
      onClick={onClick}
      className={[
        "relative shrink-0 overflow-hidden rounded-full border px-3 py-1.5 text-xs transition",
        active ? "border-[#7fd4ff]/35 bg-[#7fd4ff]/15 text-white/90" : "border-white/10 bg-black/15 text-white/62 hover:bg-black/25",
      ].join(" ")}
    >
      {active && <span className={["pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r", color].join(" ")} />}
      {children}
    </button>
  );
}

function buildProjectsFromData(): Project[] {
  const projectRecords = PORTFOLIO_DATA.projects.map(fromProjectRecord);
  const expRecords = PORTFOLIO_DATA.experiences.flatMap((exp) =>
    exp.projects.map((p) => fromExperienceProject(p, exp.title, `${exp.startYear} - ${exp.endYear}`, exp.context))
  );
  return [...projectRecords, ...expRecords];
}

function fromProjectRecord(source: ProjectRecord): Project {
  const status = toModalStatus(source.status);
  const gains = source.businessImpact;
  const businessOutcomes = buildBusinessOutcomes(gains);
  return {
    id: source.id,
    name: source.name,
    tagline: source.summary,
    description: source.summary,
    status,
    tags: toProjectTags(source.status),
    stack: source.stack,
    highlights: source.highlights.length > 0 ? source.highlights : ["a remplir"],
    links: normalizeLinks(source.links.repo, source.links.demo, source.links.caseStudy),
    cover: normalizeCover(source.cover),
    cardImage: normalizeCover(source.cardImage),
    previewImage: normalizeCover(source.previewImage),
    iconImage: normalizeCover(source.icon),
    icon: inferProjectIcon(source.name),
    period: source.period,
    role: source.role,
    context: `${source.summary} Projet ${source.type.toLowerCase()} porte en tant que ${source.role}.`,
    scope: source.type,
    contributions: source.highlights.length > 0 ? source.highlights : ["a remplir"],
    outcomes: businessOutcomes.length ? businessOutcomes : source.highlights.slice(0, 3),
    impacts: [
      {
        label: "Temps delivery",
        value: signedPercent(gains.deliveryGainPercent),
        note: buildImpactNote("delivery", gains.deliveryGainPercent),
      },
      {
        label: "Stabilite",
        value: signedPercent(gains.reliabilityGainPercent),
        note: buildImpactNote("reliability", gains.reliabilityGainPercent),
      },
      {
        label: "Automatisation",
        value: signedPercent(gains.automationGainPercent),
        note: buildImpactNote("automation", gains.automationGainPercent),
      },
    ],
    scorecard: {
      complexity: clampToFive(source.scorecard.complexity),
      impact: clampToFive(source.scorecard.impact),
      maintenance: clampToFive(source.scorecard.maintenance),
      maturity: clampToFive(source.scorecard.maturity),
    },
    timeline: buildTimeline(source.status, source.name),
  };
}

function fromExperienceProject(source: ExperienceProject, role: string, period: string, context: string): Project {
  const status = toModalStatus(source.status);
  const deliveryGain =
    source.deliveryTimeBeforeHours > 1
      ? Math.round(
          ((source.deliveryTimeBeforeHours * 60 - source.deliveryTimeAfterMinutes) / (source.deliveryTimeBeforeHours * 60)) *
            100
        )
      : 1;
  return {
    id: `exp-${source.id}`,
    name: source.name,
    tagline: source.summary,
    description: source.summary,
    status,
    tags: toProjectTags(source.status),
    stack: source.stack,
    highlights: source.actions.length ? source.actions : ["a remplir"],
    links: normalizeLinks(source.links.repo, source.links.demo, source.links.caseStudy),
    cover: normalizeCover(source.cover),
    cardImage: normalizeCover(source.cardImage),
    previewImage: normalizeCover(source.previewImage),
    iconImage: normalizeCover(source.icon),
    icon: inferProjectIcon(source.name),
    period,
    role,
    context: `${context}. ${source.summary}`,
    scope: inferExperienceScope(source),
    contributions: source.actions.length ? source.actions : ["a remplir"],
    outcomes: source.results.length ? source.results : buildExperienceOutcomes(source, deliveryGain),
    impacts: [
      {
        label: "Temps delivery",
        value: signedPercent(deliveryGain),
        note: buildImpactNote("delivery", deliveryGain),
      },
      {
        label: "Couts",
        value: signedPercent(source.costReductionPercent),
        note: buildImpactNote("cost", source.costReductionPercent),
      },
      {
        label: "Qualite",
        value: signedPercent(source.qualityGainPercent),
        note: buildImpactNote("quality", source.qualityGainPercent),
      },
    ],
    scorecard: {
      complexity: clampToFive(source.scorecard.complexity),
      impact: clampToFive(source.scorecard.impact),
      maintenance: clampToFive(source.scorecard.maintenance),
      maturity: clampToFive(source.scorecard.maturity),
    },
    timeline: buildTimeline(source.status, source.name),
  };
}

function toModalStatus(status: string): ProjectStatus {
  return status === "WIP" ? "WIP" : "DONE";
}

function toProjectTags(status: string): ProjectTag[] {
  if (status === "LIVE") return ["LIVE"];
  if (status === "WIP") return ["CURRENT"];
  return [];
}

function inferProjectIcon(name: string): Project["icon"] {
  const n = name.toLowerCase();
  if (n.includes("twitter")) return "twitter";
  if (n.includes("weighty")) return "weighty";
  if (n.includes("portfolio") || n.includes("jo dev os")) return "portfolio";
  return "folder";
}

function normalizeLinks(github?: string, live?: string, caseStudy?: string) {
  return {
    github: isEmptyLink(github) ? "#" : github,
    live: isEmptyLink(live) ? "#" : live,
    caseStudy: isEmptyLink(caseStudy) ? "#" : caseStudy,
  };
}

function normalizeCover(cover?: string) {
  if (!cover) return undefined;
  const v = cover.trim().toLowerCase();
  if (v === "" || v === "a remplir") return undefined;
  return cover;
}

function isEmptyLink(value?: string) {
  if (!value) return true;
  const v = value.trim().toLowerCase();
  return v === "" || v === "#" || v === "a remplir";
}

function signedPercent(value: number) {
  if (value <= 1) return "a remplir";
  return `${value >= 0 ? "+" : ""}${Math.round(value)}%`;
}

function buildImpactNote(
  kind: "delivery" | "reliability" | "automation" | "cost" | "quality",
  value: number
) {
  if (value <= 1) return "Impact en cours de mesure.";
  if (kind === "delivery") return "Reduction du cycle de livraison et du time-to-value.";
  if (kind === "reliability") return "Baisse des incidents et meilleure disponibilite en usage reel.";
  if (kind === "automation") return "Moins de taches manuelles et execution plus previsible.";
  if (kind === "cost") return "Optimisation des couts operationnels et du run quotidien.";
  return "Amelioration qualitative sur la stabilite et la perception utilisateur.";
}

function buildBusinessOutcomes(gains: ProjectRecord["businessImpact"]) {
  const lines: string[] = [];
  if (gains.deliveryGainPercent > 1) lines.push(`Cycle de livraison accelere de ${gains.deliveryGainPercent}%.`);
  if (gains.reliabilityGainPercent > 1) lines.push(`Fiabilite globale amelioree de ${gains.reliabilityGainPercent}%.`);
  if (gains.automationGainPercent > 1) lines.push(`Automatisation des operations augmentee de ${gains.automationGainPercent}%.`);
  if (gains.costReductionPercent > 1) lines.push(`Reduction de couts estimee a ${gains.costReductionPercent}%.`);
  if (gains.usersImpacted > 1) lines.push(`${gains.usersImpacted}+ utilisateurs impactes positivement.`);
  return lines.slice(0, 4);
}

function buildExperienceOutcomes(source: ExperienceProject, deliveryGain: number) {
  const lines: string[] = [];
  if (deliveryGain > 1) lines.push(`Reduction du temps de livraison de ${deliveryGain}%.`);
  if (source.costReductionPercent > 1) lines.push(`Diminution des couts operationnels de ${source.costReductionPercent}%.`);
  if (source.qualityGainPercent > 1) lines.push(`Qualite de service renforcee de ${source.qualityGainPercent}%.`);
  if (source.usersImpacted > 1) lines.push(`${source.usersImpacted}+ utilisateurs internes servis.`);
  return lines.length ? lines : ["Impact en cours de mesure."];
}

function inferExperienceScope(source: ExperienceProject) {
  const name = source.name.toLowerCase();
  if (name.includes("reseau") || name.includes("cisco") || name.includes("routeur")) {
    return "Automatisation reseau entreprise";
  }
  if (name.includes("immobilier") || name.includes("marche")) {
    return "Data collecte et analyse metier";
  }
  return "Projet experience";
}

function clampToFive(value: number) {
  return Math.max(1, Math.min(5, value));
}

function buildTimeline(status: string, projectName: string): Project["timeline"] {
  if (status === "WIP") {
    return [
      { phase: "Conception", state: "done", note: `Cadrage fonctionnel et architecture de ${projectName}.` },
      { phase: "Build", state: "current", note: "Developpement actif des fonctionnalites prioritaires." },
      { phase: "Release", state: "next", note: "Preparation de release avec tests et validation metier." },
      { phase: "Iterations", state: "next", note: "Backlog d'optimisations post-MVP deja structure." },
    ];
  }
  return [
    { phase: "Conception", state: "done", note: `Definition du scope et des priorites produit pour ${projectName}.` },
    { phase: "Build", state: "done", note: "Implementation des composants, API et flux critiques." },
    { phase: "Release", state: "current", note: "Mise en production et passage de validation utilisateur." },
    { phase: "Iterations", state: "current", note: "Ameliorations continues, correctifs et evolutions fonctionnelles." },
  ];
}

