"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock3,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

import { PORTFOLIO_DATA } from "@/app/data/portfolioData";

import {
  CALENDLY,
  EMAIL,
  GITHUB,
  LINKEDIN,
  REASONS,
  REASON_ITEM_VARIANTS,
  REASON_LIST_VARIANTS,
  STATS,
  getReasonIconClass,
  getStatIconClass,
} from "./config";
import { ReasonCard, SocialCard, StatRow } from "./components/ContactCards";

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
          <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} transition={{ duration: 0.2 }}>
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
          <motion.div whileHover={reduceMotion ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
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

          <motion.div whileHover={reduceMotion ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
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
