"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  Check,
  Download,
  GraduationCap,
  MapPin,
  School,
  Star,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

type TrackKind = "school" | "university" | "engineer" | "cert";
type Accent = "cyan" | "mint" | "amber" | "violet";

type FormationNode = {
  id: string;
  title: string;
  subtitle: string;
  years: string;
  city: string;
  status: "obtained" | "in_progress";
  kind: TrackKind;
  modules: string[];
  skills: { label: string; value: number }[];
  projects: { id: string; name: string; state?: "Live" | "WIP" }[];
  mention?: string;
  accent: Accent;
};

const ACCENT = {
  cyan: {
    border: "border-cyan-300/35",
    softBg: "bg-cyan-300/10",
    text: "text-cyan-200",
    dot: "bg-cyan-200",
    glow: "rgba(93,223,255,0.34)",
    progress: "from-cyan-300 to-sky-300",
  },
  mint: {
    border: "border-emerald-300/35",
    softBg: "bg-emerald-300/10",
    text: "text-emerald-200",
    dot: "bg-emerald-200",
    glow: "rgba(98,255,216,0.3)",
    progress: "from-emerald-300 to-cyan-300",
  },
  amber: {
    border: "border-amber-300/35",
    softBg: "bg-amber-300/10",
    text: "text-amber-200",
    dot: "bg-amber-200",
    glow: "rgba(255,211,110,0.3)",
    progress: "from-amber-300 to-orange-300",
  },
  violet: {
    border: "border-violet-300/35",
    softBg: "bg-violet-300/10",
    text: "text-violet-200",
    dot: "bg-violet-200",
    glow: "rgba(185,142,255,0.28)",
    progress: "from-violet-300 to-indigo-300",
  },
} as const;

function nodeIcon(kind: TrackKind) {
  if (kind === "school") return <School size={15} className="text-white/88" />;
  if (kind === "university") return <GraduationCap size={15} className="text-white/88" />;
  if (kind === "engineer") return <BriefcaseBusiness size={15} className="text-white/88" />;
  return <Star size={15} className="text-white/88" />;
}

