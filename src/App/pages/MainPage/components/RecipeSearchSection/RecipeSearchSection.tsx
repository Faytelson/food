import { useState, useEffect, useCallback } from "react";
import InputDropdown, { type Option } from "@components/InputDropdown";
import SearchBar from "@components/SearchBar";
import RecipeList from "@components/RecipeList";
import ToggleFavorite from "@components/ToggleFavorite";
import Button from "@components/Button";
import FormLogin from "@components/FormLogin";
import Pagination from "@components/Pagination";
import Loader from "@components/Loader";
import ClockIcon from "@components/icons/ClockIcon";
import Text from "@components/Text";
import clsx from "clsx";
import styles from "./RecipeSearchSection.module.scss";
import type { Recipe } from "@api/recipes";
import { fetchRecipes, fetchCategories, fetchRecipeNames } from "@api/recipes";
import { type RecipeCard } from "@components/RecipeList";
import { isUUID } from "@utils/isUUID";
import { useAuthContext } from "@context/auth/useAuthContext";
import { useModal } from "@context/modal/useModal";

export type RecipeSearchSectionProps = {
  className?: string;
};

const RecipeSearchSection = ({ className }: RecipeSearchSectionProps) => {
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { session } = useAuthContext();
  const { openModal } = useModal();

  const getRecipes = useCallback(
    async (category?: string | null, query?: string, page?: number) => {
      try {
        setIsLoading(true);
        const data = await fetchRecipes(category, query, page);
        if (data.data) {
          setRecipes(data.data);
        }
        setTotalPages(data.total || 1);
      } catch (err) {
        throw new Error(`Failed to fetch: ${err}`);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        const categories = data.map((category) => {
          return { key: category.id, value: category.name };
        });
        setCategories(categories);
      } catch (err) {
        throw new Error(`Failed to fetch: ${err}`);
      }
    };
    getCategories();
  }, []);

  const getRecipeNames = useCallback(fetchRecipeNames, []);

  const handleCategoryChange = (category: Option | null) => {
    if (category === null) {
      setSelectedCategory(null);
      getRecipes(null, searchQuery);
      setCurrentPage(1);
      return;
    }
    setSelectedCategory(category);
    const categoryId = category.key;
    getRecipes(categoryId, searchQuery);
    setCurrentPage(1);
  };

  const handleOnSearch = (value: string) => {
    setSearchQuery(value);
    getRecipes(selectedCategory?.key, value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getRecipes(selectedCategory?.key, searchQuery, page);
  };

  const recipeCards: RecipeCard[] = recipes
    .filter((r) => isUUID(r.documentId))
    .map((r) => {
      return {
        images: r.images,
        captionSlot: (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ClockIcon
              width={15}
              height={15}
              color="accent"
              style={{ position: "relative", top: "-1px" }}
            />
            {r.preparationTime} минут
          </span>
        ),
        title: r.name,
        subtitle: <span dangerouslySetInnerHTML={{ __html: r.summary }}></span>,
        contentSlot: <span>{Math.round(r.calories)} kcal</span>,
        documentId: r.documentId,
      };
    });

  return (
    <section className={clsx(className, styles["recipe-search-section"])}>
      {isLoading && (
        <div className={styles["recipe-search-section__loader-wrapper"]}>
          <Loader color="var(--color-brand)" />
        </div>
      )}
      <form
        role="search"
        aria-label="Recipe search"
        className={styles["recipe-search-section__form"]}
      >
        <div className={styles["recipe-search-section__search"]}>
          <SearchBar
            getListItems={getRecipeNames}
            onSearch={handleOnSearch}
            name="recipeNameSearch"
            id="recipeNameSearch"
            placeholder="Найти рецепт"
          />
        </div>
        <div className={styles["recipe-search-section__categories"]}>
          <InputDropdown
            options={categories}
            selected={selectedCategory}
            placeholder="Выберите категорию"
            onChange={handleCategoryChange}
          ></InputDropdown>
        </div>
      </form>

      <section
        className={styles["recipe-search-section__search-results"]}
        aria-labelledby="search-results"
      >
        {!isLoading &&
          (recipes.length === 0 ? (
            <Text
              tag="p"
              view="p-20"
              color="primary"
            >
              Рецептов не найдено
            </Text>
          ) : (
            <RecipeList
              items={recipeCards}
              renderAction={(item) =>
                session && isUUID(session.id) ? (
                  <ToggleFavorite
                    userId={session.id}
                    recipeId={item.documentId}
                  ></ToggleFavorite>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(
                        <FormLogin title="Войдите в личный кабинет, чтобы сохранять рецепты"></FormLogin>,
                      );
                    }}
                  >
                    Сохранить
                  </Button>
                )
              }
            />
          ))}
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
