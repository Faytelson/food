import supabase from "./baseClient";
import { type UUID } from "./recipes";
import { type RecipesResponse } from "./recipes";

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

export const getUserFavorites = async (
  userId: UUID,
  page: number = 1,
  pageSize: number = 9,
): Promise<RecipesResponse> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("favorites")
    .select(
      `recipes (
        *,
        images(*),
        categories(*) )`,
      { count: "exact" },
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const mappedRecipes = data?.flatMap((item) => item.recipes);
  const totalPages = count ? Math.ceil(count / pageSize) : 1;

  return { data: mappedRecipes, total: totalPages };
};
