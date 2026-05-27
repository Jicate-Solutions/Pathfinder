"use client";

/** "What we'll cover" — three workshop topics as light, indexed editorial cards. */
import { useT } from "../language-provider";
import { Reveal } from "./Reveal";

export function Topics() {
  const t = useT();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {t.topics.items.map((item, i) => (
        <Reveal
          key={item.text}
          delay={i * 110}
          className="group relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_18px_40px_-18px_rgba(11,109,65,0.35)]"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-3xl" aria-hidden>
              {item.icon}
            </span>
            <span className="font-display text-2xl font-black text-line transition-colors group-hover:text-green/40">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-5 text-[0.95rem] font-medium leading-snug text-ink">
            {item.text}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
