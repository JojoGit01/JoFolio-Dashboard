import type { ReactNode } from "react";

import { Folder, Image as ImageIcon, Radio, Shield, Star } from "lucide-react";

import type { Project, ProjectStatus, ProjectTag } from "../types";
import { statusLabel, statusMiniLabel } from "../utils";

export function ProjectGlyph({ project }: { project: Project }) {
  if (project.iconImage) {
    return (
      <span
        className="block h-5 w-5 rounded-[4px] bg-contain bg-center bg-no-repeat sm:h-7 sm:w-7"
        style={{ backgroundImage: `url('${project.iconImage}')` }}
      />
    );
  }

  switch (project.icon) {
    case "twitter":
      return <span className="font-bold text-[#7fd4ff]">TW</span>;
    case "weighty":
      return <span className="font-bold text-[#7fd4ff]">W</span>;
    case "portfolio":
      return <span className="font-bold text-[#7fd4ff]">Jo</span>;
    case "folder":
      return <Folder size={18} className="text-[#7fd4ff]" />;
    default:
      return <ImageIcon size={18} className="text-[#7fd4ff]" />;
  }
}

export function Chip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-[#7fd4ff]/35 bg-[#7fd4ff]/15 text-white/85"
          : "border-white/10 bg-black/10 text-white/60 hover:bg-black/20",
      ].join(" ")}
    >
      {icon}
      {children}
    </button>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={[
        "rounded-full border px-2 py-0.5 text-[11px]",
        status === "DONE"
          ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/80"
          : "border-amber-300/25 bg-amber-300/10 text-amber-100/80",
      ].join(" ")}
    >
      {statusLabel(status)}
    </span>
  );
}

export function MiniStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={[
        "rounded-full border px-1.5 py-0.5 text-[9px] sm:px-2 sm:text-[10px]",
        status === "DONE"
          ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/75"
          : "border-amber-300/25 bg-amber-300/10 text-amber-100/75",
      ].join(" ")}
    >
      {statusMiniLabel(status)}
    </span>
  );
}

export function TagBadge({ tag }: { tag: ProjectTag }) {
  const map: Record<ProjectTag, { label: string; cls: string; icon: ReactNode }> = {
    LIVE: {
      label: "PROD",
      cls: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100/80",
      icon: <Radio size={12} className="text-emerald-200" />,
    },
    CURRENT: {
      label: "EN COURS",
      cls: "border-[#7fd4ff]/30 bg-[#7fd4ff]/12 text-white/85",
      icon: <Star size={12} className="text-[#7fd4ff]" />,
    },
    CONFIDENTIAL: {
      label: "CONFIDENTIEL",
      cls: "border-white/15 bg-white/[0.06] text-white/70",
      icon: <Shield size={12} className="text-white/60" />,
    },
  };
  const v = map[tag];

  return (
    <span className={["inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px]", v.cls].join(" ")}>
      {v.icon}
      {v.label}
    </span>
  );
}

export function ActionBtn({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white/80 transition hover:bg-black/30 sm:flex-1"
    >
      {icon}
      {children}
    </a>
  );
}

export function MetaPill({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
      <div className="flex items-center gap-2 text-[11px] text-white/50">
        <span className="text-[#9fd7ff]">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-sm text-white/82">{value}</div>
    </div>
  );
}

export function ScoreMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "cyan" | "emerald" | "amber" | "violet";
}) {
  const toneClass =
    tone === "cyan"
      ? "bg-cyan-300"
      : tone === "emerald"
        ? "bg-emerald-300"
        : tone === "amber"
          ? "bg-amber-300"
          : "bg-violet-300";

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-2.5 py-2 sm:px-3 sm:py-2.5">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/88">{value}/5</div>
      <div className="mt-1.5 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={`${label}-${i}`} className={["h-[4px] w-full rounded-full", i < value ? toneClass : "bg-white/15"].join(" ")} />
        ))}
      </div>
    </div>
  );
}

export function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  const key = String(children).toLowerCase();
  const color =
    key === "overview"
      ? "from-cyan-300/65 via-sky-300/45 to-transparent"
      : key === "tech"
        ? "from-emerald-300/65 via-lime-300/45 to-transparent"
        : "from-amber-300/65 via-orange-300/45 to-transparent";

  return (
    <button
      onClick={onClick}
      className={[
        "relative shrink-0 overflow-hidden rounded-full border px-3 py-1.5 text-xs transition",
        active ? "border-[#7fd4ff]/35 bg-[#7fd4ff]/15 text-white/90" : "border-white/10 bg-black/15 text-white/62 hover:bg-black/25",
      ].join(" ")}
    >
      {active && <span className={["pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r", color].join(" ")} />}
      {children}
    </button>
  );
}
