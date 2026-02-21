"use client";

import { useEffect, useMemo, useState } from "react";
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

  return (
    <motion.section
      initial={reduceMotion ? false : { y: 10, opacity: 0.98 }}
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="relative mt-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 backdrop-blur-md">
          <Search size={18} className="text-white/55" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet..."
            className="w-[260px] bg-transparent text-sm text-white/80 placeholder:text-white/35 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip active={status === "ALL"} onClick={() => setStatus("ALL")} icon={<Sparkles size={14} />}>Tous</Chip>
          <Chip active={status === "WIP"} onClick={() => setStatus("WIP")} icon={<Clock3 size={14} />}>WIP</Chip>
          <Chip active={status === "DONE"} onClick={() => setStatus("DONE")} icon={<CheckCircle2 size={14} />}>Done</Chip>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

  const coverUrl = project.cover ?? DEFAULT_PROJECT_IMAGE;

  return (
    <button onClick={onOpen} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }} className="group w-full text-left">
      <div className="relative">
        <div className="pointer-events-none absolute -inset-[1px] rounded-[22px] bg-[linear-gradient(180deg,rgba(127,212,255,0.22),rgba(127,212,255,0.06))] opacity-80" />
        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0B1220]/35 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
        >
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#7fd4ff]/30 to-transparent" />
          <div className="relative h-[140px] w-full">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${coverUrl}')` }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.62))]" />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
                <ProjectGlyph project={project} />
              </div>
              <MiniStatusBadge status={project.status} />
            </div>
            <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
              {(project.tags ?? []).map((t) => <TagBadge key={t} tag={t} />)}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold text-white/90">{project.name}</div>
                <div className="mt-1 line-clamp-2 text-[12px] text-white/55">{project.tagline}</div>
              </div>
              <ArrowRight className="mt-1 text-white/35 group-hover:text-white/65 transition" size={18} />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-black/20 px-3 py-1.5 text-xs text-white/75 transition group-hover:border-[#7fd4ff]/35 group-hover:bg-[#7fd4ff]/10 group-hover:text-white/90">
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

  const coverUrl = project.cover ?? DEFAULT_PROJECT_IMAGE;
  const differences = compareProject ? buildProjectDiffs(project, compareProject) : [];

  return (
    <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="absolute left-1/2 top-1/2 w-[min(1100px,92vw)] max-h-[92vh] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex max-h-[92vh] flex-col overflow-hidden rounded-[28px] border border-[#16242A] bg-[#0B1220]/70 backdrop-blur-xl shadow-[0_34px_140px_rgba(0,0,0,0.80)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-300/25 via-sky-300/70 to-cyan-300/25" />
          <div className="relative flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
                <ProjectGlyph project={project} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-[16px] font-semibold text-white/90">{project.name}</div>
                  <StatusBadge status={project.status} />
                  {(project.tags ?? []).map((t) => <TagBadge key={t} tag={t} />)}
                </div>
                <div className="text-[12px] text-white/55">{project.tagline}</div>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-cyan-200/85">
                  <span>Project {activeIndex + 1}/{totalCount}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>Navigation clavier: gauche / droite</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onPrev} disabled={!canPrev} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 disabled:opacity-35"><ChevronLeft size={18} /></button>
              <button onClick={onNext} disabled={!canNext} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 transition hover:bg-black/30 disabled:opacity-35"><ChevronRight size={18} /></button>
              <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 hover:bg-black/30 transition"><X size={18} /></button>
            </div>
          </div>
          <div className="px-6 pb-3">
            <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300"
                style={{ width: `${Math.max(8, ((activeIndex + 1) / Math.max(1, totalCount)) * 100)}%` }}
              />
            </div>
          </div>

          <div className="relative overflow-y-auto px-6 py-6 [scrollbar-width:thin] [scrollbar-color:rgba(127,212,255,0.55)_rgba(255,255,255,0.08)] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,rgba(127,212,255,0.95),rgba(127,212,255,0.35))]" style={{ maxHeight: "calc(92vh - 84px)" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                custom={navDirection}
                variants={{
                  enter: (dir: number) => ({ x: dir > 0 ? 24 : -24, opacity: 0.85 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({ x: dir > 0 ? -24 : 24, opacity: 0.85 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12"
              >
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                    <div className="flex items-center gap-2 p-4 text-xs text-white/55">
                      {hasConfidential(project) ? <><Shield size={14} /> Apercu non affiche (confidentiel)</> : <><ImageIcon size={14} /> Preview</>}
                    </div>
                    {hasConfidential(project) ? (
                      <div className="h-[320px] w-full bg-[radial-gradient(circle_at_50%_30%,rgba(127,212,255,0.12),transparent_60%)]" />
                    ) : (
                      <div className="h-[320px] w-full bg-cover bg-center" style={{ backgroundImage: `url('${coverUrl}')` }} />
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3">
                    <div className="text-[22px] font-semibold text-white/90">{project.name}</div>
                    <div className="h-px flex-1 rounded-full bg-gradient-to-r from-cyan-300/75 via-sky-300/35 to-transparent" />
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/65">{project.description}</div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <MetaPill icon={<Clock3 size={13} />} label="Periode" value={project.period} />
                    <MetaPill icon={<Users2 size={13} />} label="Role" value={project.role} />
                    <MetaPill icon={<Target size={13} />} label="Scope" value={project.scope} />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
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

                  <div className="mt-5 flex flex-wrap gap-2">
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
                        <div className="mt-5 flex gap-3">
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
                </div>
              </motion.div>
            </AnimatePresence>
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
  if (current.status !== previous.status) lines.push(`Statut: ${previous.status} -> ${current.status}`);
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
      {status}
    </span>
  );
}

function MiniStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={[
        "rounded-full border px-2 py-0.5 text-[10px]",
        status === "DONE" ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/75" : "border-amber-300/25 bg-amber-300/10 text-amber-100/75",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function TagBadge({ tag }: { tag: ProjectTag }) {
  const map: Record<ProjectTag, { label: string; cls: string; icon: React.ReactNode }> = {
    LIVE: { label: "LIVE", cls: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/80", icon: <Radio size={12} className="text-emerald-200" /> },
    CURRENT: { label: "CURRENT", cls: "border-[#7fd4ff]/30 bg-[#7fd4ff]/12 text-white/85", icon: <Star size={12} className="text-[#7fd4ff]" /> },
    CONFIDENTIAL: { label: "CONFIDENTIAL", cls: "border-white/15 bg-white/[0.06] text-white/70", icon: <Shield size={12} className="text-white/60" /> },
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
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white/80 hover:bg-black/30 transition"
    >
      {icon}
      {children}
    </a>
  );
}

function MetaPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5">
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
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
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
        "relative overflow-hidden rounded-full border px-3 py-1.5 text-xs transition",
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
  const impactScore = [gains.deliveryGainPercent, gains.reliabilityGainPercent, gains.automationGainPercent];
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
    icon: inferProjectIcon(source.name),
    period: source.period,
    role: source.role,
    context: source.summary,
    scope: source.type,
    contributions: source.highlights.length > 0 ? source.highlights : ["a remplir"],
    outcomes: source.highlights.length > 0 ? source.highlights.slice(0, 3) : ["a remplir"],
    impacts: [
      { label: "Temps delivery", value: signedPercent(gains.deliveryGainPercent), note: "a remplir" },
      { label: "Stabilite", value: signedPercent(gains.reliabilityGainPercent), note: "a remplir" },
      { label: "Automatisation", value: signedPercent(gains.automationGainPercent), note: "a remplir" },
    ],
    scorecard: {
      complexity: clampToFive(Math.ceil(source.stack.length / 2)),
      impact: clampToFive(percentToFive(Math.max(...impactScore, 1))),
      maintenance: clampToFive(source.status === "WIP" ? 3 : 4),
      maturity: clampToFive(source.status === "WIP" ? 3 : 4),
    },
    timeline: buildTimeline(source.status),
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
    icon: inferProjectIcon(source.name),
    period,
    role,
    context,
    scope: "Projet experience",
    contributions: source.actions.length ? source.actions : ["a remplir"],
    outcomes: source.results.length ? source.results : ["a remplir"],
    impacts: [
      { label: "Temps delivery", value: signedPercent(deliveryGain), note: "a remplir" },
      { label: "Couts", value: signedPercent(source.costReductionPercent), note: "a remplir" },
      { label: "Qualite", value: signedPercent(source.qualityGainPercent), note: "a remplir" },
    ],
    scorecard: {
      complexity: clampToFive(Math.ceil(source.stack.length / 2)),
      impact: clampToFive(percentToFive(Math.max(source.qualityGainPercent, source.costReductionPercent, 1))),
      maintenance: clampToFive(status === "WIP" ? 3 : 4),
      maturity: clampToFive(status === "WIP" ? 3 : 4),
    },
    timeline: buildTimeline(source.status),
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

function percentToFive(value: number) {
  return Math.ceil(Math.max(1, value) / 20);
}

function clampToFive(value: number) {
  return Math.max(1, Math.min(5, value));
}

function buildTimeline(status: string): Project["timeline"] {
  if (status === "WIP") {
    return [
      { phase: "Conception", state: "done", note: "a remplir" },
      { phase: "Build", state: "current", note: "a remplir" },
      { phase: "Release", state: "next", note: "a remplir" },
      { phase: "Iterations", state: "next", note: "a remplir" },
    ];
  }
  return [
    { phase: "Conception", state: "done", note: "a remplir" },
    { phase: "Build", state: "done", note: "a remplir" },
    { phase: "Release", state: "current", note: "a remplir" },
    { phase: "Iterations", state: "current", note: "a remplir" },
  ];
}

