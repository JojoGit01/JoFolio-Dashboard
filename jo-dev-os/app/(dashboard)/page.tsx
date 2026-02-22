"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HomeLeft from "./Home/HomeLeft";
import HomeRight from "./Home/HomeRight";

type CardId = "building" | "projects" | "contact" | "experience";
const CARD_IDS: CardId[] = ["building", "projects", "contact", "experience"];

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActiveState] = useState<CardId>(() => {
    if (typeof window === "undefined") return "building";

    const fromUrl = new URLSearchParams(window.location.search).get("focus");
    if (fromUrl && CARD_IDS.includes(fromUrl as CardId)) {
      return fromUrl as CardId;
    }

    const fromStorage = window.localStorage.getItem("home_focus");
    if (fromStorage && CARD_IDS.includes(fromStorage as CardId)) {
      return fromStorage as CardId;
    }

    return "building";
  });

  const setActive = (id: CardId) => {
    setActiveState(id);
    window.localStorage.setItem("home_focus", id);

    const params = new URLSearchParams(searchParams.toString());
    params.set("focus", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative min-h-full">
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

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        <HomeLeft active={active} setActive={setActive} />
        <HomeRight active={active} setActive={setActive} />
      </div>
    </div>
  );
}
