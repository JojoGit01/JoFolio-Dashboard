"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Clock3,
  Sparkles,
  Folder,
  Rocket,
  Search,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

/* =========================
   Types
========================= */

type ProjectStatus = "WIP" | "DONE";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  highlights: string[];
  links: { github?: string; live?: string; caseStudy?: string };
  // ✅ explorer visuals
  cover?: string; // ex: "/images/projects/twitter.png"
  icon?: "twitter" | "weighty" | "portfolio" | "folder";
};

type Win = {
  wid: string;
  projectId: string;
  z: number;
  x: number;
  y: number;
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
        stack: ["FastAPI", "PostgreSQL", "Docker", "React Native"],
        highlights: [
          "Architecture API propre + DB structurée",
          "Auth + endpoints feed",
          "Performance & scalabilité",
          "Environnement reproductible via Docker",
        ],
        links: { github: "#", live: "#", caseStudy: "#" },
        // cover: "/images/projects/twitter.png",
        icon: "twitter",
      },
      {
        id: "weighty",
        name: "Weighty Calendary",
        tagline: "App mobile de tracking + UI premium",
        description:
          "Application mobile Expo/TypeScript avec stockage local optimisé, historique et UX mobile-first.",
        status: "DONE",
        stack: ["React Native", "Expo", "TypeScript"],
        highlights: ["Historique par jour", "UX mobile-first", "Stockage local optimisé"],
        links: { github: "#", live: "#", caseStudy: "#" },
        // cover: "/images/projects/weighty.png",
        icon: "weighty",
      },
      {
        id: "portfolio",
        name: "Portfolio (Jo Dev OS)",
        tagline: "Portfolio interactif style OS + animations",
        description:
          "Portfolio Next.js orienté storytelling avec UI space-glass et micro-interactions.",
        status: "WIP",
        stack: ["Next.js", "React", "Tailwind"],
        highlights: ["Design OS", "Animations fluides", "Composants réutilisables"],
        links: { github: "#", live: "#", caseStudy: "#" },
        // cover: "/images/projects/portfolio.png",
        icon: "portfolio",
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | ProjectStatus>("ALL");

  const [wins, setWins] = useState<Win[]>([]);
  const topZ = useRef(30);

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

  const openProject = (projectId: string) => {
    const existing = wins.find((w) => w.projectId === projectId);
    if (existing) {
      bringToFront(existing.wid);
      return;
    }

    topZ.current += 1;
    const offset = wins.length * 26;

    setWins((prev) => [
      ...prev,
      {
        wid: `${projectId}-${Date.now()}`,
        projectId,
        z: topZ.current,
        x: 60 + offset,
        y: 90 + offset,
      },
    ]);
  };

  const closeWin = (wid: string) =>
    setWins((prev) => prev.filter((w) => w.wid !== wid));

  const bringToFront = (wid: string) => {
    topZ.current += 1;
    setWins((prev) =>
      prev.map((w) => (w.wid === wid ? { ...w, z: topZ.current } : w))
    );
  };

  const updatePos = (wid: string, x: number, y: number) => {
    setWins((prev) => prev.map((w) => (w.wid === wid ? { ...w, x, y } : w)));
  };

  return (
    <div className="relative mt-4 min-h-[900px]">
      {/* Explorer Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md">
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

      {/* Explorer Grid */}
      <div className="mt-6">
        <ExplorerFrame>
          <div className="p-5">
            {/* ✅ up to 4 per row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProjectTile key={p.id} project={p} onOpen={() => openProject(p.id)} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm text-white/60">
                Aucun projet ne correspond à ta recherche.
              </div>
            )}
          </div>
        </ExplorerFrame>
      </div>

      {/* Windows layer */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <AnimatePresence>
          {wins.map((w) => {
            const project = projects.find((p) => p.id === w.projectId);
            if (!project) return null;

            return (
              <ProjectWindow
                key={w.wid}
                win={w}
                project={project}
                onClose={() => closeWin(w.wid)}
                onFocus={() => bringToFront(w.wid)}
                onPosChange={(x, y) => updatePos(w.wid, x, y)}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================
   Project Window (MOCKUP 100%)
========================= */

function ProjectWindow({
  win,
  project,
  onClose,
  onFocus,
  onPosChange,
}: {
  win: Win;
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  onPosChange: (x: number, y: number) => void;
}) {
  const controls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={constraintsRef}
      className="pointer-events-auto absolute inset-0"
      style={{ zIndex: win.z }}
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <motion.div
        className="absolute"
        style={{ x: win.x, y: win.y }}
        drag
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onPointerDown={onFocus}
        onMouseDown={onFocus}
        onDragEnd={(e, info) => onPosChange(win.x + info.offset.x, win.y + info.offset.y)}
      >
        <MockupWindowFrame>
          {/* Top bar (exact vibe) */}
          <div
            onPointerDown={(e) => controls.start(e)}
            className="relative flex items-center justify-between px-5 py-4 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-3 text-white/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                <ProjectGlyph project={project} />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-base font-semibold">{project.name}</div>
                <StatusBadge status={project.status} />
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/15 text-white/70 hover:bg-black/25 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* thin divider like mockup */}
            <div className="pointer-events-none absolute left-4 right-4 bottom-0 h-px bg-white/10" />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-12">
            {/* LEFT: preview */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/10">
                <div className="p-4 text-xs text-white/55">
                  {project.cover ? "Preview" : "Mockup / screenshots ici"}
                </div>

                {/* If you have cover images later */}
                {project.cover ? (
                  <div
                    className="h-[320px] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.cover}')` }}
                  />
                ) : (
                  <div className="h-[320px] w-full bg-[radial-gradient(circle_at_50%_30%,rgba(110,200,255,0.20),transparent_60%)]" />
                )}

                {/* inner glow border */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(160,230,255,0.12)]" />
              </div>
            </div>

            {/* RIGHT: details */}
            <div className="lg:col-span-7">
              <div className="text-2xl font-semibold text-white/90">{project.name}</div>
              <div className="mt-1 text-sm text-white/70">{project.tagline}</div>

              <div className="mt-4 text-sm leading-relaxed text-white/65">
                {project.description}
              </div>

              {/* stack pills like mockup */}
              <div className="mt-5">
                <div className="text-xs text-white/45">Stack</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-white/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* highlights + actions block like mockup */}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Highlights (left) */}
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

                {/* Actions (right) */}
                <div className="lg:col-span-5 flex flex-col gap-3 justify-end">
                  <div className="flex gap-3">
                    {project.links.live && (
                      <MockBtn href={project.links.live} icon={<ExternalLink size={16} />}>
                        Voir le site
                      </MockBtn>
                    )}
                    {project.links.github && (
                      <MockBtn href={project.links.github} icon={<Github size={16} />}>
                        Voir le GitHub
                      </MockBtn>
                    )}
                  </div>

                  <a
                    href={project.links.caseStudy || "#"}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/75 hover:bg-black/20 transition"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/15">
                      <Folder size={16} className="text-white/70" />
                    </div>
                    <div className="flex-1">Case study</div>
                    <ArrowRight size={18} className="text-white/55 group-hover:text-white/75 transition" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MockupWindowFrame>
      </motion.div>
    </motion.div>
  );
}

/* =========================
   Explorer tile (image OR icon)
========================= */

function ProjectTile({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="text-left">
      <div className="relative">
        {/* subtle neon outline */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-[18px] opacity-80 bg-[linear-gradient(180deg,rgba(200,245,255,0.25),rgba(120,190,255,0.10))]" />
        <div className="relative rounded-[18px] border border-white/10 bg-black/15 backdrop-blur-md p-4 hover:bg-black/25 transition">
          <div className="flex items-start gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-black/15 flex items-center justify-center">
              {project.cover ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${project.cover}')` }}
                />
              ) : (
                <ProjectGlyph project={project} />
              )}

              {/* tiny glow */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(160,230,255,0.12)]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="truncate text-sm font-semibold text-white/90">{project.name}</div>
                <MiniStatusBadge status={project.status} />
              </div>
              <div className="mt-1 line-clamp-2 text-xs text-white/55">{project.tagline}</div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-black/10 px-2 py-0.5 text-[11px] text-white/65"
                  >
                    {s}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="rounded-full border border-white/10 bg-black/10 px-2 py-0.5 text-[11px] text-white/55">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

/* =========================
   MOCKUP Window Frame (neon + corners + edge flares)
========================= */

function MockupWindowFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Soft glow (subtle) */}
      <div className="pointer-events-none absolute -inset-[14px] rounded-[40px] blur-[18px] opacity-0 bg-[radial-gradient(circle_at_50%_20%,rgba(90,170,255,0),transparent_62%)]" />

      {/* Thin neon stroke */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[26px]"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(160,230,255,0.2), 0 0 18px rgba(90,170,255,0.25)",
        }}
      />

      {/* Inner border depth */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[25px] border border-white/10 opacity-50" />

      {/* Corner capsules */}
      <CornerCaps pos="tl" />
      <CornerCaps pos="tr" />
      <CornerCaps pos="bl" />
      <CornerCaps pos="br" />

      {/* Edge flare streaks */}
      <EdgeFlare where="top" />
      <EdgeFlare where="bottom" />

      {/* Transparent body */}
      <div className="relative w-[min(1100px,88vw)] overflow-hidden rounded-[26px] bg-transparent backdrop-blur-[7px] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
        {/* subtle light sweep */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-64 w-[560px] rotate-[12deg] rounded-full bg-white/10 blur-3xl opacity-10" />
        {children}
      </div>
    </div>
  );
}

function CornerCaps({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-3 top-3",
    tr: "right-3 top-3",
    bl: "left-3 bottom-3",
    br: "right-3 bottom-3",
  };

  return (
    <>
      {/* bright capsule */}
      <div
        className={`pointer-events-none absolute ${map[pos]} h-[10px] w-[52px] rounded-full opacity-10`}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(215,255,255,0.1), transparent)",
        }}
      />
      {/* glow behind capsule */}
      <div
        className={`pointer-events-none absolute ${map[pos]} h-[18px] w-[82px] rounded-full blur-[10px] opacity-10`}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(90,170,255,0.1), transparent)",
        }}
      />
    </>
  );
}

