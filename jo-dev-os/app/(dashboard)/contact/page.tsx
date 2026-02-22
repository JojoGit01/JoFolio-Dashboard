"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  Clock3,
  FolderKanban,
  Github,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  PenTool,
  Smartphone,
  UserRound,
} from "lucide-react";
import { PORTFOLIO_DATA, TOTAL_PROJECTS_WITH_EXPERIENCE } from "@/app/data/portfolioData";

const LINKEDIN = PORTFOLIO_DATA.contact.linkedin;
const GITHUB = PORTFOLIO_DATA.contact.github;
const EMAIL = PORTFOLIO_DATA.contact.email;
const CALENDLY = "#";
const TOTAL_PROJECTS = TOTAL_PROJECTS_WITH_EXPERIENCE;

const REASONS = [
  {
    title: "Architecture scalable",
    desc: "Clean code, patterns, separation claire des responsabilites",
    icon: BriefcaseBusiness,
    accent: "cyan",
  },
  {
    title: "Vision produit",
    desc: "Priorites, UX, performance, livraison rapide",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    title: "UI premium",
    desc: "Dashboard coherent, micro-interactions",
    icon: PenTool,
    accent: "amber",
  },
  {
    title: "Web + Mobile",
    desc: "Next.js, React Native, API, tooling moderne",
    icon: Smartphone,
    accent: "emerald",
  },
] as const;

const STATS = [
  {
    label: "Projets",
    value: String(TOTAL_PROJECTS),
    width: "86%",
    icon: FolderKanban,
    color: "from-amber-200 via-yellow-200 to-emerald-200",
  },
  {
    label: "Experience pro",
    value: `${PORTFOLIO_DATA.profile.yearsPro} ans`,
    width: "32%",
    icon: BriefcaseBusiness,
    color: "from-cyan-200 to-sky-300",
  },
  {
    label: "Experience perso",
    value: `${PORTFOLIO_DATA.profile.yearsPersonal} ans`,
    width: "84%",
    icon: UserRound,
    color: "from-emerald-200 to-cyan-300",
  },
] as const;

