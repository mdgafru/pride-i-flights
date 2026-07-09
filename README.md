# Pride-i-Flights

## Stack
- **App**: Next.js (App Router) + Tailwind CSS + Supabase SSR/Auth/DB

## Project Structure
```
pride-i-flights/
├── frontend/                  # Next.js app
│   └── src/
│       ├── app/               # App Router pages
│       ├── components/ui/     # Reusable UI components
│       ├── hooks/             # Custom React hooks (useAuth, etc.)
│       ├── lib/               # Supabase client helpers
│       └── types/             # Shared TypeScript types
```

## Setup

### 1. Supabase
- Create a project at https://supabase.com
- Copy your `URL` and `anon key`

### 2. Frontend
```bash
cd frontend
cp .env.local.example .env.local   # fill in your Supabase keys
npm run dev
```

Frontend: http://localhost:3000
