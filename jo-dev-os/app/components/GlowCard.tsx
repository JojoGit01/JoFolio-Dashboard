import { ArrowRight } from "lucide-react";

export function GlowCard({
  icon,
  title,
  value,
  cta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  cta: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className={[
        "group block",
        "neon-frame neon-glow glass-panel",
        "transition duration-300",
        "hover:scale-[1.01] active:scale-[0.995]",
      ].join(" ")}
    >
      <div className="shine p-7">
        {/* Icon bubble */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-black/25">
          {icon}
        </div>

        <div className="mt-5 text-center">
          <div className="text-2xl font-semibold tracking-tight text-white/90">
            {title}
          </div>
          <div className="mt-2 text-sm text-white/60">{value}</div>
        </div>

        {/* CTA bar */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center text-sm text-white/70 transition group-hover:bg-black/30">
          <span className="inline-flex items-center gap-2">
            {cta}
            <ArrowRight size={16} className="opacity-70" />
          </span>
        </div>
      </div>
    </a>
  );
}
