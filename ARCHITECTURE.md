# Pragna Digital Magazine - Architecture

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Routing**: React Router
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (for images, PDFs)
- **Serverless**: Supabase Edge Functions

## Database Schema

### Tables

#### `users`

```sql
- id (uuid, primary key)
- email (text, unique)
- full_name (text)
- role (enum: 'reader', 'writer', 'editor', 'admin')
- department (text) -- for VIET students/faculty
- created_at (timestamp)
- avatar_url (text)
```

#### `articles`

```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique)
- content (text/jsonb) -- rich text content
- excerpt (text)
- author_id (uuid, foreign key -> users)
- category_id (uuid, foreign key -> categories)
- cover_image_url (text)
- status (enum: 'draft', 'pending_review', 'published', 'archived')
- published_at (timestamp)
- view_count (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `categories`

```sql
- id (uuid, primary key)
- name (text)
- slug (text, unique)
- description (text)
- created_at (timestamp)
```

#### `comments`

```sql
- id (uuid, primary key)
- article_id (uuid, foreign key -> articles)
- user_id (uuid, foreign key -> users)
- content (text)
- parent_id (uuid, nullable) -- for nested comments
- created_at (timestamp)
```

#### `likes`

```sql
- id (uuid, primary key)
- article_id (uuid, foreign key -> articles)
- user_id (uuid, foreign key -> users)
- created_at (timestamp)
- UNIQUE(article_id, user_id)
```

#### `issues` (Magazine Issues/Editions)

```sql
- id (uuid, primary key)
- title (text) -- "January 2026 Edition"
- issue_number (integer)
- year (integer)
- month (integer)
- cover_image_url (text)
- description (text)
- published_at (timestamp)
- pdf_url (text) -- full magazine PDF
```

#### `article_issues` (Many-to-many)

```sql
- article_id (uuid, foreign key -> articles)
- issue_id (uuid, foreign key -> issues)
- order_in_issue (integer)
- PRIMARY KEY (article_id, issue_id)
```

## Features to Implement

### Phase 1: Core Features

- [ ] User authentication (email/password)
- [ ] Article CRUD operations
- [ ] Rich text editor
- [ ] Category management
- [ ] User roles and permissions
- [ ] Article publishing workflow

### Phase 2: Enhanced Features

- [ ] Image upload and management
- [ ] Comments system
- [ ] Likes/reactions
- [ ] Article search
- [ ] Magazine issues/editions
- [ ] PDF generation for issues

### Phase 3: Advanced Features

- [ ] Real-time collaboration (multiple editors)
- [ ] Analytics dashboard
- [ ] Email newsletters
- [ ] Social sharing
- [ ] SEO optimization
- [ ] Mobile app (React Native)

## Security

### Row Level Security (RLS) Policies

```sql
-- Users can read their own profile
-- Users can read published articles
-- Only authors can edit their own drafts
-- Editors/admins can edit all articles
-- Only authenticated users can comment
```

## File Structure Recommendation

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── articles/        # Article-related components
│   ├── editor/          # Rich text editor
│   └── layout/          # Layout components
├── context/
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeContext.tsx # Theme state
├── hooks/
│   ├── useAuth.ts
│   ├── useArticles.ts
│   └── useSupabase.ts
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Write.tsx
│   ├── ArticleView.tsx
│   ├── Dashboard.tsx
│   └── Profile.tsx
├── services/
│   ├── auth.service.ts
│   ├── articles.service.ts
│   └── supabase.ts
├── types/
│   └── index.ts         # TypeScript interfaces
└── utils/
    ├── validation.ts
    └── helpers.ts
```

## Best Practices

1. **Environment Variables**: Store all API keys in `.env` file
2. **TypeScript**: Use strict types for all data models
3. **Error Handling**: Implement comprehensive error boundaries
4. **Loading States**: Show skeletons/spinners during data fetches
5. **Caching**: Use React Query or SWR for data caching
6. **Code Splitting**: Lazy load routes and components
7. **Testing**: Write unit tests for critical functions
8. **Accessibility**: Follow WCAG guidelines
9. **Performance**: Optimize images, use CDN
10. **SEO**: Implement meta tags, sitemap, Open Graph

## Recommended Libraries

- **Rich Text Editor**: TipTap, Slate, or Quill
- **State Management**: React Query + Context API
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI or shadcn/ui
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns or Day.js
- **Image Optimization**: sharp (for backend)
- **PDF Generation**: jsPDF or pdfmake
