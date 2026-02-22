"use client";

import { type ReactNode, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type MotionProps } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileCode2,
  Folder,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
} from "lucide-react";
import WindowCard from "@/app/components/ui/WindowCard";
import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

type CardId = "building" | "projects" | "contact" | "experience";

type ProjectStatus = "PROD" | "DEV" | "BETA";

type ProjectRow = {
  name: string;
  status: ProjectStatus;
  stack: string;
  impact: string;
};

type RoadmapRow = {
  id: string;
  title: string;
  stack: string;
  progress: number;
  tint: string;
};

const MOBILE_CARD_ORDER: CardId[] = ["building", "projects", "experience", "contact"];
const MOBILE_CARD_LABEL: Record<CardId, string> = {
  building: "En cours",
  projects: "Projets",
  experience: "XP",
  contact: "Contact",
};

const BEST_PROJECTS: ProjectRow[] = PORTFOLIO_DATA.projects.slice(0, 3).map((project) => {
  const gain = project.businessImpact.deliveryGainPercent;
  return {
    name: project.name,
    status: project.status === "WIP" ? "DEV" : project.status === "BETA" ? "BETA" : "PROD",
    stack: project.stack.slice(0, 2).join(" - "),
    impact: gain > 1 ? `${gain >= 0 ? "+" : ""}${gain}% delivery` : "a remplir",
  };
});

const EXPERIENCE_ITEMS = PORTFOLIO_DATA.experiences.slice(0, 3).map((exp) => ({
  title: exp.title,
  period: `${exp.startYear} - ${exp.endYear}`,
  type: exp.contractType === "Personnel" ? "Perso" : exp.contractType,
  place: `${exp.company} - ${exp.location}`,
}));

const BUILDING_TINTS = ["bg-[#7fd4ff]", "bg-emerald-300", "bg-violet-300"];

