export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-64 rounded-xl bg-[#16263F]/70 animate-pulse" />
      <div className="h-24 rounded-2xl bg-[#16263F]/70 animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 rounded-2xl bg-[#16263F]/70 animate-pulse" />
        <div className="h-24 rounded-2xl bg-[#16263F]/70 animate-pulse" />
        <div className="h-24 rounded-2xl bg-[#16263F]/70 animate-pulse" />
        <div className="h-24 rounded-2xl bg-[#16263F]/70 animate-pulse" />
      </div>
    </div>
  );
}
