import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

import { ACCENT, nodeIcon } from "../config";
import type { FormationNode } from "../types";

export function FormationMobileSheet({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: FormationNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button aria-label="Fermer details formation" className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-y-auto rounded-t-[22px] border border-white/12 bg-[#081529]/96 p-3 pb-[calc(1rem+env(safe-area-inset-bottom))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-white/82">Details formation</div>
              <button onClick={onClose} className="rounded-lg border border-white/15 bg-black/20 p-2 text-white/70" aria-label="Fermer">
                <X size={16} />
              </button>
            </div>
            <div className="rounded-2xl border border-white/12 bg-black/20 p-3">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-black/25">{nodeIcon(active.kind)}</div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white/92">{active.title}</p>
                  <p className="text-xs text-white/68">{active.subtitle}</p>
                  <p className="mt-1 text-[11px] text-white/55">
                    {active.level} - {active.specialization}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/75">
                <span className="rounded-full border border-white/12 bg-black/20 px-2 py-1">{active.years}</span>
                <span className="rounded-full border border-white/12 bg-black/20 px-2 py-1">{active.city}</span>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-white/88">Modules cles</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.modules.map((m) => (
                    <span key={`sheet-${m}`} className="rounded-md border border-white/12 bg-black/20 px-2 py-0.5 text-[11px] text-white/80">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-white/88">Competences</p>
                <div className="mt-2 space-y-2">
                  {active.skills.map((skill) => (
                    <div key={`sheet-skill-${skill.label}`} className="grid grid-cols-[70px_1fr_34px] items-center gap-2">
                      <span className="text-xs text-white/72">{skill.label}</span>
                      <div className="h-[5px] overflow-hidden rounded-full bg-white/12">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value}%` }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className={["h-full rounded-full bg-gradient-to-r", ACCENT[active.accent].progress].join(" ")}
                        />
                      </div>
                      <span className="text-right text-[11px] text-white/78">{skill.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-white/88">Projets realises</p>
                <div className="mt-2 space-y-2">
                  {active.projects.map((project) => (
                    <div key={`sheet-project-${project.id}`} className="flex items-center gap-2 rounded-lg border border-white/12 bg-black/20 px-2.5 py-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-200" />
                      <p className="min-w-0 flex-1 truncate text-xs text-white/86">{project.name}</p>
                      {project.state && (
                        <span
                          className={[
                            "shrink-0 rounded-full px-2 py-0.5 text-[10px]",
                            project.state === "Production" ? "bg-emerald-300/12 text-emerald-200" : "bg-cyan-300/14 text-cyan-200",
                          ].join(" ")}
                        >
                          {project.state}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-white/60">Notes</p>
                    <p className="text-base font-semibold text-amber-200">{active.mention ?? "Mention"}</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/14 bg-white/8 px-3 py-1.5 text-xs text-white/88">
                    Voir le diplome <Download size={12} className="text-cyan-200" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
