"use client";

import { useMemo, useState } from "react";
import { Folder, Sparkles, Briefcase, Mail } from "lucide-react";

type CardId = "projects" | "skills" | "experience" | "contact";

type Card = {
  id: CardId;
  title: string;
  subtitle: string;
  icon: React.ElementType;
};

export default function StackedCards() {
  const cards: Card[] = useMemo(
    () => [
      { id: "projects", title: "My Projects", subtitle: "Twitter Clone • Mobile Apps • Experiments", icon: Folder },
      { id: "skills", title: "My Skills", subtitle: "React • Node • TS • RN • UI/UX", icon: Sparkles },
      { id: "experience", title: "My Experience", subtitle: "Stage Full-Stack • Freelance • Learning", icon: Briefcase },
      { id: "contact", title: "Contact Me", subtitle: "Email • LinkedIn • GitHub", icon: Mail },
    ],
    []
  );

  const [active, setActive] = useState<CardId>("projects");

  const order = useMemo(() => {
    const ids = cards.map((c) => c.id);
    const idx = ids.indexOf(active);
    return [...ids.slice(idx), ...ids.slice(0, idx)];
  }, [active, cards]);

  const depthStyle = (rank: number) => {
    if (rank === 0) return "opacity-70 blur-0 scale-100 z-30";
    if (rank === 1) return "opacity-35 blur-[1px] scale-[0.99] z-20";
    return "opacity-15 blur-[2px] scale-[0.98] z-10";
  };

  const offsetStyle = (rank: number) => {
    if (rank === 0) return "translate-y-0";
    if (rank === 1) return "translate-y-6";
    return "translate-y-12";
  };

  return (
    <div className="relative h-[360px] w-full">
      {order.slice(0, 3).map((id, rank) => {
        const c = cards.find((x) => x.id === id)!;
        const Icon = c.icon;

        return (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            onMouseEnter={() => setActive(c.id)}
            className={[
              "absolute inset-0 text-left rounded-2xl border border-white/10",
              "bg-gradient-to-r from-[#111E34]/45 to-[#0F1B2E]/25 backdrop-blur-xl",
              "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
              "transition-all duration-300",
              depthStyle(rank),
              offsetStyle(rank),
            ].join(" ")}
          >
            <div className="flex items-center gap-3 px-6 pt-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#16263F]/50">
                <Icon size={20} className="text-[#4EA1FF]" />
              </div>

              <div>
                <div className="text-lg font-semibold">{c.title}</div>
                <div className="text-sm text-[#9FB3D1]">{c.subtitle}</div>
              </div>
            </div>

            <div className="absolute left-6 right-6 bottom-5 h-px bg-gradient-to-r from-transparent via-[#4EA1FF]/40 to-transparent" />
          </button>
        );
      })}
    </div>
  );
}
