"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, MapPin } from "lucide-react";

import type { AdventureItem } from "../types";

export function LastAdventuresSection({
  adventures,
  reduceMotion,
}: {
  adventures: AdventureItem[];
  reduceMotion: boolean;
}) {
  return (
    <motion.section
      initial={reduceMotion ? false : { y: 8 }}
      animate={reduceMotion ? undefined : { y: 0 }}
      transition={{ duration: 0.26, delay: 0.18, ease: "easeOut" }}
      className="col-span-12 lg:col-span-6 relative overflow-hidden rounded-[22px] bg-transparent p-1"
    >
      <div className="flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-white/92">
          <Activity size={16} className="text-cyan-200" /> Last Adventures
        </div>
        <button className="inline-flex items-center gap-1 rounded-xl border border-white/16 bg-[#0f1d34]/80 px-2.5 py-1 text-xs text-white/84 hover:bg-[#122441]">
          Voir tout <ArrowRight size={12} />
        </button>
      </div>

      <motion.div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-2 md:overflow-visible md:pb-0 xl:grid-cols-4">
        {adventures.map((item, idx) => (
          <motion.article
            key={item.title}
            initial={reduceMotion ? false : { y: 8 }}
            animate={reduceMotion ? undefined : { y: 0 }}
            transition={{ duration: 0.24, delay: 0.22 + idx * 0.04, ease: "easeOut" }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="group relative min-w-[210px] overflow-hidden rounded-[14px] border border-white/14 bg-[#0b182f]/88 p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_22px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_24px_rgba(0,0,0,0.44)] md:min-w-0"
            style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 0 100%)" }}
          >
            <div
              className="relative h-[108px] w-full overflow-hidden bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(9,20,39,0.10), rgba(9,20,39,0.48)), url('${item.image}')` }}
            >
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 rounded-md bg-black/55 px-2 py-1 text-center text-[13px] font-semibold text-white/94 backdrop-blur-[1px] transition-colors duration-300 group-hover:bg-black/65 sm:text-sm">
                {item.title}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-[#0a1830]/82 px-2 py-1 text-xs text-white/62 backdrop-blur-[1px] transition-colors duration-300 group-hover:text-white/80">
                <MapPin size={11} />
                {item.date}
              </div>
            </div>
            <div className={["pointer-events-none absolute left-0 top-2 h-8 w-[2px] bg-gradient-to-b opacity-75", item.accent].join(" ")} />
            <div className="pointer-events-none absolute right-2 top-[5px] h-[120%] w-[1.5px] origin-top rotate-[20deg] bg-gradient-to-b from-white/35 via-white/20 to-transparent opacity-70" />
          </motion.article>
        ))}
      </motion.div>

      <motion.div className="mt-3 flex justify-center">
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.008 }}
          className="relative w-full max-w-[470px] rounded-full border border-cyan-300/20 bg-[#0b1a31]/90 px-4 py-2 text-center shadow-[0_8px_28px_rgba(0,0,0,0.35)] sm:px-6 sm:py-2.5"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-cyan-300/60">“</span>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[22px] text-cyan-300/60">”</span>
          <p className="text-[24px] italic text-white/80 sm:text-[31px]">Passion drives performance</p>
          <p className="mt-0.5 text-xs not-italic text-white/58">— Work • Train • Repeat —</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
