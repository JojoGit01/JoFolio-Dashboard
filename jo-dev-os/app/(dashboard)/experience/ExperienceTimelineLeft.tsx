"use client";

import { MapPin } from "lucide-react";

export type ExperienceKind = "CDI" | "FREELANCE" | "STAGE" | "PERSO";

export type ExperienceRecord = {
  id: string;
  role: string;
  period: string;
  badge: string;
  kind: ExperienceKind;
  org: string;
  city: string;
  impacts: string[];
  stack: string[];
  highlights: {
    delivery: number;
    backend: number;
    apiPerf: number;
    security: number;
  };
  projects: { id: string; title: string; status: "LIVE" | "WIP" | "DONE" }[];
  featured?: boolean;
};

const KIND_STYLE: Record<ExperienceKind, string> = {
  CDI: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  FREELANCE: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  STAGE: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  PERSO: "border-indigo-300/35 bg-indigo-300/10 text-indigo-100",
};

export default function ExperienceTimelineLeft({
  items,
  selectedId,
  onSelect,
}: {
  items: ExperienceRecord[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative pl-14">
      <div className="pointer-events-none absolute left-[24px] top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-cyan-200/85 via-cyan-200/30 to-cyan-200/10" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => {
          const active = item.id === selectedId;
          const wide = item.featured ? "md:col-span-2" : "md:col-span-1";

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={["group relative text-left", wide].join(" ")}
            >
              <div
                className="pointer-events-none absolute -left-[40px] top-[44px] h-[2px] w-[34px] rounded-full"
                style={{
                  background: active
                    ? "linear-gradient(90deg, rgba(186,237,255,0.95), rgba(186,237,255,0.0))"
                    : "linear-gradient(90deg, rgba(186,237,255,0.45), rgba(186,237,255,0.0))",
                }}
              />
              <div className="pointer-events-none absolute -left-[47px] top-[35px] h-5 w-5 rounded-full border border-cyan-100/35 bg-cyan-100/70 shadow-[0_0_15px_rgba(127,212,255,0.75)]" />

              <article
                className={[
                  "relative overflow-hidden rounded-[22px] border backdrop-blur-md transition-all duration-200",
                  "px-6 py-5",
                  active
                    ? "border-cyan-200/30 bg-black/35 shadow-[0_0_0_1px_rgba(170,230,255,0.16),0_16px_44px_rgba(4,10,18,0.75)]"
                    : "border-white/15 bg-black/30 hover:border-white/28 hover:bg-black/35",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-semibold md:text-4xl leading-tight text-white/92">{item.role}</h3>
                    <p className="mt-1 text-sm text-white/72">{item.period}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-white/62">
                      <MapPin size={14} className="text-white/55" />
                      {item.org} • {item.city}
                    </p>
                  </div>
                  <span
                    className={[
                      "inline-flex rounded-2xl border px-4 py-1.5 text-sm",
                      KIND_STYLE[item.kind],
                    ].join(" ")}
                  >
                    {item.badge}
                  </span>
                </div>

                {item.impacts.length > 0 && (
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-2xl font-semibold text-white/88">Impacts</p>
                    <ul className="mt-2 space-y-1 text-sm text-white/73">
                      {item.impacts.map((impact) => (
                        <li key={impact} className="flex items-start gap-2">
                          <span className="mt-[8px] h-[6px] w-[6px] rounded-full bg-cyan-200/90" />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-xl border border-white/12 bg-black/35 px-3 py-1 text-xs text-white/78"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 h-[7px] w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-emerald-200 to-indigo-200"
                    style={{ width: `${Math.max(item.highlights.delivery, 30)}%` }}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_85%_15%,rgba(127,212,255,0.14),transparent_32%)]" />
              </article>
            </button>
          );
        })}
      </div>
    </div>
  );
}


