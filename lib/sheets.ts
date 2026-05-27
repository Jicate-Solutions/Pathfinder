import "server-only";

/**
 * Google Sheets writer (service-account auth).
 *
 * Appends lead rows to a target spreadsheet using a service account. This is
 * the only module that talks to the Sheets API; everything else goes through
 * the two exported functions below.
 *
 * getAuth() is intentionally the single, swappable auth boundary: today it
 * builds a service-account client from env vars, but an OAuth refresh-token
 * variant could be dropped in here without touching appendLeadRow /
 * ensureHeaderRow.
 */
import { google } from "googleapis";
import type { sheets_v4 } from "googleapis";
import { SHEET_HEADERS } from "./leads";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const DEFAULT_SHEET_NAME = "Leads";

/** Read a required env var or throw a clear, secret-free error. */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}. See ENV_SETUP.md.`,
    );
  }
  return value;
}

/** Spreadsheet target, resolved from env (sheet name defaults to "Leads"). */
function getTarget(): { spreadsheetId: string; sheetName: string } {
  return {
    spreadsheetId: requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID"),
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || DEFAULT_SHEET_NAME,
  };
}

/**
 * Build an authenticated client. Swappable boundary — to switch to OAuth,
 * replace the body here and return an equivalent auth client.
 *
 * The service-account private key is commonly stored with literal `\n`
 * sequences (e.g. when pasted into a single-line .env value); we restore real
 * newlines so the PEM parses.
 */
function getAuth() {
  const clientEmail = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(
    /\\n/g,
    "\n",
  );

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });
}

/** Memoized Sheets client so we authenticate once per process. */
let sheetsClient: sheets_v4.Sheets | null = null;

function getSheets(): sheets_v4.Sheets {
  if (!sheetsClient) {
    sheetsClient = google.sheets({ version: "v4", auth: getAuth() });
  }
  return sheetsClient;
}

/**
 * Append one row to the bottom of the target sheet.
 * Uses RAW input (no formula/number coercion) and INSERT_ROWS so existing
 * rows are never overwritten.
 */
export async function appendLeadRow(values: (string | number)[]): Promise<void> {
  const { spreadsheetId, sheetName } = getTarget();
  const sheets = getSheets();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
}

/**
 * Ensure the header row exists. Runs the read/write at most once per process:
 * if row 1 of the sheet is empty we write SHEET_HEADERS, otherwise we leave it
 * alone. Safe to call before every append.
 */
let headerEnsured = false;

export async function ensureHeaderRow(): Promise<void> {
  if (headerEnsured) return;

  const { spreadsheetId, sheetName } = getTarget();
  const sheets = getSheets();

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!1:1`,
  });

  const firstRow = existing.data.values?.[0];
  if (!firstRow || firstRow.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[...SHEET_HEADERS]],
      },
    });
  }

  headerEnsured = true;
}
