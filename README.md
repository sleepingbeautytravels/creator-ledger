# Creator Ledger

Creator Ledger is a minimal MVP web app for tracking creator income, expenses, and gifted value with Next.js, Tailwind CSS, and Supabase.

## Features

- Supabase email/password authentication
- Protected dashboard with current-month financial summary
- Transactions page with add form and month/type filters
- Supabase row-level security so each user only sees their own entries
- Calm, minimal UI with simple reusable components

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth and Postgres

## 1. Create a Supabase project

1. Create a new project in Supabase.
2. In the Supabase dashboard, enable email/password auth if it is not already enabled.
3. Open the SQL editor and run the SQL from [`supabase/migrations/001_creator_ledger.sql`](/Users/tessazhang/Documents/New project/supabase/migrations/001_creator_ledger.sql).
4. Copy your project URL and anon key from `Project Settings > API`.

## 2. Configure environment variables

1. Copy `.env.example` to `.env.local`.
2. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Install dependencies

```bash
npm install
```

## 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/`: routes, layouts, and server actions
- `components/`: reusable UI pieces
- `lib/supabase/`: Supabase browser/server/middleware clients
- `lib/transactions/`: server-side transaction queries
- `types/`: shared database and domain types
- `supabase/migrations/`: SQL schema and policies

## Notes

- New users may need to confirm their email depending on your Supabase auth settings.
- The dashboard totals include only the current month.
- Net profit is calculated as `income - expenses`.
