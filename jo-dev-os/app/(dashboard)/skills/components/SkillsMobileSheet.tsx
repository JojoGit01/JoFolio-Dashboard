"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { SkillsDetailsContent } from "./SkillsDetailsPanel";
import type { Skill } from "../types";
import { ACCENT } from "../config";

export function SkillsMobileSheet({
  open,
  onClose,
  selectedSkill,
  skillsByCategory,
  setSelectedId,
  accentKey,
}: {
  open: boolean;
  onClose: () => void;
  selectedSkill: Skill | null;
  skillsByCategory: Skill[];
  setSelectedId: (id: string) => void;
  accentKey: keyof typeof ACCENT;
}) {
  return (
    <AnimatePresence>
      {open && selectedSkill && (
        <>
          <motion.button
            type="button"
            aria-label="Fermer les details skill"
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/45 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-[71] mx-2 max-h-[86dvh] overflow-hidden rounded-t-2xl border border-white/10 bg-[#071324]/96 shadow-[0_-20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 220, mass: 0.9 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="font-data text-xs uppercase tracking-[0.18em] text-white/55">Skill details</div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70"
                aria-label="Fermer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[calc(86dvh-56px)] overflow-y-auto px-3 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 custom-scrollbar">
              <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-[#081529]/74 p-3 backdrop-blur-md">
                <SkillsDetailsContent
                  selectedSkill={selectedSkill}
                  skillsByCategory={skillsByCategory}
                  setSelectedId={setSelectedId}
                  accentKey={accentKey}
                  mode="mobile"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

