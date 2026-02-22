"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Atom,
  Box,
  Braces,
  ChevronDown,
  ChevronRight,
  Circle,
  Code2,
  Database,
  Layers,
  Play,
  Sparkles,
  Triangle,
  Wrench,
} from "lucide-react";
import { CATEGORIES, SKILLS } from "./data";
import type { AccentKey, CategoryKey, ConfidenceLevel, Skill } from "./types";

type CanonicalLevel = "beginner" | "intermediate" | "advanced" | "expert";

const ACCENT: Record<
  AccentKey,
  {
    title: string;
    accentText: string;
    glow: string;
    border: string;
    strip: string;
    ring: string;
    chip: string;
    progress: string;
  }
> = {
  green: {
    title: "text-[#71e7cf]",
    accentText: "text-[#8fdccd]",
    glow: "rgba(78,210,183,0.16)",
    border: "border-[#3bbda4]/40",
    strip: "from-[#4acfb3] to-[#62d7c6]",
    ring: "ring-[#3bbda4]/35",
    chip: "border-[#3bbda4]/35 bg-[#3bbda4]/10 text-[#9ae7d8]",
    progress: "from-[#56cfc6] to-[#76c8ef]",
  },
  blue: {
    title: "text-[#7ec8f1]",
    accentText: "text-[#9dd3ef]",
    glow: "rgba(90,176,232,0.16)",
    border: "border-[#4d9dce]/40",
    strip: "from-[#5cb8e8] to-[#6da8d8]",
    ring: "ring-[#4d9dce]/35",
    chip: "border-[#4d9dce]/35 bg-[#4d9dce]/10 text-[#addbf3]",
    progress: "from-[#63c5f1] to-[#6c8fe4]",
  },
  purple: {
    title: "text-[#bf9add]",
    accentText: "text-[#cfb3e6]",
    glow: "rgba(163,118,196,0.15)",
    border: "border-[#8f6cb2]/40",
    strip: "from-[#9c7ac4] to-[#b08ccb]",
    ring: "ring-[#8f6cb2]/35",
    chip: "border-[#8f6cb2]/35 bg-[#8f6cb2]/10 text-[#d2c2e4]",
    progress: "from-[#8f8ce1] to-[#74a5e5]",
  },
  yellow: {
    title: "text-[#d7b887]",
    accentText: "text-[#e2cbab]",
    glow: "rgba(187,148,93,0.15)",
    border: "border-[#9d7f55]/40",
    strip: "from-[#b89462] to-[#caad81]",
    ring: "ring-[#9d7f55]/35",
    chip: "border-[#9d7f55]/35 bg-[#9d7f55]/10 text-[#e8d6bc]",
    progress: "from-[#8db8db] to-[#6d92ca]",
  },
};

function parseLevel(levelLabel: Skill["levelLabel"]): CanonicalLevel {
  const raw = String(levelLabel).toLowerCase();
  if (raw.includes("begin")) return "beginner";
  if (raw.includes("inter")) return "intermediate";
  if (raw.includes("advan")) return "advanced";
  return "expert";
}

function levelLabelEN(level: CanonicalLevel) {
  if (level === "beginner") return "Beginner";
  if (level === "intermediate") return "Intermediate";
  if (level === "advanced") return "Advanced";
  return "Expert";
}

function levelIndex(level: CanonicalLevel) {
  if (level === "beginner") return 0;
  if (level === "intermediate") return 1;
  if (level === "advanced") return 2;
  return 3;
}

function formatRecency(months: number) {
  if (months <= 0) return "Actif maintenant";
  if (months === 1) return "Il y a 1 mois";
  return `Il y a ${months} mois`;
}

function sortSkills(list: Skill[]) {
  const copy = [...list];
  copy.sort((a, b) => b.impactScore - a.impactScore || b.percent - a.percent);
  return copy;
}

