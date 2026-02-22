import type { ReactNode } from "react";

import { motion } from "framer-motion";

export function BottomMetric({
  icon,
  value,
  label,
  delay = 0,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 12, scale: 0.97 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.26, ease: "easeOut", delay }}
      whileHover={{ y: -1 }}
      className="min-w-[156px] shrink-0 snap-start px-2 py-2 sm:min-w-0 sm:px-4 sm:py-2.5"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-300/38 bg-cyan-300/12 shadow-[0_0_12px_rgba(112,233,255,0.24)] sm:h-9 sm:w-9 sm:rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-[20px] leading-none font-semibold text-white/95 sm:text-[30px]">{value}</p>
          <p className="mt-0.5 text-[12px] leading-tight text-white/84 sm:text-[16px]">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
