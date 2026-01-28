import supabase from "./baseClient";
import { type Recipe } from "@api/recipes";

export const fetchNewRecipes = async (limit: number = 6): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*, images(*), categories(*)")
    .eq("is_new", true)
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
};
