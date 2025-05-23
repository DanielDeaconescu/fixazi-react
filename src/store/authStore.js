import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: true, // Add loading state

  // Initialize auth state
  initialize: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user, isLoading: false });
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) set({ user: data.user });
    return { data, error };
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