export default function FormationsPage() {
  const nodes = useMemo<FormationNode[]>(() => {
    const accentOrder: Accent[] = ["cyan", "mint", "amber", "violet"];
    const mapStatus = (year: number): FormationNode["status"] => (year <= new Date().getFullYear() ? "obtained" : "in_progress");
    const mapKind = (level: string): TrackKind => {
      if (level.toLowerCase().includes("master")) return "engineer";
      if (level.toLowerCase().includes("licence")) return "university";
      return "school";
    };
    const projectState = (status: string): "Live" | "WIP" => (status === "WIP" ? "WIP" : "Live");
    const metricFromSeed = (seed: number) => Math.max(1, seed);

    const formationNodes: FormationNode[] = PORTFOLIO_DATA.formations.map((f, idx) => ({
      id: f.id,
      title: f.title,
      subtitle: f.school,
      years: `${f.startYear} - ${f.endYear}`,
      city: `${f.city}, ${f.country}`,
      status: mapStatus(f.endYear),
      kind: mapKind(f.level),
      modules: f.modules.slice(0, 6),
      skills: [
        { label: "Frontend", value: metricFromSeed(f.specialization.toLowerCase().includes("mobile") ? 78 : 1) },
        { label: "Backend", value: metricFromSeed(f.specialization.toLowerCase().includes("develop") ? 74 : 1) },
        { label: "DevOps", value: 1 },
        { label: "Architecture", value: metricFromSeed(f.level.toLowerCase().includes("master") ? 80 : 1) },
      ],
      projects: PORTFOLIO_DATA.projects.slice(idx, idx + 2).map((p) => ({
        id: p.id,
        name: p.name,
        state: projectState(p.status),
      })),
      mention: f.grade === "a remplir" ? undefined : f.grade,
      accent: accentOrder[idx % accentOrder.length],
    }));

    formationNodes.push({
      id: "certifications-node",
      title: "Certifications",
      subtitle: PORTFOLIO_DATA.skills.slice(0, 3).map((s) => s.name).join(" - "),
      years: "2024 - 2026",
      city: "Online",
      status: "obtained",
      kind: "cert",
      modules: PORTFOLIO_DATA.skills.slice(0, 6).map((s) => s.name),
      skills: [
        { label: "Frontend", value: 1 },
        { label: "Backend", value: 1 },
        { label: "DevOps", value: 1 },
        { label: "Architecture", value: 1 },
      ],
      projects: PORTFOLIO_DATA.projects.slice(0, 2).map((p) => ({
        id: p.id,
        name: p.name,
        state: projectState(p.status),
      })),
      mention: "a remplir",
      accent: "violet",
    });

    return formationNodes;
  }, []);

  const [activeId, setActiveId] = useState(() => {
    const preferred = nodes.find((n) => n.kind === "university");
    return preferred?.id ?? nodes[0]?.id ?? "";
  });
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];
  const topRouteNodes = nodes.filter((n) => n.kind !== "cert");
  const notchClip = "polygon(16px 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 16px 100%, 0 50%)";
  const totalStudyYears = useMemo(
    () => PORTFOLIO_DATA.formations.reduce((acc, f) => acc + Math.max(1, f.endYear - f.startYear), 0),
    []
  );

  return (
    <section className="relative px-3 pb-3 pt-7 text-white lg:px-4 lg:pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[24px] bg-[#040a17]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] bg-[radial-gradient(circle_at_20%_14%,rgba(81,210,255,0.14),transparent_28%),radial-gradient(circle_at_76%_30%,rgba(255,212,118,0.10),transparent_30%),linear-gradient(180deg,rgba(6,13,25,0.97),rgba(4,8,16,0.99))]" />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 space-y-4 xl:col-span-8">
          <div className="relative overflow-hidden rounded-[20px] border border-white/12 bg-[#061022]/74 p-4 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(96,220,255,0.14),transparent_42%)]" />

            <div className="relative hidden grid-cols-3 gap-3 md:grid">
              <svg className="pointer-events-none absolute left-[12%] right-[12%] top-[16px] h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="route-main" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(110,255,220,0.8)" />
                    <stop offset="52%" stopColor="rgba(93,223,255,0.86)" />
                    <stop offset="100%" stopColor="rgba(255,210,120,0.8)" />
                  </linearGradient>
                </defs>
                <path d="M 2 13 Q 50 3 98 13" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
                <path d="M 2 13 Q 50 3 98 13" fill="none" stroke="url(#route-main)" strokeWidth="0.85" strokeLinecap="round" />
              </svg>

              {topRouteNodes.map((node) => {
                const tone = ACCENT[node.accent];
                const isActive = activeId === node.id;
                return (
                  <button
                    key={`top-${node.id}`}
                    onClick={() => setActiveId(node.id)}
                    className={[
                      "relative rounded-2xl border px-3 pb-3 pt-2 text-center transition",
                      isActive ? `${tone.border} ${tone.softBg}` : "border-white/10 bg-black/18 hover:border-white/25",
                    ].join(" ")}
                    style={isActive ? { boxShadow: `0 0 14px ${tone.glow}` } : undefined}
                  >
                    <div className="mx-auto grid h-9 w-9 place-items-center rounded-xl border border-white/14 bg-black/25">
                      {nodeIcon(node.kind)}
                    </div>
                    <p className="mt-1 text-[11px] text-white/58">{node.years}</p>
                    <p className={["truncate text-sm font-medium", isActive ? tone.text : "text-white/82"].join(" ")}>
                      {node.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#071124]/32 p-4 md:p-5">
            <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-200/10 via-cyan-200/40 to-transparent md:block" />

            <div className="space-y-4 md:space-y-5">
              {nodes.map((node, index) => {
                const tone = ACCENT[node.accent];
                const isActive = node.id === activeId;
                const right = index % 2 === 1;

                return (
                  <div key={node.id} className="relative min-h-[100px]">
                    <div className={["relative", right ? "md:pl-[calc(50%+30px)]" : "md:pr-[calc(50%+30px)]"].join(" ")}>
                      <button
                        onClick={() => setActiveId(node.id)}
                        className={[
                          "relative w-full rounded-[16px] border px-4 py-3 text-left transition md:max-w-[350px]",
                          isActive ? `${tone.border} ${tone.softBg}` : "border-white/12 bg-black/22 hover:border-white/25",
                        ].join(" ")}
                        style={isActive ? { boxShadow: `0 0 18px ${tone.glow}` } : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-black/28">
                            {nodeIcon(node.kind)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-white/62">{node.years}</p>
                            <p className="truncate text-lg font-semibold text-white/92">{node.title}</p>
                            <p className={["mt-0.5 truncate text-sm", isActive ? tone.text : "text-white/65"].join(" ")}>
                              {node.subtitle}
                            </p>
                          </div>
                          <span className={["h-2.5 w-2.5 rounded-full", isActive ? tone.dot : "bg-white/25"].join(" ")} />
                        </div>
                      </button>
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                      <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-cyan-200/28" />
                      <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-cyan-200/85 shadow-[0_0_14px_rgba(104,227,255,0.9)]" />
                    </div>

                    {right ? (
                      <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-cyan-200/70 to-transparent md:block" />
                    ) : (
                      <span className="pointer-events-none absolute right-1/2 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-l from-cyan-200/70 to-transparent md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="relative overflow-hidden border border-[#2d4868]/75 bg-[linear-gradient(180deg,rgba(8,18,36,0.97),rgba(4,11,24,0.97))] p-2.5 backdrop-blur-xl shadow-[0_16px_44px_rgba(0,0,0,0.45),0_0_28px_rgba(90,210,255,0.12)]"
            style={{ clipPath: notchClip }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(140,220,255,0.16),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-[6px] border border-dashed border-white/12" style={{ clipPath: notchClip }} />

            <div className="pointer-events-none absolute bottom-0 left-[8%] h-[3px] w-[27%] rounded-full bg-cyan-300/92 blur-[0.3px]" />
            <div className="pointer-events-none absolute bottom-0 left-[38.5%] h-[3px] w-[23%] rounded-full bg-cyan-300/78 blur-[0.3px]" />
            <div className="pointer-events-none absolute bottom-0 left-[68%] h-[3px] w-[25%] rounded-full bg-cyan-300/88 blur-[0.3px]" />

            <div className="pointer-events-none absolute left-1/3 top-1/2 h-[64%] w-px -translate-y-1/2 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.36)_0px,rgba(255,255,255,0.36)_2px,transparent_2px,transparent_7px)]" />
            <div className="pointer-events-none absolute left-2/3 top-1/2 h-[64%] w-px -translate-y-1/2 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.36)_0px,rgba(255,255,255,0.36)_2px,transparent_2px,transparent_7px)]" />

            <div className="relative grid grid-cols-3 gap-0">
              <BottomMetric
                icon={<GraduationCap size={15} className="text-cyan-200" />}
                value={String(PORTFOLIO_DATA.quickStats.totalFormations)}
                label="Formations"
              />
              <BottomMetric
                icon={<BriefcaseBusiness size={15} className="text-cyan-200" />}
                value={String(totalStudyYears)}
                label="Ans d'Etudes"
              />
              <BottomMetric
                icon={<Star size={15} className="text-cyan-200" />}
                value={String(PORTFOLIO_DATA.quickStats.totalCertifications)}
                label="Certifications"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <aside className="relative overflow-hidden rounded-[22px] border border-white/14 bg-[#081529]/86 p-4 backdrop-blur-xl md:p-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(94,220,255,0.15),transparent_36%)]" />

            <div className="relative border-b border-white/12 pb-4">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/12 bg-black/24">{nodeIcon(active.kind)}</div>
                <div className="min-w-0">
                  <p className="truncate text-2xl font-semibold leading-tight text-white/92">{active.title}</p>
                  <p className="mt-0.5 text-sm text-white/68">{active.subtitle}</p>
                </div>
                <span
                  className={[
                    "ml-auto inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs",
                    active.status === "obtained"
                      ? "border-emerald-300/30 bg-emerald-300/12 text-emerald-200"
                      : "border-amber-300/30 bg-amber-300/12 text-amber-200",
                  ].join(" ")}
                >
                  {active.status === "obtained" ? <Check size={12} /> : <Calendar size={12} />}
                  {active.status === "obtained" ? "Diplome obtenu" : "En cours"}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/72">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} className="text-white/55" /> {active.years}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} className="text-white/55" /> {active.city}
                </span>
              </div>
            </div>

            <section className="relative mt-4">
              <h3 className="text-xl font-semibold text-white/88">Modules cles</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.modules.map((module) => (
                  <span key={module} className="rounded-lg border border-white/13 bg-black/22 px-3 py-1 text-xs text-white/82">
                    {module}
                  </span>
                ))}
              </div>
            </section>

            <section className="relative mt-4">
              <h3 className="text-xl font-semibold text-white/88">Competences</h3>
              <div className="mt-3 space-y-2.5">
                {active.skills.map((skill) => (
                  <div key={skill.label} className="grid grid-cols-[92px_1fr_42px] items-center gap-2">
                    <p className="text-sm text-white/80">{skill.label}</p>
                    <div className="h-[6px] overflow-hidden rounded-full bg-white/14">
                      <div className={[
                        "h-full rounded-full bg-gradient-to-r",
                        ACCENT[active.accent].progress,
                      ].join(" ")} style={{ width: `${skill.value}%` }} />
                    </div>
                    <p className="text-right text-sm text-white/86">{skill.value}%</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative mt-4">
              <h3 className="text-xl font-semibold text-white/88">Projets realises</h3>
              <div className="mt-3 space-y-2">
                {active.projects.map((project) => (
                  <div key={project.id} className="flex items-center gap-3 rounded-lg border border-white/12 bg-black/22 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-200" />
                    <p className="text-sm text-white/86">{project.name}</p>
                    {project.state && (
                      <span
                        className={[
                          "ml-auto rounded-full px-2 py-0.5 text-[11px]",
                          project.state === "Live" ? "bg-emerald-300/12 text-emerald-200" : "bg-indigo-300/14 text-indigo-200",
                        ].join(" ")}
                      >
                        {project.state}
                      </span>
                    )}
                    <ArrowRight size={14} className="text-white/45" />
                  </div>
                ))}
              </div>
            </section>

            <section className="relative mt-5 border-t border-white/12 pt-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-white/64">Notes</p>
                  <p className="text-lg font-semibold text-amber-200">{active.mention ?? "Mention"}</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/8 px-4 py-2 text-sm text-white/88 transition hover:bg-white/12">
                  Voir le diplome <Download size={14} className="text-cyan-200" />
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BottomMetric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="px-4 py-2.5">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/38 bg-cyan-300/12 shadow-[0_0_12px_rgba(112,233,255,0.24)]">
          {icon}
        </div>
        <div>
          <p className="text-[38px] leading-none font-semibold text-white/95">{value}</p>
          <p className="mt-0.5 text-[16px] leading-tight text-white/84">{label}</p>
        </div>
      </div>
    </div>
  );
}
