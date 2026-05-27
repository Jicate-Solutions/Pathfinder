/**
 * FROZEN DATA CONTRACT — shared interface between the frontend (form UI)
 * and backend (validation + Google Sheets writer) tracks.
 *
 * Do NOT change field names, option `value`s, or the sheet column order
 * without coordinating both tracks — the Google Sheet header row and the
 * <form> field `name`s must stay in lockstep.
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Option lists (bilingual). The `value` is what gets stored; `en`/`ta` are
// display labels chosen by the active language in the UI.
// ---------------------------------------------------------------------------

export type BilingualOption = {
  readonly value: string;
  readonly en: string;
  readonly ta: string;
};

/** Tamil Nadu HSC (+2) academic groups. */
export const PLUS_TWO_GROUPS = [
  { value: "bio-maths", en: "Biology with Maths", ta: "உயிரியல் - கணிதம்" },
  { value: "pure-science", en: "Pure Science (Physics-Chem-Bio)", ta: "தூய அறிவியல் (இயற்பியல்-வேதியியல்-உயிரியல்)" },
  { value: "computer-science", en: "Computer Science (Maths-CS)", ta: "கணினி அறிவியல் (கணிதம்-கணினி)" },
  { value: "commerce", en: "Commerce", ta: "வணிகவியல்" },
  { value: "arts", en: "Arts / Humanities", ta: "கலை / மானுடவியல்" },
  { value: "vocational", en: "Vocational", ta: "தொழிற்கல்வி" },
  { value: "other", en: "Other", ta: "மற்றவை" },
] as const satisfies readonly BilingualOption[];

/** JKKN Institutions program families + a free "Other" fallback. */
export const COURSES = [
  { value: "engineering", en: "Engineering & Technology (B.E./B.Tech)", ta: "பொறியியல் & தொழில்நுட்பம் (B.E./B.Tech)" },
  { value: "pharmacy", en: "Pharmacy (B.Pharm / D.Pharm / Pharm.D)", ta: "மருந்தியல் (B.Pharm / D.Pharm / Pharm.D)" },
  { value: "dental", en: "Dental Surgery (BDS)", ta: "பல் மருத்துவம் (BDS)" },
  { value: "nursing", en: "Nursing (B.Sc Nursing)", ta: "செவிலியர் படிப்பு (B.Sc Nursing)" },
  { value: "allied-health", en: "Allied Health Sciences", ta: "அநுசார் சுகாதார அறிவியல்" },
  { value: "physiotherapy", en: "Physiotherapy (BPT)", ta: "இயன்முறை மருத்துவம் (BPT)" },
  { value: "arts-science", en: "Arts & Science (UG / PG)", ta: "கலை & அறிவியல் (UG / PG)" },
  { value: "education", en: "Education (B.Ed)", ta: "ஆசிரியர் கல்வி (B.Ed)" },
  { value: "other", en: "Other / Not sure yet", ta: "மற்றவை / இன்னும் முடிவு செய்யவில்லை" },
] as const satisfies readonly BilingualOption[];

export const LANGUAGES = ["ta", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

// ---------------------------------------------------------------------------
// Validation schema (source of truth for both client hints and server guard).
// Indian mobile numbers: 10 digits beginning 6-9, optional +91 / 91 / 0 prefix
// which we strip before validating.
// ---------------------------------------------------------------------------

const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** Strip spaces, dashes, and a leading +91 / 91 / 0 so we validate 10 digits. */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s-]/g, "").replace(/^\+?91/, "").replace(/^0/, "");
  return digits;
}

const phoneField = z
  .string()
  .transform(normalizePhone)
  .refine((v) => INDIAN_MOBILE.test(v), {
    message: "Enter a valid 10-digit Indian mobile number.",
  });

const groupValues = PLUS_TWO_GROUPS.map((g) => g.value) as [string, ...string[]];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  phone: phoneField,
  // Interested course is a free-text field (no fixed list).
  course: z.string().trim().min(2, "Please enter a course of interest.").max(120),
  plusTwoGroup: z.enum(groupValues),
  // Free-text +2 group; only meaningful (and required) when the selected
  // plusTwoGroup is "other". The server enforces that requirement.
  plusTwoGroupOther: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((v) => v ?? ""),
  // Parents number is optional (the form offers a "Skip" toggle). An empty
  // string means skipped; any provided value must be a valid mobile number.
  parentPhone: z
    .union([z.literal(""), phoneField])
    .optional()
    .transform((v) => v ?? ""),
  language: z.enum(LANGUAGES).default("ta"),
});

/** Parsed + validated lead (what the server action works with). */
export type Lead = z.infer<typeof leadSchema>;

/** Field names used as <input name="..."> on the client. Single source of truth. */
export const FIELD = {
  name: "name",
  phone: "phone",
  course: "course",
  plusTwoGroup: "plusTwoGroup",
  plusTwoGroupOther: "plusTwoGroupOther",
  parentPhone: "parentPhone",
  language: "language",
} as const;

// ---------------------------------------------------------------------------
// Google Sheet shape. Header row order MUST match leadToRow() order.
// ---------------------------------------------------------------------------

export const SHEET_HEADERS = [
  "Timestamp",
  "Name",
  "Phone",
  "Interested Course",
  "+2 Group",
  "Parent Phone",
  "Language",
] as const;

/** Resolve an option `value` back to a human label (defaults to English for the sheet). */
function labelFor(options: readonly BilingualOption[], value: string): string {
  return options.find((o) => o.value === value)?.en ?? value;
}

/** Map a validated lead to a single spreadsheet row (column order = SHEET_HEADERS). */
export function leadToRow(lead: Lead, timestampIso: string): (string | number)[] {
  // +2 group: use the typed value when "Other" was chosen, else the label.
  const plusTwoGroup =
    lead.plusTwoGroup === "other" && lead.plusTwoGroupOther
      ? lead.plusTwoGroupOther
      : labelFor(PLUS_TWO_GROUPS, lead.plusTwoGroup);
  return [
    timestampIso,
    lead.name,
    lead.phone,
    lead.course,
    plusTwoGroup,
    lead.parentPhone || "—",
    lead.language,
  ];
}

/** Discriminated result returned by the server action to the client form. */
export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof Lead, string>> };
