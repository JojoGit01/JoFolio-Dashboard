import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, MapPin } from "lucide-react";

import { ACCENT, nodeIcon } from "../config";
import type { FormationNode } from "../types";

export function FormationsTopSelector({
  nodes,
  activeId,
  onSelect,
  reduceMotion,
  viewMode,
  setViewMode,
}: {
  nodes: FormationNode[];
  activeId: string;
  onSelect: (id: string, openSheetOnMobile?: boolean) => void;
  reduceMotion: boolean;
  viewMode: "track" | "list";
  setViewMode: (mode: "track" | "list") => void;
}) {
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-[20px] border border-white/12 bg-[#061022]/74 p-3 backdrop-blur-xl sm:p-4"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_0%,rgba(96,220,255,0.14),transparent_42%)]" />

      <div className="relative mb-3 hidden items-center justify-between gap-2 md:flex">
        <div className="inline-flex rounded-xl border border-white/12 bg-black/20 p-1">
          <button
            onClick={() => setViewMode("track")}
            className={[
              "rounded-lg px-3 py-1.5 text-xs transition sm:text-sm",
              viewMode === "track" ? "bg-cyan-300/14 text-cyan-100" : "text-white/70 hover:text-white/90",
            ].join(" ")}
          >
            Parcours
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={[
              "rounded-lg px-3 py-1.5 text-xs transition sm:text-sm",
              viewMode === "list" ? "bg-cyan-300/14 text-cyan-100" : "text-white/70 hover:text-white/90",
            ].join(" ")}
          >
            Liste
          </button>
        </div>
        <div className="hidden text-xs text-white/55 sm:block">Clique pour voir les details</div>
      </div>

      <motion.div
        initial={false}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        className="relative flex gap-2 overflow-x-auto pb-1 touch-pan-x overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
      >
        {nodes.map((node) => {
          const tone = ACCENT[node.accent];
          const isActive = activeId === node.id;
          return (
            <motion.button
              key={`mobile-top-${node.id}`}
              initial={{ y: 8, scale: 0.985 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => onSelect(node.id, true)}
              className={[
                "relative min-w-[170px] rounded-xl border px-3 py-2 text-left transition",
                isActive ? `${tone.border} ${tone.softBg}` : "border-white/10 bg-black/20",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/14 bg-black/25">{nodeIcon(node.kind)}</div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/58">{node.years}</p>
                  <p className={["truncate text-sm font-medium", isActive ? tone.text : "text-white/82"].join(" ")}>{node.title}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="relative hidden grid-cols-3 gap-3 md:grid">
        <svg className="pointer-events-none absolute left-[12%] right-[12%] top-[16px] h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="route-main" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(110,255,220,0.8)" />
              <stop offset="52%" stopColor="rgba(93,223,255,0.86)" />
              <stop offset="100%" stopColor="rgba(255,210,120,0.8)" />
            </linearGradient>
          </defs>
          <path d="M 2 13 Q 50 3 98 13" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.6" />
          <motion.path
            d="M 2 13 Q 50 3 98 13"
            fill="none"
            stroke="url(#route-main)"
            strokeWidth="0.85"
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          />
        </svg>

        {nodes.map((node, idx) => {
          const tone = ACCENT[node.accent];
          const isActive = activeId === node.id;
          return (
            <motion.button
              key={`top-${node.id}`}
              initial={reduceMotion ? false : { y: 12, scale: 0.985 }}
              animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
              transition={{ duration: 0.24, ease: "easeOut", delay: 0.05 + idx * 0.05 }}
              onClick={() => onSelect(node.id)}
              className={[
                "relative rounded-2xl border px-3 pb-3 pt-2 text-center transition",
                isActive ? `${tone.border} ${tone.softBg}` : "border-white/10 bg-black/18 hover:border-white/25",
              ].join(" ")}
              style={isActive ? { boxShadow: `0 0 14px ${tone.glow}` } : undefined}
            >
              <div className="mx-auto grid h-9 w-9 place-items-center rounded-xl border border-white/14 bg-black/25">{nodeIcon(node.kind)}</div>
              <p className="mt-1 text-[11px] text-white/58">{node.years}</p>
              <p className={["truncate text-sm font-medium", isActive ? tone.text : "text-white/82"].join(" ")}>{node.title}</p>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export function FormationsMobileAccordion({
  nodes,
  activeId,
  mobileExpandedId,
  setMobileExpandedId,
  onSelect,
  reduceMotion,
}: {
  nodes: FormationNode[];
  activeId: string;
  mobileExpandedId: string | null;
  setMobileExpandedId: (updater: (prev: string | null) => string | null) => void;
  onSelect: (id: string, openSheetOnMobile?: boolean) => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.div initial={false} animate="show" variants={{ show: { transition: { staggerChildren: 0.04 } } }} className="space-y-2 md:hidden">
      {nodes.map((node) => {
        const tone = ACCENT[node.accent];
        const isActive = activeId === node.id;
        const isOpen = mobileExpandedId === node.id;

        return (
          <motion.div
            key={`mobile-accordion-${node.id}`}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={["overflow-hidden rounded-2xl border bg-black/20", isActive ? `${tone.border} ${tone.softBg}` : "border-white/12"].join(" ")}
          >
            <button
              onClick={() => {
                onSelect(node.id, true);
                setMobileExpandedId((prev) => (prev === node.id ? null : node.id));
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
            >
              <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-black/28">{nodeIcon(node.kind)}</div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white/62">{node.years}</p>
                <p className={["truncate text-sm font-semibold", isActive ? tone.text : "text-white/88"].join(" ")}>{node.title}</p>
              </div>
              <ChevronDown size={15} className={["text-white/65 transition", isOpen ? "rotate-180" : ""].join(" ")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0 }}
                  animate={reduceMotion ? undefined : { height: "auto" }}
                  exit={reduceMotion ? undefined : { height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden border-t border-white/10 px-3 pb-3 pt-2"
                >
                  <p className="text-xs text-white/72">{node.subtitle}</p>
                  <p className="mt-1 text-[11px] text-white/58">{node.specialization}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {node.modules.slice(0, 3).map((m) => (
                      <span key={`${node.id}-${m}`} className="rounded-md border border-white/12 bg-black/20 px-2 py-0.5 text-[11px] text-white/80">
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function FormationsTrackView({
  nodes,
  activeId,
  onSelect,
  reduceMotion,
}: {
  nodes: FormationNode[];
  activeId: string;
  onSelect: (id: string) => void;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative hidden overflow-hidden rounded-[22px] border border-white/10 bg-[#071124]/32 p-3 sm:p-4 md:block md:p-5">
      <motion.div
        initial={reduceMotion ? false : { scaleY: 0.08 }}
        animate={reduceMotion ? undefined : { scaleY: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ transformOrigin: "top center" }}
        className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-200/10 via-cyan-200/40 to-transparent md:block"
      />

      <motion.div initial={false} animate="show" variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }} className="space-y-4 md:space-y-5">
        {nodes.map((node, index) => {
          const tone = ACCENT[node.accent];
          const isActive = node.id === activeId;
          const right = index % 2 === 1;
          const prevLabel = index > 0 ? nodes[index - 1].timelineLabel : null;
          const showYearMarker = node.timelineLabel !== prevLabel;

          return (
            <motion.div key={node.id} initial={{ y: 12, scale: 0.992 }} animate={{ y: 0, scale: 1 }} transition={{ duration: 0.24, ease: "easeOut" }} className="relative min-h-[88px] sm:min-h-[100px]">
              {showYearMarker && (
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">{node.timelineLabel}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/40 to-transparent" />
                </div>
              )}
              <div className={["relative", right ? "md:pl-[calc(50%+30px)]" : "md:pr-[calc(50%+30px)]"].join(" ")}>
                <motion.button
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.004 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onClick={() => onSelect(node.id)}
                  className={[
                    "relative w-full rounded-[16px] border px-3 py-2.5 text-left transition md:max-w-[350px] md:px-4 md:py-3",
                    isActive ? `${tone.border} ${tone.softBg}` : "border-white/12 bg-black/22 hover:border-white/25",
                  ].join(" ")}
                  style={isActive ? { boxShadow: `0 0 18px ${tone.glow}` } : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-black/28 sm:h-9 sm:w-9 sm:rounded-xl">{nodeIcon(node.kind)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/62">{node.years}</p>
                      <p className="truncate text-base font-semibold text-white/92 sm:text-lg">{node.title}</p>
                      <p className={["mt-0.5 truncate text-xs sm:text-sm", isActive ? tone.text : "text-white/65"].join(" ")}>{node.subtitle}</p>
                    </div>
                    <span className={["h-2.5 w-2.5 rounded-full", isActive ? tone.dot : "bg-white/25"].join(" ")} />
                  </div>
                </motion.button>
              </div>

              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-cyan-200/28" />
                <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-cyan-200/85 shadow-[0_0_14px_rgba(104,227,255,0.9)]" />
              </div>

              {right ? (
                <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-cyan-200/70 to-transparent md:block" />
              ) : (
                <span className="pointer-events-none absolute right-1/2 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-l from-cyan-200/70 to-transparent md:block" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function FormationsListView({
  nodes,
  activeId,
  onSelect,
}: {
  nodes: FormationNode[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div initial={false} animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }} className="hidden grid-cols-1 gap-3 md:grid">
      {nodes.map((node, idx) => {
        const tone = ACCENT[node.accent];
        const isActive = node.id === activeId;
        return (
          <motion.button
            key={`list-${node.id}`}
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: idx * 0.02 }}
            onClick={() => onSelect(node.id)}
            className={[
              "group relative overflow-hidden rounded-2xl border p-4 text-left transition",
              isActive ? `${tone.border} ${tone.softBg}` : "border-white/12 bg-black/22 hover:border-white/20",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-black/25">{nodeIcon(node.kind)}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-base font-semibold text-white/92">{node.title}</p>
                  <span className="rounded-full border border-white/12 bg-black/20 px-2 py-0.5 text-[10px] text-white/72">{node.level}</span>
                </div>
                <p className="mt-0.5 text-xs text-white/65">{node.subtitle}</p>
                <p className="mt-1 line-clamp-2 text-[11px] text-white/55">{node.specialization}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {node.years}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} />
                    {node.city}
                  </span>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/40 transition group-hover:translate-x-1" />
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