export default function HomeRight({
  active,
  setActive,
  focusSyncTick = 0,
}: {
  active: CardId;
  setActive: (id: CardId) => void;
  focusSyncTick?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [mobileDirection, setMobileDirection] = useState<1 | -1>(1);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const focusPos = "left-[11%] top-[94px] z-30 opacity-100 blur-0 scale-[1.02] rotate-0";
  const rightRootRef = useRef<HTMLElement | null>(null);

  const BUILDING_ITEMS = useMemo<RoadmapRow[]>(() => {
    const ranked = [...PORTFOLIO_DATA.projects]
      .sort((a, b) => {
        const priority = (status: string) =>
          status === "WIP" ? 0 : status === "BETA" ? 1 : status === "LIVE" ? 2 : status === "DONE" ? 3 : 4;
        const pa = priority(a.status);
        const pb = priority(b.status);
        if (pa !== pb) return pa - pb;
        return (b.businessImpact.automationGainPercent ?? 0) - (a.businessImpact.automationGainPercent ?? 0);
      })
      .slice(0, 3);

    const statusProgress = (status: string, maturity: number) => {
      if (status === "WIP") return Math.min(88, 54 + maturity * 8);
      if (status === "BETA") return Math.min(94, 74 + maturity * 5);
      if (status === "LIVE") return 96;
      return 68;
    };

    return ranked.map((project, index) => ({
      id: project.id,
      title: project.name,
      stack: project.stack.slice(0, 2).join(" - ") || "Stack a remplir",
      progress: statusProgress(project.status, project.scorecard?.maturity ?? 1),
      tint: BUILDING_TINTS[index % BUILDING_TINTS.length],
    }));
  }, []);

  const stackedPos: Record<CardId, string> = {
    building: "left-[2%] top-[18px] z-10 opacity-30 blur-[2px] scale-[0.95] -rotate-[1.5deg]",
    projects: "left-[54%] top-[22px] z-10 opacity-30 blur-[2px] scale-[0.95] rotate-[1.2deg]",
    experience: "left-[58%] top-[300px] z-10 opacity-30 blur-[2px] scale-[0.95] rotate-[1deg]",
    contact: "left-[8%] top-[390px] z-10 opacity-30 blur-[2px] scale-[0.95] -rotate-[0.8deg]",
  };

  const widthMap: Record<CardId, string> = {
    building: "w-[clamp(400px,47vw,620px)]",
    projects: "w-[clamp(360px,38vw,500px)]",
    experience: "w-[clamp(340px,34vw,460px)]",
    contact: "w-[clamp(330px,31vw,420px)]",
  };

  const getSceneClass = (id: CardId) => {
    const isActive = active === id;
    const base =
      "absolute max-w-full cursor-none transform-gpu will-change-transform transition-[left,top,opacity,transform,filter] duration-[920ms] ease-[cubic-bezier(.16,.9,.2,1)]";

    const sharp = isActive
      ? "filter-none saturate-[1.08] contrast-[1.06] drop-shadow-[0_24px_70px_rgba(127,212,255,0.2)]"
      : "saturate-[0.9] contrast-[0.95]";

    return [
      base,
      widthMap[id],
      isActive ? focusPos : stackedPos[id],
      sharp,
      "hover:scale-[1.01] hover:brightness-110",
    ].join(" ");
  };

  const getRevealProps = (index: number): MotionProps =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: "blur(1px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: {
            duration: 0.62,
            delay: 0.1 + index * 0.1,
            ease: [0.18, 0.85, 0.2, 1],
          },
        };

  const activeMobileIndex = Math.max(0, MOBILE_CARD_ORDER.indexOf(active));
  const goToCard = (nextId: CardId) => {
    const nextIndex = MOBILE_CARD_ORDER.indexOf(nextId);
    setMobileDirection(nextIndex >= activeMobileIndex ? 1 : -1);
    setActive(nextId);
  };
  const goPrevMobile = () => {
    const nextIndex = (activeMobileIndex - 1 + MOBILE_CARD_ORDER.length) % MOBILE_CARD_ORDER.length;
    setMobileDirection(-1);
    setActive(MOBILE_CARD_ORDER[nextIndex]);
  };
  const goNextMobile = () => {
    const nextIndex = (activeMobileIndex + 1) % MOBILE_CARD_ORDER.length;
    setMobileDirection(1);
    setActive(MOBILE_CARD_ORDER[nextIndex]);
  };

  const onMobilePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMobilePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
    if (dx < 0) goNextMobile();
    else goPrevMobile();
  };

  const renderCardById = (id: CardId, compact = false) => {
    if (id === "building") return <BuildingCard active={active === "building"} compact={compact} items={BUILDING_ITEMS} />;
    if (id === "projects") return <ProjectsCard active={active === "projects"} compact={compact} />;
    if (id === "experience") return <ExperienceCard active={active === "experience"} compact={compact} />;
    return <ContactCard active={active === "contact"} compact={compact} />;
  };

  const getDesktopFocusOvershoot = (isActive: boolean): MotionProps =>
    reduceMotion
      ? {}
      : {
          animate: isActive ? { scale: [1, 1.014, 1.006, 1] } : { scale: 1 },
          transition: {
            duration: isActive ? 0.58 : 0.32,
            ease: [0.2, 0.9, 0.2, 1],
          },
        };

  return (
    <motion.section
      id="home-right-panel"
      ref={rightRootRef}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative col-span-12 lg:col-span-7"
    >
      <AnimatePresence initial={false}>
        {focusSyncTick > 0 && (
          <motion.div
            key={`home-focus-sync-${focusSyncTick}`}
            initial={{ opacity: 0.85, scale: 0.994 }}
            animate={{ opacity: 0, scale: 1.005 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.46, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-none absolute inset-x-0 top-0 z-40 h-28 rounded-2xl border border-cyan-300/20 bg-gradient-to-b from-cyan-300/8 via-cyan-300/4 to-transparent"
          />
        )}
      </AnimatePresence>
      <div className="relative hidden h-[min(720px,calc(100vh-180px))] lg:block">
        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 105, damping: 18, mass: 1.1 }}
          className={getSceneClass("building")}
          onClick={() => setActive("building")}
        >
          <motion.div {...getRevealProps(0)}>
            <motion.div className="transform-gpu will-change-transform" {...getDesktopFocusOvershoot(active === "building")}>
              <BuildingCard active={active === "building"} items={BUILDING_ITEMS} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 105, damping: 18, mass: 1.1 }}
          className={getSceneClass("projects")}
          onClick={() => setActive("projects")}
        >
          <motion.div {...getRevealProps(1)}>
            <motion.div className="transform-gpu will-change-transform" {...getDesktopFocusOvershoot(active === "projects")}>
              <ProjectsCard active={active === "projects"} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 105, damping: 18, mass: 1.1 }}
          className={getSceneClass("experience")}
          onClick={() => setActive("experience")}
        >
          <motion.div {...getRevealProps(2)}>
            <motion.div className="transform-gpu will-change-transform" {...getDesktopFocusOvershoot(active === "experience")}>
              <ExperienceCard active={active === "experience"} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 105, damping: 18, mass: 1.1 }}
          className={getSceneClass("contact")}
          onClick={() => setActive("contact")}
        >
          <motion.div {...getRevealProps(3)}>
            <motion.div className="transform-gpu will-change-transform" {...getDesktopFocusOvershoot(active === "contact")}>
              <ContactCard active={active === "contact"} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-5 block lg:hidden">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MOBILE_CARD_ORDER.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => goToCard(id)}
                className={[
                  "font-data shrink-0 rounded-xl border px-3 py-1.5 text-xs font-medium transition",
                  isActive
                    ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-100"
                    : "border-white/10 bg-white/[0.02] text-white/65",
                ].join(" ")}
              >
                {MOBILE_CARD_LABEL[id]}
              </button>
            );
          })}
        </div>

        <div onPointerDownCapture={onMobilePointerDown} onPointerUpCapture={onMobilePointerUp} className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              custom={mobileDirection}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? 18 : -18, opacity: 0.98, scale: 0.992 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (dir: number) => ({ x: dir > 0 ? -14 : 14, opacity: 0.98, scale: 0.994 }),
              }}
              initial={reduceMotion ? false : "enter"}
              animate={reduceMotion ? undefined : "center"}
              exit={reduceMotion ? undefined : "exit"}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {active === "building" ? <BuildingCard active compact items={BUILDING_ITEMS} /> : renderCardById(active, true)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0b1628]/72 p-2 backdrop-blur-xl">
          <button
            onClick={goPrevMobile}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-white/75"
            aria-label="Carte precedente"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex flex-1 items-center justify-center gap-1.5">
            {MOBILE_CARD_ORDER.map((id, index) => (
              <button
                key={`dot-${id}`}
                onClick={() => goToCard(id)}
                aria-label={`Ouvrir ${MOBILE_CARD_LABEL[id]}`}
                className={[
                  "h-2 rounded-full transition-all",
                  activeMobileIndex === index ? "w-5 bg-cyan-300" : "w-2 bg-white/25",
                ].join(" ")}
              />
            ))}
          </div>
          <button
            onClick={goNextMobile}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-white/75"
            aria-label="Carte suivante"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <p className="font-data mt-2 text-center text-[11px] text-white/45">Swipe horizontal pour changer de carte</p>
      </div>
    </motion.section>
  );
}

