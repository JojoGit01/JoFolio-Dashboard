"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Home,
  Folder,
  Sparkles,
  Briefcase,
  GraduationCap,
  Heart,
  Mail,
  Info,
  Linkedin,
} from "lucide-react";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/skills", label: "Skills", icon: Sparkles },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/formations", label: "Formations", icon: GraduationCap },
  { href: "/centres_interet", label: "Centres d'interet", icon: Heart },
  { href: "/contact", label: "Contact", icon: Mail },
];

type ScrollTheme = {
  thumbStart: string;
  thumbEnd: string;
  thumbStartHover: string;
  thumbEndHover: string;
  line: string;
  color: string;
  active: string;
  activeSoft: string;
};

function getScrollTheme(pathname: string): ScrollTheme {
  if (pathname.startsWith("/skills")) {
    return {
      thumbStart: "rgba(180,95,255,0.95)",
      thumbEnd: "rgba(120,70,220,0.35)",
      thumbStartHover: "rgba(190,120,255,1)",
      thumbEndHover: "rgba(130,80,230,0.55)",
      line: "rgba(180,95,255,0.4)",
      color: "rgba(180,95,255,0.7)",
      active: "rgba(180,95,255,0.95)",
      activeSoft: "rgba(180,95,255,0.2)",
    };
  }

  if (pathname.startsWith("/experience")) {
    return {
      thumbStart: "rgba(127,212,255,0.95)",
      thumbEnd: "rgba(127,212,255,0.35)",
      thumbStartHover: "rgba(127,212,255,1)",
      thumbEndHover: "rgba(127,212,255,0.55)",
      line: "rgba(127,212,255,0.4)",
      color: "rgba(127,212,255,0.7)",
      active: "rgba(127,212,255,0.95)",
      activeSoft: "rgba(127,212,255,0.2)",
    };
  }

  if (pathname.startsWith("/formations")) {
    return {
      thumbStart: "rgba(255,196,88,0.95)",
      thumbEnd: "rgba(255,154,74,0.35)",
      thumbStartHover: "rgba(255,208,110,1)",
      thumbEndHover: "rgba(255,164,86,0.55)",
      line: "rgba(255,196,88,0.4)",
      color: "rgba(255,196,88,0.7)",
      active: "rgba(255,196,88,0.95)",
      activeSoft: "rgba(255,196,88,0.2)",
    };
  }

  if (pathname.startsWith("/centres_interet")) {
    return {
      thumbStart: "rgba(74,236,192,0.95)",
      thumbEnd: "rgba(74,236,192,0.35)",
      thumbStartHover: "rgba(90,245,205,1)",
      thumbEndHover: "rgba(74,236,192,0.55)",
      line: "rgba(74,236,192,0.4)",
      color: "rgba(74,236,192,0.7)",
      active: "rgba(74,236,192,0.95)",
      activeSoft: "rgba(74,236,192,0.2)",
    };
  }

  if (pathname.startsWith("/contact")) {
    return {
      thumbStart: "rgba(122,255,148,0.95)",
      thumbEnd: "rgba(88,224,132,0.35)",
      thumbStartHover: "rgba(134,255,160,1)",
      thumbEndHover: "rgba(96,236,140,0.55)",
      line: "rgba(122,255,148,0.4)",
      color: "rgba(122,255,148,0.7)",
      active: "rgba(122,255,148,0.95)",
      activeSoft: "rgba(122,255,148,0.2)",
    };
  }

  return {
    thumbStart: "rgba(127,212,255,0.95)",
    thumbEnd: "rgba(127,212,255,0.35)",
    thumbStartHover: "rgba(127,212,255,1)",
    thumbEndHover: "rgba(127,212,255,0.55)",
    line: "rgba(127,212,255,0.4)",
    color: "rgba(127,212,255,0.7)",
    active: "rgba(127,212,255,0.95)",
    activeSoft: "rgba(127,212,255,0.2)",
  };
}

