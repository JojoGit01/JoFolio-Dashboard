"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Folder,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

type TabItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const PRIMARY_TABS: TabItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/skills", label: "Skills", icon: Sparkles },
  { href: "/experience", label: "Exp", icon: Briefcase },
];

const SECONDARY_TABS: TabItem[] = [
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/formations", label: "Formations", icon: GraduationCap },
  { href: "/centres_interet", label: "Interets", icon: Heart },
];

export default function MobileBottomTabs() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isMoreActive =
    pathname.startsWith("/contact") ||
    pathname.startsWith("/formations") ||
    pathname.startsWith("/centres_interet");

  return (
    <>
      <div
        className={[
          "fixed inset-0 z-[91] bg-black/45 transition-opacity duration-200 lg:hidden",
          moreOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setMoreOpen(false)}
      />

      <div
        className="fixed inset-x-2 z-[95] lg:hidden"
        style={{ bottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <div className="relative overflow-visible rounded-2xl border border-white/14 bg-[#081326]/90 p-1.5 backdrop-blur-xl shadow-[0_14px_50px_rgba(0,0,0,0.48)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
          {moreOpen && (
            <div className="absolute -top-[154px] right-0 w-[188px] rounded-2xl border border-white/15 bg-[#081326]/96 p-1.5 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.58)]">
              {SECONDARY_TABS.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "mb-1 flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition last:mb-0",
                      active
                        ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                        : "border-transparent text-white/75 hover:border-white/12 hover:bg-white/5 hover:text-white/90",
                    ].join(" ")}
                  >
                    <Icon size={15} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          <nav className="grid grid-cols-5 items-center gap-1">
            {PRIMARY_TABS.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "group flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2.5 text-[10px] transition",
                    active
                      ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                      : "border-transparent text-white/65 hover:bg-white/5 hover:text-white/90",
                  ].join(" ")}
                >
                  <Icon size={16} className={active ? "text-cyan-100" : "text-white/75"} />
                  <span className="truncate">{label}</span>
                  {active ? <span className="h-1 w-1 rounded-full bg-cyan-200" /> : <span className="h-1 w-1 rounded-full bg-transparent" />}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              className={[
                "group flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2.5 text-[10px] transition",
                moreOpen || isMoreActive
                  ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                  : "border-transparent text-white/65 hover:bg-white/5 hover:text-white/90",
              ].join(" ")}
              aria-label="Ouvrir plus de pages"
            >
              <MoreHorizontal size={16} className={moreOpen || isMoreActive ? "text-cyan-100" : "text-white/75"} />
              <span className="truncate">Plus</span>
              {moreOpen || isMoreActive ? <span className="h-1 w-1 rounded-full bg-cyan-200" /> : <span className="h-1 w-1 rounded-full bg-transparent" />}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
