# Aquaris Admin — Next.js

MSME Business Directory Admin Dashboard, converted from React + Vite (Lovable) to **Next.js 14 App Router** with TypeScript.

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **@tanstack/react-query** for data fetching
- **react-dropzone** for file uploads
- **Mock API layer** in `lib/api/` — swap for real Prisma/fetch calls when backend is ready

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
DATABASE_URL=postgresql://...   # Neon connection string (pooler URL)
NEXTAUTH_SECRET=...             # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=/api
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Sign in

Use any email + any password on the sign-in page. The mock auth accepts anything except emails containing `"pending"` (which shows the pending approval modal).

---

## Project Structure

```
msme-admin-nextjs/
├── app/
│   ├── (auth)/                  # Public auth pages (no sidebar)
│   │   ├── sign-in/page.tsx
│   │   ├── set-password/page.tsx
│   │   ├── account-created/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (admin)/                 # Protected admin pages (with sidebar)
│   │   ├── layout.tsx           # AdminLayout wrapper
│   │   ├── page.tsx             # Dashboard overview  /
│   │   ├── msmes/
│   │   │   ├── page.tsx         # MSME list           /msmes
│   │   │   └── [id]/page.tsx    # MSME detail         /msmes/:id
│   │   ├── messages/page.tsx    # Messages            /messages
│   │   ├── team/page.tsx        # Team management     /team
│   │   └── settings/page.tsx    # Settings            /settings
│   ├── globals.css
│   ├── layout.tsx               # Root layout with Providers
│   └── not-found.tsx
├── components/
│   ├── auth/
│   │   ├── AuthContext.tsx       # Auth state (localStorage + cookie)
│   │   ├── AuthLayout.tsx        # Centered card layout for auth pages
│   │   ├── AccountCard.tsx
│   │   ├── LogoutModal.tsx
│   │   └── PendingApprovalModal.tsx
│   ├── msmes/
│   │   ├── ArchiveModal.tsx
│   │   ├── StatusBadge.tsx
│   │   └── UploadMsmesModal.tsx
│   ├── overview/
│   │   └── StatCard.tsx
│   ├── ui/                      # shadcn/ui components (49 files)
│   ├── AdminLayout.tsx
│   ├── AppSidebar.tsx
│   ├── Providers.tsx
│   └── TopBar.tsx
├── data/
│   ├── msmes.ts                 # Mock MSME data
│   ├── messages.ts              # Mock conversation data
│   └── team.ts                  # Mock team member data
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── api/
│   │   ├── client.ts            # mockRequest / mockReject helpers
│   │   ├── AuthApi.ts
│   │   ├── MsmeManagementApi.ts
│   │   └── index.ts
│   └── utils.ts                 # cn() helper
├── public/
│   ├── aquaris-logo.png
│   └── brand-textiles.jpg
├── middleware.ts                 # Route protection (cookie-based)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Connecting the Real Backend

All data fetching is isolated in `lib/api/`. When your Neon + Prisma backend is ready:

1. Replace `mockRequest(data)` in each API function with a real `fetch()` call
2. Install Prisma: `npm install prisma @prisma/client`
3. Copy `prisma/schema.prisma` from the user app (do **not** run `prisma migrate` — only `prisma generate`)
4. Create `lib/prisma.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

5. Create API route handlers in `app/api/` using Prisma for real queries

---

## Key Differences from the Vite Version

| Vite + React Router | Next.js App Router |
|---|---|
| `react-router-dom` `<Link>` | `next/link` `<Link>` |
| `useNavigate()` | `useRouter()` from `next/navigation` |
| `useParams()` from react-router | `useParams()` from `next/navigation` |
| `useLocation()` | `usePathname()` from `next/navigation` |
| `ProtectedRoute` component | `middleware.ts` (server-side) |
| `src/pages/` directory | `app/(admin)/` route group |
| `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |
| `import img from "@/assets/img.png"` | `/img.png` from `public/` folder |
| `NavLink` with `activeClassName` | `usePathname()` + conditional `cn()` |
| Vite `index.html` entry | `app/layout.tsx` root layout |
| `BrowserRouter` + `Routes` | File-based routing (no config needed) |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (Neon pooler URL)
   - `NEXTAUTH_SECRET`
4. Deploy — `NEXTAUTH_URL` is set automatically by Vercel

> **Important:** Never run `prisma migrate` from this project. Migrations are managed by the user-facing app.
