import api from "./axios";

export type Favorite = {
  id: number;
  recipe: number;
};

export async function getFavorites() {
  const res = await api.get<Favorite[]>("/favorites");
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
