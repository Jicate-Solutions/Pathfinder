"use client";

/**
 * Career Guidance Workshop 2026 — light editorial landing page.
 *
 * Split hero puts the registration form front-and-centre: a concise pitch on
 * the left and the prominent form card on the right (above the fold on desktop,
 * right after a short intro on mobile). Topics + event details follow as
 * supporting content. All copy is bilingual via useT().
 */
import Image from "next/image";
import { PaperBackdrop } from "./components/PaperBackdrop";
import { Hero } from "./components/Hero";
import { Topics } from "./components/Topics";
import { EventDetails } from "./components/EventDetails";
import { LeadForm } from "./components/LeadForm";
import { Closing } from "./components/Closing";
import { Reveal } from "./components/Reveal";
import { LanguageToggle } from "./language-toggle";
import { useT } from "./language-provider";

export default function Home() {
  const t = useT();

  return (
    <>
      <PaperBackdrop />

      {/* Sticky top bar: wordmark + language toggle. */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Image
            src="/jkkn-logo.png"
            alt="JKKN Institutions"
            width={500}
            height={500}
            priority
            className="h-9 w-auto"
          />
          <LanguageToggle />
        </div>
      </header>

      <main className="relative z-10">
        {/* Split hero — concise pitch + the prominent registration form. */}
        <section className="mx-auto max-w-6xl px-6 pb-14 pt-8 sm:pt-12 lg:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
            <Hero />
            <div id="register" className="scroll-mt-24">
              <Reveal>
                <LeadForm />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Supporting content below the fold. */}
        <div className="mx-auto w-full max-w-5xl px-6 pb-10">
          <section className="border-t border-line/70 py-12 sm:py-16">
            <Reveal>
              <SectionLabel n="01" label={t.topics.label} />
            </Reveal>
            <div className="mt-7">
              <Topics />
            </div>
          </section>

          <section className="border-t border-line/70 py-12 sm:py-16">
            <Reveal>
              <SectionLabel n="02" label={t.details.heading} />
            </Reveal>
            <Reveal delay={120} className="mt-7">
              <EventDetails />
            </Reveal>
          </section>
        </div>

        <Closing />
      </main>
    </>
  );
}

/** Editorial numbered section label: green index + a thin rule + the title. */
function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-sm font-black tracking-[0.1em] text-green">{n}</span>
      <span className="h-px w-10 bg-gradient-to-r from-green/50 to-transparent" />
      <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-ink-soft">{label}</h2>
    </div>
  );
}
