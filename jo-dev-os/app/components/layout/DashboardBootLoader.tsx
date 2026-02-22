"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FolderOpen, LoaderCircle } from "lucide-react";

const BOOT_DURATION_MS = 920;

export default function DashboardBootLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem("jo_boot_loader_seen") !== "1";
  });

  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(
      () => {
        setVisible(false);
        window.sessionStorage.setItem("jo_boot_loader_seen", "1");
      },
      reduceMotion ? Math.max(420, BOOT_DURATION_MS - 300) : BOOT_DURATION_MS
    );
    return () => window.clearTimeout(timeout);
  }, [reduceMotion, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dashboard-boot-loader"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-transparent"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-[min(92vw,500px)] rounded-2xl border border-[#7fd4ff]/25 bg-[#071226]/92 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.62)]"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#7fd4ff]/35 bg-[#0d1d35]">
                <FolderOpen size={16} className="text-[#7fd4ff]" />
              </span>
              Booting Jo Dev OS...
              <LoaderCircle size={14} className="ml-auto animate-spin text-[#7fd4ff]" />
            </div>

            <div className="relative mt-3 h-14 overflow-hidden rounded-xl border border-white/10 bg-[#0a1426]">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#7fd4ff]/35 to-transparent"
                animate={{ x: ["0%", "-110%"] }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#7fd4ff]/35 to-transparent"
                animate={{ x: ["0%", "110%"] }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.18em] text-white/65">
                DASHBOARD STARTUP
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ scaleX: 0.08 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                style={{ transformOrigin: "left center" }}
                className="h-full rounded-full bg-gradient-to-r from-[#7fd4ff] via-[#90ffd8] to-[#7fd4ff]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
