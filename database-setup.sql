-- Pragna Digital Magazine Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE user_role AS ENUM ('reader', 'writer', 'editor', 'admin');
CREATE TYPE article_status AS ENUM ('draft', 'pending_review', 'published', 'archived');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'reader',
    department TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    cover_image_url TEXT,
    status article_status DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes table
CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(article_id, user_id)
);

-- Issues table (Magazine editions)
CREATE TABLE public.issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issue_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    cover_image_url TEXT,
    description TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(year, month)
);

-- Article Issues junction table
CREATE TABLE public.article_issues (
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
    order_in_issue INTEGER DEFAULT 0,
    PRIMARY KEY (article_id, issue_id)
);

-- Create indexes for better performance
CREATE INDEX idx_articles_author ON public.articles(author_id);
CREATE INDEX idx_articles_category ON public.articles(category_id);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published ON public.articles(published_at DESC);
CREATE INDEX idx_comments_article ON public.comments(article_id);
CREATE INDEX idx_likes_article ON public.likes(article_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for articles
CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" 
    ON public.users FOR SELECT 
    USING (true);

CREATE POLICY "Users can update own profile" 
    ON public.users FOR UPDATE 
    USING (auth.uid() = id);

-- Articles policies
CREATE POLICY "Anyone can view published articles" 
    ON public.articles FOR SELECT 
    USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Authenticated users can create articles" 
    ON public.articles FOR INSERT 
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own articles" 
    ON public.articles FOR UPDATE 
    USING (author_id = auth.uid());

CREATE POLICY "Authors can delete own articles" 
    ON public.articles FOR DELETE 
    USING (author_id = auth.uid());

-- Categories policies
CREATE POLICY "Anyone can view categories" 
    ON public.categories FOR SELECT 
    USING (true);

-- Comments policies
CREATE POLICY "Anyone can view comments" 
    ON public.comments FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can create comments" 
    ON public.comments FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" 
    ON public.comments FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" 
    ON public.comments FOR DELETE 
    USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Anyone can view likes" 
    ON public.likes FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can like articles" 
    ON public.likes FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike articles" 
    ON public.likes FOR DELETE 
    USING (auth.uid() = user_id);

-- Issues policies
CREATE POLICY "Anyone can view published issues" 
    ON public.issues FOR SELECT 
    USING (published_at IS NOT NULL);

-- Insert some default categories
INSERT INTO public.categories (name, slug, description) VALUES
    ('Technology', 'technology', 'Articles about technology and innovation'),
    ('Science', 'science', 'Scientific discoveries and research'),
    ('Campus Life', 'campus-life', 'Stories from VIET campus'),
    ('Student Corner', 'student-corner', 'Student opinions and experiences'),
    ('Events', 'events', 'Campus events and activities'),
    ('Alumni', 'alumni', 'Alumni stories and achievements'),
    ('Faculty Insights', 'faculty-insights', 'Perspectives from faculty members'),
    ('Research', 'research', 'Research projects and papers');

-- Create a function to automatically create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
