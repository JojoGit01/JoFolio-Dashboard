export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#223A5E] bg-[#16263F]/60 p-6">
        <div className="text-3xl font-bold">👋 Hey, I’m Jo</div>
        <p className="mt-2 text-[#9FB3D1]">
          I build web & mobile apps with React, Node & React Native.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#223A5E] bg-[#16263F]/60 p-5">My Projects</div>
        <div className="rounded-2xl border border-[#223A5E] bg-[#16263F]/60 p-5">My Skills</div>
        <div className="rounded-2xl border border-[#223A5E] bg-[#16263F]/60 p-5">My Experience</div>
        <div className="rounded-2xl border border-[#223A5E] bg-[#16263F]/60 p-5">Contact Me</div>
      </div>
    </div>
  );
}
