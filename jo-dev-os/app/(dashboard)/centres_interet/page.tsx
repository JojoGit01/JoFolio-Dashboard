"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bike,
  Code2,
  Dumbbell,
  Goal,
  MapPin,
  MoonStar,
  Sparkles,
} from "lucide-react";

type TopCard = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  image: string;
  imagePosition?: string;
  accent: "cyan" | "amber" | "mint" | "violet";
  chips: string[];
  rows?: string[];
  bullets?: string[];
  cta?: string;
};

const TOP_CARDS: TopCard[] = [
  {
    id: "code",
    title: "CODE",
    subtitle: "Fullstack • IA • DevOps",
    meta: "20h / semaine",
    image: "/images/interets/interet_code.png",
    imagePosition: "center",
    accent: "cyan",
    chips: [],
    rows: ["Next.js  •  TypeScript", "React  •  Node.js", "AI & Automation"],
    cta: "Voir mes projets",
  },
  {
    id: "moto",
    title: "MOTO",
    subtitle: "Freedom • Road • Travel",
    meta: "15 000+ km / an",
    image: "/images/interets/interet_moto.png",
    imagePosition: "center",
    accent: "amber",
    chips: ["Track Days", "Road Trips", "Mecanique"],
    bullets: ["Alps", "Pyrenees", "Italian coast"],
  },
  {
    id: "muscu",
    title: "MUSCU",
    subtitle: "5x / semaine",
    meta: "5x / semaine",
    image: "/images/interets/interet_muscu.png",
    imagePosition: "center",
    accent: "mint",
    chips: ["Force", "Endurance", "Discipline", "PRs", "Bench 120kg", "Squat 160kg"],
  },
  {
    id: "chill",
    title: "CHILL & FOOD",
    subtitle: "Balance & Recharge",
    meta: "Balance & Recharge",
    image: "/images/interets/interet_manger.png",
    imagePosition: "center",
    accent: "violet",
    chips: ["Sleep 8h", "Foodie", "Series", "Travel"],
  },
];

const ACCENT = {
  cyan: {
    glow: "rgba(90,218,255,0.38)",
    border: "border-cyan-300/35",
    line: "from-cyan-300 via-sky-300 to-blue-300",
    chip: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  },
  amber: {
    glow: "rgba(255,192,101,0.34)",
    border: "border-amber-300/35",
    line: "from-amber-300 via-orange-300 to-yellow-300",
    chip: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  },
  mint: {
    glow: "rgba(100,255,212,0.34)",
    border: "border-emerald-300/35",
    line: "from-emerald-300 via-lime-300 to-cyan-300",
    chip: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  },
  violet: {
    glow: "rgba(175,137,255,0.34)",
    border: "border-violet-300/35",
    line: "from-violet-300 via-fuchsia-300 to-indigo-300",
    chip: "border-violet-300/25 bg-violet-300/10 text-violet-100",
  },
} as const;

const BALANCE = [
  { label: "Code", value: 40, color: "#38bdf8" },
  { label: "Moto", value: 25, color: "#fb923c" },
  { label: "Muscu", value: 20, color: "#34d399" },
  { label: "Chill & Food", value: 15, color: "#a78bfa" },
];

const ADVENTURES = [
  { title: "Ride - Alps", date: "March 2024", tag: "Moto", image: "/images/interets/interet_moto.png", accent: "from-amber-300/80 to-transparent" },
  { title: "PR Squat 160kg", date: "April 2024", tag: "Muscu", image: "/images/interets/interet_muscu.png", accent: "from-emerald-300/80 to-transparent" },
  { title: "Hackathon AI Project", date: "Feb 2024", tag: "Code", image: "/images/interets/interet_code.png", accent: "from-cyan-300/80 to-transparent" },
  { title: "Beach Day", date: "Rest", tag: "Chill", image: "/images/interets/interet_manger.png", accent: "from-violet-300/80 to-transparent" },
];

