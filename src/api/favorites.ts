import supabase from "./baseClient";
import { type UUID } from "./recipes";

export const getIsFavorite = async (userId: UUID, recipeId: UUID) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("recipe_id")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId)
    .maybeSingle();

  if (error) {
    throw new Error(`${error}`);
  }

  return Boolean(data);
};

export const addToFavorites = async (userId: UUID, recipeId: UUID) => {
  const { error } = await supabase
    .from("favorites")
    .insert({ user_id: userId, recipe_id: recipeId });

  if (error) throw error;
};

export const removeFromFavorites = async (userId: UUID, recipeId: UUID) => {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};