function BuildingCard({
  active,
  compact = false,
  items,
}: {
  active: boolean;
  compact?: boolean;
  items: RoadmapRow[];
}) {
  const visibleItems = compact ? items.slice(0, 2) : items;
  const wipCount = PORTFOLIO_DATA.projects.filter((p) => p.status === "WIP" || p.status === "BETA").length;

  return (
    <WindowCard className={compact ? "p-4" : "p-6"}>
      <HeaderRow icon={<Rocket size={18} className="text-[#4EA1FF]" />} title="En cours" active={active} href="/projects" compact={compact} />

      <p className={["text-[#9FB3D1]", compact ? "mt-2 text-xs" : "mt-3 text-sm"].join(" ")}>
        {wipCount > 0
          ? `${wipCount} projet(s) en progression active (WIP/Beta), priorises par valeur produit et maturite.`
          : "Focus actuel sur les composants les plus visibles du dashboard."}
      </p>

      <div className={compact ? "mt-3 space-y-2" : "mt-5 space-y-3"}>
        {visibleItems.map((item) => (
          <div key={item.id} className={["rounded-xl border border-white/10 bg-[#111E34]/40", compact ? "p-2.5" : "p-3"].join(" ")}>
            <div className="flex items-center justify-between gap-2">
              <div className={compact ? "text-sm font-medium text-white/90" : "font-medium text-white/90"}>{item.title}</div>
              <span className="font-data tabular-nums text-xs text-white/50">{item.progress}%</span>
            </div>
            <div className={["font-data", compact ? "mt-1 text-[11px] text-[#9FB3D1]" : "mt-1 text-xs text-[#9FB3D1]"].join(" ")}>{item.stack}</div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
              <div className={["h-full rounded-full", item.tint].join(" ")} style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#111E34]/35 px-3 py-2 text-xs text-[#9FB3D1]">
          <span>Roadmap reelle basee sur les projets portfolio</span>
          <span className="text-white/60">{items.length} priorites visibles</span>
        </div>
      )}
    </WindowCard>
  );
}

function ProjectsCard({ active, compact = false }: { active: boolean; compact?: boolean }) {
  const rows = compact ? BEST_PROJECTS.slice(0, 2) : BEST_PROJECTS;
  return (
    <WindowCard className="overflow-hidden p-0">
      <div className={["border-b border-white/10", compact ? "px-4 py-3" : "px-5 py-4"].join(" ")}>
        <HeaderRow
          icon={<FolderOpen size={18} className="text-[#4EA1FF]" />}
          title="Projets"
          active={active}
          href="/projects"
          compact={compact}
        />
      </div>

      <div className={compact ? "px-3 py-3" : "px-4 py-3"}>
        <div className={["font-data mb-2 grid items-center gap-2 px-2 text-[10px] uppercase tracking-[0.18em] text-white/40", compact ? "grid-cols-[minmax(0,1fr)_70px_104px]" : "grid-cols-[minmax(0,1fr)_78px_132px]"].join(" ")}>
          <span>Nom</span>
          <span>Etat</span>
          <span>Impact</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A1426]/70">
          {rows.map((project, index) => (
            <div
              key={project.name}
              className={[
                "relative items-center gap-2 px-3",
                compact ? "grid grid-cols-[minmax(0,1fr)_70px_104px] py-2.5" : "grid grid-cols-[minmax(0,1fr)_78px_132px] py-3",
                index < rows.length - 1 ? "border-b border-white/10" : "",
              ].join(" ")}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Folder size={15} className="shrink-0 text-[#7fd4ff]" />
                <div className="min-w-0">
                  <div className={compact ? "truncate text-xs font-medium text-white/90" : "truncate text-sm font-medium text-white/90"}>{project.name}</div>
                  <div className="font-data truncate text-[11px] text-white/45">{project.stack}</div>
                </div>
              </div>

              <StatusBadge status={project.status} />

              <div className="flex items-center justify-between gap-1 pr-3">
                <span className={["font-data", compact ? "truncate text-[11px] text-[#9FB3D1]" : "truncate text-xs text-[#9FB3D1]"].join(" ")}>{project.impact}</span>
                <ArrowUpRight size={13} className="text-white/40" />
              </div>

              <div className="pointer-events-none absolute right-2 top-1/2 h-5 w-[2px] -translate-y-1/2 rotate-[34deg] rounded-full bg-white/20" />
              <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7fd4ff]/20 to-transparent" />
            </div>
          ))}
        </div>

        {!compact && (
          <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#111E34]/35 px-3 py-2 text-xs text-[#9FB3D1]">
            <span className="inline-flex items-center gap-1.5">
              <FileCode2 size={13} className="text-[#7fd4ff]" />
              <span className="font-data">Top 3 projets selectionnes</span>
            </span>
            <span className="font-data text-white/60">File manager view</span>
          </div>
        )}
      </div>
    </WindowCard>
  );
}

