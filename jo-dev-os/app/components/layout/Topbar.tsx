"use client";

import { type ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { User, LayoutGrid, Folder, Github } from "lucide-react";

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
          flex items-center gap-4
          rounded-[26px]
          border border-[#16242A]
          bg-[#0B1220]/10
          px-5 py-4 md:px-6 md:py-5
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

        <div className="flex min-w-0 items-center gap-4">
          <div
            className="mt-1 h-10 w-[3px] rounded-full opacity-80"
            style={{
              background: theme.accent,
              boxShadow: `0 0 18px ${theme.accent}`,
            }}
          />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-[24px] font-semibold leading-none tracking-tight text-white/90 md:text-[26px]">
                {meta.title}
              </div>
              <GlobalStatusBadge label={GLOBAL_STATUS} />
            </div>
            <div className="mt-2 truncate text-sm text-white/55">{meta.subtitle}</div>
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

        <div className="ml-auto flex items-center gap-2">
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
        className="mt-5 h-px w-full"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${theme.accentSoft}, rgba(255,255,255,0.12), ${theme.accentSoft}, transparent)`,
        }}
      />
    </div>
  );
}

function GlobalStatusBadge({ label }: { label: string }) {
  return (
    <span className="hidden items-center gap-1.5 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200 sm:inline-flex">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
      {label}
    </span>
  );
}

function TopIconButton({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className="
        group relative rounded-2xl border border-white/10 bg-black/20
        px-3 py-2 text-white/70 backdrop-blur-md transition
        hover:border-white/15 hover:bg-black/30 hover:text-white/90 active:scale-[0.98]
      "
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(127,212,255,0.22),transparent_60%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </button>
  );
}
