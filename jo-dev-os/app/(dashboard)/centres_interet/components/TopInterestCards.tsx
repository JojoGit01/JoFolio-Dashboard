"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ACCENT, topCardIcon } from "../config";
import type { TopCard } from "../types";

export function TopInterestCards({ cards, reduceMotion }: { cards: TopCard[]; reduceMotion: boolean }) {
  return (
    <motion.div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, idx) => {
        const a = ACCENT[card.accent];
        return (
          <motion.article
            key={card.id}
            initial={reduceMotion ? false : { y: 10, scale: 0.995 }}
            animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
            transition={{ duration: 0.28, delay: idx * 0.05, ease: "easeOut" }}
            whileHover={reduceMotion ? undefined : { y: -3, scale: 1.005 }}
            className={[
              "group relative overflow-hidden rounded-[18px] border bg-[#071124]/86 backdrop-blur-xl sm:rounded-[20px]",
              "transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.48)]",
              a.border,
            ].join(" ")}
            style={{ boxShadow: `0 0 28px ${a.glow}` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.07),transparent_36%)] transition-opacity duration-300 group-hover:opacity-90" />

            <div
              className={[
                "relative overflow-hidden rounded-[14px] border border-white/12",
                "h-32 rounded-t-[18px] sm:h-36 sm:rounded-t-[20px]",
              ].join(" ")}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,18,36,0.10), rgba(7,18,36,0.68)), url('${card.image}')`,
                backgroundSize: "cover",
                backgroundPosition: card.imagePosition ?? "center",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.20),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%)] opacity-0 translate-x-[-110%] transition-all duration-700 group-hover:translate-x-[110%] group-hover:opacity-70" />
              <div className="absolute left-3 top-2 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/20 bg-black/25">{topCardIcon(card.id)}</span>
                <span className="text-[12px] font-semibold tracking-[0.18em] text-white/90">{card.title}</span>
              </div>
              <div className="absolute inset-x-3 bottom-2 rounded-xl border border-white/12 bg-[#0a1930]/72 px-2.5 py-1 text-xs text-white/85">
                {card.subtitle}
              </div>
            </div>

            <div className="px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3">
              <p className="text-sm font-semibold text-white/92 sm:text-xl">{card.meta}</p>

              <div className="relative mt-2 h-[4px] overflow-hidden rounded-full bg-white/12">
                <div className={["h-full rounded-full bg-gradient-to-r", a.line, card.id === "code" ? "w-[58%]" : "w-[62%]"].join(" ")} />
                <div className="pointer-events-none absolute inset-y-0 left-[58%] w-8 bg-gradient-to-r from-white/30 to-transparent blur-[3px] transition-transform duration-500 group-hover:translate-x-1" />
              </div>

              {card.id === "code" && card.rows ? (
                <ul className="mt-2 space-y-1 text-[11px] text-white/78 sm:mt-3 sm:space-y-1.5 sm:text-sm">
                  {card.rows.map((row, idx) => (
                    <li key={row} className="flex items-center gap-2">
                      <span className={idx > 1 ? "hidden sm:inline-flex" : "inline-flex"}>
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      </span>
                      <span className={idx > 1 ? "hidden sm:inline" : "inline"}>{row}</span>
                    </li>
                  ))}
                </ul>
              ) : card.id === "moto" ? (
                <>
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                    {card.chips.map((chip, idx) => (
                      <span key={chip} className={["rounded-xl border px-2 py-1 text-[11px] sm:px-2.5 sm:text-xs", a.chip, idx > 1 ? "hidden sm:inline-flex" : "inline-flex"].join(" ")}>
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 hidden grid-cols-4 gap-1.5 sm:grid">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-9 rounded-lg border border-white/14 bg-[linear-gradient(130deg,rgba(84,126,186,0.92),rgba(36,52,88,0.88))]" />
                    ))}
                  </div>
                </>
              ) : card.id === "muscu" ? (
                <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:gap-2">
                  {card.chips.map((chip, idx) => (
                    <div key={chip} className={["rounded-xl border px-2 py-1 text-[11px] sm:px-2.5 sm:py-1.5 sm:text-xs", a.chip, idx > 3 ? "hidden sm:block" : "block"].join(" ")}>
                      <p>{chip}</p>
                      {idx < 4 && (
                        <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/12">
                          <div className="h-full w-[55%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : card.id === "chill" ? (
                <>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:grid-cols-4 sm:gap-2">
                    {card.chips.map((chip, idx) => (
                      <div key={chip} className={["rounded-xl border px-2 py-1.5 text-center text-[11px] sm:text-xs", a.chip, idx > 1 ? "hidden sm:block" : "block"].join(" ")}>
                        {chip}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 rounded-xl border border-violet-300/22 bg-violet-300/8 px-2.5 py-1.5 text-center text-xs italic text-violet-100/90 sm:text-sm">
                    Work hard, rest harder.
                  </div>
                </>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {card.chips.map((chip) => (
                    <span key={chip} className={["rounded-xl border px-2.5 py-1 text-xs", a.chip].join(" ")}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              {card.bullets && (
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/65">
                  {card.bullets.map((b) => (
                    <span key={b} className="rounded-full border border-white/12 px-2 py-0.5">
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {card.cta && (
                <div className="mt-3 flex justify-center">
                  <button
                    className={[
                      "inline-flex items-center gap-2 rounded-2xl border px-4 py-1.5 text-sm text-white/88 transition-all duration-300",
                      card.id === "code"
                        ? "min-w-[178px] justify-center border-cyan-300/22 bg-[#13233d]/82 hover:bg-[#183058] hover:border-cyan-300/40"
                        : "border-white/14 bg-white/6 hover:bg-white/10 hover:border-white/25",
                    ].join(" ")}
                  >
                    {card.cta}{" "}
                    <ArrowRight size={14} className="text-cyan-200 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
