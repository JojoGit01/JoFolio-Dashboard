"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
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

type ProjectStatus = "LIVE" | "WIP" | "BETA";

type ProjectRow = {
  name: string;
  status: ProjectStatus;
  stack: string;
  impact: string;
};

const BEST_PROJECTS: ProjectRow[] = PORTFOLIO_DATA.projects.slice(0, 3).map((project) => {
  const gain = project.businessImpact.deliveryGainPercent;
  return {
    name: project.name,
    status: project.status === "WIP" ? "WIP" : project.status === "BETA" ? "BETA" : "LIVE",
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

export default function HomeRight({
  active,
  setActive,
}: {
  active: CardId;
  setActive: (id: CardId) => void;
}) {
  const reduceMotion = useReducedMotion();
  const focusPos = "left-[11%] top-[94px] z-30 opacity-100 blur-0 scale-[1.02] rotate-0";

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
      "absolute max-w-full cursor-none transform-gpu will-change-transform transition-[left,top,opacity,transform,filter] duration-500 ease-[cubic-bezier(.2,.9,.2,1)]";

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
            duration: 0.48,
            delay: 0.08 + index * 0.08,
            ease: [0.2, 0.8, 0.2, 1],
          },
        };

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative col-span-12 lg:col-span-7"
    >
      <div className="relative hidden h-[min(720px,calc(100vh-180px))] lg:block">
        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className={getSceneClass("building")}
          onClick={() => setActive("building")}
        >
          <motion.div {...getRevealProps(0)}>
            <BuildingCard active={active === "building"} />
          </motion.div>
        </motion.div>

        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className={getSceneClass("projects")}
          onClick={() => setActive("projects")}
        >
          <motion.div {...getRevealProps(1)}>
            <ProjectsCard active={active === "projects"} />
          </motion.div>
        </motion.div>

        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className={getSceneClass("experience")}
          onClick={() => setActive("experience")}
        >
          <motion.div {...getRevealProps(2)}>
            <ExperienceCard active={active === "experience"} />
          </motion.div>
        </motion.div>

        <motion.div
          data-cursor="hover"
          layout
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className={getSceneClass("contact")}
          onClick={() => setActive("contact")}
        >
          <motion.div {...getRevealProps(3)}>
            <ContactCard active={active === "contact"} />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-8 block space-y-6 lg:hidden">
        <motion.div {...getRevealProps(0)}>
          <BuildingCard active />
        </motion.div>
        <motion.div {...getRevealProps(1)}>
          <ProjectsCard active />
        </motion.div>
        <motion.div {...getRevealProps(2)}>
          <ExperienceCard active />
        </motion.div>
        <motion.div {...getRevealProps(3)}>
          <ContactCard active />
        </motion.div>
      </div>
    </motion.section>
  );
}

