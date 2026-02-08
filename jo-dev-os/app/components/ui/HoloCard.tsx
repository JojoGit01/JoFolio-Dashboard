import React from "react";

export default function HoloCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-[#0F1B2E]/25 backdrop-blur-xl",
        "border border-[#4EA1FF]/25",
        "shadow-[0_20px_80px_rgba(78,161,255,0.12)]",
        className,
      ].join(" ")}
    >
      {/* glow corners */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 rounded-full bg-[#4EA1FF]/18 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#A78BFA]/14 blur-2xl" />

      {/* scanlines very subtle */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(180deg,rgba(255,255,255,0.35)_0px,rgba(255,255,255,0.35)_1px,transparent_6px,transparent_10px)]" />

      {/* inner highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_45%)]" />

      {/* bottom glow line */}
      <div className="pointer-events-none absolute left-6 right-6 bottom-5 h-px bg-gradient-to-r from-transparent via-[#4EA1FF]/55 to-transparent" />

      {/* content */}
      <div className="relative">{children}</div>
    </div>
  );
}
