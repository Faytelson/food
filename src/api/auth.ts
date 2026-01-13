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
