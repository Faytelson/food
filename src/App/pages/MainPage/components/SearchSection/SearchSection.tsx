import React, { useState, useEffect } from "react";
import InputDropdown, { type Option } from "./InputDropdown";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import CardList from "./CardList";

import clsx from "clsx";
import styles from "./SearchSection.module.scss";
import { getRecipes } from "@api/recipes";
import qs from "qs";
import { searchStore } from "@stores/SearchStore";
import { observer } from "mobx-react-lite";

export type SearchSectionProps = {
  className?: string;
};

export type QueryFilters = {
  category?: {
    id: { $eq: number };
  };
  name?: {
    $containsi: string;
  };
};

export type QueryObj = {
  populate: string[];
  pagination?: {
    page: number;
    pageSize: number;
  };
  filters?: QueryFilters;
};

export type FetchParams = {
  categoryId?: number;
  searchQuery?: string;
  page?: number;
  populate: string[];
};

const fetchRecipes = async ({ categoryId, searchQuery, page = 1, populate }: FetchParams) => {
  const queryObj: QueryObj = {
    populate: populate,
    pagination: {
      page,
      pageSize: 9,
    },
  };

  if (categoryId || searchQuery) {
    queryObj.filters = {};
  }

  if (categoryId) {
    queryObj.filters = {
      ...queryObj.filters,
      category: { id: { $eq: categoryId } },
    };
  }

  if (searchQuery) {
    queryObj.filters = {
      ...queryObj.filters,
      name: { $containsi: searchQuery },
    };
  }

  const query = qs.stringify(queryObj, { encodeValuesOnly: true });
  return getRecipes(`?${query}`);
};

const SearchSection: React.FC<SearchSectionProps> = observer(({ className }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await fetchRecipes({ populate: ["images", "category"] });
        searchStore.setRecipes(data.data);

        const raw: [number, string][] = data.data
          .filter((r) => r.category)
          .map((r) => [r.category?.id as number, r.category?.title as string]);

        const options: Option[] = Array.from(new Map(raw).entries()).map(([key, value]) => ({
          key,
          value,
        }));
        searchStore.setCategories(options);

        searchStore.setTotalPages(data.meta.pagination.pageCount || 1);
      } catch (err) {
        throw new Error(`Failed to fetch: ${err}`);
      }
    };

    fetchInitial();
  }, []);

  const getTitle = (option: Option | null) => {
    return option ? option.value : "Categories";
  };

  const updateRecipes = async (params: {
    categoryId?: number;
    searchQuery?: string;
    page?: number;
  }) => {
    try {
      const data = await fetchRecipes({
        categoryId: params.categoryId,
        searchQuery: params.searchQuery,
        page: params.page ?? 1,
        populate: ["images", "category"],
      });

      searchStore.setRecipes(data.data);
      searchStore.setTotalPages(data.meta.pagination.pageCount || 1);
    } catch (err) {
      throw new Error(`Failed to fetch: ${err}`);
    }
  };

  const handleCategoryChange = (category: Option | null) => {
    if (category === null) {
      searchStore.setSelectedCategory(null);
      updateRecipes({ categoryId: undefined, searchQuery: searchStore.searchQuery, page: 1 });
      searchStore.setCurrentPage(1);
      return;
    }
    searchStore.setSelectedCategory(category);
    const categoryId = Number(category.key);
    updateRecipes({ categoryId, searchQuery: searchStore.searchQuery, page: 1 });
    searchStore.setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchStore.setSearchQuery(value);
    updateRecipes({ categoryId: searchStore.selectedCategory?.key, searchQuery: value, page: 1 });
    searchStore.setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    searchStore.setCurrentPage(page);
    updateRecipes({
      categoryId: searchStore.selectedCategory?.key,
      searchQuery: searchStore.searchQuery,
      page,
    });
  };

  return (
    <section className={clsx(className, styles["search-section"])}>
      <form
        role="search"
        aria-label="Recipe search"
        className={styles["search-section__form"]}
      >
        <div className={styles["search-section__search"]}>
          {
            <SearchBar
              value={searchInput}
              onChange={handleSearchChange}
            ></SearchBar>
          }
        </div>
        <div className={styles["search-section__categories"]}>
          <InputDropdown
            options={searchStore.categories}
            value={searchStore.selectedCategory}
            onChange={handleCategoryChange}
            getTitle={getTitle}
          ></InputDropdown>
        </div>
      </form>

      <section
        aria-labelledby="search-results"
        className={styles["search-section__results"]}
      >
        <CardList recipes={searchStore.recipes}></CardList>
      </section>

      <Pagination
        totalPages={searchStore.totalPages}
        currentPage={searchStore.currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </section>
  );
});

export default SearchSection;
