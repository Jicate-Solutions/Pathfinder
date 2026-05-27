"use client";

/**
 * Hero PITCH — the left column of the split hero. Concise on purpose: the
 * registration form sits beside it (right column), so this just sets context —
 * eyebrow, headline with a yellow highlight on the accent word, a one-line
 * "who it's for", and the event meta chips. No CTA here; the form is the CTA.
 */
import { useT } from "../language-provider";

export function Hero() {
  const t = useT();

  return (
    <div className="text-center lg:text-left">
      <div
        className="hero-in flex flex-wrap items-center justify-center gap-2 lg:justify-start"
        style={{ ["--d" as string]: "0.05s" }}
      >
        <OrgBadge>{t.orgs.jkkn}</OrgBadge>
        <OrgBadge>{t.orgs.cdc}</OrgBadge>
        <OrgBadge>{t.orgs.yi}</OrgBadge>
      </div>

      <p
        className="hero-in mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-green sm:text-sm"
        style={{ ["--d" as string]: "0.16s" }}
      >
        {t.hero.eventType}
      </p>

      <h1
        className="hero-in font-display mt-2.5 text-[clamp(2rem,4.6vw,3.4rem)] font-black leading-[1.05] tracking-[-0.015em] text-ink"
        style={{ ["--d" as string]: "0.28s" }}
      >
        {t.hero.titleLead}
        <span className="ink-underline text-green">{t.hero.titleAccent}</span>
        {t.hero.titleTail}
      </h1>

      <p
        className="hero-in mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft lg:mx-0 lg:text-lg"
        style={{ ["--d" as string]: "0.4s" }}
      >
        {t.who.text}
      </p>

      <div
        className="hero-in mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
        style={{ ["--d" as string]: "0.52s" }}
      >
        <MetaChip icon="📅" label={t.details.date.value} />
        <MetaChip icon="🕥" label={t.details.time.value} />
        <MetaChip icon="📍" label={t.details.venue.value} />
      </div>
    </div>
  );
}

function OrgBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-card/70 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-soft backdrop-blur-sm">
      {children}
    </span>
  );
}

function MetaChip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-semibold text-ink shadow-sm">
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}
