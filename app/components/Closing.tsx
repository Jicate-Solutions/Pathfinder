"use client";

/** Warm sign-off footer beneath the registration section. */
import { useT } from "../language-provider";

export function Closing() {
  const t = useT();

  return (
    <footer className="relative z-10 mt-8 border-t border-line px-6 py-14 text-center">
      <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
        {t.closing.welcomeLead}
        <span className="ink-underline text-green">{t.closing.welcomeAccent}</span>
      </p>
      <p className="mt-5 text-xs leading-relaxed text-ink-soft">
        {t.closing.signOffLead}
        <br />
        <strong className="font-semibold text-ink">{t.closing.signOffOrg}</strong>
      </p>
    </footer>
  );
}
