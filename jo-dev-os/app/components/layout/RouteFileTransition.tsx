"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FolderOpen, LoaderCircle } from "lucide-react";

const OPEN_DELAY_MS = 260;
const MIN_VISIBLE_MS = 320;
const MAX_VISIBLE_MS = 3200;

export default function RouteFileTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const startedAtRef = useRef(0);
  const pendingRef = useRef(false);
  const pendingUrlRef = useRef<string | null>(null);
  const pendingPathnameRef = useRef<string | null>(null);
  const navTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const maxTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (navTimeoutRef.current) window.clearTimeout(navTimeoutRef.current);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
      if (maxTimeoutRef.current) window.clearTimeout(maxTimeoutRef.current);
      navTimeoutRef.current = null;
      hideTimeoutRef.current = null;
      maxTimeoutRef.current = null;
    };

    const startTransition = (nextPath: string, nextPathname: string) => {
      clearTimers();
      startedAtRef.current = Date.now();
      pendingRef.current = true;
      pendingUrlRef.current = nextPath;
      pendingPathnameRef.current = nextPathname;
      setVisible(true);

      navTimeoutRef.current = window.setTimeout(() => {
        navTimeoutRef.current = null;
        router.push(nextPath);
      }, OPEN_DELAY_MS);

      maxTimeoutRef.current = window.setTimeout(() => {
        pendingRef.current = false;
        pendingUrlRef.current = null;
        pendingPathnameRef.current = null;
        setVisible(false);
      }, MAX_VISIBLE_MS);
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      if (
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:")
      ) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const next = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
      if (current === next) return;

      if (pendingRef.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      startTransition(next, nextUrl.pathname);
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      clearTimers();
    };
  }, [router]);

  useEffect(() => {
    if (!visible || !pendingRef.current) return;
    if (!pendingUrlRef.current) return;
    if (!pendingPathnameRef.current) return;
    if (pathname !== pendingPathnameRef.current) return;

    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    hideTimeoutRef.current = window.setTimeout(() => {
      pendingRef.current = false;
      pendingUrlRef.current = null;
      pendingPathnameRef.current = null;
      setVisible(false);
    }, remaining);
  }, [pathname, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-file-transition"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
          className="fixed inset-0 z-[140] flex items-center justify-center bg-transparent"
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-[min(92vw,460px)] rounded-2xl border border-[#7fd4ff]/28 bg-[#071226]/92 p-4 shadow-[0_25px_90px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#7fd4ff]/35 bg-[#0d1d35]">
                <FolderOpen size={16} className="text-[#7fd4ff]" />
              </span>
              Opening file...
              <LoaderCircle size={14} className="ml-auto animate-spin text-[#7fd4ff]" />
            </div>

            <div className="relative mt-3 h-14 overflow-hidden rounded-xl border border-white/10 bg-[#0a1426]">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#7fd4ff]/35 to-transparent"
                animate={{ x: ["0%", "-110%"] }}
                transition={{ duration: 0.55, ease: "easeInOut", repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#7fd4ff]/35 to-transparent"
                animate={{ x: ["0%", "110%"] }}
                transition={{ duration: 0.55, ease: "easeInOut", repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.2em] text-white/65">
                ROUTE TRANSITION
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ scaleX: 0.08 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
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
