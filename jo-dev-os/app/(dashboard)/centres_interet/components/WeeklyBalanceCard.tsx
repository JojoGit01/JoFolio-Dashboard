"use client";

import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";

import type { BalanceItem } from "../types";

export function WeeklyBalanceCard({
  balance,
  donut,
  reduceMotion,
}: {
  balance: BalanceItem[];
  donut: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.section
      initial={reduceMotion ? false : { y: 8 }}
      animate={reduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.26, delay: 0.12, ease: "easeOut" }}
      className="group col-span-12 lg:col-span-3 self-start h-fit relative overflow-hidden rounded-[20px] border border-cyan-300/28 bg-[linear-gradient(165deg,rgba(10,24,46,0.96),rgba(7,16,34,0.94))] p-3.5 backdrop-blur-xl shadow-[0_12px_44px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(0,0,0,0.52)] sm:[clip-path:polygon(0_0,90%_0,100%_16%,100%_100%,0_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(114,205,255,0.22),transparent_42%)]" />
      <div className="pointer-events-none absolute -bottom-1 right-6 h-[3px] w-16 rounded-full bg-amber-300/90 blur-[0.4px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-cyan-300/10 to-transparent" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-white/92">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-cyan-300/30 bg-cyan-300/10">
            <Sparkles size={13} className="text-cyan-200" />
          </span>
          Weekly Balance
        </div>
        <Activity size={14} className="text-cyan-200/90" />
      </div>

      <div className="mt-3 grid grid-cols-[86px_1fr] items-center gap-3 sm:grid-cols-[92px_1fr]">
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          className="relative h-[86px] w-[86px] rounded-full border border-cyan-200/25 p-[6px] shadow-[0_0_26px_rgba(90,218,255,0.28)] transition-transform duration-500 group-hover:scale-105 sm:h-[92px] sm:w-[92px]"
        >
          <motion.div
            animate={undefined}
            transition={undefined}
            className="absolute inset-0 rounded-full transition-transform duration-700 group-hover:rotate-[10deg]"
            style={{ background: donut, transform: "rotate(-90deg)" }}
          />
          <div className="absolute inset-[17px] flex flex-col items-center justify-center rounded-full border border-white/12 bg-[#0a1932] text-center text-xs text-white/86">
            <span className="leading-none">My Life</span>
            <span className="mt-0.5 font-semibold leading-none text-white/94">Balance</span>
          </div>
        </motion.div>

        <div className="space-y-2 text-sm">
          {balance.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white/84">
              <span className="h-2 w-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.35)]" style={{ background: item.color }} />
              <span>{item.label}</span>
              <span className="ml-auto font-semibold text-white/92">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
