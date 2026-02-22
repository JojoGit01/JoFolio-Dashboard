"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { ExperienceRecord } from "./types";
import ExperienceDetailsRight from "./ExperienceDetailsRight";

export default function ExperienceMobileSheet({
  open,
  onClose,
  selectedItem,
}: {
  open: boolean;
  onClose: () => void;
  selectedItem?: ExperienceRecord;
}) {
  return (
    <AnimatePresence>
      {open && selectedItem && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Fermer le panneau detail experience"
            className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto rounded-t-[24px] border border-white/12 bg-[#0A1528]/96 p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-white/80">Details experience</div>
              <button onClick={onClose} className="rounded-lg border border-white/15 bg-black/20 p-2 text-white/75" aria-label="Fermer">
                <X size={16} />
              </button>
            </div>
            <ExperienceDetailsRight details={selectedItem} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
