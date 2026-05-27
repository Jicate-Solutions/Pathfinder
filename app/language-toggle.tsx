"use client";

/**
 * Segmented தமிழ் / English language control for the top of the page.
 * Reads/writes the active language via the LanguageProvider context.
 */
import { LANGUAGES, type Language } from "@/lib/leads";
import { dict } from "@/lib/dictionary";
import { useLanguage } from "./language-provider";

/** Display label for each language, taken from the dictionary toggle copy. */
const LABELS: Record<Language, string> = {
  ta: dict.ta.toggle.ta,
  en: dict.ta.toggle.en,
};

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const t = dict[language];

  return (
    <div
      role="group"
      aria-label={t.toggle.aria}
      className="inline-flex items-center gap-1 rounded-full border border-line bg-card/80 p-1 shadow-sm backdrop-blur-sm"
    >
      {LANGUAGES.map((lang) => {
        const active = lang === language;
        return (
          <button
            key={lang}
            type="button"
            aria-pressed={active}
            onClick={() => setLanguage(lang)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300",
              active
                ? "bg-green text-white shadow-[0_2px_12px_rgba(11,109,65,0.35)]"
                : "text-ink-soft hover:text-ink",
            ].join(" ")}
          >
            {LABELS[lang]}
          </button>
        );
      })}
    </div>
  );
}
