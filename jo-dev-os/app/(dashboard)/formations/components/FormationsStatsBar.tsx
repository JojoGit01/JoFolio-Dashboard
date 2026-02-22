import { motion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap, Star } from "lucide-react";

import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

import { BottomMetric } from "./BottomMetric";

export function FormationsStatsBar({
  totalStudyYears,
  reduceMotion,
}: {
  totalStudyYears: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { y: 12, scale: 0.995 }}
      animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: "easeOut", delay: 0.08 }}
      className="relative overflow-hidden rounded-2xl border border-[#2d4868]/75 bg-[linear-gradient(180deg,rgba(8,18,36,0.97),rgba(4,11,24,0.97))] p-2 backdrop-blur-xl shadow-[0_16px_44px_rgba(0,0,0,0.45),0_0_28px_rgba(90,210,255,0.12)] sm:rounded-none sm:p-2.5 sm:[clip-path:polygon(16px_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,16px_100%,0_50%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(140,220,255,0.16),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-[6px] rounded-xl border border-dashed border-white/12 sm:rounded-none sm:[clip-path:polygon(16px_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,16px_100%,0_50%)]" />

      <div className="pointer-events-none absolute bottom-0 left-[8%] h-[3px] w-[27%] rounded-full bg-cyan-300/92 blur-[0.3px]" />
      <div className="pointer-events-none absolute bottom-0 left-[38.5%] h-[3px] w-[23%] rounded-full bg-cyan-300/78 blur-[0.3px]" />
      <div className="pointer-events-none absolute bottom-0 left-[68%] h-[3px] w-[25%] rounded-full bg-cyan-300/88 blur-[0.3px]" />

      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[64%] w-px -translate-y-1/2 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.36)_0px,rgba(255,255,255,0.36)_2px,transparent_2px,transparent_7px)]" />
      <div className="pointer-events-none absolute left-2/3 top-1/2 h-[64%] w-px -translate-y-1/2 [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.36)_0px,rgba(255,255,255,0.36)_2px,transparent_2px,transparent_7px)]" />

      <motion.div
        initial={false}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
        className="relative -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 touch-pan-x overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-0 sm:overflow-visible sm:px-0"
      >
        <BottomMetric
          icon={<GraduationCap size={15} className="text-cyan-200" />}
          value={String(PORTFOLIO_DATA.quickStats.totalFormations)}
          label="Formations"
          delay={0.02}
        />
        <BottomMetric
          icon={<BriefcaseBusiness size={15} className="text-cyan-200" />}
          value={String(totalStudyYears)}
          label="Ans d'Etudes"
          delay={0.08}
        />
        <BottomMetric
          icon={<Star size={15} className="text-cyan-200" />}
          value={String(PORTFOLIO_DATA.quickStats.totalCertifications)}
          label="Certifications"
          delay={0.14}
        />
      </motion.div>
    </motion.div>
  );
}
