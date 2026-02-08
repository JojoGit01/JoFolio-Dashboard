"use client";

import { Download, User, Briefcase, Github } from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-3">
        {/* Texte gauche */}
        <div>
          <div className="text-xl font-semibold text-[#E6EDF7]">Bonjour 👋</div>
          <div className="text-sm text-[#9FB3D1]">Bienvenue dans mon espace temps</div>
        </div>

        {/* Actions droite */}
        <div className="flex items-center gap-3">
          {/* Download CV */}
          <button className="flex items-center gap-2 rounded-xl border border-[#223A5E] bg-[#16263F]/60 px-4 py-2 text-sm text-[#E6EDF7] hover:bg-[#1C3154] transition">
            <Download size={16} />
            Télécharger CV
          </button>

          {/* Icon buttons */}
          <button className="rounded-xl border border-[#223A5E] bg-[#16263F]/60 p-2 hover:bg-[#1C3154] transition">
            <User size={16} />
          </button>

          <button className="rounded-xl border border-[#223A5E] bg-[#16263F]/60 p-2 hover:bg-[#1C3154] transition">
            <Briefcase size={16} />
          </button>

          <button className="rounded-xl border border-[#223A5E] bg-[#16263F]/60 p-2 hover:bg-[#1C3154] transition">
            <Github size={16} />
          </button>
        </div>
      </div>

      {/* Divider fin comme sur ton mockup */}
      <div className="h-px w-full bg-[#223A5E]/70" />
    </div>
  );
}
