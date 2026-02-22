"use client";

import { motion } from "framer-motion";
import { Bike, Code2, Dumbbell, Goal, MoonStar } from "lucide-react";

import type { GoalItem } from "../types";

export function NextGoalsCard({ goals, reduceMotion }: { goals: GoalItem[]; reduceMotion: boolean }) {
  return (
    <motion.section
      initial={reduceMotion ? false : { y: 8 }}
      animate={reduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.26, delay: 0.24, ease: "easeOut" }}
      className="col-span-12 lg:col-span-3 relative overflow-hidden rounded-[22px] border border-cyan-300/22 bg-[#071225]/92 p-3.5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(0,0,0,0.5)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_95%_95%,rgba(90,255,214,0.14),transparent_38%)]" />
      <div className="pointer-events-none absolute -bottom-1 right-5 h-[3px] w-14 rounded-full bg-cyan-300/85 blur-[0.3px]" />

      <div className="flex items-center gap-2 text-lg font-semibold text-white/92">
        <span className="grid h-6 w-6 place-items-center rounded-md border border-rose-300/30 bg-rose-300/10">
          <Goal size={14} className="text-rose-300" />
        </span>
        Next Goals
      </div>

      <div className="mt-3 rounded-xl bg-[#0b1830]/92">
        {goals.map((goal, idx) => (
          <motion.article
            key={goal.label}
            initial={reduceMotion ? false : { x: 6 }}
            animate={reduceMotion ? undefined : { x: 0 }}
            transition={{ duration: 0.2, delay: 0.28 + idx * 0.04, ease: "easeOut" }}
            className={["group/goal px-2.5 py-2 transition-colors duration-200 hover:bg-white/[0.04]", idx !== goals.length - 1 ? "mb-1" : ""].join(" ")}
          >
            <div className="grid grid-cols-[24px_1fr_auto] items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/8 transition-all duration-200 group-hover/goal:bg-white/14">
                {goal.area === "Moto" && <Bike size={13} className="text-amber-200" />}
                {goal.area === "Muscu" && <Dumbbell size={13} className="text-orange-200" />}
                {goal.area === "Code" && <Code2 size={13} className="text-cyan-200" />}
                {goal.area === "Road Trip" && <MoonStar size={13} className="text-sky-200" />}
              </span>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white/90">{goal.label}</p>
                <div className="mt-1.5 h-[4px] overflow-hidden rounded-full bg-white/14">
                  <motion.div
                    className={["h-full rounded-full bg-gradient-to-r transition-all duration-300 group-hover/goal:brightness-110", goal.color].join(" ")}
                    initial={reduceMotion ? false : { width: "0%" }}
                    animate={reduceMotion ? undefined : { width: `${goal.progress}%` }}
                    transition={{ duration: 0.5, delay: 0.34 + idx * 0.05, ease: "easeOut" }}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] text-white/72">{goal.area}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
