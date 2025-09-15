import React, { useState, useEffect } from "react";
import InputDropdown from "./InputDropdown";
import SearchInput from "./SearchInput";
import Card, { type CardProps } from "./Card";
import Button from "./Button";
import Pagination from "./Pagination";
import ClockIcon from "@components/icons/ClockIcon";
import clsx from "clsx";
import styles from "./RecipeSearchSection.module.scss";
import type { Recipe } from "@api/recipes";
import { getRecipes } from "@api/recipes";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { roundNum } from "@utils/roundNum";

export type RecipeSearchSectionProps = {
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

const RecipeSearchSection = ({ className }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<Option>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  // инпут
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await fetchRecipes({ populate: ["images", "category"] });

        // set recipes
        setRecipes(data.data);
        // set categories
        const raw = data.data
          .filter((r) => r.category)
          .map((r) => [r.category.id, r.category.title]);
        const options: Option[] = Array.from(new Map(raw).entries()).map(([key, value]) => ({
          key,
          value,
        }));
        setCategories(options);
        // set pages
        setTotalPages(data.meta.pagination.pageCount || 1);
      } catch (err) {
        throw new Error(`Failed to fetch: ${err}`);
      }
    };

    fetchInitial();
  }, []);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const categoryIds = selectedCategories.map((c) => c.key);

  //       const queryObj: QueryObj = {
  //         populate: ["images", "category"],
  //         pagination: {
  //           page: currentPage,
  //           pageSize: 9,
  //         },
  //       };
  //       if (categoryIds.length === 1) {
  //         queryObj.filters = {
  //           category: { id: { $eq: categoryIds[0] } },
  //         };
  //       } else if (categoryIds.length > 1) {
  //         const requests = categoryIds.map((id) => {
  //           const q = qs.stringify(
  //             {
  //               populate: ["images", "category"],
  //               filters: { category: { id: { $eq: id } } },
  //               pagination: { page: currentPage, pageSize: 9 },
  //             },
  //             { encodeValuesOnly: true },
  //           );
  //           return getRecipes(`?${q}`);
  //         });
  //         const responses = await Promise.all(requests);
  //         const allRecipes = responses.flatMap((res) => res.data);
  //         setRecipes(allRecipes);
  //         setTotalPages(responses[0]?.meta.pagination.pageCount || 1);
  //         return;
  //       }

  //       const query = qs.stringify(queryObj, { encodeValuesOnly: true });
  //       const data = await getRecipes(`?${query}`);
  //       setRecipes(data.data);
  //       setTotalPages(data.meta.pagination.pageCount || 1);
  //     } catch (err) {
  //       throw new Error(`Failed to fetch recipes: ${err}`);
  //     }
  //   };

  //   fetchRecipes();
  // }, [currentPage, selectedCategories]);

  const navigate = useNavigate();

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

  const handleCategoryChange = (category: Option) => {
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

  const recipeCards: CardProps[] = recipes.map((r) => {
    const imageData = {
      url: r.images?.[0]?.url,
      alt: r.images?.[0]?.name,
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
      contentSlot: <span>{roundNum(r.calories)} kcal</span>,
      actionSlot: <Button onClick={(e) => e.stopPropagation()}>Save</Button>,
      onClick: () => navigate(`/recipes/${r.documentId}`),
    };
  });

  return (
    <section className={clsx(className, styles["recipe-search-section"])}>
      <form
        role="search"
        aria-label="Recipe search"
        className={styles["recipe-search-section__form"]}
      >
        <div className={styles["recipe-search-section__search"]}>
          {
            <SearchInput
              value={searchInput}
              onChange={handleSearchChange}
            ></SearchInput>
          }
        </div>
        <div className={styles["recipe-search-section__categories"]}>
          <InputDropdown
            options={categories}
            value={selectedCategory}
            onChange={handleCategoryChange}
            getTitle={getTitle}
          ></InputDropdown>
        </div>
      </form>

      <section aria-labelledby="search-results">
        <ul className={styles["recipe-search-section__list"]}>
          {recipeCards.map((card) => {
            return (
              <li
                className={styles["recipe-search-section__item"]}
                key={card.title}
              >
                <Card
                  className={styles["recipe-search-section__card"]}
                  image={card.image}
                  captionSlot={card.captionSlot}
                  title={card.title}
                  subtitle={card.subtitle}
                  contentSlot={card.contentSlot}
                  onClick={card.onClick}
                  actionSlot={card.actionSlot}
                ></Card>
              </li>
            );
          })}
        </ul>
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </section>
  );
};

export default RecipeSearchSection;
