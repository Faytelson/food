import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { searchStore } from "@stores/SearchStore";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./SearchSection.module.scss";

import InputDropdown, { type Option } from "./InputDropdown";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import CardList from "./CardList";

const SearchSection: React.FC<{ className?: string }> = observer(({ className }) => {
  const [searchInput, setSearchInput] = useState("");
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchStore.initializeFromURL().then(() => {
      setSearchInput(searchStore.searchQuery);
    });
  }, []);

  const getTitle = (option: Option | null) => (option ? option.value : "Categories");

  const handleCategoryChange = (category: Option | null) => {
    searchStore.selectCategory(category);
    setSearchParams({
      search: searchStore.searchQuery,
      category: category?.key?.toString() ?? "",
      page: "1",
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchStore.setSearch(value);
    setSearchParams({
      search: value,
      category: searchStore.selectedCategory?.key?.toString() ?? "",
      page: "1",
    });
  };

  const handlePageChange = (page: number) => {
    searchStore.setPage(page);
    setSearchParams({
      search: searchStore.searchQuery,
      category: searchStore.selectedCategory?.key?.toString() ?? "",
      page: String(page),
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
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>

        <div className={styles["search-section__categories"]}>
          <InputDropdown
            options={searchStore.categories}
            value={searchStore.selectedCategory}
            onChange={handleCategoryChange}
            getTitle={getTitle}
          />
        </div>
      </form>

      <section
        aria-labelledby="search-results"
        className={styles["search-section__results"]}
      >
        <CardList recipes={searchStore.recipes} />
      </section>

      <Pagination
        totalPages={searchStore.totalPages}
        currentPage={searchStore.currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
});

export default SearchSection;
