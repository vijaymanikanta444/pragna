# Pragna - Setup Instructions

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is sufficient)

## 1. Supabase Setup

### Create a New Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in the details:
   - **Name**: pragna
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to India
4. Wait for project to be created (~2 minutes)

### Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `database-setup.sql` from this project
3. Paste into the SQL Editor
4. Click **Run**
5. Verify tables were created: Go to **Table Editor** to see all tables

### Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## 2. Project Setup

### Install Dependencies

```bash
npm install
```

### Create Environment File

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Open `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_APP_NAME=Pragna
VITE_APP_URL=http://localhost:5173
```

## 3. Run the Application

### Development Mode

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 4. Test Authentication

1. Open the app in your browser
2. Click "Login" → "Sign Up"
3. Create an account with:
   - Full Name: Test User
   - Email: test@viet.edu.in
   - Password: test123
   - Department: Computer Science
4. Check your email for verification link
5. After verification, you can log in

## 5. Verify Database

1. Go to Supabase dashboard → **Table Editor**
2. Click on **users** table
3. You should see your user profile created automatically
4. Check the **categories** table - it should have 8 default categories

## Troubleshooting

### "Missing Supabase environment variables"

- Make sure `.env` file exists in the root directory
- Check that variable names match exactly (including `VITE_` prefix)
- Restart the dev server after changing `.env`

### Authentication not working

- Check that you ran the `database-setup.sql` script
- Verify the `handle_new_user()` trigger exists in Supabase
- Check browser console for errors

### Can't see user profile

- Verify the Row Level Security (RLS) policies are enabled
- Check Supabase logs: Dashboard → Logs → Postgres Logs

## Next Steps

### Enable Email Confirmation (Optional)

By default, Supabase requires email confirmation. To disable for testing:

1. Go to **Authentication** → **Settings**
2. Scroll to **Email Auth**
3. Toggle off "Enable email confirmations"

### Set Up Storage for Images

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `article-images`
3. Set it to **Public** if you want images accessible without authentication

## Project Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Authentication state management
├── hooks/
│   └── useAuth.ts               # Hook to use authentication
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── Login.tsx                # Login/Signup page
│   └── Write.tsx                # Article editor
├── services/
│   ├── auth.service.ts          # Authentication methods
│   └── supbase.ts               # Supabase client
├── types/
│   ├── index.ts                 # Application types
│   └── supabase.ts              # Database types
└── routes/
    └── AppRoutes.tsx            # Route definitions
```

## Features Implemented

✅ User authentication (signup, login, logout)
✅ User profiles with roles
✅ Protected routes
✅ Database schema with RLS
✅ Type-safe Supabase client

## Features To Implement

🔲 Article CRUD operations
🔲 Rich text editor
🔲 Image uploads
🔲 Comments system
🔲 Article publishing workflow
🔲 Magazine issues/editions
🔲 Admin dashboard
🔲 Analytics

## Support

For issues or questions:

- Check the [ARCHITECTURE.md](./ARCHITECTURE.md) file
- Review Supabase documentation
- Check browser console for errors
