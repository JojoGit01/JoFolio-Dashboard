import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import RouteFileTransition from "../components/layout/RouteFileTransition";
import CustomCursor from "../components/layout/CustomCursor";
import DashboardMainScroll from "../components/layout/DashboardMainScroll";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0B1220] text-[#E6EDF7]">
      <RouteFileTransition />
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

      <div className="relative grid h-full min-h-0 grid-cols-[260px_1fr]">
        <aside className="overflow-hidden border-r border-[#223A5E] bg-[#111E34]/60 backdrop-blur-xl">
          <Sidebar />
        </aside>

        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="shrink-0 p-6">
            <Topbar />
          </div>

          <DashboardMainScroll>{children}</DashboardMainScroll>
        </div>
      </div>
    </div>
  );
}
