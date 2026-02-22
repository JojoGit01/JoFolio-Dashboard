import { motion, useReducedMotion } from "framer-motion";

import type { Skill } from "../types";

export function SkillsMatrix({
  skills,
  selectedId,
  onSelect,
}: {
  skills: Skill[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const reduceMotion = useReducedMotion();
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
            <motion.button
              key={skill.id}
              onClick={() => onSelect(skill.id)}
              title={`${skill.name} - ${skill.percent}% / ${skill.experienceYears} ans`}
              className={[
                "absolute h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border",
                active ? "border-white bg-[#8ce1df] shadow-[0_0_14px_rgba(140,225,223,0.8)]" : "border-white/30 bg-[#84b8df]",
              ].join(" ")}
              style={{ left: `${x}%`, bottom: `${y}%` }}
              animate={
                reduceMotion
                  ? undefined
                  : active
                    ? {
                        scale: [1, 1.18, 1],
                        boxShadow: [
                          "0 0 8px rgba(140,225,223,0.35)",
                          "0 0 16px rgba(140,225,223,0.85)",
                          "0 0 8px rgba(140,225,223,0.35)",
                        ],
                      }
                    : { scale: 1 }
              }
              transition={
                reduceMotion
                  ? undefined
                  : active
                    ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
              }
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
