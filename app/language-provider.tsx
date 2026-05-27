"use client";

/**
 * Client-side language context for the bilingual landing page.
 *
 * Holds the active language (default "ta" per the event's Tamil-primary
 * design), persists the choice to localStorage, and exposes:
 *   - useLanguage(): { language, setLanguage }
 *   - useT(): the active dictionary slice (Dictionary)
 *
 * Rendered from app/layout.tsx wrapping {children} so every component below
 * can read the active language.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { dict, type Dictionary } from "@/lib/dictionary";
import { LANGUAGES, type Language } from "@/lib/leads";

const STORAGE_KEY = "roadshow.language";
const DEFAULT_LANGUAGE: Language = "ta";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // Restore a previously chosen language after mount (localStorage is
  // client-only, so we read it in an effect to avoid hydration mismatches).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLanguage(stored)) {
        setLanguageState(stored);
      }
    } catch {
      // Ignore unavailable / blocked storage — fall back to the default.
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persisting is best-effort; the in-memory choice still applies.
    }
    // Keep the document language attribute in sync for a11y / screen readers.
    document.documentElement.lang = next;
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Read the active language and its setter. Must be used under LanguageProvider. */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook returning the active language's dictionary slice. */
export function useT(): Dictionary {
  const { language } = useLanguage();
  return dict[language];
}
