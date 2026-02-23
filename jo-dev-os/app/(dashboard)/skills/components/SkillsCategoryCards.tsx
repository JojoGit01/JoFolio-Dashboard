import { motion, useReducedMotion } from "framer-motion";

import type { AccentKey, Category, CategoryKey, Skill } from "../types";
import { ACCENT } from "../config";
import { sortSkills } from "../helpers";

export function SkillsCategoryCards({
  categories,
  activeCategory,
  categoryCounts,
  onSelectCategory,
}: {
  categories: Category[];
  activeCategory: CategoryKey;
  categoryCounts: Record<CategoryKey, number>;
  onSelectCategory: (key: CategoryKey) => void;
}) {
  const reduceMotion = useReducedMotion();
  const containerVariants = reduceMotion
    ? undefined
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.03,
          },
        },
      };
  const itemVariants = reduceMotion
    ? undefined
    : {
        hidden: { y: 10, scale: 0.992, opacity: 0.98 },
        show: {
          y: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.28, ease: "easeOut" as const },
        },
      };

  return (
    <motion.div
      className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4"
      variants={containerVariants}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "show"}
    >
      {categories.map((cat) => {
        const isActive = cat.key === activeCategory;
        const catAccent = ACCENT[cat.accent as AccentKey];

        return (
          <motion.button
            key={cat.key}
            variants={itemVariants}
            onClick={() => {
              onSelectCategory(cat.key);
            }}
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.006 }}
            whileTap={reduceMotion ? undefined : { scale: 0.992 }}
            className={[
              "group relative overflow-hidden rounded-[14px] border bg-[#0a162b]/75 px-3 py-2.5 text-left backdrop-blur-md transition sm:rounded-[16px] sm:px-4 sm:py-3",
              isActive ? `${catAccent.border} ring-1 ${catAccent.ring}` : "border-white/10 hover:border-white/20",
            ].join(" ")}
            style={{
              boxShadow: isActive
                ? `0 0 0 1px rgba(255,255,255,0.05), 0 0 20px ${catAccent.glow}`
                : "0 0 0 1px rgba(255,255,255,0.02)",
            }}
          >
            <span className="pointer-events-none absolute inset-x-5 top-0 h-px -translate-x-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-500 group-hover:translate-x-[120%] group-hover:opacity-100" />
            <div className="relative flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/30 text-white/85 sm:h-10 sm:w-10">
                {cat.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-white/90 sm:text-[20px]">{cat.label}</p>
                <p className={["mt-0.5 text-xs", isActive ? catAccent.accentText : "text-white/58"].join(" ")}>
                  {categoryCounts[cat.key]} competences
                </p>
              </div>
              {isActive && (
                <motion.span
                  className="ml-auto h-2.5 w-2.5 rounded-full bg-white/85"
                  animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
                  transition={reduceMotion ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>

            <div className="relative mt-3 h-[3px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={["h-full rounded-full bg-gradient-to-r transition-all", isActive ? catAccent.strip : "from-white/15 to-white/5"].join(" ")}
                initial={false}
                animate={{ width: isActive ? "76%" : "46%" }}
                transition={reduceMotion ? undefined : { duration: 0.28, ease: "easeOut" as const }}
              />
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export function getFirstCategorySkillId(skills: Skill[], category: CategoryKey) {
  const nextPool = skills.filter((s) => s.category === category);
  const first = sortSkills(nextPool)[0] ?? skills.find((s) => s.category === category);
  return first?.id ?? null;
}
