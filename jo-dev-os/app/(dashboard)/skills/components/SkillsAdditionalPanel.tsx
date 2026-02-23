import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function progressThemeByPercent(percent: number) {
  if (percent >= 90) return "linear-gradient(90deg, rgba(95,241,214,0.95), rgba(121,214,255,0.95))";
  if (percent >= 80) return "linear-gradient(90deg, rgba(100,207,255,0.95), rgba(122,158,255,0.92))";
  if (percent >= 70) return "linear-gradient(90deg, rgba(255,214,112,0.95), rgba(255,155,96,0.92))";
  return "linear-gradient(90deg, rgba(189,157,255,0.9), rgba(120,157,241,0.88))";
}

type Props = {
  additionalOpen: boolean;
  setAdditionalOpen: (updater: (v: boolean) => boolean) => void;
  titleClass: string;
};

export function SkillsAdditionalPanel({ additionalOpen, setAdditionalOpen, titleClass }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="mt-5 border-b border-white/10 pb-2 sm:mt-6">
        <button onClick={() => setAdditionalOpen((v) => !v)} className="group inline-flex items-center gap-2 text-2xl font-semibold text-white/90 md:text-[36px]">
          Additional <span className={titleClass}>Skills</span>
          <motion.span
            animate={reduceMotion ? undefined : { rotate: additionalOpen ? 180 : 0 }}
            transition={reduceMotion ? undefined : { type: "spring", stiffness: 220, damping: 18 }}
            className="mt-1"
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {additionalOpen && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, y: 6, opacity: 0.98 }}
            animate={reduceMotion ? undefined : { height: "auto", y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, y: -4, opacity: 0.98 }}
            transition={reduceMotion ? undefined : { duration: 0.26, ease: "easeOut" as const }}
            className="mt-3 overflow-hidden rounded-[16px] border border-white/10 bg-[#081326]/68 backdrop-blur-md"
          >
            <motion.div
              className="grid grid-cols-1 gap-3 p-3 md:grid-cols-3"
              variants={
                reduceMotion
                  ? undefined
                  : {
                      show: {
                        transition: { staggerChildren: 0.05, delayChildren: 0.03 },
                      },
                    }
              }
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "show"}
            >
            <motion.div
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { y: 6, opacity: 0.98 },
                      show: { y: 0, opacity: 1 },
                    }
              }
              className="md:border-r md:border-white/8 md:pr-3"
            >
              <p className="text-[18px] font-semibold text-white/88 sm:text-[22px]">State Management</p>
              <p className="mt-1 text-sm text-white/63">Redux, Zustand, Context API</p>
              <div className="mt-3 flex items-center gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className={i < 5 ? "h-1.5 w-1.5 rounded-full bg-[#6db5de]" : "h-1.5 w-1.5 rounded-full bg-white/12"} />
                ))}
                <span className="h-[4px] w-20 rounded-full bg-white/10" />
              </div>

              <p className="mt-5 text-[18px] font-semibold text-white/88 sm:mt-6 sm:text-[22px]">Testing</p>
              <p className="mt-1 text-sm text-white/63">Jest, Cypress, React Testing Lib</p>
            </motion.div>

            <motion.div
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { y: 6, opacity: 0.98 },
                      show: { y: 0, opacity: 1 },
                    }
              }
              className="md:border-r md:border-white/8 md:px-3"
            >
              <p className="text-[18px] font-semibold text-white/88 sm:text-[22px]">UI Libraries</p>
              <p className="mt-1 text-sm text-white/63">Material-UI, Chakra UI, AntD</p>
              <div className="mt-3 space-y-4">
                <ProgressRow percent={74} />
                <ProgressRow percent={66} />
                <ProgressRow percent={40} />
              </div>
            </motion.div>

            <motion.div
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { y: 6, opacity: 0.98 },
                      show: { y: 0, opacity: 1 },
                    }
              }
              className="md:pl-3"
            >
              <p className="text-[18px] font-semibold text-white/88 sm:text-[22px]">Testing Grid</p>
              <div className="mt-3 space-y-4">
                {Array.from({ length: 4 }).map((_, row) => (
                  <div key={row} className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 6 }).map((__, col) => {
                      const active = col < 2 + (row % 3);
                      return (
                        <span
                          key={`${row}-${col}`}
                          className={active ? "h-[6px] rounded-full" : "h-[6px] rounded-full bg-white/12"}
                          style={active ? { backgroundImage: progressThemeByPercent(68 + row * 5 - col * 4) } : undefined}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

function ProgressRow({ percent }: { percent: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="h-[6px] w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={reduceMotion ? false : { width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 0.42,
                ease: "easeOut" as const,
              }
        }
        className="h-full rounded-full"
        style={{
          backgroundImage: progressThemeByPercent(percent),
          boxShadow: "0 0 10px rgba(120,170,255,0.08)",
        }}
      />
    </div>
  );
}
