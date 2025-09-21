import { makeAutoObservable, runInAction } from "mobx";
import qs from "qs";
import { getRecipes, type Recipe, type RecipesResponse } from "@api/recipes";
import type { Option } from "@app/pages/MainPage/components/SearchSection/InputDropdown";

type QueryFilters = {
  category?: { id: { $eq: number } };
  name?: { $containsi: string };
};

type QueryObj = {
  populate: string[];
  pagination?: { page: number; pageSize: number };
  filters?: QueryFilters;
};

type FetchParams = {
  categoryId?: number | string;
  searchQuery?: string;
  page?: number;
  populate?: string[];
};

class SearchStore {
  recipes: Recipe[] = [];
  categories: Option[] = [];
  selectedCategory: Option | null = null;
  searchQuery = "";
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  error: string | null = null;
  populate: string[] = ["images", "category"];

  constructor() {
    makeAutoObservable(this);
  }

  async initializeFromURL(populate: string[] = ["images", "category"]) {
    runInAction(() => {
      this.populate = populate;
    });

    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get("search") ?? "";
    const categoryId = searchParams.get("category");
    const page = Number(searchParams.get("page")) || 1;

    runInAction(() => {
      this.searchQuery = search;
      this.currentPage = page;
      if (categoryId) this.selectedCategory = { key: Number(categoryId), value: "" };
    });

    await this.fetchCategories();

    if (categoryId) {
      const cat = this.categories.find((c) => c.key === Number(categoryId));
      if (cat)
        runInAction(() => {
          this.selectedCategory = cat;
        });
    }

    await this.fetchRecipes({
      categoryId: this.selectedCategory?.key,
      searchQuery: this.searchQuery,
      page: this.currentPage,
      populate: this.populate,
    });
  }

  async fetchCategories() {
    if (this.categories.length > 0) return;

    const queryObj: QueryObj = { populate: ["category"] };
    const query = qs.stringify(queryObj, { encodeValuesOnly: true });

    try {
      const data: RecipesResponse = await getRecipes(`?${query}`);
      runInAction(() => {
        const raw: [number, string][] = data.data
          .filter((r) => r.category)
          .map((r) => [r.category!.id as number, r.category!.title as string]);
        this.categories = Array.from(new Map(raw).entries()).map(([key, value]) => ({
          key,
          value,
        }));
      });
    } catch (err) {
      runInAction(() => {
        this.error = String(err);
      });
      throw err;
    }
  }

  private async fetchRecipes(params: FetchParams) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    const queryObj: QueryObj = {
      populate: params.populate ?? this.populate,
      pagination: { page: params.page ?? 1, pageSize: 9 },
    };

    if (params.categoryId || params.searchQuery) queryObj.filters = {};

    if (params.categoryId) {
      queryObj.filters = {
        ...queryObj.filters,
        category: { id: { $eq: Number(params.categoryId) } },
      };
    }

    if (params.searchQuery) {
      queryObj.filters = {
        ...queryObj.filters,
        name: { $containsi: params.searchQuery },
      };
    }

    const query = qs.stringify(queryObj, { encodeValuesOnly: true });

    try {
      const data: RecipesResponse = await getRecipes(`?${query}`);
      runInAction(() => {
        this.recipes = data.data;
        this.totalPages = data.meta.pagination.pageCount || 1;
        this.currentPage = params.page ?? 1;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = String(err);
        this.isLoading = false;
      });
      throw err;
    }
  }

  async setSearch(query: string) {
    runInAction(() => {
      this.searchQuery = query;
      this.currentPage = 1;
    });
    await this.fetchRecipes({
      searchQuery: query,
      categoryId: this.selectedCategory?.key,
      page: 1,
      populate: this.populate,
    });
  }

  async selectCategory(option: Option | null) {
    runInAction(() => {
      this.selectedCategory = option;
      this.currentPage = 1;
    });
    const categoryId = option ? option.key : undefined;
    await this.fetchRecipes({
      categoryId,
      searchQuery: this.searchQuery,
      page: 1,
      populate: this.populate,
    });
  }

  async setPage(page: number) {
    runInAction(() => {
      this.currentPage = page;
    });
    await this.fetchRecipes({
      categoryId: this.selectedCategory?.key,
      searchQuery: this.searchQuery,
      page,
      populate: this.populate,
    });
  }
}

export const searchStore = new SearchStore();
export default searchStore;
