import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen text-[#E6EDF7] overflow-hidden bg-[#0B1220]">
      {/* ✅ Background image global */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/images/bg-dashboard.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ✅ Vignette (profondeur) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.70)_100%)]" />

      {/* Content */}
      <div className="relative grid h-full grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-[#223A5E] bg-[#111E34]/60 backdrop-blur-xl">
          <Sidebar />
        </aside>

        {/* Right side */}
        <div className="flex h-full flex-col">
          {/* Topbar */}
          <div className="p-6">
            <Topbar />
          </div>

          {/* Scroll area */}
          <main className="flex-1 overflow-y-auto px-6 pb-10 pt-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
