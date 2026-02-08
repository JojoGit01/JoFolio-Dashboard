import { Mail, Linkedin, Github, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mt-2">
      <div className="max-w-4xl">
        <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
          Dispo pour CDI ou missions freelance ambitieuses.
          <br />
          Contactez-moi pour échanger sur votre projet, votre équipe et vos besoins
          techniques.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <NeonCard
          icon={<Mail size={26} className="text-[#FFD57E]" />}
          title="Email"
          value="jonathan.dimartino@email.com"
          cta="Envoyer un email"
          href="mailto:jonathan.dimartino@email.com"
        />

        <NeonCard
          icon={<Linkedin size={26} className="text-[#4EA1FF]" />}
          title="LinkedIn"
          value="linkedin.com/in/jo-dm"
          cta="Voir mon profil"
          href="#"
        />

        <NeonCard
          icon={<Github size={26} className="text-white/85" />}
          title="GitHub"
          value="github.com/jo-dm"
          cta="Voir mon GitHub"
          href="#"
        />
      </div>

      <div className="mt-12 max-w-xl">
        <NeonBox>
          <div className="flex items-center gap-2 text-white/85">
            <MapPin size={18} className="text-[#34D399]" />
            <div className="text-lg font-semibold">Localisation</div>
          </div>
          <div className="mt-3 text-sm text-white/65">France (Côte d’Azur)</div>
        </NeonBox>
      </div>
    </div>
  );
}

/* =========================
   Mockup Neon Card
   ========================= */

function NeonCard({
  icon,
  title,
  value,
  cta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  cta: string;
  href: string;
}) {
  return (
    <a href={href} className="relative block">
      {/* OUTER HALO (only around border) */}
      <div className="pointer-events-none absolute -inset-[10px] rounded-[36px] opacity-10 blur-[18px]
        bg-[radial-gradient(circle_at_50%_50%,rgba(110,190,255,0.35),transparent_62%)]" />

      {/* GRADIENT FRAME (thin) */}
      <div className="pointer-events-none absolute -inset-[1px] rounded-[30px]
        bg-[linear-gradient(135deg,rgba(150,220,255,0.20),rgba(90,150,255,0.55),rgba(180,140,255,0.18))] opacity-10" />

      {/* CARD BODY (dark, transparent, not blue) */}
      <div className="relative overflow-hidden rounded-[28px]
        border border-white/10
        bg-[rgba(8,12,24,0.22)]
        backdrop-blur-[18px]
        shadow-[0_24px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.10)]
        p-7">

        {/* subtle shine */}
        <div className="pointer-events-none absolute -left-20 -top-24 h-60 w-96 rotate-[10deg]
          rounded-full bg-white/10 blur-3xl opacity-20" />

        {/* icon bubble */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl
          border border-white/12 bg-black/25">
          {icon}
        </div>

        {/* text */}
        <div className="mt-5 text-center">
          <div className="text-2xl font-semibold tracking-tight text-white/90">
            {title}
          </div>
          <div className="mt-2 text-sm text-white/60">{value}</div>
        </div>

        {/* CTA bar (also dark & transparent) */}
        <div className="mt-6 rounded-2xl border border-white/10
          bg-[rgba(0,0,0,0.22)]
          px-4 py-3 text-center text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            {cta}
            <ArrowRight size={16} className="opacity-70" />
          </span>
        </div>
      </div>
    </a>
  );
}

function NeonBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-[10px] rounded-[36px] opacity-0 blur-[18px]
        bg-[radial-gradient(circle_at_50%_50%,rgba(110,190,255,0.28),transparent_62%)]" />

      <div className="pointer-events-none absolute -inset-[1px] rounded-[30px]
        bg-[linear-gradient(135deg,rgba(150,220,255,0.18),rgba(90,150,255,0.50),rgba(180,140,255,0.15))] opacity-0" />

      <div className="relative overflow-hidden rounded-[28px]
        border border-white/10
        bg-[rgba(8,12,24,0.20)]
        backdrop-blur-[18px]
        shadow-[0_20px_60px_rgba(0,0,0,0.50),inset_0_1px_0_rgba(255,255,255,0.10)]
        p-6">
        <div className="pointer-events-none absolute -left-20 -top-24 h-52 w-96 rotate-[10deg]
          rounded-full bg-white/10 blur-3xl opacity-18" />
        {children}
      </div>
    </div>
  );
}
