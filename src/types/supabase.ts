// Supabase Database Types
// This file will be auto-generated when you set up your Supabase project
// For now, we'll use a simplified version

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "author" | "editor" | "admin";
          user_scope: "internal" | "external";
          user_type:
            | "student"
            | "faculty"
            | "alumni"
            | "professional"
            | "guest"
            | null;
          bio: string | null;
          profile_image: string | null;
          department: string | null;
          company: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: "author" | "editor" | "admin";
          user_scope?: "internal" | "external";
          user_type?:
            | "student"
            | "faculty"
            | "alumni"
            | "professional"
            | "guest"
            | null;
          bio?: string | null;
          profile_image?: string | null;
          department?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "author" | "editor" | "admin";
          user_scope?: "internal" | "external";
          user_type?:
            | "student"
            | "faculty"
            | "alumni"
            | "professional"
            | "guest"
            | null;
          bio?: string | null;
          profile_image?: string | null;
          department?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          author_id: string;
          category_id: string | null;
          cover_image_url: string | null;
          status: "draft" | "pending_review" | "published" | "archived";
          published_at: string | null;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          author_id: string;
          category_id?: string | null;
          cover_image_url?: string | null;
          status?: "draft" | "pending_review" | "published" | "archived";
          published_at?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          author_id?: string;
          category_id?: string | null;
          cover_image_url?: string | null;
          status?: "draft" | "pending_review" | "published" | "archived";
          published_at?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          content: string;
          parent_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          content: string;
          parent_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          user_id?: string;
          content?: string;
          parent_id?: string | null;
          created_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          article_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          article_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      issues: {
        Row: {
          id: string;
          title: string;
          issue_number: number;
          year: number;
          month: number;
          cover_image_url: string | null;
          description: string | null;
          published_at: string | null;
          pdf_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issue_number: number;
          year: number;
          month: number;
          cover_image_url?: string | null;
          description?: string | null;
          published_at?: string | null;
          pdf_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issue_number?: number;
          year?: number;
          month?: number;
          cover_image_url?: string | null;
          description?: string | null;
          published_at?: string | null;
          pdf_url?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: "author" | "editor" | "admin";
      article_status: "draft" | "pending_review" | "published" | "archived";
    };
  };
}
