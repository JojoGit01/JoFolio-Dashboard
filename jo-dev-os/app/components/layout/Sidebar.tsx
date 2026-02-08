"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, Sparkles, Briefcase, Mail } from "lucide-react";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/skills", label: "Skills", icon: Sparkles },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative h-full w-full bg-gradient-to-b from-[#0F1B2E] via-[#0F1B2E] to-[#0B1220] overflow-hidden">
      {/* Top area */}
      <div className="px-5 pt-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-[#223A5E] bg-[#111E34]/60 grid place-items-center">
            <div className="h-4 w-4 rounded-md bg-[#2F6BFF]" />
          </div>

          <div className="text-[22px] font-semibold tracking-wide">Jo Dev OS</div>
        </div>
      </div>

      {/* Profile block */}
      <div className="mt-5 border-y border-[#223A5E]/70 bg-[#111E34]/35 px-5 py-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar max */}
          <div className="relative w-full max-w-[240px] aspect-square rounded-full bg-gradient-to-b from-[#4EA1FF] to-[#7C5CFF] p-[3px] shadow-[0_0_30px_rgba(78,161,255,0.18)]">
            <div className="relative h-full w-full rounded-full bg-[#0F1B2E] p-[3px]">
              <Image
                src="/images/avatar.png"
                alt="Jo Di Martino"
                fill
                priority
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 text-[20px] font-semibold">Jo Di Martino</div>
          <div className="mt-1 text-[13px] tracking-wide text-[#9FB3D1]">
            Full-Stack JS Developer
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 py-5 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={[
                "relative flex items-center gap-4 rounded-xl px-5 py-4 text-base transition",
                isActive
                  ? "bg-gradient-to-r from-[#2F6BFF]/35 to-transparent text-[#E6EDF7]"
                  : "text-[#9FB3D1] hover:bg-[#16263F]/60 hover:text-[#E6EDF7]",
              ].join(" ")}
            >
              {/* barre bleue à gauche (active) */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-[4px] rounded-full bg-[#4EA1FF]" />
              )}

              <Icon size={22} className={isActive ? "text-[#4EA1FF]" : ""} />

              <span
                className={
                  isActive
                    ? "font-semibold text-[17px]"
                    : "font-medium text-[16px]"
                }
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-b from-transparent to-[#0B1220]" />
    </aside>
  );
}
