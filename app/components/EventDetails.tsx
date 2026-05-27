"use client";

/**
 * Event details as a light boarding-pass "ticket": a main panel (date / time /
 * venue) and a torn-off stub (ADMIT ONE · free · enquiries) separated by a
 * perforated edge with cut-out notches. Echoes the "reserve your seat" idea.
 */
import { useT } from "../language-provider";

export function EventDetails() {
  const t = useT();
  const rows = [
    { emoji: "📅", ...t.details.date },
    { emoji: "🕥", ...t.details.time },
    { emoji: "📍", ...t.details.venue },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-card shadow-[0_20px_50px_-24px_rgba(11,109,65,0.4)]">
      <div className="h-1.5 bg-gradient-to-r from-green via-yellow to-green" />

      <div className="flex flex-col md:flex-row">
        {/* Main panel */}
        <div className="grid flex-1 grid-cols-1 gap-6 p-7 sm:grid-cols-3 sm:p-9">
          {rows.map((row) => (
            <div key={row.label} className="text-center sm:text-left">
              <span className="mb-3 block text-2xl" aria-hidden>
                {row.emoji}
              </span>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink-soft/70">
                {row.label}
              </p>
              <p className="font-display mt-1 text-xl font-bold leading-tight text-ink">
                {row.value}
              </p>
              <p className="mt-0.5 text-[0.72rem] text-ink-soft">{row.note}</p>
            </div>
          ))}
        </div>

        {/* Perforated divider with cut-out notches. */}
        <div className="relative md:w-px">
          <span className="ticket-notch -top-2.5 left-1/2 -translate-x-1/2 md:left-1/2 md:top-0 md:-translate-y-1/2" />
          <div className="mx-7 border-t border-dashed border-line md:mx-0 md:h-full md:border-l md:border-t-0" />
          <span className="ticket-notch -bottom-2.5 left-1/2 -translate-x-1/2 md:bottom-0 md:left-1/2 md:top-auto md:translate-y-1/2" />
        </div>

        {/* Tear-off stub */}
        <div className="flex flex-col items-center justify-center gap-1.5 bg-paper-2/70 p-7 text-center md:w-52 md:p-8">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-green">
            {t.ticket.admit}
          </p>
          <p className="font-display text-2xl font-black text-ink">{t.ticket.free}</p>
          <div className="mt-3 w-full border-t border-line pt-3">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-ink-soft/70">
              {t.contact.label}
            </p>
            <a
              href={`mailto:${t.contact.email}`}
              className="mt-1 block break-all text-xs font-semibold text-green hover:underline"
            >
              {t.contact.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
