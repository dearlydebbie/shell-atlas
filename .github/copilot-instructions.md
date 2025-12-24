# Shell Atlas: AI Coding Guidelines

## Project Overview
"Under the Tortoise Moon: Shell Atlas" is a living archive of stories presented as an interactive night-sky tortoise shell. Built with Next.js 16, Supabase, GSAP animations, and Tailwind CSS. Features curated stories, community contributions (stories/proverbs/voice notes), and exhibit mode for installations.

## Architecture
- **Frontend**: Next.js App Router with TypeScript, client/server components
- **Backend**: Supabase (PostgreSQL + Storage) with Row Level Security
- **Styling**: Tailwind CSS with custom dark theme (slate/amber palette)
- **Animations**: GSAP for interactive elements (shell breathing, hover states)
- **Data Flow**: Curated stories in `src/lib/stories.ts`, user contributions in Supabase `contributions` table

## Key Components & Patterns

### Interactive Shell (`src/components/Shell.tsx`)
- SVG tortoise shell with 7 scutes representing curated stories
- Fetches approved contributions to render as twinkling stars around shell
- GSAP animations: breathing scutes, twinkling stars
- Click scute → navigate to `/stories/{slug}`

### Story Pages (`src/app/stories/[slug]/page.tsx`)
- Static generation using `generateStaticParams()` for all stories in `src/lib/stories.ts`
- Components: `StoryPlayer`, `StoryReflection`, `StoryTranscript`
- Layout: Dark theme with amber accents, serif fonts for titles

### Contribution System
- **Form** (`src/app/contribute/new/page.tsx`): Client component with `useActionState`
- **Action** (`src/app/contribute/actions.ts`): Server action handles file upload to Supabase Storage, inserts to DB with status 'pending'
- **Moderation** (`src/app/admin/`): Token-based auth, approve/reject/delete actions
- **Public View** (`src/app/sky/`): Grid of approved contributions, individual pages with signed URLs for audio

### Data Models
```typescript
// Curated stories (hardcoded)
interface Story {
  id: string;
  slug: string;
  title: string;
  transcript: string[];  // Array of paragraphs
  tags: string[];
  reflectionPrompt: string;
}

// User contributions (Supabase)
interface Contribution {
  type: 'story' | 'proverb' | 'voice';
  status: 'pending' | 'approved' | 'rejected';
  audio_path?: string;  // For voice type
  theme: string;  // From predefined list
}
```

## Developer Workflows

### Local Development
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

### Environment Setup
- Copy `env.example` to `.env.local`
- Required vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_TOKEN`
- Supabase: Run `supabase_schema.sql`, create private `contribution-audio` bucket

### Admin Access
- Navigate to `/admin`, enter `ADMIN_TOKEN` from env
- Moderates pending contributions: approve (sets `approved_at`), reject, or delete (removes audio file)

## Coding Conventions

### File Structure
- `src/app/` - App Router pages and API routes
- `src/components/` - Reusable components
- `src/lib/` - Utilities, types, Supabase clients
- Path aliases: `@/*` maps to `./src/*`

### Supabase Integration
- **Client** (`src/lib/supabase/client.ts`): Browser client for public reads/writes
- **Server** (`src/lib/supabase/server.ts`): SSR client with cookies, admin client with service role
- RLS policies: Public can read approved contributions, insert pending ones
- Storage: Private bucket for audio, use signed URLs for access

### Forms & Actions
- Use `useActionState` for client forms
- Server actions in `actions.ts` files for mutations
- File uploads: Validate size/type, upload to Supabase Storage, store path in DB

### Animations
- Import GSAP in client components
- Use `gsap.context()` for cleanup
- Common patterns: hover color changes, breathing/scaling effects

### Styling
- Tailwind utility classes
- Dark theme: `bg-slate-950`, `text-slate-100`, `text-amber-400` accents
- Responsive: Mobile-first with `md:` breakpoints
- Custom fonts: Serif for headings, sans for body

## Common Patterns

### Fetching Data
```typescript
// Server component - use server client
const supabase = await createClient();
const { data } = await supabase.from('contributions').select('*').eq('status', 'approved');

// Client component - use browser client
const supabase = createClient();
const { data } = await supabase.from('contributions').select('*');
```

### Audio Handling
```typescript
// Upload
const { error } = await supabase.storage.from('contribution-audio').upload(filePath, file);

// Signed URL for playback
const { data } = await supabase.storage.from('contribution-audio').createSignedUrl(path, 3600);
```

### Admin Checks
```typescript
// In server actions
const cookieStore = await cookies();
if (!cookieStore.get('admin_session')) return;
```

### Static Generation
```typescript
// For dynamic routes with known params
export function generateStaticParams() {
  return stories.map(story => ({ slug: story.slug }));
}
```

## Deployment
- Netlify: Build command `npm run build`, publish `.next`
- Environment variables in Netlify dashboard
- Domain: `shell-atlas.netlify.app` (placeholder in exhibit QR)

## Security Notes
- Admin routes protected by HTTP-only cookie
- RLS prevents unauthorized data access
- Audio files private, accessed via signed URLs
- File uploads validated on server side