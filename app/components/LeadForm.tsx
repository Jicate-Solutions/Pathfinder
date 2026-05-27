"use client";

/**
 * Lead-capture form — the prominent focal point of the landing page (right
 * column of the split hero). Elevated white card with a yellow accent bar and
 * a green primary action so it draws the eye on the ivory canvas.
 *
 * Wiring: React 19 useActionState(submitLead, null) — submitLead is the Server
 * Action in app/actions.ts: (prevState: SubmitResult | null, formData) =>
 * Promise<SubmitResult>. <form action={formAction}> passes FormData; `pending`
 * drives the loading/disabled state. On { ok:true } we swap the form for a
 * thank-you panel; on { ok:false } we render fieldErrors inline.
 *
 * Field names + option lists are the frozen contract from lib/leads.ts.
 */
import { useActionState, useId, useState } from "react";
import { submitLead } from "@/app/actions";
import { FIELD, PLUS_TWO_GROUPS } from "@/lib/leads";
import { useLanguage, useT } from "../language-provider";

export function LeadForm() {
  const { language } = useLanguage();
  const t = useT();
  const [state, formAction, pending] = useActionState(submitLead, null);
  // Parent number shows by default (skip is opt-in): the workshop targets
  // students AND their parents, so we want parent numbers unless skipped.
  const [skipParent, setSkipParent] = useState(false);
  // Tracks the selected +2 group so we can reveal a free-text input for "Other".
  const [group, setGroup] = useState("");

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;
  const generalError =
    state && !state.ok && !state.fieldErrors ? state.error : undefined;

  if (state?.ok) {
    return (
      <section className="overflow-hidden rounded-3xl border border-green/25 bg-card px-6 py-12 text-center shadow-[0_30px_70px_-28px_rgba(11,109,65,0.45)]">
        <span className="mb-3 block text-5xl" aria-hidden>
          🎉
        </span>
        <h2 className="font-display mb-2 text-2xl font-bold text-green">
          {t.form.success.title}
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-soft">
          {t.form.success.body}
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-card shadow-[0_34px_80px_-30px_rgba(11,109,65,0.5)]">
      {/* Yellow accent bar — a bright cue that this is the main action. */}
      <div className="h-2 bg-yellow" />

      <div className="px-6 py-7 sm:px-9 sm:py-9">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-[1.75rem]">
            {t.form.heading}
          </h2>
          <span className="rounded-full bg-yellow px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.1em] text-ink">
            {t.ticket.free}
          </span>
        </div>
        <p className="mb-6 mt-1.5 text-sm text-ink-soft">{t.form.intro}</p>

        <form action={formAction} className="flex flex-col gap-3.5" noValidate>
          {/* Active language travels with the submission. */}
          <input type="hidden" name={FIELD.language} value={language} />

          <Field name={FIELD.name} label={t.form.fields.name.label} error={fieldErrors?.name}>
            <input
              id={FIELD.name}
              name={FIELD.name}
              type="text"
              required
              autoComplete="name"
              placeholder={t.form.fields.name.placeholder}
              className={inputClass(!!fieldErrors?.name)}
            />
          </Field>

          <Field name={FIELD.phone} label={t.form.fields.phone.label} error={fieldErrors?.phone}>
            <input
              id={FIELD.phone}
              name={FIELD.phone}
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              maxLength={15}
              placeholder={t.form.fields.phone.placeholder}
              className={inputClass(!!fieldErrors?.phone)}
            />
          </Field>

          <Field name={FIELD.course} label={t.form.fields.course.label} error={fieldErrors?.course}>
            <input
              id={FIELD.course}
              name={FIELD.course}
              type="text"
              required
              placeholder={t.form.fields.course.placeholder}
              className={inputClass(!!fieldErrors?.course)}
            />
          </Field>

          <Field
            name={FIELD.plusTwoGroup}
            label={t.form.fields.plusTwoGroup.label}
            error={fieldErrors?.plusTwoGroup}
          >
            <select
              id={FIELD.plusTwoGroup}
              name={FIELD.plusTwoGroup}
              required
              defaultValue=""
              onChange={(e) => setGroup(e.target.value)}
              className={selectClass(!!fieldErrors?.plusTwoGroup)}
            >
              <option value="" disabled>
                {t.form.fields.plusTwoGroup.placeholder}
              </option>
              {PLUS_TWO_GROUPS.map((g) => (
                <option key={g.value} value={g.value}>
                  {language === "ta" ? g.ta : g.en}
                </option>
              ))}
            </select>
            {group === "other" && (
              <div className="mt-2">
                <input
                  id={FIELD.plusTwoGroupOther}
                  name={FIELD.plusTwoGroupOther}
                  type="text"
                  autoFocus
                  placeholder={t.form.fields.plusTwoGroupOther.placeholder}
                  className={inputClass(!!fieldErrors?.plusTwoGroupOther)}
                />
                {fieldErrors?.plusTwoGroupOther && (
                  <p className="mt-1 text-xs font-medium text-green">
                    {fieldErrors.plusTwoGroupOther}
                  </p>
                )}
              </div>
            )}
          </Field>

          {/* Parent's number is optional; when skipped we render no input, so an
              empty value is submitted (the server treats "" as skipped). */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor={FIELD.parentPhone} className={labelClass}>
                {t.form.fields.parentPhone.label}
                <span className="ml-2 text-[0.6rem] uppercase tracking-[0.12em] text-ink-soft/60">
                  {t.form.optional}
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-ink-soft">
                <input
                  type="checkbox"
                  checked={skipParent}
                  onChange={(e) => setSkipParent(e.target.checked)}
                  className="h-3.5 w-3.5 accent-green"
                />
                {t.form.skipParent}
              </label>
            </div>
            {!skipParent && (
              <>
                <input
                  id={FIELD.parentPhone}
                  name={FIELD.parentPhone}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={15}
                  placeholder={t.form.fields.parentPhone.placeholder}
                  className={inputClass(!!fieldErrors?.parentPhone)}
                />
                {fieldErrors?.parentPhone && (
                  <p className="text-xs font-medium text-green">{fieldErrors.parentPhone}</p>
                )}
              </>
            )}
          </div>

          {generalError && (
            <p
              role="alert"
              className="rounded-xl border border-green/40 bg-green/5 px-3 py-2 text-sm text-green"
            >
              {generalError}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-1.5 rounded-full bg-green px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-10px_rgba(11,109,65,0.7)] transition-all hover:-translate-y-0.5 hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {pending ? t.form.submitting : t.form.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

const labelClass = "text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ink-soft";

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-green/30",
    hasError ? "border-green/70 bg-green/[0.04]" : "border-line focus:border-green/60",
  ].join(" ");
}

function selectClass(hasError: boolean): string {
  return `${inputClass(hasError)} appearance-none`;
}

/** Labelled field wrapper that renders an inline error when present. */
function Field({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-xs font-medium text-green">
          {error}
        </p>
      )}
    </div>
  );
}
