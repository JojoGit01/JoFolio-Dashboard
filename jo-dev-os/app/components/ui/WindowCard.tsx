import React from "react";

export default function WindowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative rounded-2xl",
        "bg-[#0F1B2E]/18 backdrop-blur-md",
        "border border-[#4EA1FF]/22",
        "shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#4EA1FF]/10" />
      {children}
    </div>
  );
}
