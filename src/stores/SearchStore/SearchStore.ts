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

  async initialize(populate: string[] = ["images", "category"]) {
    this.populate = populate;
    await this.fetchAndSet({ page: 1, populate: this.populate });
  }

  private async fetchAndSet(params: FetchParams) {
    this.isLoading = true;
    this.error = null;

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

        if (this.categories.length === 0) {
          const raw: [number, string][] = data.data
            .filter((r) => r.category)
            .map((r) => [r.category!.id as number, r.category!.title as string]);
          this.categories = Array.from(new Map(raw).entries()).map(([key, value]) => ({
            key,
            value,
          }));
        }

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

  async search(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    await this.fetchAndSet({
      searchQuery: query,
      page: 1,
      populate: this.populate,
    });
  }

  async selectCategory(option: Option | null) {
    this.selectedCategory = option;
    this.currentPage = 1;
    const categoryId = option ? option.key : undefined;
    await this.fetchAndSet({
      categoryId,
      searchQuery: this.searchQuery,
      page: 1,
      populate: this.populate,
    });
  }

  async setPage(page: number) {
    this.currentPage = page;
    await this.fetchAndSet({
      categoryId: this.selectedCategory?.key,
      searchQuery: this.searchQuery,
      page,
      populate: this.populate,
    });
  }
}

export const searchStore = new SearchStore();
export default searchStore;