const GOALS = [
  { label: "Track Day - Juillet", area: "Moto", progress: 80, color: "from-cyan-300 to-blue-300" },
  { label: "Mass +5kg", area: "Muscu", progress: 62, color: "from-amber-300 to-orange-300" },
  { label: "Open Source App", area: "Code", progress: 72, color: "from-cyan-300 to-violet-300" },
  { label: "Trip - Italie", area: "Road Trip", progress: 55, color: "from-emerald-300 to-cyan-300" },
];

function topCardIcon(id: TopCard["id"]) {
  if (id === "code") return <Code2 size={14} className="text-cyan-200" />;
  if (id === "moto") return <Bike size={14} className="text-amber-200" />;
  if (id === "muscu") return <Dumbbell size={14} className="text-emerald-200" />;
  return <MoonStar size={14} className="text-violet-200" />;
}

export default function CentresInteretPage() {
  const reduceMotion = useReducedMotion();
  const donutGap = 1.2;
  const donut = `conic-gradient(${BALANCE.map((item) => {
    const start = BALANCE
      .slice(0, BALANCE.findIndex((x) => x.label === item.label))
      .reduce((acc, x) => acc + x.value, 0);
    const end = start + item.value;
    const colorEnd = Math.max(start, end - donutGap);
    return `${item.color} ${start}% ${colorEnd}%, rgba(7,18,37,1) ${colorEnd}% ${end}%`;
  }).join(", ")})`;

  return (
    <motion.section
      className="relative mt-2 min-h-[820px] text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[24px] bg-[#030915]" />
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] bg-[radial-gradient(circle_at_16%_12%,rgba(95,220,255,0.16),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(255,196,109,0.12),transparent_30%),radial-gradient(circle_at_62%_70%,rgba(170,135,255,0.14),transparent_35%),linear-gradient(180deg,rgba(6,12,24,0.96),rgba(4,8,16,0.99))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:3px_3px]" />

      <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {TOP_CARDS.map((card, idx) => {
          const a = ACCENT[card.accent];
          return (
            <motion.article
              key={card.id}
              initial={reduceMotion ? false : { y: 10, scale: 0.995 }}
              animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
              transition={{ duration: 0.28, delay: idx * 0.05, ease: "easeOut" }}
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.005 }}
              className={[
                "group relative overflow-hidden rounded-[20px] border bg-[#071124]/86 backdrop-blur-xl",
                "transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.48)]",
                a.border,
              ].join(" ")}
              style={{ boxShadow: `0 0 28px ${a.glow}` }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.07),transparent_36%)] transition-opacity duration-300 group-hover:opacity-90" />

              <div
                className={[
                  "relative overflow-hidden rounded-[14px] border border-white/12",
                  "h-36 rounded-t-[20px]",
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
                  <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/20 bg-black/25">
                    {topCardIcon(card.id)}
                  </span>
                  <span className="text-[12px] font-semibold tracking-[0.18em] text-white/90">{card.title}</span>
                </div>
                <div className="absolute inset-x-3 bottom-2 rounded-xl border border-white/12 bg-[#0a1930]/72 px-2.5 py-1 text-xs text-white/85">
                  {card.subtitle}
                </div>
              </div>

              <div className="px-3 pb-3 pt-2">
                <p className="text-xl font-semibold text-white/92">{card.meta}</p>

                <div className="relative mt-2 h-[4px] overflow-hidden rounded-full bg-white/12">
                  <div className={["h-full rounded-full bg-gradient-to-r", a.line, card.id === "code" ? "w-[58%]" : "w-[62%]"].join(" ")} />
                  <div className="pointer-events-none absolute inset-y-0 left-[58%] w-8 bg-gradient-to-r from-white/30 to-transparent blur-[3px] transition-transform duration-500 group-hover:translate-x-1" />
                </div>

                {card.id === "code" && card.rows ? (
                  <ul className="mt-3 space-y-1.5 text-sm text-white/78">
                    {card.rows.map((row) => (
                      <li key={row} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        <span>{row}</span>
                      </li>
                    ))}
                  </ul>
                ) : card.id === "moto" ? (
                  <>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.chips.map((chip) => (
                        <span key={chip} className={["rounded-xl border px-2.5 py-1 text-xs", a.chip].join(" ")}>
                          {chip}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-1.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-9 rounded-lg border border-white/14 bg-[linear-gradient(130deg,rgba(84,126,186,0.92),rgba(36,52,88,0.88))]" />
                      ))}
                    </div>
                  </>
                ) : card.id === "muscu" ? (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {card.chips.map((chip, idx) => (
                      <div key={chip} className={["rounded-xl border px-2.5 py-1.5 text-xs", a.chip].join(" ")}>
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
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {card.chips.map((chip) => (
                        <div key={chip} className={["rounded-xl border px-2 py-1.5 text-center text-xs", a.chip].join(" ")}>
                          {chip}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 rounded-xl border border-violet-300/22 bg-violet-300/8 px-2.5 py-1.5 text-center text-sm italic text-violet-100/90">
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
                      <span key={b} className="rounded-full border border-white/12 px-2 py-0.5">{b}</span>
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
                      {card.cta} <ArrowRight size={14} className="text-cyan-200 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div className="mt-4 grid grid-cols-12 gap-3">
        <motion.section
          initial={reduceMotion ? false : { y: 8 }}
          animate={reduceMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.26, delay: 0.12, ease: "easeOut" }}
          className="group col-span-12 lg:col-span-3 self-start h-fit relative overflow-hidden rounded-[20px] border border-cyan-300/28 bg-[linear-gradient(165deg,rgba(10,24,46,0.96),rgba(7,16,34,0.94))] p-3.5 backdrop-blur-xl shadow-[0_12px_44px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(0,0,0,0.52)]"
          style={{ clipPath: "polygon(0 0, 90% 0, 100% 16%, 100% 100%, 0 100%)" }}
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

          <div className="mt-3 grid grid-cols-[92px_1fr] items-center gap-3">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              className="relative h-[92px] w-[92px] rounded-full border border-cyan-200/25 p-[6px] shadow-[0_0_26px_rgba(90,218,255,0.28)] transition-transform duration-500 group-hover:scale-105"
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
              {BALANCE.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/84">
                  <span className="h-2 w-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.35)]" style={{ background: item.color }} />
                  <span>{item.label}</span>
                  <span className="ml-auto font-semibold text-white/92">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

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

          <motion.div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
            {ADVENTURES.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={reduceMotion ? false : { y: 8 }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.24, delay: 0.22 + idx * 0.04, ease: "easeOut" }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className="group relative overflow-hidden rounded-[14px] border border-white/14 bg-[#0b182f]/88 p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_22px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_24px_rgba(0,0,0,0.44)]"
                style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 0 100%)" }}
              >
                <div
                  className="relative h-[108px] w-full overflow-hidden bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(9,20,39,0.10), rgba(9,20,39,0.48)), url('${item.image}')`,
                  }}
                >
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 rounded-md bg-black/55 px-2 py-1 text-center text-sm font-semibold text-white/94 backdrop-blur-[1px] transition-colors duration-300 group-hover:bg-black/65">
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
              className="relative w-full max-w-[470px] rounded-full border border-cyan-300/20 bg-[#0b1a31]/90 px-6 py-2.5 text-center shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
            >
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-cyan-300/60">“</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[22px] text-cyan-300/60">”</span>
              <p className="text-[31px] italic text-white/80">Passion drives performance</p>
              <p className="mt-0.5 text-xs not-italic text-white/58">— Work • Train • Repeat —</p>
            </motion.div>
          </motion.div>
        </motion.section>

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
            {GOALS.map((goal, idx) => (
              <motion.article
                key={goal.label}
                initial={reduceMotion ? false : { x: 6 }}
                animate={reduceMotion ? undefined : { x: 0 }}
                transition={{ duration: 0.2, delay: 0.28 + idx * 0.04, ease: "easeOut" }}
                className={[
                  "group/goal px-2.5 py-2 transition-colors duration-200 hover:bg-white/[0.04]",
                  idx !== GOALS.length - 1 ? "mb-1" : "",
                ].join(" ")}
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

                  <span className="rounded-full bg-black/25 px-2 py-0.5 text-[10px] text-white/72">
                    {goal.area}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </motion.section>
  );
}
