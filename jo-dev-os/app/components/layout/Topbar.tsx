"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { User, LayoutGrid, Folder, Github, Zap } from "lucide-react";

type PageMeta = {
  title: string;
  subtitle: string;
};

type AccentTheme = {
  accent: string;
  accentSoft: string;
};

const GLOBAL_STATUS = "Disponible";

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Good morning",
    subtitle: "Welcome to my space",
  },
  "/projects": {
    title: "Projects",
    subtitle: "Mes projets, stacks et details techniques",
  },
  "/skills": {
    title: "Skills",
    subtitle: "Technos, outils et domaines de maitrise",
  },
  "/experience": {
    title: "Experience",
    subtitle: "Parcours, missions et realisations",
  },
  "/formations": {
    title: "Formations",
    subtitle: "Parcours scolaire et diplomes",
  },
  "/centres_interet": {
    title: "Centres d'interet",
    subtitle: "Moto, muscu, code, lifestyle",
  },
  "/contact": {
    title: "Contact",
    subtitle: "Restons connectes et discutons de votre projet",
  },
};

function getAccentTheme(pathname: string): AccentTheme {
  if (pathname.startsWith("/skills")) {
    return { accent: "rgba(180,95,255,0.9)", accentSoft: "rgba(180,95,255,0.2)" };
  }
  if (pathname.startsWith("/experience")) {
    return { accent: "rgba(127,212,255,0.9)", accentSoft: "rgba(127,212,255,0.2)" };
  }
  if (pathname.startsWith("/formations")) {
    return { accent: "rgba(255,196,88,0.9)", accentSoft: "rgba(255,196,88,0.2)" };
  }
  if (pathname.startsWith("/centres_interet")) {
    return { accent: "rgba(74,236,192,0.9)", accentSoft: "rgba(74,236,192,0.2)" };
  }
  if (pathname.startsWith("/contact")) {
    return { accent: "rgba(122,255,148,0.9)", accentSoft: "rgba(122,255,148,0.2)" };
  }
  return { accent: "rgba(127,212,255,0.9)", accentSoft: "rgba(127,212,255,0.2)" };
}

function ZoneLine({
  accent,
  className = "",
}: {
  accent: string;
  className?: string;
}) {
  return (
    <div className={["hidden min-w-[90px] items-center gap-2 lg:flex", className].join(" ")}>
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: accent,
          boxShadow: `0 0 10px ${accent}`,
        }}
      />
      <span
        className="h-[2px] flex-1 rounded-full"
        style={{
          backgroundImage: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0.2), ${accent})`,
          boxShadow: `0 0 14px ${accent}`,
        }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: accent,
          boxShadow: `0 0 10px ${accent}`,
        }}
      />
    </div>
  );
}

export default function Topbar() {
  const pathname = usePathname();
  const theme = useMemo(() => getAccentTheme(pathname), [pathname]);
  const [quickView, setQuickView] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("jo_quick_view") === "1";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-quickview", quickView ? "1" : "0");
  }, [quickView]);

  const toggleQuickView = () => {
    setQuickView((prev) => {
      const next = !prev;
      window.localStorage.setItem("jo_quick_view", next ? "1" : "0");
      document.documentElement.setAttribute("data-quickview", next ? "1" : "0");
      return next;
    });
  };

  const meta = useMemo(() => {
    return (
      PAGE_META[pathname] ?? {
        title: "Jo Dev OS",
        subtitle: "Full-Stack JS Developer",
      }
    );
  }, [pathname]);

  return (
    <div className="relative">
      <header
        className="
          relative overflow-hidden
          flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4
          rounded-[26px]
          border border-[#16242A]
          bg-[#0B1220]/10
          px-3 py-2.5 sm:px-5 sm:py-4 md:px-6 md:py-5
          backdrop-blur-xl
          shadow-[0_18px_70px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]
        "
      >
        <div className="pointer-events-none absolute -left-24 -top-28 h-64 w-[520px] rotate-[14deg] rounded-full bg-white/10 opacity-[0.06] blur-3xl" />

        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[1px] opacity-70"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)`,
          }}
        />

        <div className="flex min-w-0 items-start gap-2.5 sm:items-center sm:gap-4">
          <div
            className="mt-0.5 h-7 w-[3px] rounded-full opacity-80 sm:mt-1 sm:h-10"
            style={{
              background: theme.accent,
              boxShadow: `0 0 18px ${theme.accent}`,
            }}
          />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-[18px] font-semibold leading-none tracking-tight text-white/90 sm:text-[24px] md:text-[26px]">
                {meta.title}
              </div>
              <GlobalStatusBadge label={GLOBAL_STATUS} />
            </div>
            <div className="mt-1.5 line-clamp-2 text-[11px] text-white/60 sm:mt-2 sm:line-clamp-1 sm:text-sm">
              {meta.subtitle}
            </div>
          </div>
        </div>

        <ZoneLine accent={theme.accent} className="flex-1" />

        <div className="hidden items-center gap-3 px-1 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">Section active</span>
          <span
            className="rounded-full border px-3 py-1 text-xs text-white/85"
            style={{
              borderColor: theme.accentSoft,
              background: `linear-gradient(90deg, ${theme.accentSoft}, rgba(255,255,255,0.06))`,
            }}
          >
            {meta.title}
          </span>
          <span
            className="h-px flex-1 rounded-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.accent}, rgba(255,255,255,0.12), transparent)`,
            }}
          />
        </div>

        <ZoneLine accent={theme.accent} className="flex-1" />

        <div className="ml-auto hidden items-center gap-2 self-end sm:flex sm:self-auto">
          <TopIconButton ariaLabel="Quick View" onClick={toggleQuickView} active={quickView}>
            <Zap size={18} />
          </TopIconButton>
          <TopIconButton ariaLabel="Profile">
            <User size={18} />
          </TopIconButton>
          <TopIconButton ariaLabel="Dashboard">
            <LayoutGrid size={18} />
          </TopIconButton>
          <TopIconButton ariaLabel="Projects">
            <Folder size={18} />
          </TopIconButton>
          <TopIconButton ariaLabel="GitHub">
            <Github size={18} />
          </TopIconButton>
        </div>
      </header>

      <div
        className="mt-2 h-px w-full sm:mt-5"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${theme.accentSoft}, rgba(255,255,255,0.12), ${theme.accentSoft}, transparent)`,
        }}
      />
    </div>
  );
}

function GlobalStatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
      {label}
    </span>
  );
}

function TopIconButton({
  children,
  ariaLabel,
  onClick,
  active,
}: {
  children: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active ? true : undefined}
      className="
        group relative rounded-2xl border border-white/10 bg-black/20
        px-2.5 py-2 text-white/70 backdrop-blur-md transition sm:px-3
        hover:border-white/15 hover:bg-black/30 hover:text-white/90 active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]
      "
    >
      <span className={["pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(127,212,255,0.22),transparent_60%)] transition duration-300 group-hover:opacity-100", active ? "opacity-100" : "opacity-0"].join(" ")} />
      <span className={["relative", active ? "text-cyan-100" : ""].join(" ")}>{children}</span>
    </button>
  );
}
