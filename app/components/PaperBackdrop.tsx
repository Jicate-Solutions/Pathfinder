/**
 * Light, CSS-only backdrop for the editorial theme: two soft floating accent
 * shapes plus a faint paper grain. Deterministic (no random values) so it
 * server-renders and hydrates identically. Purely decorative.
 */
export function PaperBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="animate-float absolute -left-24 top-24 h-72 w-72 rounded-full bg-green/10 blur-3xl" />
      <div
        className="animate-float absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-yellow/25 blur-3xl"
        style={{ animationDelay: "2.5s" }}
      />
      <div className="grain" />
    </div>
  );
}
