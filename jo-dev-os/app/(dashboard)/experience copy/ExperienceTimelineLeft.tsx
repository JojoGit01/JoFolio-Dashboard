"use client";

import React from "react";

export type ExpType = "FREELANCE" | "CDI" | "STAGE";

export type ExperienceItem = {
  id: string;
  year: number;
  type: ExpType;
  titleBold: string;
  titleLight?: string;
  line: string;
  chips?: string[]; // affiché en "React / Nest / Mongo"
};

const TYPE_BADGE: Record<ExpType, { label: string; pill: string }> = {
  FREELANCE: {
    label: "FREELANCE",
    pill: "border-fuchsia-300/25 bg-fuchsia-400/10 text-fuchsia-200/90",
  },
  CDI: {
    label: "CDI",
    pill: "border-emerald-300/25 bg-emerald-400/10 text-emerald-200/90",
  },
  STAGE: {
    label: "STAGE",
    pill: "border-amber-300/25 bg-amber-400/10 text-amber-200/90",
  },
};

export default function ExperienceTimelineLeft({
  items,
  selectedId,
  onSelect,
  className,
}: {
  items: ExperienceItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <aside className={["relative", className ?? ""].join(" ")}>
      <div className="relative">
        {/* Vertical neon line */}
        <div className="pointer-events-none absolute left-[10px] top-0 h-full w-[2px] rounded-full bg-gradient-to-b from-[#7fd4ff]/85 via-[#7fd4ff]/25 to-transparent" />
        <div className="pointer-events-none absolute left-[6px] top-0 h-full w-[10px] blur-[12px] opacity-60 bg-gradient-to-b from-[#7fd4ff]/60 via-[#7fd4ff]/12 to-transparent" />

        <div className="space-y-8">
          {items.map((it, idx) => {
            const active = it.id === selectedId;
            const type = TYPE_BADGE[it.type];

            return (
              <div key={it.id} className="relative">
                {/* Separator segment between steps */}
                {idx !== items.length - 1 && (
                  <>
                    <div className="pointer-events-none absolute left-[10px] top-[62px] h-[calc(100%_-_36px)] w-[2px] rounded-full bg-white/10" />
                    <div
                      className={[
                        "pointer-events-none absolute left-[6px] top-[62px] h-[calc(100%_-_36px)] w-[10px] blur-[12px] transition-opacity duration-300",
                        active ? "opacity-45 bg-[#7fd4ff]/25" : "opacity-0",
                      ].join(" ")}
                    />
                  </>
                )}

                <button
                  onClick={() => onSelect(it.id)}
                  className="group w-full text-left"
                >
                  <div className="relative pl-10">
                    {/* HUD icon node */}
                    <TimelineHudIcon active={active} />

                    {/* Beam (HUD vibe) */}
                    <div
                      className={[
                        "pointer-events-none absolute left-[18px] top-[18px] h-[2px] w-0 rounded-full transition-all duration-300",
                        active
                          ? "w-[120px] bg-gradient-to-r from-[#7fd4ff]/90 to-transparent"
                          : "group-hover:w-[90px] bg-gradient-to-r from-[#7fd4ff]/45 to-transparent",
                      ].join(" ")}
                    />
                    <div
                      className={[
                        "pointer-events-none absolute left-[18px] top-[18px] h-[12px] w-0 blur-[12px] transition-all duration-300",
                        active
                          ? "w-[135px] bg-[#7fd4ff]/35"
                          : "group-hover:w-[105px] bg-[#7fd4ff]/18",
                      ].join(" ")}
                    />

                    {/* YEAR */}
                    <div className="text-2xl font-semibold text-white/92">
                      {it.year}
                    </div>

                    {/* TYPE under year */}
                    <div className="mt-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-3 py-1 text-[11px] tracking-wide transition",
                          type.pill,
                          "group-hover:brightness-110",
                        ].join(" ")}
                      >
                        {type.label}
                      </span>
                    </div>

                    {/* Main block */}
                    <div
                      className={[
                        "relative mt-3 rounded-2xl border px-4 py-4 backdrop-blur-md transition-all duration-300",
                        active
                          ? "border-[#7fd4ff]/26 bg-black/14 shadow-[0_0_0_1px_rgba(127,212,255,0.14),0_18px_55px_rgba(0,0,0,0.28)]"
                          : "border-white/10 bg-black/10 group-hover:border-[#7fd4ff]/16 group-hover:bg-black/13 group-hover:translate-x-[2px]",
                      ].join(" ")}
                    >
                      <div className="text-[18px] leading-tight text-white/92">
                        <span className="font-semibold">{it.titleBold}</span>
                        {it.titleLight ? (
                          <span className="font-normal text-white/80">
                            {" "}
                            {it.titleLight}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-1 text-sm text-white/70">{it.line}</div>

                      {/* Chips as ONE pill: "React / Nest / Mongo" */}
                      {it.chips?.length ? (
                        <div className="mt-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-3 py-1 text-[11px] backdrop-blur-md transition",
                              active
                                ? "border-white/14 bg-black/16 text-white/78"
                                : "border-white/10 bg-black/10 text-white/62 group-hover:text-white/75 group-hover:border-white/14",
                            ].join(" ")}
                          >
                            {it.chips.join(" / ")}
                          </span>
                        </div>
                      ) : null}

                      {/* subtle inner shine */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_35%)] opacity-50" />
                    </div>

                    {/* Glow around block */}
                    <div
                      className={[
                        "pointer-events-none absolute -inset-x-2 -inset-y-3 rounded-[24px] blur-[18px] transition-opacity duration-300",
                        active
                          ? "opacity-45 bg-[radial-gradient(circle_at_30%_30%,rgba(127,212,255,0.35),transparent_60%)]"
                          : "opacity-0 group-hover:opacity-25 bg-[radial-gradient(circle_at_30%_30%,rgba(127,212,255,0.28),transparent_60%)]",
                      ].join(" ")}
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function TimelineHudIcon({ active }: { active: boolean }) {
  return (
    <div className="absolute left-[0px] top-[14px]">
      {/* outer glow */}
      <div
        className={[
          "pointer-events-none absolute rounded-full blur-[14px] transition-all duration-300",
          active ? "-inset-5 bg-[#7fd4ff]/40" : "-inset-4 bg-[#7fd4ff]/16",
        ].join(" ")}
      />

      <div
        className={[
          "relative flex items-center justify-center transition-all duration-300",
          active ? "h-[22px] w-[22px]" : "h-[18px] w-[18px]",
        ].join(" ")}
      >
        <div
          className={[
            "absolute rotate-45 rounded-[5px] border transition-all duration-300",
            active
              ? "h-[18px] w-[18px] border-[#bfefff]/60 bg-[#0b2036]/92 shadow-[0_0_22px_rgba(127,212,255,0.60)]"
              : "h-[14px] w-[14px] border-white/22 bg-[#091325]/70 shadow-[0_0_12px_rgba(127,212,255,0.18)]",
          ].join(" ")}
        />
        <div
          className={[
            "relative rounded-full transition-all duration-300",
            active ? "h-[6px] w-[6px] bg-[#7fd4ff]" : "h-[5px] w-[5px] bg-white/40",
          ].join(" ")}
        />
      </div>

      {active && (
        <div className="pointer-events-none absolute -inset-6 rounded-full border border-[#7fd4ff]/22 opacity-70 animate-[pulse_2.2s_ease-in-out_infinite]" />
      )}
    </div>
  );
}
