# Email/Password Authentication Setup

## ✅ What You Have

Your Pragna app uses **simple email/password authentication** via Supabase. No OAuth providers, no complex setup needed!

---

## 🔐 How It Works

### Sign Up

1. User fills in: Full Name, Account Type (Internal/External), Email, Password
2. Supabase creates secure auth account
3. Database trigger auto-creates user profile
4. Optional: Email verification sent

### Login

1. User enters: Email, Password
2. Supabase verifies credentials
3. Session created (stays logged in)
4. Redirected to home page

---

## 📋 Database Setup Required

You need to run this SQL in your **Supabase Dashboard → SQL Editor**:

```sql
-- Drop old table and create new schema
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,

  user_scope TEXT CHECK (user_scope IN ('internal', 'external')) NOT NULL DEFAULT 'external',
  user_type TEXT CHECK (user_type IN ('student', 'faculty', 'alumni', 'professional', 'guest')),

  role TEXT CHECK (role IN ('author', 'editor', 'admin')) DEFAULT 'author',

  bio TEXT,
  profile_image TEXT,
  department TEXT,
  company TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all profiles"
  ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

-- Indexes for performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_user_type ON public.users(user_type);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, user_scope)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'user_scope', 'external')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## ⚙️ Configuration

### 1. Environment Variables

Your `.env` file should have:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these from: **Supabase Dashboard → Settings → API**

### 2. Optional: Disable Email Verification (for faster testing)

1. Go to **Supabase Dashboard → Authentication → Settings**
2. Find **"Enable email confirmations"**
3. Toggle **OFF**
4. Click **Save**

Now users can log in immediately after signup!

---

## 🧪 Testing

### Test Signup:

1. Start dev server: `npm run dev`
2. Go to `http://localhost:5173/login`
3. Click **"Don't have an account? Sign Up"**
4. Fill in:
   - Full Name: Test User
   - Account Type: External (or Internal)
   - Email: test@example.com
   - Password: test123 (min 6 chars)
5. Click **"Sign Up"**
6. Check email for verification (if enabled)

### Test Login:

1. Enter email + password
2. Click **"Login"**
3. You should be redirected to home page
4. User avatar appears in header

### Verify in Supabase:

1. Go to **Dashboard → Authentication → Users**
2. See your user listed
3. Go to **Table Editor → users**
4. See your profile with all fields

---

## 👤 User Profile Fields

After signup, each user has:

```
✅ id              - UUID from Supabase auth
✅ email           - User's email
✅ full_name       - Display name
✅ user_scope      - 'internal' (VIET) or 'external' (guest)
✅ role            - 'author' (default), 'editor', or 'admin'

📝 Optional fields (can be filled later):
- user_type      - student/faculty/alumni/professional/guest
- bio            - User biography
- profile_image  - Avatar URL
- department     - For internal users
- company        - For external users
```

---

## 🔒 Security Features

✅ **Passwords hashed** - Supabase uses bcrypt
✅ **Row Level Security** - Users can only update their own profiles
✅ **Session tokens** - Secure JWT tokens
✅ **Auto-logout** - On token expiry
✅ **SQL injection protected** - Parameterized queries

---

## 🚀 Next Steps

After basic auth is working:

1. **Profile Editing** - Create `/profile` page to let users update their info
2. **Password Reset** - Implement forgot password flow
3. **Email Verification** - Enable and handle verification emails
4. **Role Management** - Admin panel to assign editor/admin roles
5. **User Dashboard** - Show user's articles, drafts, etc.

---

## 🐛 Troubleshooting

### "Email already registered"

- User already has an account
- Try logging in instead

### "Invalid login credentials"

- Wrong email or password
- Check for typos
- Password is case-sensitive

### User not appearing in database

- Check trigger was created: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
- Re-run the SQL script

### Can't log in after signup

- If email verification is enabled, check your email
- Or disable email verification in Supabase settings

---

## 📞 Support

- Check Supabase logs: **Dashboard → Logs → Auth logs**
- Check browser console: F12 → Console tab
- Verify environment variables are set
- Make sure SQL script ran successfully

---

**Your auth is ready! No OAuth setup needed.** 🎉