function BuildingCard({ active }: { active: boolean }) {
  const items = [
    {
      title: "Project Modal V2",
      stack: "Tabs + compare + scorecard",
      progress: 86,
      tint: "bg-[#7fd4ff]",
    },
    {
      title: "Contact UX polish",
      stack: "Validation + feedback realtime",
      progress: 72,
      tint: "bg-emerald-300",
    },
    {
      title: "Dashboard perf",
      stack: "Animations + rendering tuning",
      progress: 64,
      tint: "bg-violet-300",
    },
  ];

  return (
    <WindowCard className="p-6">
      <HeaderRow icon={<Rocket size={18} className="text-[#4EA1FF]" />} title="En cours" active={active} href="/projects" />

      <p className="mt-3 text-sm text-[#9FB3D1]">Focus actuel sur les composants les plus visibles du dashboard.</p>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl border border-white/10 bg-[#111E34]/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium text-white/90">{item.title}</div>
              <span className="text-xs text-white/50">{item.progress}%</span>
            </div>
            <div className="mt-1 text-xs text-[#9FB3D1]">{item.stack}</div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
              <div className={["h-full rounded-full", item.tint].join(" ")} style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </WindowCard>
  );
}

function ProjectsCard({ active }: { active: boolean }) {
  return (
    <WindowCard className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-5 py-4">
        <HeaderRow
          icon={<FolderOpen size={18} className="text-[#4EA1FF]" />}
          title="Projets"
          active={active}
          href="/projects"
        />
      </div>

      <div className="px-4 py-3">
        <div className="mb-2 grid grid-cols-[minmax(0,1fr)_78px_132px] items-center gap-2 px-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
          <span>Nom</span>
          <span>Etat</span>
          <span>Impact</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A1426]/70">
          {BEST_PROJECTS.map((project, index) => (
            <div
              key={project.name}
              className={[
                "relative grid grid-cols-[minmax(0,1fr)_78px_132px] items-center gap-2 px-3 py-3",
                index < BEST_PROJECTS.length - 1 ? "border-b border-white/10" : "",
              ].join(" ")}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Folder size={15} className="shrink-0 text-[#7fd4ff]" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white/90">{project.name}</div>
                  <div className="truncate text-[11px] text-white/45">{project.stack}</div>
                </div>
              </div>

              <StatusBadge status={project.status} />

              <div className="flex items-center justify-between gap-1 pr-3">
                <span className="truncate text-xs text-[#9FB3D1]">{project.impact}</span>
                <ArrowUpRight size={13} className="text-white/40" />
              </div>

              <div className="pointer-events-none absolute right-2 top-1/2 h-5 w-[2px] -translate-y-1/2 rotate-[34deg] rounded-full bg-white/20" />
              <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#7fd4ff]/20 to-transparent" />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#111E34]/35 px-3 py-2 text-xs text-[#9FB3D1]">
          <span className="inline-flex items-center gap-1.5">
            <FileCode2 size={13} className="text-[#7fd4ff]" />
            Top 3 projets selectionnes
          </span>
          <span className="text-white/60">File manager view</span>
        </div>
      </div>
    </WindowCard>
  );
}

function ExperienceCard({ active }: { active: boolean }) {
  return (
    <WindowCard className="p-5">
      <HeaderRow
        icon={<Briefcase size={18} className="text-emerald-300" />}
        title="Experience"
        active={active}
        href="/experience"
      />

      <div className="relative mt-4 space-y-3 pl-5 before:absolute before:bottom-1 before:left-2 before:top-1 before:w-px before:bg-gradient-to-b before:from-[#7fd4ff]/50 before:via-emerald-300/40 before:to-transparent">
        {EXPERIENCE_ITEMS.map((item) => (
          <div key={item.title} className="relative rounded-xl border border-white/10 bg-[#111E34]/35 p-3">
            <span className="absolute -left-[15px] top-4 h-2.5 w-2.5 rounded-full border border-white/40 bg-[#7fd4ff]" />
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-white/90">{item.title}</div>
                <div className="mt-0.5 text-xs text-[#9FB3D1]">{item.place}</div>
              </div>
              <span className="rounded-full border border-white/12 bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/65">{item.type}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-white/55">
              <CalendarClock size={12} />
              {item.period}
            </div>
          </div>
        ))}
      </div>
    </WindowCard>
  );
}

function ContactCard({ active }: { active: boolean }) {
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

  return (
    <WindowCard className="p-5">
      <HeaderRow icon={<Mail size={18} className="text-[#A78BFA]" />} title="Contact" active={active} href="/contact" />

      <div className="mt-3 flex items-center justify-between rounded-xl border border-[#7fd4ff]/20 bg-[#0F223C]/55 px-3 py-2 text-xs">
        <span className="inline-flex items-center gap-1.5 text-[#9FB3D1]">
          <MapPin size={12} />
          {PORTFOLIO_DATA.profile.country} - Remote friendly
        </span>
        <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[10px] text-emerald-200">Disponible</span>
      </div>

      <div className="mt-3 space-y-2">
        {rows.map((row) => (
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
              "group flex items-center gap-2 rounded-xl border border-white/10 bg-[#111E34]/35 px-3 py-2.5 transition",
              active ? "hover:border-[#7fd4ff]/30 hover:bg-[#142743]/55" : "cursor-default",
            ].join(" ")}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-[#0A1426]/70">{row.icon}</span>
            <div className="min-w-0">
              <div className="text-xs text-white/55">{row.label}</div>
              <div className="truncate text-sm text-white/90">{row.value}</div>
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
    LIVE: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
    WIP: "border-amber-300/35 bg-amber-300/10 text-amber-200",
    BETA: "border-violet-300/35 bg-violet-300/10 text-violet-200",
  };

  return (
    <span className={["inline-flex w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium", theme[status]].join(" ")}>
      {status}
    </span>
  );
}

function HeaderRow({
  icon,
  title,
  active,
  href,
}: {
  icon: ReactNode;
  title: string;
  active: boolean;
  href: string;
}) {
  return (
    <div className="flex items-center gap-2 font-semibold">
      {icon}
      {title}

      <div className="ml-auto flex items-center gap-2">
        {active && (
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="group grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-200 hover:bg-white/[0.08]"
            aria-label={`Open ${title}`}
            title="Ouvrir la page"
          >
            <ExternalLink size={16} className="text-white/70 group-hover:text-white/85" />
          </Link>
        )}
      </div>
    </div>
  );
}
