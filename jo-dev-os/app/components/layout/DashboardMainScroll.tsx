"use client";

import { useMemo, type CSSProperties, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type MainScrollTheme = {
  start: string;
  mid: string;
  end: string;
  glow: string;
  track: string;
};

function getMainScrollTheme(pathname: string): MainScrollTheme {
  if (pathname.startsWith("/skills")) {
    return {
      start: "rgba(196,126,255,0.96)",
      mid: "rgba(164,110,255,0.8)",
      end: "rgba(130,88,255,0.45)",
      glow: "rgba(176,116,255,0.55)",
      track: "rgba(24,18,44,0.52)",
    };
  }

  if (pathname.startsWith("/experience")) {
    return {
      start: "rgba(120,228,255,0.96)",
      mid: "rgba(108,208,255,0.84)",
      end: "rgba(74,155,255,0.45)",
      glow: "rgba(116,218,255,0.52)",
      track: "rgba(16,30,46,0.5)",
    };
  }

  if (pathname.startsWith("/formations")) {
    return {
      start: "rgba(255,216,133,0.98)",
      mid: "rgba(255,184,107,0.85)",
      end: "rgba(255,146,79,0.48)",
      glow: "rgba(255,196,104,0.56)",
      track: "rgba(42,31,17,0.48)",
    };
  }

  if (pathname.startsWith("/centres_interet")) {
    return {
      start: "rgba(108,250,208,0.96)",
      mid: "rgba(82,236,192,0.82)",
      end: "rgba(63,187,166,0.46)",
      glow: "rgba(92,244,204,0.52)",
      track: "rgba(14,40,34,0.5)",
    };
  }

  if (pathname.startsWith("/contact")) {
    return {
      start: "rgba(141,255,167,0.98)",
      mid: "rgba(112,242,150,0.84)",
      end: "rgba(78,194,124,0.46)",
      glow: "rgba(125,255,166,0.52)",
      track: "rgba(16,40,30,0.48)",
    };
  }

  if (pathname.startsWith("/projects")) {
    return {
      start: "rgba(127,212,255,0.96)",
      mid: "rgba(110,188,255,0.82)",
      end: "rgba(94,147,255,0.45)",
      glow: "rgba(121,204,255,0.52)",
      track: "rgba(13,28,46,0.5)",
    };
  }

  return {
    start: "rgba(127,212,255,0.95)",
    mid: "rgba(111,196,255,0.8)",
    end: "rgba(94,156,255,0.45)",
    glow: "rgba(127,212,255,0.5)",
    track: "rgba(13,30,46,0.48)",
  };
}

export default function DashboardMainScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const theme = useMemo(() => getMainScrollTheme(pathname), [pathname]);

  const style = {
    "--page-scroll-start": theme.start,
    "--page-scroll-mid": theme.mid,
    "--page-scroll-end": theme.end,
    "--page-scroll-glow": theme.glow,
    "--page-scroll-track": theme.track,
  } as CSSProperties;

  return (
    <main
      style={style}
      className="page-custom-scroll-main page-scroll-themed flex-1 min-h-0 overflow-x-hidden overflow-y-auto px-10 pb-10 pt-0"
    >
      {children}
    </main>
  );
}

