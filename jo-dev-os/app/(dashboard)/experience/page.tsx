"use client";

import { useMemo, useState } from "react";
import ExperienceTimelineLeft, { ExperienceRecord } from "./ExperienceTimelineLeft";
import ExperienceDetailsRight from "./ExperienceDetailsRight";
import { PORTFOLIO_DATA, TOTAL_PROJECTS_WITH_EXPERIENCE } from "@/app/data/portfolioData";

type FilterKey = "all" | "pro" | "freelance" | "stage" | "perso";

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "pro", label: "Pro" },
  { id: "freelance", label: "Freelance" },
  { id: "stage", label: "Stage" },
  { id: "perso", label: "Perso" },
];

export default function ExperiencePage() {
  const items = useMemo<ExperienceRecord[]>(() => {
    const statusMap = { LIVE: "LIVE", WIP: "WIP", DONE: "DONE", BETA: "WIP", ARCHIVE: "DONE" } as const;
    const kindMap = {
      CDI: "CDI",
      CDD: "CDI",
      Freelance: "FREELANCE",
      Stage: "STAGE",
      Personnel: "PERSO",
    } as const;

    return PORTFOLIO_DATA.experiences.map((exp, index) => ({
      id: exp.id,
      role: exp.title,
      period: `${exp.startYear} - ${exp.endYear}`,
      badge: exp.contractType === "Personnel" ? "Projet Perso" : exp.contractType,
      kind: kindMap[exp.contractType],
      org: exp.company,
      city: exp.location,
      impacts: [
        ...exp.projects.flatMap((p) => p.actions.slice(0, 1)),
        ...exp.projects.flatMap((p) => p.results.slice(0, 2)),
      ].slice(0, 3),
      stack: exp.technologies.slice(0, 8),
      highlights: {
        delivery: Math.max(1, exp.globalImpact.deliveryGainPercent),
        backend: Math.max(1, exp.globalImpact.automationGainPercent),
        apiPerf: Math.max(1, exp.globalImpact.reliabilityGainPercent),
        security: Math.max(1, exp.globalImpact.costReductionPercent),
      },
      projects: exp.projects.map((p) => ({
        id: p.id,
        title: p.name,
        status: statusMap[p.status],
      })),
      featured: index === 0,
    }));
  }, []);

  const [activeFilter, setActiveFilter] = useState<FilterKey>("pro");
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");

  const filteredItems = useMemo(() => {
    switch (activeFilter) {
      case "pro":
        return items.filter((item) => item.kind !== "PERSO");
      case "freelance":
        return items.filter((item) => item.kind === "FREELANCE");
      case "stage":
        return items.filter((item) => item.kind === "STAGE");
      case "perso":
        return items.filter((item) => item.kind === "PERSO");
      default:
        return items;
    }
  }, [activeFilter, items]);

  const resolvedSelectedId =
    filteredItems.find((item) => item.id === selectedId)?.id ?? filteredItems[0]?.id ?? "";

  const selectedItem = filteredItems.find((item) => item.id === resolvedSelectedId);

  return (
    <section className="relative mt-3 min-h-[880px] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[26px] bg-[#040914]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[26px] bg-[radial-gradient(circle_at_72%_38%,rgba(129,225,255,0.20),transparent_42%),radial-gradient(circle_at_24%_76%,rgba(164,226,255,0.10),transparent_38%),linear-gradient(180deg,rgba(11,21,38,0.85),rgba(4,9,20,0.95))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:3px_3px]" />

      <div className="flex flex-col gap-5 px-2 py-2 lg:px-4">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight text-white/90">Experience</h1>
            <div className="mt-5 flex flex-wrap gap-3">
              {FILTERS.map((filter) => {
                const active = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={[
                      "rounded-2xl border px-6 py-2 text-sm transition",
                      active
                        ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-200 shadow-[0_0_22px_rgba(127,212,255,0.28)]"
                        : "border-white/15 bg-black/20 text-white/72 hover:border-white/30 hover:text-white/90",
                    ].join(" ")}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="pt-3 text-sm tracking-wide text-white/65">
            {PORTFOLIO_DATA.profile.yearsPro} ans pro · {TOTAL_PROJECTS_WITH_EXPERIENCE} projets ·{" "}
            {PORTFOLIO_DATA.profile.yearsPersonal} ans perso
          </p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <ExperienceTimelineLeft
              items={filteredItems}
              selectedId={resolvedSelectedId}
              onSelect={setSelectedId}
            />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <ExperienceDetailsRight details={selectedItem} />
          </div>
        </div>
      </div>
    </section>
  );
}