function EdgeFlare({ where }: { where: "top" | "bottom" }) {
  const pos = where === "top" ? "top-[6px]" : "bottom-[6px]";
  return (
    <div
      className={`pointer-events-none absolute left-[22%] ${pos} h-[2px] w-[160px] rounded-full opacity-70`}
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(170,240,255,0.45), transparent)",
        boxShadow: "0 0 16px rgba(120,200,255,0.45)",
      }}
    />
  );
}

/* =========================
   UI bits
========================= */

function ProjectGlyph({ project }: { project: Project }) {
  // You can swap icons later with real SVGs/images
  if (project.cover) return <ImageIcon size={20} className="text-white/70" />;

  switch (project.icon) {
    case "twitter":
      return <span className="text-[#7fd4ff] font-bold">𝕏</span>;
    case "weighty":
      return <span className="text-[#7fd4ff] font-bold">W</span>;
    case "portfolio":
      return <span className="text-[#7fd4ff] font-bold">Jo</span>;
    default:
      return <Folder size={18} className="text-[#7fd4ff]" />;
  }
}

function ExplorerFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-[10px] rounded-[28px] blur-[18px] opacity-50 bg-[radial-gradient(circle_at_50%_40%,rgba(90,170,255,0.25),transparent_62%)]" />
      <div className="relative rounded-[22px] border border-white/10 bg-black/15 backdrop-blur-md shadow-[0_22px_60px_rgba(0,0,0,0.40)]">
        {children}
      </div>
    </div>
  );
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

function MockBtn({
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
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/10 px-4 py-2.5 text-sm text-white/80 hover:bg-black/20 transition"
    >
      {icon}
      {children}
    </a>
  );
}
