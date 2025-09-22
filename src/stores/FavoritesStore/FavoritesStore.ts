import { makeAutoObservable, runInAction } from "mobx";
import { getFavorites, addFavorite, removeFavorite, type FavoriteRecipe } from "@api/favorites";

class FavoritesStore {
  favorites: FavoriteRecipe[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get favoriteList(): FavoriteRecipe[] {
    return this.favorites;
  }

  async initialize() {
    await this.fetchFavorites();
  }

  async fetchFavorites() {
    this.loading = true;
    try {
      const data = await getFavorites();
      runInAction(() => {
        this.favorites = data;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async addToFavorites(recipeId: number) {
    try {
      const newFav = await addFavorite(recipeId);
      runInAction(() => {
        this.favorites.push(newFav);
      });
    } catch {
      throw new Error("Failed to add favorite:");
    }
  }

  async removeFromFavorites(recipeId: number) {
    try {
      await removeFavorite(recipeId);
      runInAction(() => {
        this.favorites = this.favorites.filter((f) => f.originalRecipeId !== recipeId);
      });
    } catch {
      throw new Error("Failed to remove favorite:");
    }
  }

  isFavorite(id: number) {
    return this.favorites.some((f) => Number(f.originalRecipeId) === id);
  }
}

export const favoritesStore = new FavoritesStore();
