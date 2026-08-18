# YourGoingToBeOK — Symptom Tracker

A gentle, no-judgment perimenopause/wellness symptom tracker. Built as a PWA with:
- **Next.js** (App Router)
- **Supabase** — auth (magic link + Google/Apple) and the database, already live
- **Stripe** — $5.99/month subscription
- **Vercel** — hosting

## What's already done
- Supabase project `ygtbo-symptom-tracker` is live with `profiles` and `symptom_logs`
  tables, row-level security, and an auto-profile-creation trigger.
- The `.env.local.example` file already has your real Supabase URL and key filled in.

## To run locally
1. `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in the Stripe values
   (get these from your Stripe dashboard → Developers → API Keys, and
   Products → your $5.99/mo product → copy the Price ID).
3. `npm run dev`

## To deploy on Vercel
1. Push this folder to your GitHub repo (`lrittber59-creator`).
2. In Vercel, import that repo into your `yourgoingtobeok` team.
3. Add the same environment variables from `.env.local` in Vercel's Project
   Settings → Environment Variables.
4. Also add `SUPABASE_SERVICE_ROLE_KEY` (from Supabase → Project Settings → API
   → service_role key) — needed only for the Stripe webhook route to update
   subscription status server-side.
5. In Stripe, add a webhook endpoint pointing to
   `https://your-vercel-url.vercel.app/api/webhooks/stripe`, listening for
   `customer.subscription.created`, `.updated`, and `.deleted`. Copy the
   signing secret into `STRIPE_WEBHOOK_SECRET`.

## What's built
- `/login` — magic link + Google/Apple sign-in
- `/tracker` — daily mood/sleep/energy/hot-flash log + recent history
- `/subscribe` — Stripe checkout for the $5.99/mo tier
- Free tier is capped at the 5 most recent entries; subscribers see full history
