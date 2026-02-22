"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";

import { DEFAULT_PROJECT_IMAGE } from "../constants";
import type { Project } from "../types";
import { MiniStatusBadge, ProjectGlyph, TagBadge } from "./ProjectPrimitives";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-40, 40], [6, -6]);
  const ry = useTransform(mx, [-40, 40], [-8, 8]);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
  };

  const coverUrl = project.cardImage ?? project.cover ?? DEFAULT_PROJECT_IMAGE;

  return (
    <button
      aria-label={`Ouvrir le projet ${project.name}`}
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
    >
      <div className="relative">
        <div className="pointer-events-none absolute -inset-[1px] rounded-[22px] bg-[linear-gradient(180deg,rgba(127,212,255,0.22),rgba(127,212,255,0.06))] opacity-80" />
        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0B1220]/35 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
        >
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#7fd4ff]/30 to-transparent" />
          <div className="relative h-[76px] w-full sm:h-[140px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${coverUrl}')` }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.62))]" />
            <div className="absolute left-2 top-2 flex items-center gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/25 sm:h-11 sm:w-11 sm:rounded-2xl">
                <ProjectGlyph project={project} />
              </div>
            </div>
            <div className="absolute left-2 bottom-2 hidden flex-wrap gap-1.5 sm:left-4 sm:bottom-4 sm:flex sm:gap-2">
              {(project.tags ?? []).map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>
          </div>
          <div className="p-2 sm:p-5">
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <div className="line-clamp-2 text-[11px] font-semibold leading-tight text-white/90 sm:truncate sm:text-[15px] sm:leading-normal">
                  {project.name}
                </div>
                <div className="mt-1 hidden line-clamp-2 text-[12px] text-white/55 sm:block">{project.tagline}</div>
              </div>
              <div className="flex items-center gap-2">
                <MiniStatusBadge status={project.status} />
                <ArrowRight className="mt-1 hidden text-white/35 transition group-hover:text-white/65 sm:block" size={18} />
              </div>
            </div>
            <div className="mt-2 hidden items-center gap-2 rounded-xl border border-white/12 bg-black/20 px-3 py-2 text-xs text-white/75 transition group-hover:border-[#7fd4ff]/35 group-hover:bg-[#7fd4ff]/10 group-hover:text-white/90 sm:mt-4 sm:inline-flex sm:py-1.5">
              <FolderOpen size={14} className="text-[#7fd4ff]" /> Ouvrir dossier
            </div>
          </div>
        </motion.div>
      </div>
    </button>
  );
}
