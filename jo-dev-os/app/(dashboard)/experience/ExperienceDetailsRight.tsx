"use client";

import { BriefcaseBusiness, Link2, MapPin, Play } from "lucide-react";
import { ExperienceRecord } from "./ExperienceTimelineLeft";

const BAR_COLORS: Record<string, string> = {
  Delivery: "from-emerald-200 via-cyan-200 to-emerald-100",
  Backend: "from-lime-200 via-emerald-200 to-cyan-200",
  "API Perf": "from-yellow-100 via-lime-100 to-emerald-100",
  Security: "from-fuchsia-200 via-pink-200 to-indigo-200",
};

export default function ExperienceDetailsRight({ details }: { details?: ExperienceRecord }) {
  if (!details) {
    return (
      <aside className="rounded-[26px] border border-white/15 bg-black/30 p-6 text-white/65 backdrop-blur-xl">
        Sélectionne une expérience pour afficher les détails.
      </aside>
    );
  }

  const bars = [
    { label: "Delivery", value: details.highlights.delivery },
    { label: "Backend", value: details.highlights.backend },
    { label: "API Perf", value: details.highlights.apiPerf },
    { label: "Security", value: details.highlights.security },
  ];

  return (
    <aside className="relative overflow-hidden rounded-[26px] border border-white/15 bg-black/35 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(127,212,255,0.16),transparent_36%)]" />

      <div className="relative px-6 py-5">
        <h2 className="text-3xl font-semibold text-white/90">Active Experience</h2>
      </div>

      <div className="h-px bg-white/12" />

      <div className="relative space-y-5 px-6 py-5">
        <section className="rounded-2xl border border-white/12 bg-black/30 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
                <BriefcaseBusiness size={19} className="text-cyan-200" />
              </div>
              <div>
                <p className="text-xl font-semibold md:text-2xl leading-tight text-white/90">{details.role}</p>
                <p className="text-sm text-white/70">{details.period}</p>
              </div>
            </div>
            <span className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
              {details.badge}
            </span>
          </div>

          <div className="mt-3 border-t border-white/10 pt-3 text-sm text-white/67">
            <p className="flex items-center gap-1">
              <MapPin size={14} className="text-white/50" />
              {details.org} • {details.city}
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-white/88">Technos clés</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {details.stack.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className={[
                  "rounded-xl border px-3 py-1 text-sm",
                  index === 0
                    ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
                    : "border-white/12 bg-black/30 text-white/80",
                ].join(" ")}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="h-px bg-white/12" />

        <section>
          <h3 className="text-2xl font-semibold text-white/88">Highlights</h3>
          <div className="mt-3 space-y-2.5">
            {bars.map((bar) => (
              <div key={bar.label} className="grid grid-cols-[80px_1fr] items-center gap-3">
                <p className="text-sm text-white/75">{bar.label}</p>
                <div className="h-[7px] overflow-hidden rounded-full bg-white/15">
                  <div
                    className={[
                      "h-full rounded-full bg-gradient-to-r",
                      BAR_COLORS[bar.label] ?? "from-cyan-200 to-indigo-200",
                    ].join(" ")}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-white/12" />

        <section>
          <h3 className="text-2xl font-semibold text-white/88">Projets liés</h3>
          <div className="mt-3 space-y-2.5">
            {details.projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-3 rounded-xl border border-white/12 bg-black/28 px-3 py-2"
              >
                <Link2 size={14} className="text-cyan-200" />
                <p className="text-sm text-white/88">{project.title}</p>
                <span
                  className={[
                    "ml-auto rounded-full px-2 py-0.5 text-[11px]",
                    project.status === "LIVE"
                      ? "bg-emerald-300/12 text-emerald-200"
                      : project.status === "WIP"
                        ? "bg-indigo-300/14 text-indigo-200"
                        : "bg-white/10 text-white/70",
                  ].join(" ")}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <button className="mt-1 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/25 px-5 py-2.5 text-white/85 transition hover:bg-black/35">
          <Play size={14} className="text-cyan-200" />
          Voir projets
        </button>
      </div>
    </aside>
  );
}

