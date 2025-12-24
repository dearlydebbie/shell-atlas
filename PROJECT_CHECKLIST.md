## Project Checklist: Under the Tortoise Moon - Shell Atlas

### 1. Product Spec
- [x] **Home**: Night-sky landing with SVG Shell (7 scutes).
- [x] **Stories**: 7 stories implemented with "Archive Card" structure.
- [x] **Contribution Model**: 3 types (Story, Proverb, Voice) with specific constraints.
- [x] **Exhibit Mode**: `/exhibit` and `/exhibit/remote` implemented.
- [x] **Ethics**: About, Rules, and Privacy pages created.

### 2. Visuals & Interaction
- [x] **Shell**: Interactive SVG with hover states and breathing animation (GSAP).
- [x] **Night Sky**: Dark gradients and star motifs.
- [x] **Responsive**: Mobile-first design for all pages.

### 3. Data & Backend
- [x] **Supabase Schema**: `contributions` table with Enums and RLS policies.
- [x] **Storage**: `contribution-audio` bucket integration ready.
- [x] **Security**: Public `insert` (pending), Admin `update`/`delete`.

### 4. Admin & Moderation
- [x] **Dashboard**: Protected route `/admin` with token login.
- [x] **Moderation**: Approve/Reject/Delete actions working.
- [x] **Audio**: Signed URL generation for private audio review.

### 5. Deployment
- [x] **Netlify**: Project ready for drag-and-drop or Git deploy.
- [x] **Env Vars**: Documented in README and `env.example`.

### 6. QA
- [x] **Type Safety**: TypeScript used throughout.
- [x] **Linting**: ESLint configured.
- [x] **Accessibility**: Semantic HTML, visible focus states (via Tailwind).
