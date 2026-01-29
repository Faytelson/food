import type { AuthChangeEvent } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";
import supabase from "./baseClient";

export const register = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.user) return data;

  if (error) {
    throw new Error(`${error}`);
  }
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    throw new Error(error.message);
  }
};

export const authSubscription = (
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  return { subscription };
};
