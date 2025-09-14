import React, { useState, useEffect } from "react";
import MultiDropdown, { type Option } from "./MultiDropdown";
import Card, { type CardProps } from "./Card";
import Button from "./Button";
import Pagination from "./Pagination";
import clsx from "clsx";
import styles from "./RecipeSearchSection.module.scss";
import type { Recipe } from "@api/recipes";
import { getRecipes } from "@api/recipes";
import qs from "qs";

export type RecipeSearchSectionProps = {
  className?: string;
};

export type QueryObj = {
  populate: string[];
  filters?: Record<string, Record<string, Record<string, string | number>>>;
};

const RecipeSearchSection = ({ className }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = qs.stringify({ populate: ["category"] });
        const data = await getRecipes(`?${query}`);

        const raw = data.data.map((r) => [r.category.id, r.category.title]);
        const options: Option[] = Array.from(new Map(raw).entries()).map(([key, value]) => ({
          key,
          value,
        }));
        setCategories(options);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const categoryIds = selectedCategories.map((c) => c.key);

        const queryObj: QueryObj = { populate: ["images", "category"] };
        if (categoryIds.length === 1) {
          queryObj.filters = { category: { id: { $eq: categoryIds[0] } } };
        } else if (categoryIds.length > 1) {
          const requests = categoryIds.map((id) => {
            const q = qs.stringify(
              { populate: ["images", "category"], filters: { category: { id: { $eq: id } } } },
              { encodeValuesOnly: true },
            );
            return getRecipes(`?${q}`);
          });
          const responses = await Promise.all(requests);
          const allRecipes = responses.flatMap((res) => res.data);
          setRecipes(allRecipes);
          setTotalPages(responses[0]?.meta.pagination.pageCount || 1);
          return;
        }

        const query = qs.stringify(queryObj, { encodeValuesOnly: true });
        const data = await getRecipes(`?${query}`);
        setRecipes(data.data);
        setTotalPages(data.meta.pagination.pageCount || 1);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };

    fetchRecipes();
  }, [currentPage, selectedCategories]);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       if (selectedCategories.length === 0) {
  //         const query = qs.stringify({
  //           populate: ["images", "category"],
  //         });
  //         const data = await getRecipes(`?${query}`);
  //         setRecipes(data.data);
  //         setTotalPages(data.meta.pagination.pageCount);

  //         const raw = data.data.map((r) => [r.category.id, r.category.title]);
  //         const options: Option[] = Array.from(new Map(raw).entries()).map(([key, value]) => ({
  //           key,
  //           value,
  //         }));
  //         setCategories(options);

  //         return;
  //       }

  //       const requests = selectedCategories.map((cat) => {
  //         const query = qs.stringify(
  //           { populate: ["images", "category"], filters: { category: { id: { $eq: cat.key } } } },
  //           { encodeValuesOnly: true },
  //         );
  //         return getRecipes(`?${query}`);
  //       });

  //       const responses = await Promise.all(requests);

  //       const allRecipes = responses.flatMap((res) => res.data);
  //       setRecipes(allRecipes);
  //       setTotalPages(responses[0]?.meta.pagination.pageCount || 1);

  //       const allOptions = Array.from(
  //         new Map(
  //           responses.flatMap((res) =>
  //             res.data.map((r) => [r.category.id, r.category.title]),
  //           ),
  //         ).entries(),
  //       ).map(([key, value]) => ({ key, value }));
  //       setCategories(allOptions);
  //     } catch (err) {
  //       throw new Error(`Failed to fetch recipes: ${err}`);
  //     }
  //   };

  //   fetchRecipes();
  // }, [currentPage, selectedCategories]);

  const getTitle = (value: Option[]) => {
    if (value.length === 0) return "Select categories";
    return value.map((v) => v.value).join(", ");
  };

  const handleCategoryChange = (value: Option[]) => {
    setSelectedCategories(value);
    setCurrentPage(1);
  };

  const recipeCards: CardProps[] = recipes.map((r) => {
    const imageData = {
      url: r.images?.[0]?.url,
      alt: r.images?.[0]?.name,
      id: r.images?.[0]?.id,
    };

    return {
      image: imageData,
      captionSlot: `${r.preparationTime} minutes`,
      title: r.name,
      subtitle: <span dangerouslySetInnerHTML={{ __html: r.summary }}></span>,
      contentSlot: r.calories,
      actionSlot: <Button>Save</Button>,
      onClick: () => console.log("Clicked", r.name),
    };
  });

  return (
    <section className={clsx(className, styles["recipe-search-section"])}>
      <form
        role="search"
        aria-label="Recipe search"
        className={styles["recipe-search-section__form"]}
      >
        <div className={styles["recipe-search-section__search"]}>{/* здесь будет поиск */}</div>
        <div className={styles["recipe-search-section__categories"]}>
          <MultiDropdown
            options={categories}
            value={selectedCategories}
            onChange={handleCategoryChange}
            getTitle={getTitle}
          ></MultiDropdown>
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
        onPageChange={(page) => setCurrentPage(page)}
      ></Pagination>
    </section>
  );
};

export default RecipeSearchSection;