function ExperienceCard({ active, compact = false }: { active: boolean; compact?: boolean }) {
  const items = compact ? EXPERIENCE_ITEMS.slice(0, 2) : EXPERIENCE_ITEMS;
  return (
    <WindowCard className={compact ? "p-4" : "p-5"}>
      <HeaderRow
        icon={<Briefcase size={18} className="text-emerald-300" />}
        title="Experience"
        active={active}
        href="/experience"
        compact={compact}
      />

      <div className={["relative pl-5 before:absolute before:bottom-1 before:left-2 before:top-1 before:w-px before:bg-gradient-to-b before:from-[#7fd4ff]/50 before:via-emerald-300/40 before:to-transparent", compact ? "mt-3 space-y-2" : "mt-4 space-y-3"].join(" ")}>
        {items.map((item) => (
          <div key={item.title} className={["relative rounded-xl border border-white/10 bg-[#111E34]/35", compact ? "p-2.5" : "p-3"].join(" ")}>
            <span className="absolute -left-[15px] top-4 h-2.5 w-2.5 rounded-full border border-white/40 bg-[#7fd4ff]" />
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className={compact ? "text-xs font-semibold text-white/90" : "text-sm font-semibold text-white/90"}>{item.title}</div>
                <div className="mt-0.5 text-xs text-[#9FB3D1]">{item.place}</div>
              </div>
              <span className="font-data rounded-full border border-white/12 bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/65">{item.type}</span>
            </div>
            <div className="font-data mt-2 inline-flex items-center gap-1 text-[11px] text-white/55">
              <CalendarClock size={12} />
              {item.period}
            </div>
          </div>
        ))}
      </div>
    </WindowCard>
  );
}

