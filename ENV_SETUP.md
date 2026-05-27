# Environment Setup — Google Sheets Lead Capture

The roadshow lead form appends each submission as a row in a Google Sheet. It
authenticates with a **service account** (a non-human Google identity), so no
one has to log in and no OAuth consent screen is involved.

This guide covers the active service-account path. An OAuth refresh-token
fallback is documented at the end.

All values below go in `.env.local` at the project root. That file is git-ignored
(`.gitignore` ignores `.env*`), so your real secrets are never committed.

---

## 1. Create a service account and enable the Sheets API

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and select
   an existing project or create a new one (e.g. `jkkn-roadshow`).
2. Enable the API: go to **APIs & Services → Library**, search for
   **Google Sheets API**, and click **Enable**.
3. Create the account: **APIs & Services → Credentials → Create Credentials →
   Service account**. Give it a name like `roadshow-leads`, then **Create and
   continue**. You can skip the optional role and user-access steps — the
   service account only needs access to the one sheet, which you grant by
   sharing in step 3.
4. Open the new service account → **Keys** tab → **Add key → Create new key →
   JSON**. A `.json` key file downloads. Keep it private; treat it like a
   password.

## 2. Put the credentials into `.env.local`

Open the downloaded JSON. It contains, among other fields:

```json
{
  "client_email": "roadshow-leads@jkkn-roadshow.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
}
```

Copy them into `.env.local`:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL` ← the `client_email` value.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` ← the `private_key` value.

**About the `\n` escaping:** in the JSON file the private key is a single line
with literal `\n` sequences standing in for line breaks. Paste it exactly as-is
(including those `\n`) and wrap the whole value in double quotes:

```bash
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

The app converts the literal `\n` back into real newlines at runtime
(`lib/sheets.ts`), so the PEM key parses correctly. Do **not** manually expand
the newlines yourself.

## 3. Create the target sheet and share it with the service account

1. Create a new Google Sheet (e.g. "Roadshow 2026 Leads"). The header row is
   written automatically on the first submission — you don't need to add it.
2. Click **Share**, paste the service account's email
   (`GOOGLE_SERVICE_ACCOUNT_EMAIL`), set the role to **Editor**, and send. This
   step is required: without it the service account cannot write and the form
   submission will fail.

## 4. Copy the spreadsheet ID

The ID is the long token in the sheet's URL:

```
https://docs.google.com/spreadsheets/d/1AbC...XYZ/edit#gid=0
                                       └──── this part ────┘
```

Set it as `GOOGLE_SHEETS_SPREADSHEET_ID`. Optionally set
`GOOGLE_SHEETS_SHEET_NAME` to the tab name you want to append to; it defaults to
`Leads` if unset.

## 5. Verify

Restart the dev server (`npm run dev`) so the new env vars load, then submit the
form once. A new row should appear in the sheet, with the header row written on
the first submission.

---

## Quick reference

| Variable | Source | Required |
| --- | --- | --- |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Sheet URL | Yes |
| `GOOGLE_SHEETS_SHEET_NAME` | Tab name (defaults to `Leads`) | No |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | JSON key `client_email` | Yes |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | JSON key `private_key` (keep `\n`, quote it) | Yes |

## Fallback: OAuth refresh token (inactive)

The active path is the service account above. If you ever need to write as a
real Google user instead, the `.env.local` template includes commented-out
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_OAUTH_REFRESH_TOKEN`
variables. To switch, swap the implementation of `getAuth()` in `lib/sheets.ts`
to build an OAuth2 client from those values — that function is intentionally the
single auth boundary, so nothing else in the module needs to change.

## Troubleshooting

- **`Missing required environment variable: ...`** — the named var is unset or
  empty in `.env.local`; check spelling and restart the dev server.
- **403 / "The caller does not have permission"** — you didn't share the sheet
  with the service-account email (step 3), or shared with the wrong address.
- **`error:0909006C` / PEM / "invalid key"** — the private key newlines are
  wrong. Make sure you kept the literal `\n` and wrapped the value in quotes; do
  not pre-expand the newlines.
- **404 / spreadsheet not found** — `GOOGLE_SHEETS_SPREADSHEET_ID` is wrong;
  copy only the ID portion from the URL (not the whole link).
