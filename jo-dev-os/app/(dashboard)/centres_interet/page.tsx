"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ADVENTURES, BALANCE, GOALS, TOP_CARDS } from "./config";
import { buildDonutGradient } from "./helpers";
import { LastAdventuresSection } from "./components/LastAdventuresSection";
import { NextGoalsCard } from "./components/NextGoalsCard";
import { TopInterestCards } from "./components/TopInterestCards";
import { WeeklyBalanceCard } from "./components/WeeklyBalanceCard";

export default function CentresInteretPage() {
  const reduceMotion = useReducedMotion();
  const donut = buildDonutGradient(BALANCE);

  return (
    <motion.section className="relative mt-2 min-h-[820px] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[24px] bg-[#030915]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] bg-[radial-gradient(circle_at_16%_12%,rgba(95,220,255,0.16),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(255,196,109,0.12),transparent_30%),radial-gradient(circle_at_62%_70%,rgba(170,135,255,0.14),transparent_35%),linear-gradient(180deg,rgba(6,12,24,0.96),rgba(4,8,16,0.99))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:3px_3px]" />

      <TopInterestCards cards={TOP_CARDS} reduceMotion={!!reduceMotion} />

      <motion.div className="mt-4 grid grid-cols-12 gap-3">
        <WeeklyBalanceCard balance={BALANCE} donut={donut} reduceMotion={!!reduceMotion} />
        <LastAdventuresSection adventures={ADVENTURES} reduceMotion={!!reduceMotion} />
        <NextGoalsCard goals={GOALS} reduceMotion={!!reduceMotion} />
      </motion.div>
    </motion.section>
  );
}