function ContactCard({ active, compact = false }: { active: boolean; compact?: boolean }) {
  const rows = [
    {
      label: "Email",
      value: PORTFOLIO_DATA.contact.email,
      href: `mailto:${PORTFOLIO_DATA.contact.email}`,
      icon: <Mail size={15} className="text-[#7fd4ff]" />,
    },
    {
      label: "LinkedIn",
      value: PORTFOLIO_DATA.contact.linkedin.replace("https://", ""),
      href: PORTFOLIO_DATA.contact.linkedin,
      icon: <Linkedin size={15} className="text-[#4EA1FF]" />,
    },
    {
      label: "GitHub",
      value: PORTFOLIO_DATA.contact.github.replace("https://", ""),
      href: PORTFOLIO_DATA.contact.github,
      icon: <Github size={15} className="text-white/80" />,
    },
    {
      label: "Phone",
      value: PORTFOLIO_DATA.contact.phone,
      href: PORTFOLIO_DATA.contact.phone === "a remplir" ? "#" : `tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, "")}`,
      icon: <Phone size={15} className="text-emerald-300" />,
    },
  ];
  const visibleRows = compact ? rows.slice(0, 3) : rows;

  return (
    <WindowCard className={compact ? "p-4" : "p-5"}>
      <HeaderRow icon={<Mail size={18} className="text-[#A78BFA]" />} title="Contact" active={active} href="/contact" compact={compact} />

      <div className={["flex items-center justify-between rounded-xl border border-[#7fd4ff]/20 bg-[#0F223C]/55 px-3 py-2 text-xs", compact ? "mt-2" : "mt-3"].join(" ")}>
        <span className="inline-flex items-center gap-1.5 text-[#9FB3D1]">
          <MapPin size={12} />
          <span className="font-data">{PORTFOLIO_DATA.profile.country} - Remote friendly</span>
        </span>
        <span className="font-data rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[10px] text-emerald-200">Disponible</span>
      </div>

      <div className={compact ? "mt-2 space-y-2" : "mt-3 space-y-2"}>
        {visibleRows.map((row) => (
          <a
            key={row.label}
            href={row.href}
            target={row.href.startsWith("http") ? "_blank" : undefined}
            rel={row.href.startsWith("http") ? "noreferrer" : undefined}
            onClick={(e) => {
              if (!active) {
                e.preventDefault();
                return;
              }
              e.stopPropagation();
            }}
            className={[
              "group flex items-center gap-2 rounded-xl border border-white/10 bg-[#111E34]/35 px-3 transition",
              compact ? "py-2" : "py-2.5",
              active ? "hover:border-[#7fd4ff]/30 hover:bg-[#142743]/55" : "cursor-default",
            ].join(" ")}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-[#0A1426]/70">{row.icon}</span>
            <div className="min-w-0">
              <div className="font-data text-xs text-white/55">{row.label}</div>
              <div className={compact ? "truncate text-xs text-white/90" : "truncate text-sm text-white/90"}>{row.value}</div>
            </div>
            <ArrowUpRight size={14} className="ml-auto text-white/40 transition group-hover:text-[#7fd4ff]" />
          </a>
        ))}
      </div>
    </WindowCard>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const theme: Record<ProjectStatus, string> = {
    PROD: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
    DEV: "border-cyan-300/35 bg-cyan-300/10 text-cyan-200",
    BETA: "border-violet-300/35 bg-violet-300/10 text-violet-200",
  };

  const label: Record<ProjectStatus, string> = {
    PROD: "Production",
    DEV: "Developpement",
    BETA: "Beta",
  };

  return (
    <span className={["font-data inline-flex w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium", theme[status]].join(" ")}>
      {label[status]}
    </span>
  );
}

function HeaderRow({
  icon,
  title,
  active,
  href,
  compact = false,
}: {
  icon: ReactNode;
  title: string;
  active: boolean;
  href: string;
  compact?: boolean;
}) {
  return (
    <div className="font-display flex items-center gap-2 font-semibold tracking-wide">
      {icon}
      {title}

      <div className="ml-auto flex items-center gap-2">
        {active && (
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className={[
              "group grid place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-200 hover:bg-white/[0.08]",
              compact ? "h-8 w-8" : "h-9 w-9",
            ].join(" ")}
            aria-label={`Open ${title}`}
            title="Ouvrir la page"
          >
            <ExternalLink size={compact ? 14 : 16} className="text-white/70 group-hover:text-white/85" />
          </Link>
        )}
      </div>
    </div>
  );
}
