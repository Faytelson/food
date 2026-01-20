import supabase from "./baseClient";

export type UUID = string & { readonly __brand: unique symbol };

export const getIsFavorite = async (userId: UUID, recipeId: UUID) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("recipe_id")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId)
    .single();

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
};

export const addToFavorites = async (userId: UUID, recipeId: UUID) => {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, recipe_id: recipeId }]);

  if (error) {
    throw new Error(`${error}`);
  }

  return data;
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
