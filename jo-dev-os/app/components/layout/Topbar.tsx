"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { User, LayoutGrid, Folder, Github } from "lucide-react";

type PageMeta = {
  title: string;
  subtitle: string;
};

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Good morning 👋",
    subtitle: "Welcome to my dev space",
  },
  "/projects": {
    title: "Projects",
    subtitle: "Mes projets, stacks et détails techniques",
  },
  "/skills": {
    title: "Skills",
    subtitle: "Technos, outils et domaines de maîtrise",
  },
  "/experience": {
    title: "Experience",
    subtitle: "Parcours, missions et réalisations",
  },
  "/contact": {
    title: "Contact",
    subtitle: "Restons connectés et discutons de votre projet",
  },
};

export default function TopBar() {
  const pathname = usePathname();

  const meta = useMemo(() => {
    return PAGE_META[pathname] ?? {
      title: "Jo Dev OS",
      subtitle: "Full-Stack JS Developer",
    };
  }, [pathname]);

  return (<>
    <header className="flex items-center justify-between gap-4 px-6 py-5">
      <div>
        <div className="text-2xl font-semibold tracking-tight text-white/90">
          {meta.title}
        </div>
        <div className="mt-1 text-sm text-white/55">{meta.subtitle}</div>
      </div>

      {/* Actions (icônes comme ton mockup) */}
      <div className="flex items-center gap-2">
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
    
      <div className="h-px w-full bg-[#223A5E]/70" />
      </>
  );
}

function TopIconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/70 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}
