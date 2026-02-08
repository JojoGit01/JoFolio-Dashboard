"use client";

import { useState } from "react";
import {
  Twitter,
  BarChart3,
  Triangle,
  Mail,
  Github,
  Linkedin,
  Folder,
  Rocket,
  ArrowUpRight,
} from "lucide-react";
import WindowCard from "../components/ui/WindowCard";

type CardId = "building" | "projects" | "contact";

export default function HomePage() {
  const [active, setActive] = useState<CardId>("building");

  // ✅ Focus position (desktop) — garde ton “move au centre un peu à droite”
  // (tu peux ajuster left/top si tu veux + / - à droite)
  const focusPos =
    "left-[12%] top-[92px] z-30 opacity-100 blur-0 scale-100 rotate-0";

  // ✅ positions desktop (non-focus)
  const posBuilding =
    "left-[6%] top-[140px] z-10 opacity-25 blur-[2px] scale-[0.95] -rotate-[1.5deg]";
  const posProjects =
    "left-[52%] top-[22px] z-10 opacity-25 blur-[2px] scale-[0.95] rotate-[1.2deg]";
  const posContact =
    "left-[60%] top-[330px] z-10 opacity-25 blur-[2px] scale-[0.95] rotate-[0.8deg]";

  const getSceneClass = (id: CardId) => {
    const isActive = active === id;

    const base =
      "absolute transition-all duration-500 ease-[cubic-bezier(.2,.9,.2,1)] cursor-pointer will-change-transform";

    const width =
      id === "building"
        ? "w-[clamp(360px,44vw,600px)]"
        : id === "projects"
        ? "w-[clamp(320px,34vw,460px)]"
        : "w-[clamp(300px,30vw,380px)]";

    const notFocused =
      id === "building"
        ? posBuilding
        : id === "projects"
        ? posProjects
        : posContact;

    return [base, width, "max-w-full", isActive ? focusPos : notFocused].join(
      " "
    );
  };

  return (
    <div className="relative min-h-[920px]">
      {/* Background Home */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-95"
        style={{
          backgroundImage: "url('/images/workspace.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_62%,rgba(0,0,0,0.85)_100%)]" />

      <div className="grid grid-cols-16 gap-8">
        {/* LEFT TEXT (toujours devant) */}
        <section className="col-span-12 lg:col-span-5 relative z-40">
          <h1 className="text-4xl font-bold leading-tight">👋 Hey, I’m Jo</h1>

          {/* ✅ HERO TEXT en FR (court & pro) */}
          <p className="mt-4 text-[#E6EDF7] text-lg leading-relaxed">
            Développeur Full-Stack, je conçois et développe des applications web
            et mobiles performantes, fiables et orientées produit.
          </p>

          <p className="mt-4 text-[#9FB3D1] leading-relaxed">
            Curieux et polyvalent, j’aime transformer des idées ambitieuses en
            solutions concrètes, optimisées et prêtes pour la production.
          </p>

          {/* ✅ CTA : Download CV removed */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActive("projects")}
              className="rounded-xl bg-[#2F6BFF] px-5 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(47,107,255,0.25)] hover:opacity-90 transition"
            >
              Voir mes projets
            </button>

            <button
              onClick={() => setActive("contact")}
              className="rounded-xl border border-white/10 bg-[#16263F]/55 px-5 py-3 font-semibold text-[#E6EDF7] backdrop-blur-xl hover:bg-[#1C3154]/60 transition"
            >
              Me contacter
            </button>
          </div>

          {/* ✅ Click-only focus buttons */}
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-[#9FB3D1]">
            <button
              onClick={() => setActive("building")}
              className={[
                "rounded-full px-3 py-1 border bg-[#111E34]/25 transition",
                active === "building"
                  ? "text-[#E6EDF7] border-[#4EA1FF]/35"
                  : "border-white/10",
              ].join(" ")}
            >
              En cours
            </button>
            <button
              onClick={() => setActive("projects")}
              className={[
                "rounded-full px-3 py-1 border bg-[#111E34]/25 transition",
                active === "projects"
                  ? "text-[#E6EDF7] border-[#4EA1FF]/35"
                  : "border-white/10",
              ].join(" ")}
            >
              Projets
            </button>
            <button
              onClick={() => setActive("contact")}
              className={[
                "rounded-full px-3 py-1 border bg-[#111E34]/25 transition",
                active === "contact"
                  ? "text-[#E6EDF7] border-[#4EA1FF]/35"
                  : "border-white/10",
              ].join(" ")}
            >
              Contact
            </button>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="col-span-12 lg:col-span-7 relative">
          {/* ✅ DESKTOP: floating scene (click only) */}
          <div className="relative hidden lg:block h-[660px]">
            {/* BUILDING */}
            <div
              className={getSceneClass("building")}
              onClick={() => setActive("building")}
            >
              <WindowCard className="p-7">
                <div className="flex items-center gap-2 font-semibold">
                  <Rocket size={18} className="text-[#4EA1FF]" />
                  En cours
                  <span className="ml-auto text-xs text-[#9FB3D1]">Actif</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-4">
                    <Twitter className="text-[#4EA1FF]" size={22} />
                    <div className="text-lg font-semibold">Twitter Clone</div>
                    <span className="ml-auto text-xs text-[#9FB3D1]">
                      FastAPI • RN
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-4">
                    <BarChart3 className="text-[#34D399]" size={22} />
                    <div className="text-lg font-semibold">Weighty App</div>
                    <span className="ml-auto text-xs text-[#9FB3D1]">
                      Expo • TS
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-4">
                    <Triangle className="text-[#A78BFA]" size={22} />
                    <div className="text-lg font-semibold">Next.js Portfolio</div>
                    <span className="ml-auto text-xs text-[#9FB3D1]">
                      App Router
                    </span>
                  </div>
                </div>
              </WindowCard>
            </div>

            {/* PROJECTS */}
            <div
              className={getSceneClass("projects")}
              onClick={() => setActive("projects")}
            >
              <WindowCard className="p-6">
                <div className="flex items-center gap-2 font-semibold">
                  <Folder size={18} className="text-[#4EA1FF]" />
                  Projets
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-[#111E34]/35 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Twitter Clone</div>
                      <ArrowUpRight size={16} className="text-[#9FB3D1]" />
                    </div>
                    <div className="mt-1 text-sm text-[#9FB3D1]">
                      Full-stack • Auth • Feed • Realtime
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#111E34]/35 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Weighty</div>
                      <ArrowUpRight size={16} className="text-[#9FB3D1]" />
                    </div>
                    <div className="mt-1 text-sm text-[#9FB3D1]">
                      Tracking • Notifs • Analytics
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#111E34]/35 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Next.js Portfolio</div>
                      <ArrowUpRight size={16} className="text-[#9FB3D1]" />
                    </div>
                    <div className="mt-1 text-sm text-[#9FB3D1]">
                      UI • Animations • Storytelling
                    </div>
                  </div>
                </div>
              </WindowCard>
            </div>

            {/* CONTACT */}
            <div
              className={getSceneClass("contact")}
              onClick={() => setActive("contact")}
            >
              <WindowCard className="p-6">
                <div className="flex items-center gap-2 font-semibold">
                  <Mail size={18} className="text-[#A78BFA]" />
                  Contact
                </div>

                <p className="mt-3 text-sm text-[#9FB3D1]">
                  Disponible pour CDI et missions freelance. Réponse rapide.
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href="mailto:jo@email.com"
                    className="w-full flex items-center gap-2 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-3 text-sm text-[#E6EDF7] hover:bg-[#1C3154]/50 transition"
                  >
                    <Mail size={16} />
                    Email
                    <span className="ml-auto text-xs text-[#9FB3D1]">
                      jo@email.com
                    </span>
                  </a>

                  <a
                    href="#"
                    className="w-full flex items-center gap-2 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-3 text-sm text-[#E6EDF7] hover:bg-[#1C3154]/50 transition"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                    <span className="ml-auto text-xs text-[#9FB3D1]">@jo-dev</span>
                  </a>

                  <a
                    href="#"
                    className="w-full flex items-center gap-2 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-3 text-sm text-[#E6EDF7] hover:bg-[#1C3154]/50 transition"
                  >
                    <Github size={16} />
                    GitHub
                    <span className="ml-auto text-xs text-[#9FB3D1]">
                      /jodimartino
                    </span>
                  </a>
                </div>
              </WindowCard>
            </div>
          </div>

          {/* ✅ MOBILE: stack vertical => scroll OK (main scrolls) */}
          <div className="block lg:hidden mt-8 space-y-6">
            <WindowCard className="p-6">
              <div className="flex items-center gap-2 font-semibold">
                <Rocket size={18} className="text-[#4EA1FF]" />
                En cours
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-4">
                  <Twitter className="text-[#4EA1FF]" size={20} />
                  <div className="font-semibold">Twitter Clone</div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-4">
                  <BarChart3 className="text-[#34D399]" size={20} />
                  <div className="font-semibold">Weighty App</div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111E34]/35 px-4 py-4">
                  <Triangle className="text-[#A78BFA]" size={20} />
                  <div className="font-semibold">Next.js Portfolio</div>
                </div>
              </div>
            </WindowCard>

            <WindowCard className="p-6">
              <div className="flex items-center gap-2 font-semibold">
                <Folder size={18} className="text-[#4EA1FF]" />
                Projets
              </div>
              <p className="mt-3 text-sm text-[#9FB3D1]">
                Twitter Clone • Weighty • Portfolio Next.js
              </p>
            </WindowCard>

            <WindowCard className="p-6">
              <div className="flex items-center gap-2 font-semibold">
                <Mail size={18} className="text-[#A78BFA]" />
                Contact
              </div>
              <p className="mt-3 text-sm text-[#9FB3D1]">
                Email • LinkedIn • GitHub
              </p>
            </WindowCard>
          </div>
        </section>
      </div>

      <div className="h-10" />
    </div>
  );
}
