"use server";

/**
 * Server Action for the roadshow lead form.
 *
 * Signature is compatible with React's `useActionState`:
 *   const [state, action, pending] = useActionState(submitLead, initialState)
 *
 * Flow: read FormData -> validate with leadSchema -> map any zod issues to
 * per-field errors -> append a row to Google Sheets. Sheet/auth failures are
 * logged server-side and surfaced to the client as a generic, secret-free
 * message.
 */
import {
  FIELD,
  leadSchema,
  leadToRow,
  type Lead,
  type SubmitResult,
} from "@/lib/leads";
import { appendLeadRow, ensureHeaderRow } from "@/lib/sheets";

const GENERIC_ERROR =
  "Sorry, we couldn't submit your details right now. Please try again in a moment.";

export async function submitLead(
  _prevState: SubmitResult | null,
  formData: FormData,
): Promise<SubmitResult> {
  // Pull raw values by their canonical field names. FormData.get returns
  // string | File | null; coerce to strings for validation.
  const raw = {
    name: formData.get(FIELD.name),
    phone: formData.get(FIELD.phone),
    course: formData.get(FIELD.course),
    plusTwoGroup: formData.get(FIELD.plusTwoGroup),
    plusTwoGroupOther: formData.get(FIELD.plusTwoGroupOther) ?? "",
    parentPhone: formData.get(FIELD.parentPhone) ?? "",
    language: formData.get(FIELD.language) ?? undefined,
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof Lead, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Lead | undefined;
      // Keep the first message per field.
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      ok: false,
      error: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // Cross-field rule: choosing "Other" for the +2 group requires a typed value.
  if (parsed.data.plusTwoGroup === "other" && parsed.data.plusTwoGroupOther.length < 2) {
    return {
      ok: false,
      error: "Please correct the highlighted fields and try again.",
      fieldErrors: { plusTwoGroupOther: "Please specify your +2 group." },
    };
  }

  try {
    const row = leadToRow(parsed.data, new Date().toISOString());
    await ensureHeaderRow();
    await appendLeadRow(row);
  } catch (err) {
    // Log the real error server-side only; never return it to the client.
    console.error("submitLead: failed to append lead to Google Sheets", err);
    return { ok: false, error: GENERIC_ERROR };
  }

  return { ok: true };
}
