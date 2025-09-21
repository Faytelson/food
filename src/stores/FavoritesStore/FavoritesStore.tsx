import { makeAutoObservable, runInAction } from "mobx";
import { getFavorites, addFavorite, removeFavorite, type Favorite } from "@api/favorites";

class FavoritesStore {
  favorites: Favorite[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
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
    await addFavorite(recipeId);
    runInAction(() => {
      this.favorites.push({ id: Date.now(), recipe: recipeId });
    });
  }

  async removeFromFavorites(recipeId: number) {
    await removeFavorite(recipeId);
    runInAction(() => {
      this.favorites = this.favorites.filter((f) => f.recipe !== recipeId);
    });
  }

  isFavorite(recipeId: number) {
    return this.favorites.some((f) => f.recipe === recipeId);
  }
}

export const favoritesStore = new FavoritesStore();
