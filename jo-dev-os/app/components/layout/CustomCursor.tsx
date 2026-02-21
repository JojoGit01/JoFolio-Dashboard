"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "summary",
  "label[for]",
  "[data-cursor='hover']",
].join(",");

const TEXT_SELECTOR = ["input", "textarea", "[contenteditable='true']"].join(",");

type CursorMode = "default" | "hover" | "pressed" | "text";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [point, setPoint] = useState({ x: 0, y: 0 });

  const targetRef = useRef({ x: 0, y: 0 });
  const pressedRef = useRef(false);
  const hoverRef = useRef(false);
  const textRef = useRef(false);
  const visibleRef = useRef(false);
  const modeRef = useRef<CursorMode>("default");

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setEnabled(pointerQuery.matches && !motionQuery.matches);
    };

    evaluate();
    pointerQuery.addEventListener("change", evaluate);
    motionQuery.addEventListener("change", evaluate);

    return () => {
      pointerQuery.removeEventListener("change", evaluate);
      motionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("custom-cursor-enabled");
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    const syncMode = () => {
      let next: CursorMode = "default";
      if (pressedRef.current) next = "pressed";
      else if (textRef.current) next = "text";
      else if (hoverRef.current) next = "hover";

      if (modeRef.current !== next) {
        modeRef.current = next;
        setMode(next);
      }
    };

    const handleMove = (event: MouseEvent) => {
      const next = { x: event.clientX, y: event.clientY };
      targetRef.current = next;
      setPoint(next);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = event.target as Element | null;
      textRef.current = !!target?.closest(TEXT_SELECTOR);
      hoverRef.current = !!target?.closest(INTERACTIVE_SELECTOR);
      syncMode();
    };

    const handleDown = () => {
      pressedRef.current = true;
      syncMode();
    };

    const handleUp = () => {
      pressedRef.current = false;
      syncMode();
    };

    const handleBlur = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const handleOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        visibleRef.current = false;
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  const pointerScale = mode === "pressed" ? 0.92 : mode === "hover" ? 1.06 : mode === "text" ? 0.96 : 1;

  const pointerStroke = mode === "hover" ? "rgba(205,196,255,0.98)" : "rgba(109,232,255,0.98)";
  const pointerFill = mode === "pressed" ? "rgba(62,120,255,0.35)" : "rgba(43,102,228,0.3)";
  const pointerShadow =
    mode === "hover"
      ? "drop-shadow(0 0 8px rgba(189,177,255,0.9)) drop-shadow(0 0 26px rgba(145,171,255,0.62))"
      : "drop-shadow(0 0 8px rgba(117,224,255,0.9)) drop-shadow(0 0 24px rgba(81,154,255,0.58))";

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]">
      <span
        className="fixed left-0 top-0 transition-[opacity,transform] duration-120 ease-out"
        style={{
          width: "34px",
          height: "44px",
          opacity: visible ? 1 : 0,
          transform: `translate3d(${point.x - 4}px, ${point.y - 3}px, 0) scale(${pointerScale})`,
          filter: pointerShadow,
        }}
      >
        <svg viewBox="0 0 46 60" className="h-full w-full">
          <path
            d="M5 5 L35 30 L23 33 L31 51 L22 56 L15 38 L7 47 Z"
            fill={pointerFill}
            stroke={pointerStroke}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 8 L31 30"
            stroke={mode === "hover" ? "rgba(233,229,255,0.95)" : "rgba(178,243,255,0.92)"}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </span>
    </div>
  );
}
