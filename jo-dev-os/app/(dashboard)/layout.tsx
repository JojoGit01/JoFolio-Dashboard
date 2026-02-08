import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen text-[#E6EDF7] bg-[linear-gradient(135deg,#0B1220_0%,#0F1B2E_35%,#0B1220_100%)] overflow-hidden">
      {/* Soft highlights (subtil, comme le mockup) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_15%_15%,rgba(78,161,255,0.08),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(124,92,255,0.06),transparent_55)]" />

      {/* Vignette (bords plus sombres) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.65)_100%)]" />

      {/* Content */}
      <div className="relative grid h-full grid-cols-[260px_1fr]">
        {/* SIDEBAR */}
        <aside className="border-r border-[#223A5E] bg-[#111E34]/60 backdrop-blur-xl">
          <Sidebar />
        </aside>

        {/* RIGHT SIDE */}
        <div className="flex h-full flex-col">
          {/* TOPBAR */}
          <div className="p-6">
            <Topbar />
          </div>

          {/* SCROLL AREA */}
          <main className="flex-1 overflow-y-auto px-6 pb-10 pt-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
