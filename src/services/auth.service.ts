import { supabase } from "./supbase";
import type { User } from "../types";
import type { Database } from "../types/supabase";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

export const authService = {
  // Sign up with email and password
  async signUp(
    email: string,
    password: string,
    fullName: string,
    userScope: "internal" | "external" = "external",
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_scope: userScope,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get current user
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Get user profile from database
  async getUserProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    if (!data) return null;

    const userData = data as UserRow;

    return {
      id: userData.id,
      email: userData.email,
      fullName: userData.full_name,
      role: userData.role,
      userScope: userData.user_scope,
      userType: userData.user_type || undefined,
      bio: userData.bio || undefined,
      profileImage: userData.profile_image || undefined,
      department: userData.department || undefined,
      company: userData.company || undefined,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at || undefined,
    };
  },

  // Update user profile
  async updateProfile(
    userId: string,
    updates: {
      full_name?: string;
      bio?: string;
      profile_image?: string;
      user_type?: string;
      department?: string;
      company?: string;
    },
  ) {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserRow;
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
