"use client";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import RouteFileTransition from "../components/layout/RouteFileTransition";
import CustomCursor from "../components/layout/CustomCursor";
import DashboardMainScroll from "../components/layout/DashboardMainScroll";
import MobileBottomTabs from "../components/layout/MobileBottomTabs";
import DashboardBootLoader from "../components/layout/DashboardBootLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen min-h-[100dvh] w-full overflow-hidden bg-[#0B1220] text-[#E6EDF7]">
      <RouteFileTransition />
      <DashboardBootLoader />
      <CustomCursor />

      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/images/bg-dashboard.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.70)_100%)]" />

      <div className="relative grid h-full min-h-0 grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden overflow-hidden border-r border-[#223A5E] bg-[#111E34]/60 backdrop-blur-xl lg:block">
          <Sidebar />
        </aside>

        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="shrink-0 px-3 pb-0 pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-4 sm:pt-4 lg:p-6">
            <Topbar />
          </div>

          <DashboardMainScroll>{children}</DashboardMainScroll>
        </div>
      </div>

      <MobileBottomTabs />
    </div>
  );
}
