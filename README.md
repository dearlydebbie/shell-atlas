# Under the Tortoise Moon: Shell Atlas

A "living archive" of stories presented as a night-sky tortoise shell. Built with Next.js, Tailwind CSS, GSAP, and Supabase.

## 🚀 Deployment (Netlify)

1. **Connect to Netlify**:
   - Create a new site from Git.
   - Select this repository.
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next` (Next.js Runtime handles this automatically) or standard Next.js defaults.

2. **Environment Variables**:
   Set the following in Netlify "Site configuration > Environment variables":
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (for Admin actions).
   - `ADMIN_TOKEN`: A secret string for accessing the admin dashboard (e.g., `moon-secret-123`).

## 🛠 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Supabase**:
   - Create a new Supabase project.
   - Go to SQL Editor and run the script in `supabase_schema.sql`.
   - Create a Storage bucket named `contribution-audio` and toggle it to **Private**.
   - Get your keys from Project Settings > API.

3. **Configure Environment**:
   - Copy `env.example` to `.env.local` and fill in your keys.

4. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## 🐢 Features & Routes

- **Home (`/`)**: Interactive Shell.
- **Stories (`/stories/[slug]`)**: Read and listen to the 7 curated stories.
- **Contribute (`/contribute`)**: Submit your own story, proverb, or voice note.
- **Sky (`/sky`)**: Browse approved community contributions.
- **Admin (`/admin`)**: Moderate submissions (Login required via `ADMIN_TOKEN`).
- **Exhibit (`/exhibit`)**: Installation mode instructions.

## ⚠️ Admin Access
Navigate to `/admin` and enter the token defined in your `.env` `ADMIN_TOKEN`.

## 📄 License
All rights reserved.
