import type { Option } from "@app/pages/MainPage/components/SearchSection/InputDropdown";
import { type Recipe } from "@api/recipes";
import { makeAutoObservable } from "mobx";

class SearchStore {
  recipes: Recipe[] = [];
  categories: Option[] = [];
  selectedCategory: Option | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  setCategories(categories: Option[]) {
    this.categories = categories;
  }

  setSelectedCategory(selected: Option | null) {
    this.selectedCategory = selected;
  }

  setCurrentPage(current: number) {
    this.currentPage = current;
  }

  setTotalPages(total: number) {
    this.totalPages = total;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }
}

export const searchStore = new SearchStore();