function confidenceClass(confidence: ConfidenceLevel) {
  if (confidence === "Core") return "border-[#72dbc4]/35 bg-[#72dbc4]/12 text-[#a6e8da]";
  if (confidence === "Strong") return "border-[#84b7de]/35 bg-[#84b7de]/10 text-[#b8d7ed]";
  return "border-[#b49ed2]/35 bg-[#b49ed2]/10 text-[#d7cce8]";
}

function skillIcon(skill: Skill) {
  const iconClass = "h-6 w-6";
  switch (skill.iconKey) {
    case "react":
      return <Atom className={`${iconClass} text-[#66d8ea]`} />;
    case "next":
      return <Circle className={`${iconClass} text-white/85`} />;
    case "ts":
      return <Braces className={`${iconClass} text-[#78b8f0]`} />;
    case "tailwind":
      return <Sparkles className={`${iconClass} text-[#7acde7]`} />;
    case "redux":
      return <Layers className={`${iconClass} text-[#b8a0de]`} />;
    case "styled":
      return <Triangle className={`${iconClass} text-[#d8a3cb]`} />;
    case "node":
      return <Code2 className={`${iconClass} text-[#9ed9b1]`} />;
    case "fastapi":
      return <Database className={`${iconClass} text-[#89dbc9]`} />;
    case "docker":
      return <Box className={`${iconClass} text-[#89bde2]`} />;
    case "git":
      return <Wrench className={`${iconClass} text-[#d4b08e]`} />;
    default:
      return <Code2 className={`${iconClass} text-white/75`} />;
  }
}

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("frontend");
  const [additionalOpen, setAdditionalOpen] = useState(false);

  const categoryCounts = useMemo(() => {
    const map: Record<CategoryKey, number> = {
      frontend: 0,
      backend: 0,
      tools: 0,
      others: 0,
    };
    for (const s of SKILLS) {
      map[s.category] += 1;
    }
    return map;
  }, []);

  const skillsByCategory = useMemo(() => {
    const list = SKILLS.filter((s) => s.category === activeCategory);
    return sortSkills(list);
  }, [activeCategory]);

  const [selectedId, setSelectedId] = useState(
    () => SKILLS.find((s) => s.category === "frontend")?.id ?? SKILLS[0]?.id ?? "react"
  );

  const selectedSkill = useMemo(() => {
    if (skillsByCategory.length === 0) return null;
    return skillsByCategory.find((s) => s.id === selectedId) ?? skillsByCategory[0];
  }, [selectedId, skillsByCategory]);

  const activeCat = CATEGORIES.find((c) => c.key === activeCategory) ?? CATEGORIES[0];
  const A = ACCENT[activeCat.accent];

  const sectionTitle =
    activeCategory === "frontend"
      ? "Front-End"
      : activeCategory === "backend"
        ? "Back-End"
        : activeCategory === "tools"
          ? "Outils & ++"
          : "Autres";

  return (
    <section className="relative px-1 py-2 text-white sm:px-2 sm:py-3 lg:px-3">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[22px] bg-[#050d19]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[22px] bg-[radial-gradient(circle_at_20%_8%,rgba(93,186,228,0.09),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(132,111,190,0.07),transparent_32%),linear-gradient(180deg,rgba(7,14,28,0.94),rgba(4,8,17,0.96))]" />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === activeCategory;
          const catAccent = ACCENT[cat.accent];

          return (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                const nextPool = SKILLS.filter((s) => s.category === cat.key);
                const first = sortSkills(nextPool)[0] ?? SKILLS.find((s) => s.category === cat.key);
                if (first) setSelectedId(first.id);
              }}
              className={[
                "group relative overflow-hidden rounded-[14px] border bg-[#0a162b]/75 px-3 py-2.5 text-left backdrop-blur-md transition sm:rounded-[16px] sm:px-4 sm:py-3",
                isActive ? `${catAccent.border} ring-1 ${catAccent.ring}` : "border-white/10 hover:border-white/20",
              ].join(" ")}
              style={{
                boxShadow: isActive
                  ? `0 0 0 1px rgba(255,255,255,0.05), 0 0 20px ${catAccent.glow}`
                  : "0 0 0 1px rgba(255,255,255,0.02)",
              }}
            >
              <div className="relative flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/30 text-white/85 sm:h-10 sm:w-10">
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-white/90 sm:text-[20px]">{cat.label}</p>
                  <p className={["mt-0.5 text-xs", isActive ? catAccent.accentText : "text-white/58"].join(" ")}>
                    {categoryCounts[cat.key]} competences
                  </p>
                </div>
                {isActive && <span className="ml-auto h-2.5 w-2.5 rounded-full bg-white/85" />}
              </div>

              <div className="relative mt-3 h-[3px] overflow-hidden rounded-full bg-white/10">
                <div
                  className={[
                    "h-full rounded-full bg-gradient-to-r transition-all",
                    isActive ? catAccent.strip : "from-white/15 to-white/5",
                  ].join(" ")}
                  style={{ width: isActive ? "76%" : "46%" }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-3 sm:mt-5 sm:gap-4">
        <div className="col-span-12 xl:col-span-8">
          <div className="flex items-end justify-between gap-2 border-b border-white/10 pb-2">
            <h2 className="text-xl font-semibold text-white/90 sm:text-2xl md:text-[38px]">
              All Skills in <span className={A.title}>{sectionTitle}</span>
            </h2>
            <button className="inline-flex items-center gap-1 text-xs text-[#8bcce8] transition hover:text-[#a2d9ef] sm:text-sm">
              See All ({skillsByCategory.length}) <ChevronRight size={16} />
            </button>
          </div>

          {selectedSkill && (
            <div className="mt-3 rounded-[14px] border border-white/10 bg-[#081529]/74 p-3 xl:hidden">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5">
                  {skillIcon(selectedSkill)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white/92">{selectedSkill.name}</p>
                  <p className="mt-0.5 text-xs text-white/62">
                    {levelLabelEN(parseLevel(selectedSkill.levelLabel))} - {selectedSkill.confidence}
                  </p>
                </div>
                <p className="text-lg font-semibold text-[#7de5d0]">{selectedSkill.percent}%</p>
              </div>
            </div>
          )}

          {skillsByCategory.length === 0 ? (
            <div className="mt-3 rounded-[14px] border border-white/10 bg-[#081327]/68 p-6 text-center text-white/62">
              Aucune competence disponible dans cette categorie.
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
              {skillsByCategory.map((skill) => {
                const isActive = selectedSkill?.id === skill.id;
                const parsed = parseLevel(skill.levelLabel);
                const firstProof = skill.proofs?.[0];

                return (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedId(skill.id)}
                    className={[
                      "group relative overflow-hidden rounded-[14px] border bg-[#081327]/72 p-2.5 text-left transition sm:p-3",
                      isActive ? `${A.border} ring-1 ${A.ring}` : "border-white/10 hover:border-white/20",
                    ].join(" ")}
                    style={{
                      boxShadow: isActive
                        ? `0 0 0 1px rgba(255,255,255,0.05), 0 0 16px ${A.glow}`
                        : "0 0 0 1px rgba(255,255,255,0.02)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/30 sm:h-12 sm:w-12">
                        {skillIcon(skill)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-[13px] font-semibold text-white/90 sm:text-[17px]">{skill.name}</p>
                          <span className={["hidden rounded-full border px-2 py-0.5 text-[10px] sm:inline-flex", confidenceClass(skill.confidence)].join(" ")}>
                            {skill.confidence}
                          </span>
                        </div>
                        <p
                          className={[
                            "mt-0.5 text-[11px] sm:text-xs",
                            parsed === "expert"
                              ? A.accentText
                              : parsed === "advanced"
                                ? "text-[#d9c08a]"
                                : "text-white/62",
                          ].join(" ")}
                        >
                          {levelLabelEN(parsed)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-white/12">
                        <div className={["h-full rounded-full bg-gradient-to-r", A.progress].join(" ")} style={{ width: `${skill.percent}%` }} />
                      </div>
                      <span className="text-[13px] font-semibold text-white/82 sm:text-base">{skill.percent}%</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-white/55 sm:text-[11px]">
                      <span>Impact {skill.impactScore}</span>
                      <span>{formatRecency(skill.recencyMonths)}</span>
                    </div>

                    {firstProof && (
                      <div className="mt-2 hidden items-center gap-1.5 rounded-lg border border-white/8 bg-black/25 px-2 py-1.5 text-[11px] text-white/68 sm:flex">
                        <Play size={10} className="text-[#86cde7]" />
                        <span className="truncate">{firstProof.project}</span>
                        <span className="ml-auto truncate text-[#9fcbde]">{firstProof.impact}</span>
                      </div>
                    )}

                    {isActive && <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-[#93d9cf]" />}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-5 border-b border-white/10 pb-2 sm:mt-6">
                  <button
                    onClick={() => setAdditionalOpen((v) => !v)}
                    className="group inline-flex items-center gap-2 text-2xl font-semibold text-white/90 md:text-[36px]"
                  >
              Additional <span className={A.title}>Skills</span>
              <ChevronDown
                size={20}
                className={["mt-1 transition-transform duration-200", additionalOpen ? "rotate-180" : "rotate-0"].join(" ")}
              />
            </button>
          </div>

          {additionalOpen && (
            <div className="mt-3 rounded-[16px] border border-white/10 bg-[#081326]/68 p-3 backdrop-blur-md">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="md:border-r md:border-white/8 md:pr-3">
                  <p className="text-[18px] font-semibold text-white/88 sm:text-[22px]">State Management</p>
                  <p className="mt-1 text-sm text-white/63">Redux, Zustand, Context API</p>
                  <div className="mt-3 flex items-center gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className={i < 5 ? "h-1.5 w-1.5 rounded-full bg-[#6db5de]" : "h-1.5 w-1.5 rounded-full bg-white/12"} />
                    ))}
                    <span className="h-[4px] w-20 rounded-full bg-white/10" />
                  </div>

                  <p className="mt-5 text-[18px] font-semibold text-white/88 sm:mt-6 sm:text-[22px]">Testing</p>
                  <p className="mt-1 text-sm text-white/63">Jest, Cypress, React Testing Lib</p>
                </div>

                <div className="md:border-r md:border-white/8 md:px-3">
                  <p className="text-[18px] font-semibold text-white/88 sm:text-[22px]">UI Libraries</p>
                  <p className="mt-1 text-sm text-white/63">Material-UI, Chakra UI, AntD</p>

                  <div className="mt-3 space-y-4">
                    <ProgressRow width="74%" />
                    <ProgressRow width="66%" />
                    <ProgressRow width="40%" />
                  </div>
                </div>

                <div className="md:pl-3">
                  <p className="text-[18px] font-semibold text-white/88 sm:text-[22px]">Testing Grid</p>
                  <div className="mt-3 space-y-4">
                    {Array.from({ length: 4 }).map((_, row) => (
                      <div key={row} className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 6 }).map((__, col) => {
                          const active = col < 2 + (row % 3);
                          return (
                            <span
                              key={`${row}-${col}`}
                              className={active ? "h-[6px] rounded-full bg-gradient-to-r from-[#5dc4e6] to-[#6f93d8]" : "h-[6px] rounded-full bg-white/12"}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 hidden xl:col-span-4 xl:block">
          {selectedSkill ? (
            <aside className="relative overflow-hidden rounded-[16px] border border-white/10 bg-[#081529]/74 p-3 backdrop-blur-md sm:rounded-[18px] sm:p-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_10%,rgba(100,190,215,0.14),transparent_36%)]" />

              <div className="relative flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/5 sm:h-14 sm:w-14">
                    {skillIcon(selectedSkill)}
                  </div>
                  <div>
                    <p className="text-[22px] font-semibold leading-none text-white/90 sm:text-[28px]">{selectedSkill.name}</p>
                    <p className="mt-1">
                      <span className="text-[30px] font-semibold leading-none text-[#7de5d0] sm:text-[42px]">{selectedSkill.percent}%</span>
                      <span className="ml-1 text-sm text-white/58">Mastery</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={["rounded-2xl border px-3 py-1 text-xs", A.chip].join(" ")}>
                    {levelLabelEN(parseLevel(selectedSkill.levelLabel))}
                  </span>
                  <span className={["rounded-full border px-2 py-0.5 text-[10px]", confidenceClass(selectedSkill.confidence)].join(" ")}>
                    {selectedSkill.confidence}
                  </span>
                </div>
              </div>

              <div className="relative mt-4">
                <p className="text-[22px] font-semibold leading-none text-white/88 sm:text-[28px]">Proficiency</p>
                <div className="mt-3 h-[4px] w-full rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4f5f7f] via-[#6180b0] to-[#68c8e0]"
                    style={{ width: `${(levelIndex(parseLevel(selectedSkill.levelLabel)) + 1) * 25}%` }}
                  />
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2 text-[11px] text-white/55">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span className="text-[#8ad2ea]">Expert</span>
                </div>
              </div>

              <div className="relative mt-4">
                <p className="text-[22px] font-semibold leading-none text-white/88 sm:text-[28px]">Maitrise x Experience</p>
                <SkillsMatrix skills={skillsByCategory} selectedId={selectedSkill.id} onSelect={setSelectedId} />
              </div>

              <div className="relative mt-4">
                <p className="text-[22px] font-semibold leading-none text-white/88 sm:text-[28px]">Project proofs</p>
                <div className="mt-2 space-y-2">
                  {(selectedSkill.proofs ?? []).slice(0, 2).map((proof) => (
                    <div key={proof.id} className="rounded-xl border border-white/10 bg-black/22 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm text-white/82">
                        <Play size={11} className="text-[#7ecde8]" />
                        <span className="truncate">{proof.project}</span>
                      </div>
                      <div className="mt-1 text-xs text-[#a9cfde]">{proof.impact}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#5a88b5]/35 bg-[#0f2a46]/35 px-4 py-2.5 text-base font-medium text-white/88 transition hover:bg-[#163a60]/40">
                View Projects <ArrowRight size={16} className="text-[#9bd2e7]" />
              </button>
            </aside>
          ) : (
            <aside className="rounded-[18px] border border-white/10 bg-[#081529]/74 p-4 text-sm text-white/62 backdrop-blur-md">
              Selectionne une categorie pour afficher des details.
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

function SkillsMatrix({
  skills,
  selectedId,
  onSelect,
}: {
  skills: Skill[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const maxYears = Math.max(...skills.map((s) => s.experienceYears), 1);

  return (
    <div className="mt-2 rounded-xl border border-white/10 bg-[#0a1426]/75 p-3">
      <div className="relative h-32 rounded-lg border border-white/10 bg-black/20">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:25%_25%]" />

        {skills.map((skill) => {
          const x = Math.min(96, Math.max(6, skill.percent));
          const y = Math.min(92, Math.max(8, (skill.experienceYears / maxYears) * 100));
          const active = skill.id === selectedId;

          return (
            <button
              key={skill.id}
              onClick={() => onSelect(skill.id)}
              title={`${skill.name} - ${skill.percent}% / ${skill.experienceYears} ans`}
              className={[
                "absolute h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border",
                active ? "border-white bg-[#8ce1df] shadow-[0_0_14px_rgba(140,225,223,0.8)]" : "border-white/30 bg-[#84b8df]",
              ].join(" ")}
              style={{ left: `${x}%`, bottom: `${y}%` }}
            />
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/45">
        <span>Experience</span>
        <span>Maitrise</span>
      </div>
    </div>
  );
}

function ProgressRow({ width }: { width: string }) {
  return (
    <div className="h-[6px] w-full overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-gradient-to-r from-[#5ebfdf] to-[#7596d6]" style={{ width }} />
    </div>
  );
}
