import React, { useState, useEffect } from "react";
import InputDropdown, { type Option } from "./InputDropdown";
import SearchBar from "./SearchBar";
import Card, { type CardProps } from "./Card";
import Button from "./Button";
import Pagination from "./Pagination";
import ClockIcon from "@components/icons/ClockIcon";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./SearchSection.module.scss";
import type { Recipe } from "@api/recipes";
import { getRecipes } from "@api/recipes";
import qs from "qs";

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

type CardWithId = CardProps & { documentId: string };

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

const SearchSection: React.FC<SearchSectionProps> = ({ className }) => {
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await fetchRecipes({ populate: ["images", "category"] });
        setRecipes(data.data);

        const raw: [number, string][] = data.data
          .filter((r) => r.category)
          .map((r) => [r.category?.id as number, r.category?.title as string]);

        const options: Option[] = Array.from(new Map(raw).entries()).map(([key, value]) => ({
          key,
          value,
        }));
        setCategories(options);

        setTotalPages(data.meta.pagination.pageCount || 1);
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

      setRecipes(data.data);
      setTotalPages(data.meta.pagination.pageCount || 1);
    } catch (err) {
      throw new Error(`Failed to fetch: ${err}`);
    }
  };

  const handleCategoryChange = (category: Option | null) => {
    if (category === null) {
      setSelectedCategory(null);
      updateRecipes({ categoryId: undefined, searchQuery, page: 1 });
      setCurrentPage(1);
      return;
    }
    setSelectedCategory(category);
    const categoryId = Number(category.key);
    updateRecipes({ categoryId, searchQuery, page: 1 });
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setSearchQuery(value);
    updateRecipes({ categoryId: selectedCategory?.key, searchQuery: value, page: 1 });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateRecipes({ categoryId: selectedCategory?.key, searchQuery, page });
  };

  const recipeCards: CardWithId[] = recipes.map((r) => {
    const imageData = {
      url: r.images?.[0]?.url ?? "",
      alt: r.images?.[0]?.name ?? "Recipe Image",
      id: r.images?.[0]?.id,
    };

    return {
      image: imageData,
      captionSlot: (
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ClockIcon
            width={15}
            height={15}
            color="accent"
            style={{ position: "relative", top: "-1px" }}
          />
          {r.preparationTime} minutes
        </span>
      ),
      title: r.name,
      subtitle: <span dangerouslySetInnerHTML={{ __html: r.summary }}></span>,
      contentSlot: <span>{Math.round(r.calories)} kcal</span>,
      actionSlot: <Button onClick={(e) => e.stopPropagation()}>Save</Button>,
      documentId: r.documentId,
    };
  });

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
            options={categories}
            value={selectedCategory}
            onChange={handleCategoryChange}
            getTitle={getTitle}
          ></InputDropdown>
        </div>
      </form>

      <section
        aria-labelledby="search-results"
        className={styles["search-section__results"]}
      >
        {/* <ul className={styles["search-section__list"]}>
          {recipeCards.map((card) => {
            return (
              <li
                className={styles["search-section__item"]}
                key={card.title}
              >
                <Link to={`/recipes/${card.documentId}`}>
                  <Card
                    className={styles["search-section__card"]}
                    image={card.image}
                    captionSlot={card.captionSlot}
                    title={card.title}
                    subtitle={card.subtitle}
                    contentSlot={card.contentSlot}
                    actionSlot={card.actionSlot}
                  ></Card>
                </Link>
              </li>
            );
          })}
        </ul> */}
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </section>
  );
};

export default SearchSection;
