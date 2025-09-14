import React, { useState, useEffect } from "react";
import MultiDropdown, { type Option } from "./MultiDropdown";
import Card, { type CardProps } from "./Card";
import Button from "./Button";
import Pagination from "./Pagination";
import clsx from "clsx";
import styles from "./RecipeSearchSection.module.scss";
import api from "@api/axios";
import type { Recipe, RecipesResponse } from "@api/recipes";

export type RecipeSearchSectionProps = {
  className?: string;
};

const getRecipes = async (page = 1, pageSize = 10): Promise<RecipesResponse> => {
  const response = await api.get<RecipesResponse>("/recipes", {
    params: {
      populate: ["images"],
      pagination: { page, pageSize },
    },
  });
  return response.data;
};

const fakeCards: CardProps[] = [
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Breakfast",
    title: "Delicious Pancakes with Maple Syrup",
    subtitle: "Fluffy pancakes topped with fresh fruits and a drizzle of maple syrup.",
    contentSlot: "Cook: 15 min",
    actionSlot: <Button>View Recipe</Button>,
    onClick: () => console.log("Card 1 clicked"),
  },
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Lunch",
    title: "Grilled Chicken Salad",
    subtitle: "Healthy salad with grilled chicken, mixed greens, cherry tomatoes, and vinaigrette.",
    contentSlot: "Cook: 20 min",
    actionSlot: <Button>View Recipe</Button>,
    onClick: () => console.log("Card 2 clicked"),
  },
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Dinner",
    title: "Spaghetti Carbonara",
    subtitle: "Classic Italian pasta with creamy sauce, pancetta, and parmesan cheese.",
    contentSlot: "Cook: 20 min",
    actionSlot: <Button>View Recipe</Button>,
    onClick: () => console.log("Card 3 clicked"),
  },
  {
    image: "https://i.ibb.co/8D5nMZZH/header.png",
    captionSlot: "Dessert",
    title: "Chocolate Lava Cake",
    subtitle: "Rich chocolate cake with a gooey molten center, perfect for chocolate lovers.",
    contentSlot: "Cook: 12 min",
    actionSlot: <Button>View Recipe</Button>,
    onClick: () => console.log("Card 4 clicked"),
  },
];

// test data
const categories: Option[] = [
  { key: "1", value: "Breakfast" },
  { key: "2", value: "Lunch" },
  { key: "3", value: "Dinner" },
];

const RecipeSearchSection = ({ className }) => {
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(currentPage, 10);
        setRecipes(data.data);
        setTotalPages(data.meta.pagination.pageCount);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const getTitle = (value: Option[]) => {
    if (value.length === 0) return "Select categories";
    return value.map((v) => v.value).join(", ");
  };

  const handleChange = (value: Option[]) => {
    setSelectedCategories(value);
  };

  const recipeCards: CardProps[] = recipes.map((r) => {
    const imageUrl = r.images?.[0]?.formats?.medium?.url || r.images?.[0]?.url;

    return {
      image: imageUrl,
      captionSlot: r.totalTime,
      title: r.name,
      subtitle: r.summary,
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
            onChange={handleChange}
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