export default function Sidebar() {
  const pathname = usePathname();
  const scrollTheme = useMemo(() => getScrollTheme(pathname), [pathname]);

  const btnClass =
    "group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/65 hover:text-white/90 hover:bg-white/[0.06] transition";

  const iconClass =
    "text-white/75 group-hover:text-[#7fd4ff] transition-colors";

  return (
    <aside
      className="
        relative h-full w-full
        bg-gradient-to-b from-[#0C1114] via-[#0A0F12] to-[#070A0C]
        border-r border-[#16242A]
        overflow-hidden text-white
      "
    >
      {/* Subtle accent line */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-[1px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, ${scrollTheme.line}, transparent)`,
        }}
      />
      {/* Very subtle inner sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.035),transparent_55%)]" />

      {/* Wrapper: middle scroll + bottom fixed */}
      <div className="flex h-full flex-col">
        {/* TOP AREA */}
        <div className="px-5 pt-5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl border border-white/10 bg-white/[0.04] grid place-items-center overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(127,212,255,0.22),transparent_60%)]" />
              <div className="h-4 w-4 rounded-md bg-[#7fd4ff] shadow-[0_0_16px_rgba(127,212,255,0.35)]" />
            </div>

            <div className="leading-tight">
              <div className="text-[18px] font-semibold tracking-wide text-white/90">
                Jo Dev OS
              </div>
              <div className="text-[11px] text-white/45">Dashboard</div>
            </div>
          </div>
        </div>

        {/* PROFILE BLOCK (smaller) */}
        <div className="mt-4 border-y border-white/30 px-5 py-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-[170px] aspect-square rounded-full p-[3px]">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,rgba(127,212,255,0.65),rgba(127,212,255,0.05),rgba(127,212,255,0.55))] blur-[0.2px]" />
              <div className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(127,212,255,0.22),transparent_65%)] blur-2xl opacity-70" />

              <div className="relative h-full w-full rounded-full bg-[#070A0C] p-[3px] border border-white/10">
                <Image
                  src="/images/avatar_jo.jpg"
                  alt="Jo Di Martino"
                  fill
                  priority
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4 text-[16px] font-semibold text-white/90">
              Jo Di Martino
            </div>
            <div className="mt-1 text-[11px] tracking-wide text-white/55">
              Full-Stack JS Developer
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-white/60">
              <span className="h-2 w-2 rounded-full bg-[#7fd4ff] shadow-[0_0_12px_rgba(127,212,255,0.5)]" />
              Disponible CDI / Freelance
            </div>
          </div>
        </div>

        {/* SCROLLABLE NAV */}
        <div
          style={
            {
              "--sidebar-scroll-thumb-start": scrollTheme.thumbStart,
              "--sidebar-scroll-thumb-end": scrollTheme.thumbEnd,
              "--sidebar-scroll-thumb-start-hover": scrollTheme.thumbStartHover,
              "--sidebar-scroll-thumb-end-hover": scrollTheme.thumbEndHover,
              "--sidebar-scroll-color": scrollTheme.color,
            } as React.CSSProperties
          }
          className="sidebar-scroll-themed relative flex-1 min-h-0 overflow-y-auto px-3 py-4"
        >
          <div
            className="pointer-events-none absolute right-[3px] top-4 bottom-4 w-[1px] rounded-full"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, ${scrollTheme.line}, transparent)`,
            }}
          />
          <nav className="space-y-2">
            {nav.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  style={
                    isActive
                      ? {
                          backgroundImage: `linear-gradient(90deg, ${scrollTheme.activeSoft}, rgba(255,255,255,0.06), transparent 75%)`,
                          boxShadow: `0 0 0 1px ${scrollTheme.activeSoft}, 0 18px 60px rgba(0,0,0,0.35)`,
                          borderColor: "rgba(255,255,255,0.12)",
                        }
                      : undefined
                  }
                  className={[
                    "group relative grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-2xl px-4 py-3 text-[14px]",
                    "transition-[transform,background,box-shadow,color] duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7fd4ff]/35 focus-visible:ring-offset-0",
                    isActive
                      ? [
                          "text-white/90",
                          "border border-white/10",
                        ].join(" ")
                      : [
                          "text-white/60",
                          "border border-transparent",
                          "hover:text-white/85",
                          "hover:bg-white/[0.04]",
                          "hover:border-white/10",
                          "hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]",
                          "hover:-translate-y-[1px]",
                        ].join(" "),
                  ].join(" ")}
                >
                  {isActive && (
                    <span
                      className="absolute left-2 top-3 bottom-3 w-[3px] rounded-full"
                      style={{
                        background: scrollTheme.active,
                        boxShadow: `0 0 16px ${scrollTheme.active}`,
                      }}
                    />
                  )}

                  <span
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100"
                    style={{ background: scrollTheme.activeSoft }}
                  />

                  <div
                    className={[
                      "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl",
                      "border border-white/10 bg-black/15",
                      "transition duration-200",
                      isActive
                        ? ""
                        : "group-hover:bg-white/[0.05]",
                    ].join(" ")}
                    style={
                      isActive
                        ? {
                            backgroundColor: scrollTheme.activeSoft,
                            borderColor: "rgba(255,255,255,0.2)",
                            boxShadow: `0 0 18px ${scrollTheme.activeSoft}`,
                          }
                        : undefined
                    }
                  >
                    <Icon
                      size={18}
                      className={isActive ? "" : "text-white/70 group-hover:text-white/85"}
                      style={isActive ? { color: scrollTheme.active } : undefined}
                    />
                  </div>

                  <span
                    className={[
                      "truncate pt-[1px] leading-none",
                      isActive ? "font-semibold" : "font-medium",
                    ].join(" ")}
                  >
                    {label}
                  </span>

                  {isActive ? (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: scrollTheme.active,
                        boxShadow: `0 0 14px ${scrollTheme.active}`,
                      }}
                    />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM FIXED (ALWAYS VISIBLE) */}
        <div className="relative px-4 pb-4">
          <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="flex items-center justify-between gap-3">
            {/* Infos (internal) */}
            <Link href="/info" className={btnClass} title="Infos" aria-label="Infos">
              <Info size={16} className={iconClass} />
              <span className="hidden sm:inline">Infos</span>
            </Link>

            {/* LinkedIn (external) */}
            <a
              href="https://www.linkedin.com/in/TON_PSEUDO/"
              target="_blank"
              rel="noreferrer"
              className={btnClass}
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} className={iconClass} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-b from-transparent to-[#070A0C]" />
    </aside>
  );
}
