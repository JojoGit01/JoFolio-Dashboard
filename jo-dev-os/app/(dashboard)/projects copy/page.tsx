"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  Image as ImageIcon,
} from "lucide-react";

/* =========================
   Types
========================= */

type ProjectStatus = "WIP" | "DONE";
type ProjectTag = "LIVE" | "CURRENT" | "CONFIDENTIAL";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;

  /** Optional “product” tags */
  tags?: ProjectTag[];

  stack: string[];
  highlights: string[];
  links: { github?: string; live?: string; caseStudy?: string };

  /** optional visuals */
  cover?: string; // keep if public
  icon?: "twitter" | "weighty" | "portfolio" | "folder";
};

/* =========================
   Page
========================= */

export default function ProjectsPage() {
  const projects = useMemo<Project[]>(
    () => [
      {
        id: "twitter",
        name: "Twitter Clone",
        tagline: "Full-stack feed + auth + architecture scalable",
        description:
          "Clone orienté produit : authentification, feed, API, base de données, et workflows propres (Docker).",
        status: "WIP",
        tags: ["CURRENT"],
        stack: ["FastAPI", "PostgreSQL", "Docker", "React Native"],
        highlights: [
          "Architecture API propre + DB structurée",
          "Auth + endpoints feed",
          "Performance & scalabilité",
          "Environnement reproductible via Docker",
        ],
        links: { github: "#", live: "#", caseStudy: "#" },
        icon: "twitter",
      },
      {
        id: "weighty",
        name: "Weighty Calendary",
        tagline: "App mobile de tracking + UI premium",
        description:
          "Application mobile Expo/TypeScript avec stockage local optimisé, historique et UX mobile-first.",
        status: "DONE",
        tags: ["LIVE"],
        stack: ["React Native", "Expo", "TypeScript"],
        highlights: ["Historique par jour", "UX mobile-first", "Stockage local optimisé"],
        links: { github: "#", live: "#", caseStudy: "#" },
        icon: "weighty",
      },
      {
        id: "portfolio",
        name: "Portfolio (Jo Dev OS)",
        tagline: "Portfolio interactif style OS + animations",
        description:
          "Portfolio Next.js orienté storytelling avec UI space-glass et micro-interactions.",
        status: "WIP",
        tags: ["CURRENT"],
        stack: ["Next.js", "React", "Tailwind"],
        highlights: ["Design OS", "Animations fluides", "Composants réutilisables"],
        links: { github: "#", live: "#", caseStudy: "#" },
        icon: "portfolio",
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | ProjectStatus>("ALL");
  const [activeId, setActiveId] = useState<string | null>(null);

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

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId) ?? null,
    [projects, activeId]
  );

  return (
    <div className="relative mt-4">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 backdrop-blur-md">
          <Search size={18} className="text-white/55" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet…"
            className="w-[260px] bg-transparent text-sm text-white/80 placeholder:text-white/35 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip active={status === "ALL"} onClick={() => setStatus("ALL")} icon={<Sparkles size={14} />}>
            Tous
          </Chip>
          <Chip active={status === "WIP"} onClick={() => setStatus("WIP")} icon={<Clock3 size={14} />}>
            WIP
          </Chip>
          <Chip active={status === "DONE"} onClick={() => setStatus("DONE")} icon={<CheckCircle2 size={14} />}>
            Done
          </Chip>
        </div>
      </div>

      {/* Grid */}
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
              <ProjectCard project={p} onOpen={() => setActiveId(p.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm text-white/60">
          Aucun projet ne correspond à ta recherche.
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   Project Card (Premium)
========================= */

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  // micro tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-40, 40], [6, -6]);
  const ry = useTransform(mx, [-40, 40], [-8, 8]);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx);
    my.set(dy);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <button
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group w-full text-left"
    >
      <div className="relative">
        {/* Accent outline (your app vibe) */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-[22px] bg-[linear-gradient(180deg,rgba(127,212,255,0.22),rgba(127,212,255,0.06))] opacity-80" />

        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="
            relative overflow-hidden rounded-[22px]
            border border-white/10
            bg-[#0B1220]/35 backdrop-blur-xl
            shadow-[0_18px_70px_rgba(0,0,0,0.35)]
          "
        >
          {/* inner vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_55%)] opacity-60" />

          {/* top media */}
          <div className="relative h-[140px] w-full">
            {project.cover ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.cover}')` }}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_30%,rgba(110,200,255,0.20),transparent_60%)]" />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.62))]" />

            {/* Icon + status */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
                <ProjectGlyph project={project} />
              </div>
              <MiniStatusBadge status={project.status} />
            </div>

            {/* Tags row */}
            <div className="absolute left-4 bottom-4 flex flex-wrap gap-2">
              {(project.tags ?? []).map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>

            {/* Top-right dot */}
            <div className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-[#7fd4ff] shadow-[0_0_14px_rgba(127,212,255,0.50)] opacity-70 group-hover:opacity-100 transition" />

            {/* bottom accent bar */}
            <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-white/5 overflow-hidden">
              <div className="h-full w-[45%] bg-[#7fd4ff]/70" />
            </div>
          </div>

          {/* content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold text-white/90">
                  {project.name}
                </div>
                <div className="mt-1 line-clamp-2 text-[12px] text-white/55">
                  {project.tagline}
                </div>
              </div>

              <ArrowRight className="mt-1 text-white/35 group-hover:text-white/65 transition" size={18} />
            </div>

            {/* stack chips */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-black/15 px-2 py-0.5 text-[11px] text-white/65"
                >
                  {s}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="rounded-full border border-white/10 bg-black/15 px-2 py-0.5 text-[11px] text-white/55">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* hover sheen */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.10),transparent_55%)]" />

          {/* subtle glow on hover */}
          <div className="pointer-events-none absolute -inset-10 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_50%_30%,rgba(127,212,255,0.12),transparent_60%)]" />
        </motion.div>
      </div>
    </button>
  );
}

/* =========================
   Project Modal (closer to your app)
========================= */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" onClick={onClose} />

      {/* panel */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="absolute left-1/2 top-1/2 w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="
            relative overflow-hidden rounded-[28px]
            border border-[#16242A]
            bg-[#0B1220]/70
            backdrop-blur-xl
            shadow-[0_34px_140px_rgba(0,0,0,0.80)]
          "
        >
          {/* accent line (like your Sidebar) */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#7fd4ff]/35 to-transparent" />

          {/* inner sheen */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_55%)]" />

          {/* header */}
          <div className="relative flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
                <ProjectGlyph project={project} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-[16px] font-semibold text-white/90">{project.name}</div>
                  <StatusBadge status={project.status} />
                  {(project.tags ?? []).map((t) => (
                    <TagBadge key={t} tag={t} />
                  ))}
                </div>
                <div className="text-[12px] text-white/55">{project.tagline}</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/70 hover:bg-black/30 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="pointer-events-none absolute left-6 right-6 bottom-0 h-px bg-white/10" />
          </div>

          {/* body */}
          <div className="grid grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-12">
            {/* preview safe area */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                <div className="flex items-center gap-2 p-4 text-xs text-white/55">
                  {hasConfidential(project) ? (
                    <>
                      <Shield size={14} className="text-white/55" />
                      Aperçu non affiché (confidentiel)
                    </>
                  ) : (
                    <>
                      <ImageIcon size={14} className="text-white/55" />
                      Preview (optionnel)
                    </>
                  )}
                </div>

                {hasConfidential(project) ? (
                  <div className="h-[320px] w-full bg-[radial-gradient(circle_at_50%_30%,rgba(127,212,255,0.12),transparent_60%)]" />
                ) : project.cover ? (
                  <div
                    className="h-[320px] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.cover}')` }}
                  />
                ) : (
                  <div className="h-[320px] w-full bg-[radial-gradient(circle_at_50%_30%,rgba(110,200,255,0.20),transparent_60%)]" />
                )}

                <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_0_0_1px_rgba(160,230,255,0.10)]" />
              </div>
            </div>

            {/* details */}
            <div className="lg:col-span-7">
              <div className="text-[22px] font-semibold text-white/90">{project.name}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/65">
                {project.description}
              </div>

              {/* stack */}
              <div className="mt-5">
                <div className="text-xs text-white/45">Stack</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* highlights + actions */}
              <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-white/90 font-semibold">
                    <span className="text-[#9fd7ff]">✦</span> Highlights
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-[#6EC8FF] shadow-[0_0_12px_rgba(110,200,255,0.9)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-3 justify-end">
                  {/* buttons */}
                  <div className="flex gap-3">
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

                  {/* case study */}
                  {isRealLink(project.links.caseStudy) && (
                    <a
                      href={project.links.caseStudy!}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        group flex items-center gap-3 rounded-2xl
                        border border-white/10
                        bg-black/20
                        px-4 py-3 text-sm text-white/75
                        hover:bg-black/30 transition
                      "
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/25">
                        <Folder size={16} className="text-white/70" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white/80">Case study</div>
                        <div className="text-[11px] text-white/45">Détails, choix techniques, résultats</div>
                      </div>
                      <ArrowRight size={18} className="text-white/55 group-hover:text-white/80 transition" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* bottom shine */}
          <div className="pointer-events-none absolute -left-28 -top-28 h-64 w-[560px] rotate-[12deg] rounded-full bg-white/10 blur-3xl opacity-10" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================
   Helpers / UI bits
========================= */

function isRealLink(v?: string) {
  if (!v) return false;
  const t = v.trim();
  if (t === "" || t === "#") return false;
  return true;
}

function hasConfidential(project: Project) {
  return (project.tags ?? []).includes("CONFIDENTIAL");
}

/** If no icon/logo -> default icon */
function ProjectGlyph({ project }: { project: Project }) {
  switch (project.icon) {
    case "twitter":
      return <span className="text-[#7fd4ff] font-bold">𝕏</span>;
    case "weighty":
      return <span className="text-[#7fd4ff] font-bold">W</span>;
    case "portfolio":
      return <span className="text-[#7fd4ff] font-bold">Jo</span>;
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
        active
          ? "border-[#7fd4ff]/35 bg-[#7fd4ff]/15 text-white/85"
          : "border-white/10 bg-black/10 text-white/60 hover:bg-black/20",
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
        status === "DONE"
          ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/80"
          : "border-amber-300/25 bg-amber-300/10 text-amber-100/80",
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
        status === "DONE"
          ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/75"
          : "border-amber-300/25 bg-amber-300/10 text-amber-100/75",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function TagBadge({ tag }: { tag: ProjectTag }) {
  const map: Record<ProjectTag, { label: string; cls: string; icon: React.ReactNode }> = {
    LIVE: {
      label: "LIVE",
      cls: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/80",
      icon: <Radio size={12} className="text-emerald-200" />,
    },
    CURRENT: {
      label: "CURRENT",
      cls: "border-[#7fd4ff]/30 bg-[#7fd4ff]/12 text-white/85",
      icon: <Star size={12} className="text-[#7fd4ff]" />,
    },
    CONFIDENTIAL: {
      label: "CONFIDENTIAL",
      cls: "border-white/15 bg-white/[0.06] text-white/70",
      icon: <Shield size={12} className="text-white/60" />,
    },
  };

  const v = map[tag];

  return (
    <span className={["inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px]", v.cls].join(" ")}>
      {v.icon}
      {v.label}
    </span>
  );
}

function ActionBtn({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="
        inline-flex flex-1 items-center justify-center gap-2 rounded-2xl
        border border-white/10 bg-black/20 px-4 py-2.5
        text-sm text-white/80 hover:bg-black/30 transition
      "
    >
      {icon}
      {children}
    </a>
  );
}