"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Building2,
  MapPin,
  CalendarDays,
  Layers3,
  Sparkles,
  Target,
  Folder,
  ArrowUpRight,
} from "lucide-react";

type Link = { label: string; href: string };

export type ExperienceDetails = {
  id: string;
  headerTitle: string; // "Stage Full-Stack"
  headerBadge: string; // "STAGE", "CDI", etc
  company: string;
  duration: string;
  location: string;
  stack: string[];
  intro?: string;

  missions: string[];
  results: string[];

  relatedProjects?: {
    id: string;
    title: string;
    subtitle: string;
    iconText: string; // ex: "W" or "Jo"
    links?: Link[];
  }[];

  action?: { label: string; href: string };
};

export default function ExperienceDetailsRight({
  details,
  onClose,
}: {
  details?: ExperienceDetails;
  onClose?: () => void;
}) {
  if (!details) {
    return (
      <RightPanelFrame>
        <div className="p-8 text-white/70">
          Sélectionne une expérience à gauche.
        </div>
      </RightPanelFrame>
    );
  }

  return (
    <RightPanelFrame>
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 px-7 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/15">
            <Sparkles size={18} className="text-[#7fd4ff]" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-semibold text-white/90">
                {details.headerTitle}
              </div>
              <span className="rounded-full border border-white/12 bg-black/15 px-3 py-1 text-[11px] text-white/75">
                {details.headerBadge}
              </span>
            </div>
            {details.intro ? (
              <div className="mt-1 text-sm text-white/65">{details.intro}</div>
            ) : null}
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-2xl border border-white/10 bg-black/15 p-2 text-white/70 hover:bg-black/25 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 p-7 lg:grid-cols-12">
        {/* Left meta */}
        <div className="lg:col-span-5 space-y-3">
          <InfoRow icon={<Building2 size={16} />} label="Entreprise" value={details.company} />
          <InfoRow icon={<CalendarDays size={16} />} label="Durée" value={details.duration} />
          <InfoRow icon={<MapPin size={16} />} label="Lieu" value={details.location} />
          <InfoRow
            icon={<Layers3 size={16} />}
            label="Stack"
            value={details.stack.join(" • ")}
          />

          {details.action ? (
            <a
              href={details.action.href}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/15 px-4 py-2 text-sm text-white/75 hover:bg-black/25 transition"
            >
              <Target size={16} className="text-[#7fd4ff]" />
              {details.action.label}
              <ArrowUpRight size={16} className="text-white/60" />
            </a>
          ) : null}
        </div>

        {/* Right text */}
        <div className="lg:col-span-7">
          {/* Missions */}
          <SectionTitle icon={<Sparkles size={16} className="text-[#7fd4ff]" />} title="Missions" />
          <BulletList items={details.missions} />

          {/* Results */}
          <div className="mt-6">
            <SectionTitle icon={<Target size={16} className="text-[#7fd4ff]" />} title="Résultats" />
            <BulletList items={details.results} />
          </div>

          {/* Related projects */}
          {details.relatedProjects?.length ? (
            <div className="mt-7">
              <SectionTitle icon={<Folder size={16} className="text-[#7fd4ff]" />} title="Projets liés" />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {details.relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-white/10 bg-black/10 p-4 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/15 text-white/85 font-semibold">
                        {p.iconText}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-white/88">{p.title}</div>
                        <div className="truncate text-xs text-white/60">{p.subtitle}</div>
                      </div>
                    </div>

                    {p.links?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-black/15 px-3 py-1 text-[11px] text-white/70 hover:bg-black/25 transition"
                          >
                            {l.label}
                            <ArrowUpRight size={14} className="text-white/55" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </RightPanelFrame>
  );
}

/* =========================
   UI pieces
========================= */

function RightPanelFrame({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(20);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;

      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);

      const visibleRatio = el.clientHeight / el.scrollHeight;
      setIndicatorHeight(visibleRatio * el.clientHeight);
    };

    updateScroll();
    el.addEventListener("scroll", updateScroll);
    return () => el.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div className="relative">
      {/* PANEL */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[rgba(0,0,0,0.04)] backdrop-blur-[18px] shadow-[0_24px_90px_rgba(0,0,0,0.35)]">

        {/* Scroll zone */}
        <div
          ref={scrollRef}
          className="relative max-h-[76vh] overflow-y-auto hide-scrollbar"
        >
          {children}
        </div>

        {/* 🔥 Custom Scroll Indicator */}
        <div className="pointer-events-none absolute right-3 top-3 bottom-3 w-[4px]">
          <div
            className="absolute w-full rounded-full bg-[#7fd4ff]/40 blur-[1px]"
            style={{
              height: `${indicatorHeight}px`,
              transform: `translateY(${scrollProgress * (300)}px)`,
              transition: "transform 0.1s linear",
              boxShadow: `
                0 0 8px rgba(127,212,255,0.6),
                0 0 18px rgba(127,212,255,0.35)
              `,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CornerGlow() {
  return (
    <>
      {/* Top-left */}
      <div className="pointer-events-none absolute left-[-10px] top-[-10px] h-24 w-24 rounded-[28px] bg-[#7fd4ff]/25 blur-[14px] opacity-70" />
      {/* Top-right */}
      <div className="pointer-events-none absolute right-[-10px] top-[-10px] h-24 w-24 rounded-[28px] bg-[#7fd4ff]/20 blur-[14px] opacity-60" />
      {/* Bottom-left */}
      <div className="pointer-events-none absolute left-[-10px] bottom-[-10px] h-24 w-24 rounded-[28px] bg-[#7fd4ff]/20 blur-[14px] opacity-60" />
      {/* Bottom-right */}
      <div className="pointer-events-none absolute right-[-10px] bottom-[-10px] h-24 w-24 rounded-[28px] bg-[#7fd4ff]/25 blur-[14px] opacity-70" />
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 backdrop-blur-md">
      <div className="mt-[2px] text-[#7fd4ff]">{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-white/55">
          {label}
        </div>
        <div className="mt-1 text-sm text-white/82">{value}</div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-white/90 font-semibold">
      {icon}
      {title}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-sm text-white/72">
          <span className="mt-[7px] h-2 w-2 rounded-full bg-[#7fd4ff]/75 shadow-[0_0_12px_rgba(127,212,255,0.35)]" />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}
