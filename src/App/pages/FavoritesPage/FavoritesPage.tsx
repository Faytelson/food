import { useState, useCallback } from "react";
import { useEffect } from "react";
import Text from "@components/Text";
import RecipeList from "@components/RecipeList";
import Loader from "@components/Loader";
import Button from "@components/Button";
import Pagination from "@components/Pagination";
import { getUserFavorites } from "@api/favorites";
import { type Recipe, type UUID } from "@api/recipes";
import { useAuthContext } from "@context/auth/useAuthContext";
import { isUUID } from "@utils/isUUID";
import { type RecipeCard } from "@components/RecipeList";
import ClockIcon from "@components/icons/ClockIcon";
import { removeFromFavorites } from "@api/favorites";
import styles from "./FavoritesPage.module.scss";

const FavoritesPage = () => {
  const { session } = useAuthContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFavorites = useCallback(
    async (page = 1) => {
      if (!session?.id) return;

      try {
        setIsLoading(true);
        if (isUUID(session.id)) {
          const data = await getUserFavorites(session.id, page);
          if (data?.data) {
            setRecipes(data.data);
          }
          setTotalPages(data.total || 1);
        }
      } catch (err) {
        throw new Error(`Failed to fetch: ${err}`);
      } finally {
        setIsLoading(false);
      }
    },
    [session],
  );

  useEffect(() => {
    fetchFavorites();
  }, [session, fetchFavorites]);

  const handleClick = async (userId: UUID, recipeId: UUID) => {
    await removeFromFavorites(userId, recipeId);
    fetchFavorites();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchFavorites(page);
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
    <section className={styles["favorites-page"]}>
      {isLoading && (
        <div className={styles["recipe-search-section__loader-wrapper"]}>
          <Loader color="var(--color-brand)" />
        </div>
      )}

      <div className={styles["favorites-page__inner"]}>
        <Text
          view="title"
          tag="h1"
        >
          Любимые блюда
        </Text>

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
              renderAction={(item) => {
                if (!session || !isUUID(session.id)) return null;

                const userId = session.id;
                return (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(userId, item.documentId);
                    }}
                  >
                    Удалить
                  </Button>
                );
              }}
            />
          ))}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
    </section>
  );
};

export default FavoritesPage;
