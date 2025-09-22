import api from "./axios";
import { type Recipe } from "./recipes";

export type FavoriteRecipe = {
  originalRecipeId: number;
  recipe: Recipe;
};

export async function getFavorites() {
  const res = await api.get<FavoriteRecipe[]>("/favorites");
  return res.data;
}

export async function addFavorite(recipeId: number) {
  const res = await api.post("/favorites/add", { recipe: recipeId });
  return res.data;
}

export async function removeFavorite(recipeId: number) {
  const res = await api.post("/favorites/remove", { recipe: recipeId });
  return res.data;
}
