// User Types
export type UserRole = "reader" | "writer" | "editor" | "admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  department?: string;
  avatarUrl?: string;
  createdAt: string;
}

// Article Types
export type ArticleStatus =
  | "draft"
  | "pending_review"
  | "published"
  | "archived";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  author?: User;
  categoryId: string;
  category?: Category;
  coverImageUrl?: string;
  status: ArticleStatus;
  publishedAt?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  user?: User;
  content: string;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
}

// Like Types
export interface Like {
  id: string;
  articleId: string;
  userId: string;
  createdAt: string;
}

// Magazine Issue Types
export interface Issue {
  id: string;
  title: string;
  issueNumber: number;
  year: number;
  month: number;
  coverImageUrl?: string;
  description?: string;
  publishedAt?: string;
  pdfUrl?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LoginFormData {
  fullName: string;
  department?: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  coverImage?: File;
  status: ArticleStatus;
}
