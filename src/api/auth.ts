import supabase from "./baseClient";

const register = async (emailInputValue: string, passwordInputValue: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: emailInputValue,
    password: passwordInputValue,
  });

  if (error) {
    throw new Error(`${error}`);
  }
};