const REASON_LIST_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const REASON_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { y: 10, opacity: 0.98 }}
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="relative mt-2 pb-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:3px_3px]" />

      <div className="relative space-y-5">
        <header className="px-1">
          <h1 className="text-[clamp(22px,2.45vw,38px)] font-semibold leading-[1.1] tracking-tight text-white/92">
            Dispo pour CDI ou mission freelance ambitieuse
          </h1>
          <p className="mt-2 max-w-5xl text-[clamp(13px,1vw,16px)] text-white/70">
            On peut caler un call de 15 min pour cadrer votre besoin et voir rapidement si je suis le bon fit.
          </p>
          <div className="mt-2.5 inline-flex items-center gap-2 rounded-full border border-cyan-300/28 bg-cyan-300/10 px-2.5 py-1 text-[11px] text-cyan-100 md:text-xs">
            <MapPin size={14} />
            Base a {PORTFOLIO_DATA.profile.city}, {PORTFOLIO_DATA.profile.country} - Remote possible
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.6fr_1fr]">
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="group relative overflow-hidden rounded-[22px] border border-cyan-300/32 bg-[linear-gradient(160deg,rgba(13,34,62,0.9),rgba(7,17,35,0.92))] p-3.5 backdrop-blur-xl shadow-[0_18px_56px_rgba(0,0,0,0.42),inset_0_0_0_1px_rgba(120,227,255,0.08)] sm:rounded-[24px] sm:p-4 md:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(124,229,255,0.18),transparent_46%)]" />
              <div className="pointer-events-none absolute bottom-0 left-[8%] h-[3px] w-[84%] rounded-full bg-[linear-gradient(90deg,rgba(96,220,255,0.68),rgba(131,137,255,0.72),rgba(96,220,255,0.68))]" />

              <div className="relative flex items-start gap-2.5">
                <div className="grid h-[44px] w-[44px] place-items-center rounded-[14px] border border-cyan-300/36 bg-cyan-300/10 shadow-[0_0_16px_rgba(96,220,255,0.2)] md:h-[54px] md:w-[54px] md:rounded-[16px]">
                  <Mail size={21} className="text-cyan-200" />
                </div>

                <div className="min-w-0">
                  <p className="text-[clamp(18px,1.8vw,30px)] font-semibold leading-none text-white/94">
                    Discutons de votre projet
                  </p>
                  <p className="mt-1 text-[clamp(14px,1.05vw,18px)] text-white/82">Planifier un call 15 min</p>
                </div>
              </div>

              <div className="relative mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2">
                <motion.a
                  href={CALENDLY}
                  whileHover={reduceMotion ? undefined : { y: -1, scale: 1.005 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  className="group/cta-main inline-flex items-center justify-between rounded-[14px] border border-cyan-300/38 bg-[#103257]/88 px-3 py-2 text-[13px] font-medium text-cyan-100 shadow-[0_0_0_rgba(96,220,255,0)] transition hover:bg-[#153d68] hover:shadow-[0_0_14px_rgba(96,220,255,0.2)] md:px-3.5 md:text-[14px]"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} className="text-cyan-200" />
                    Planifier un call 15 min
                    <span className="hidden rounded-full border border-cyan-200/30 bg-cyan-200/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-cyan-100/80 transition group-hover/cta-main:border-cyan-200/55 group-hover/cta-main:text-cyan-50 sm:inline-flex">
                      Recommande
                    </span>
                  </span>
                  <ArrowRight size={14} className="text-cyan-100/90 transition group-hover/cta-main:translate-x-1" />
                </motion.a>

                <motion.a
                  href={`mailto:${EMAIL}`}
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  className="group/cta-mail inline-flex items-center justify-between rounded-[14px] border border-white/14 bg-black/22 px-3 py-2 text-[13px] text-white/82 transition hover:border-white/24 hover:bg-black/30 md:px-3.5 md:text-[14px]"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Mail size={14} className="text-white/75" />
                    Envoyer un email
                    <span className="hidden rounded-full border border-emerald-200/25 bg-emerald-200/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-100/75 transition group-hover/cta-mail:border-emerald-200/45 group-hover/cta-mail:text-emerald-50 sm:inline-flex">
                      Direct
                    </span>
                  </span>
                  <ArrowRight size={14} className="text-white/65 transition group-hover/cta-mail:translate-x-1" />
                </motion.a>
              </div>

              <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/28 bg-emerald-300/10 px-2.5 py-1 text-[11px] text-emerald-200 md:text-xs">
                <Clock3 size={12} className="opacity-90" />
                Reponse moyenne - moins de {PORTFOLIO_DATA.contact.responseTimeHours}h
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <SocialCard
              title="LinkedIn"
              value="linkedin.com/in/jo-dm"
              href={LINKEDIN}
              icon={<Linkedin size={24} className="text-[#7fd4ff]" />}
              accent="cyan"
            />
            <SocialCard
              title="GitHub"
              value="github.com/jo-dm"
              href={GITHUB}
              icon={<Github size={24} className="text-[#b9b8ff]" />}
              accent="violet"
            />
          </div>
        </div>

        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]" />

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.6fr_1fr]">
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-[#081529]/82 p-3.5 backdrop-blur-xl sm:rounded-[24px] sm:p-4 md:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_80%,rgba(93,223,255,0.14),transparent_40%)]" />
              <h3 className="relative text-[clamp(20px,1.65vw,30px)] font-semibold text-white/90">Pourquoi me contacter ?</h3>

              <motion.div
                className="relative mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2"
                variants={reduceMotion ? undefined : REASON_LIST_VARIANTS}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true, amount: 0.18 }}
              >
                {REASONS.map((reason) => {
                  const Icon = reason.icon;
                  return (
                    <motion.div key={reason.title} variants={reduceMotion ? undefined : REASON_ITEM_VARIANTS}>
                      <ReasonCard
                        icon={<Icon size={19} className={getReasonIconClass(reason.accent)} />}
                        title={reason.title}
                        desc={reason.desc}
                        accent={reason.accent}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-[#081529]/82 p-3.5 backdrop-blur-xl sm:rounded-[24px] sm:p-4 md:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(93,223,255,0.1),transparent_48%)]" />
              <h3 className="relative text-[clamp(20px,1.65vw,30px)] font-semibold text-white/90">Quick stats</h3>

              <div className="relative mt-3 space-y-2.5">
                {STATS.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <StatRow
                      key={stat.label}
                      icon={<Icon size={18} className={getStatIconClass(stat.label)} />}
                      label={stat.label}
                      value={stat.value}
                      width={stat.width}
                      color={stat.color}
                      index={index}
                      reduceMotion={!!reduceMotion}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed inset-x-3 bottom-[calc(5.2rem+env(safe-area-inset-bottom))] z-30 rounded-2xl border border-cyan-300/25 bg-[#0A1528]/88 p-2 backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={CALENDLY}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-cyan-300/35 bg-cyan-300/12 px-3 py-2 text-xs font-medium text-cyan-100"
          >
            <Calendar size={13} />
            Planifier
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-xs text-white/85"
          >
            <Mail size={13} />
            Email direct
          </a>
        </div>
      </div>
    </motion.section>
  );
}

function SocialCard({
  title,
  value,
  href,
  icon,
  accent,
}: {
  title: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  accent: "cyan" | "violet";
}) {
  const accentClass = accent === "cyan" ? "border-cyan-300/35 bg-cyan-300/10" : "border-violet-300/35 bg-violet-300/10";
  const hoverBorder = accent === "cyan" ? "hover:border-cyan-300/40" : "hover:border-violet-300/40";
  const scanColor = accent === "cyan" ? "via-cyan-200/35" : "via-violet-200/35";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className={[
        "group relative block overflow-hidden rounded-[22px] border border-white/12 bg-[#081529]/84 p-3.5 backdrop-blur-xl transition md:p-4",
        hoverBorder,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(116,217,255,0.12),transparent_42%)] opacity-80" />
      <div
        className={[
          "pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[130%] bg-gradient-to-r from-transparent to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:translate-x-[390%] group-hover:opacity-100",
          scanColor,
        ].join(" ")}
      />
      <div className="flex items-center gap-3">
        <div className={["grid h-10 w-10 place-items-center rounded-xl border", accentClass].join(" ")}>{icon}</div>
        <div className="min-w-0">
          <p className="text-[clamp(16px,1.18vw,21px)] font-semibold text-white/92">{title}</p>
          <p className="mt-0.5 truncate text-[clamp(12px,0.85vw,15px)] text-white/68">{value}</p>
        </div>
        <ArrowRight size={16} className="ml-auto text-white/58 transition group-hover:translate-x-1" />
      </div>
    </motion.a>
  );
}

function ReasonCard({
  icon,
  title,
  desc,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: "cyan" | "violet" | "amber" | "emerald";
}) {
  const accentMap: Record<typeof accent, { icon: string; line: string }> = {
    cyan: {
      icon: "border-cyan-300/35 bg-cyan-300/10",
      line: "bg-cyan-300/80",
    },
    violet: {
      icon: "border-violet-300/35 bg-violet-300/10",
      line: "bg-violet-300/80",
    },
    amber: {
      icon: "border-amber-300/35 bg-amber-300/10",
      line: "bg-amber-300/80",
    },
    emerald: {
      icon: "border-emerald-300/35 bg-emerald-300/10",
      line: "bg-emerald-300/80",
    },
  };

  return (
    <div className="relative rounded-[16px] border border-white/12 bg-black/20 p-3 transition hover:border-white/20">
      <div className={["absolute inset-y-4 left-0 w-[2px] rounded-full opacity-80", accentMap[accent].line].join(" ")} />
      <div className="flex items-start gap-3">
        <div className={["grid h-9 w-9 place-items-center rounded-xl border", accentMap[accent].icon].join(" ")}>{icon}</div>
        <div>
          <p className="text-[clamp(15px,1vw,20px)] font-semibold text-white/90">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/68 md:text-[13px]">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
  width,
  color,
  index,
  reduceMotion,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  width: string;
  color: string;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="rounded-[14px] border border-white/12 bg-black/22 px-3 py-2.5">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 bg-white/5">{icon}</div>
        <p className="text-[clamp(14px,0.95vw,18px)] text-white/84">{label}</p>
        <p className="ml-auto text-[clamp(16px,1.2vw,22px)] font-semibold text-white/92">{value}</p>
      </div>
      <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/12">
        {reduceMotion ? (
          <div className={["h-full rounded-full bg-gradient-to-r", color].join(" ")} style={{ width }} />
        ) : (
          <motion.div
            className={["h-full rounded-full bg-gradient-to-r", color].join(" ")}
            initial={{ width: 0, opacity: 0.55 }}
            whileInView={{ width, opacity: 1 }}
            viewport={{ once: true, amount: 0.75 }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          />
        )}
      </div>
    </div>
  );
}

function getReasonIconClass(accent: (typeof REASONS)[number]["accent"]) {
  if (accent === "cyan") return "text-cyan-200";
  if (accent === "violet") return "text-violet-200";
  if (accent === "amber") return "text-amber-200";
  return "text-emerald-200";
}

function getStatIconClass(label: (typeof STATS)[number]["label"]) {
  if (label === "Projets") return "text-amber-200";
  if (label === "Experience pro") return "text-cyan-200";
  return "text-emerald-200";
}
