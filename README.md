# Agrilink Global / DAMAKASU Website

React + TypeScript + Vite website for DAMAKASU MULTI-LINK INVESTMENT LTD.

## Primary Hosting: Hostinger

This project is prepared for Hostinger shared hosting / cPanel. Build the site locally, then upload the production files to Hostinger's `public_html` folder.

Recommended Hostinger flow:

1. Run `npm install`.
2. Add your `.env` values locally.
3. Run `npm run package:hostinger`.
4. Upload `hostinger-upload.zip` to Hostinger File Manager.
5. Open `public_html`.
6. Extract the zip inside `public_html`.
7. Confirm these files are directly inside `public_html`: `index.html`, `.htaccess`, `assets/`, `damakasu.png`.
8. Test `/`, `/about`, `/products`, `/services`, `/contact`, and `/admin`.

Do not upload the whole project folder to `public_html`. Upload only the built files from `dist`, or use `hostinger-upload.zip`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run package:hostinger
```

What the commands do:

- `npm run dev` starts the local development site.
- `npm run build` creates the production website in `dist`.
- `npm run package:hostinger` creates `hostinger-upload.zip` for Hostinger upload.

## Hostinger Architecture

- `src/` contains the editable React website.
- `public/` contains files copied directly into production.
- `public/.htaccess` handles Hostinger/Apache routing for React pages.
- `dist/` is the generated production website.
- `hostinger-upload.zip` is the upload package for Hostinger.

The app uses React Router, so direct links like `/about` need Apache to serve `index.html`. The `.htaccess` file does that.

## Environment Variables

Copy `.env.example` to `.env` locally and fill in the real values before building.

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_RECAPTCHA_SITE_KEY=
```

Important for Hostinger: because this is a static Vite website, `VITE_` variables are baked into the site during build. If you change `.env`, run `npm run package:hostinger` again and re-upload the new zip.

Never put private server keys in `VITE_` variables. Only public browser-safe values should use `VITE_`.

## Optional: Vercel

Vercel can still host this app if needed. Use:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Hostinger remains the primary deployment target for this project.

## Notes

- If Hostinger shows a 404 on `/about` or `/contact`, check that `.htaccess` was uploaded. Some file managers hide dotfiles.
- If images or styles are missing, make sure the contents of `dist` were uploaded directly into `public_html`, not inside a nested `dist` folder.
- If the contact/admin features fail, rebuild with the correct Supabase and reCAPTCHA environment values.

## Supabase (contact form + admin dashboard)

1. Create a Supabase project and run `supabase/schema.sql` in the SQL Editor.
2. Put the project URL and anon/publishable key in `.env`, then rebuild.
3. Deploy the form handler: `npx supabase login`, `npx supabase link --project-ref <ref>`,
   `npx supabase functions deploy submit-quote`.
4. Set Edge Function secrets (Dashboard > Edge Functions > Secrets): `RESEND_API_KEY`, `RESEND_FROM`,
   `RECAPTCHA_SECRET_KEY`, `COMPANY_EMAIL`, and optionally `ALLOWED_ORIGINS`.
5. Create an admin: Authentication > Users > Add user, then add that user to `public.admin_users`
   (the exact SQL is at the end of `supabase/schema.sql`). Turn off public sign-ups under
   Authentication > Sign In / Providers.

The admin dashboard at `/admin` signs in with that Supabase Auth account. Row Level Security
allows only users in `admin_users` to read, update the status of, or delete quote requests.
