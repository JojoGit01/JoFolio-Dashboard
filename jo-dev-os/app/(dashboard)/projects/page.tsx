"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock3, Search, Sparkles } from "lucide-react";

import { ProjectCard } from "./components/ProjectCard";
import { ProjectModal } from "./components/ProjectModal";
import { Chip } from "./components/ProjectPrimitives";
import { buildProjectsFromData } from "./data-mappers";
import type { ProjectStatus } from "./types";

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const projects = useMemo(() => buildProjectsFromData(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | ProjectStatus>("ALL");
  const [activeId, setActiveId] = useState<string | null>(() => searchParams.get("project"));
  const [navDirection, setNavDirection] = useState<1 | -1>(1);
  const [compareFromId, setCompareFromId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const okQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q);
      const okStatus = status === "ALL" ? true : p.status === status;
      return okQuery && okStatus;
    });
  }, [projects, query, status]);

  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [projects, activeId]);
  const activeIndex = useMemo(
    () => (activeProject ? projects.findIndex((p) => p.id === activeProject.id) : -1),
    [projects, activeProject]
  );
  const compareProject = useMemo(() => projects.find((p) => p.id === compareFromId) ?? null, [projects, compareFromId]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 320);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.section
      initial={reduceMotion ? false : { y: 10, opacity: 0.98 }}
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="relative mt-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-[#0B1220]/40 px-4 py-3 backdrop-blur-md md:w-auto">
          <Search size={18} className="text-white/55" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet..."
            className="w-full min-w-0 bg-transparent text-sm text-white/80 placeholder:text-white/35 outline-none md:w-[260px]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip active={status === "ALL"} onClick={() => setStatus("ALL")} icon={<Sparkles size={14} />}>
            Tous
          </Chip>
          <Chip active={status === "WIP"} onClick={() => setStatus("WIP")} icon={<Clock3 size={14} />}>
            Developpement
          </Chip>
          <Chip active={status === "DONE"} onClick={() => setStatus("DONE")} icon={<CheckCircle2 size={14} />}>
            Production
          </Chip>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} className="overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-2 sm:p-4">
              <div className="h-[76px] animate-pulse rounded-xl bg-white/10 sm:h-[140px]" />
              <div className="mt-3 h-4 animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/10" />
            </div>
          ))
        ) : (
          <AnimatePresence initial={false}>
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.99 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <ProjectCard
                  project={p}
                  onOpen={() => {
                    setCompareFromId(null);
                    setNavDirection(1);
                    setActiveId(p.id);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4 text-sm text-white/60">
          Aucun projet ne correspond a ta recherche.
        </div>
      )}

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            compareProject={compareProject}
            navDirection={navDirection}
            activeIndex={activeIndex}
            totalCount={projects.length}
            onClose={() => setActiveId(null)}
            canPrev={activeIndex > 0}
            canNext={activeIndex >= 0 && activeIndex < projects.length - 1}
            onPrev={() => {
              if (activeIndex > 0 && activeProject) {
                setCompareFromId(activeProject.id);
                setNavDirection(-1);
                setActiveId(projects[activeIndex - 1].id);
              }
            }}
            onNext={() => {
              if (activeIndex >= 0 && activeIndex < projects.length - 1 && activeProject) {
                setCompareFromId(activeProject.id);
                setNavDirection(1);
                setActiveId(projects[activeIndex + 1].id);
              }
            }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
